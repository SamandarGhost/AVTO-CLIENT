import React, { ChangeEvent, useState } from 'react';
import { Stack, Box, Pagination } from '@mui/material';
import useDeviceDetect from '../../hooks/useDeviceDetect';
import WestIcon from '@mui/icons-material/West';
import EastIcon from '@mui/icons-material/East';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper';
import TopPropertyCard from './FindingCarCard';
import { PropertiesInquiry } from '../../types/property/property.input';
import { Property } from '../../types/property/property';
import { useMutation, useQuery } from '@apollo/client';
import { GET_PROPERTIES } from '../../../apollo/user/query';
import { T } from '../../types/common';
import { LIKE_TARGET_PROPERTY } from '../../../apollo/user/mutation';
import { Message } from '../../enums/common.enum';
import { sweetMixinErrorAlert } from '../../sweetAlert';
import NorthEastRoundedIcon from '@mui/icons-material/NorthEastRounded';
import FindingCarCard from './FindingCarCard';

interface TopPropertiesProps {
	initialInput: PropertiesInquiry;
}

const TopProperties = (props: TopPropertiesProps) => {
	const { initialInput } = props;
	const device = useDeviceDetect();
	const [topProperties, setTopProperties] = useState<Property[]>([]);
	const [propertyTotal, setPropertyTotal] = useState<number>(0);
	const [searchFilter, setSearchFilter] = useState<PropertiesInquiry>(initialInput);
	const propertyPaginationChangeHandler = async (event: ChangeEvent<unknown>, value: number) => {
		searchFilter.page = value;
		setSearchFilter({ ...searchFilter });
	};




	/** APOLLO REQUESTS **/
	const [likeTargetProperty] = useMutation(LIKE_TARGET_PROPERTY);

	const {
		loading: getPropertiesLoading,
		data: getPropertiesData,
		error: getPropertiesError,
		refetch: getPropertiesRefetch
	} = useQuery(GET_PROPERTIES, {
		fetchPolicy: 'cache-and-network',
		variables: { input: initialInput },
		notifyOnNetworkStatusChange: true,
		onCompleted: (data: T) => {
			setTopProperties(data?.getProperties?.list);
		},
	});
	/** HANDLERS **/
	const likePropertyHandler = async (user: T, id: string) => {
		try {
			if (!id) return;
			if (!user._id) throw new Error(Message.SOMETHING_WENT_WRONG);

			await likeTargetProperty({
				variables: { input: id },
			});
			await getPropertiesRefetch({ input: initialInput });
		} catch (err: any) {
			console.log('Error, likePropertyHandler:', err.message);
			sweetMixinErrorAlert(err.message).then();
		}
	}

	if (device === 'mobile') {
		return (
			<Stack className={'top-properties'}>
				<Stack className={'container'}>
					<Stack className={'info-box'}>
						<span>Top properties</span>
					</Stack>
					<Stack className={'card-box'}>
						<Swiper
							className={'top-property-swiper'}
							slidesPerView={'auto'}
							centeredSlides={true}
							spaceBetween={15}
							modules={[Autoplay]}
						>
							{topProperties.map((property: Property) => {
								return (
									<SwiperSlide className={'top-property-slide'} key={property?._id}>
										<TopPropertyCard property={property} likePropertyHandler={likePropertyHandler} />
									</SwiperSlide>
								);
							})}
						</Swiper>
					</Stack>
				</Stack>
			</Stack>
		);
	} else {
		return (
			<>
				<Stack className={'search-body'}>
					<Box className={'title'}>Find Car For Every LifeStyle</Box>
					<Box className={'view-all'}>
						View All
						<NorthEastRoundedIcon className={'icon'} />
					</Box>
					<Stack className={'car-body'}>
						<Stack className={'body-box'}>
							<Box className={'body'}>
								<img src="/img/carBody/sedan.svg" alt="" />
							</Box>
							<Box className={'body'}>
								<img src="/img/carBody/coupe.svg" alt="" />
							</Box>
							<Box className={'body'}>
								<img src="/img/carBody/suv.svg" alt="" />
							</Box>
							<Box className={'body'}>
								<img src="/img/carBody/truck.svg" alt="" />
							</Box>
							<Box className={'body'}>
								<img src="/img/carBody/hatchback.svg" alt="" />
							</Box>
							<Box className={'body'}>
								<img src="/img/carBody/minivan.svg" alt="" />
							</Box>
						</Stack>
					</Stack>
					<Stack className={'name-box'}>
						<Box className={'body-name'}>
							<span className={'name'}>Sedan</span>
						</Box>
						<Box className={'body-name'}>
							<span className={'name'}>Coupe</span>
						</Box>
						<Box className={'body-name'}>
							<span className={'name'}>SUV</span>
						</Box>
						<Box className={'body-name'}>
							<span className={'name'}>Truck</span>
						</Box>
						<Box className={'body-name'}>
							<span className={'name'}>Hatchback</span>
						</Box>
						<Box className={'body-name'}>
							<span className={'name'}>Minivan</span>
						</Box>
					</Stack>
				</Stack>
				<Stack className={'agent-home-list'}>
					<Stack className={'card-wrap'}>
						{topProperties?.map((property: Property) => {
							return (
								<div className={'wrap-main'} key={property?._id}>
									<FindingCarCard property={property} key={property?._id} likePropertyHandler={likePropertyHandler} />
								</div>
							);
						})}
					</Stack>
					<Stack className={'pagination'}>
						{propertyTotal ? (
							<>
								<Stack className="pagination-box">
									<Pagination
										page={searchFilter.page}
										count={Math.ceil(propertyTotal / searchFilter.limit) || 1}
										onChange={propertyPaginationChangeHandler}
										shape="circular"
										color="secondary"
									/>
								</Stack>
								<span>
									Total {propertyTotal} propert{propertyTotal > 1 ? 'ies' : 'y'} available
								</span>
							</>
						) : (
							null
							// <div className={'no-data'}>
							// 	<img src="/img/icons/icoAlert.svg" alt="" />
							// 	<p>No properties found!</p>
							// </div>
						)}
					</Stack>
				</Stack>
			</>
		);
	}
};

TopProperties.defaultProps = {
	initialInput: {
		page: 1,
		limit: 8,
		sort: 'propertyRank',
		direction: 'DESC',
		search: {},
	},
};

export default TopProperties;
