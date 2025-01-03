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
import { GET_CARS } from '../../../apollo/user/query';
import { T } from '../../types/common';
import { Message } from '../../enums/common.enum';
import { sweetMixinErrorAlert } from '../../sweetAlert';
import NorthEastRoundedIcon from '@mui/icons-material/NorthEastRounded';
import FindingCarCard from './FindingCarCard';
import { LIKE_CAR } from '../../../apollo/user/mutation';
import { CarsInquiry } from '../../types/car/car.input';
import { Car } from '../../types/car/car';

interface FindingCars {
	initialInput: CarsInquiry;
}

const FindingCars = (props: FindingCars) => {
	const { initialInput } = props;
	const device = useDeviceDetect();
	const [topCars, setTopCars] = useState<Car[]>([]);
	const [carTotal, setCarTotal] = useState<number>(0);
	const [searchFilter, setSearchFilter] = useState<CarsInquiry>(initialInput);
	const carPaginationChangeHandler = async (event: ChangeEvent<unknown>, value: number) => {
		searchFilter.page = value;
		setSearchFilter({ ...searchFilter });
	};




	/** APOLLO REQUESTS **/
	const [likeTargetCar] = useMutation(LIKE_CAR);

	const {
		loading: getCarsLoading,
		data: getCarsData,
		error: getCarsError,
		refetch: getCarsRefetch
	} = useQuery(GET_CARS, {
		fetchPolicy: 'cache-and-network',
		variables: { input: initialInput },
		notifyOnNetworkStatusChange: true,
		onCompleted: (data: T) => {
			setTopCars(data?.getCars?.list);
		},
	});
	/** HANDLERS **/
	const likeCarHandler = async (user: T, id: string) => {
		try {
			if (!id) return;
			if (!user._id) throw new Error(Message.SOMETHING_WENT_WRONG);

			await likeTargetCar({
				variables: { input: id },
			});
			await getCarsRefetch({ input: initialInput });
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
							{topCars.map((car: Car) => {
								return (
									<SwiperSlide className={'top-property-slide'} key={car?._id}>
										<FindingCarCard car={car} likeCarHandler={likeCarHandler} />
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
						{topCars?.map((car: Car) => {
							return (
								<div className={'wrap-main'} key={car?._id}>
									<FindingCarCard car={car} key={car?._id} likeCarHandler={likeCarHandler} />
								</div>
							);
						})}
					</Stack>
					<Stack className={'pagination'}>
						{carTotal ? (
							<>
								<Stack className="pagination-box">
									<Pagination
										page={searchFilter.page}
										count={Math.ceil(carTotal / searchFilter.limit) || 1}
										onChange={carPaginationChangeHandler}
										shape="rounded"
										color="secondary"
									/>
								</Stack>
								<span>
									Total {carTotal} car{carTotal > 1 ? 's' : ''} available
								</span>
							</>
						) : (
							null
							// <div className={'no-data'}>
							// 	<img src="/img/icons/icoAlert.svg" alt="" />
							// 	<p>No cars found!</p>
							// </div>
						)}
					</Stack>
				</Stack>
			</>
		);
	}
};

FindingCars.defaultProps = {
	initialInput: {
		page: 1,
		limit: 8,
		sort: 'carRank',
		direction: 'DESC',
		search: {},
	},
};

export default FindingCars;
