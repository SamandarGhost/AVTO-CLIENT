import React, { useState } from 'react';
import { Stack, Box } from '@mui/material';
import useDeviceDetect from '../../hooks/useDeviceDetect';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation, Pagination } from 'swiper';
import TrendPropertyCard from './ReccomendedCarsCard';
import { useMutation, useQuery } from '@apollo/client';
import { GET_PROPERTIES } from '../../../apollo/user/query';
import { T } from '../../types/common';
import { LIKE_TARGET_PROPERTY } from '../../../apollo/user/mutation';
import { sweetMixinErrorAlert } from '../../sweetAlert';
import { Message } from '../../enums/common.enum';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import { CarsInquiry } from '../../types/car/car.input';
import { Car } from '../../types/car/car';

interface RecommendedCarsProps {
	initialInput: CarsInquiry;
}

const RecommendedCars = (props: RecommendedCarsProps) => {
	const { initialInput } = props;
	const device = useDeviceDetect();
	const [recomCars, setRecomCars] = useState<Car[]>([]);

	/** APOLLO REQUESTS **/
	const [likeTargetCar] = useMutation(LIKE_TARGET_PROPERTY);
	const {
		loading: getCarsLoading,
		data: getCarsData,
		error: getCarsError,
		refetch: getCarsRefetch
	} = useQuery(GET_PROPERTIES, {
		fetchPolicy: 'cache-and-network',
		variables: { input: initialInput },
		notifyOnNetworkStatusChange: true,
		onCompleted: (data: T) => {
			setRecomCars(data?.getCars?.list);
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
			sweetMixinErrorAlert(err.message).then();
		}
	}

	if (!recomCars) return null;

	if (device === 'mobile') {
		return (
			<Stack className={'trend-properties'}>
				<Stack className={'container'}>
					<Stack className={'info-box'}>
						<span>Recommended Cars</span>
					</Stack>
					<Stack className={'card-box'}>
						{recomCars?.length === 0 ? (
							<Box component={'div'} className={'empty-list'}>
								Recommmended Cars Empty
							</Box>
						) : (
							<Swiper
								className={'trend-property-swiper'}
								slidesPerView={'auto'}
								centeredSlides={true}
								spaceBetween={15}
								modules={[Autoplay]}
							>
								{recomCars?.map((car: Car) => {
									return (
										<SwiperSlide key={car._id} className={'trend-property-slide'}>
											<TrendPropertyCard car={car} likeCarHandler={likeCarHandler} />
										</SwiperSlide>
									);
								})}
							</Swiper>
						)}
					</Stack>
				</Stack>
			</Stack>
		);
	} else {
		return (
			<Stack className={'trend-properties'}>
				<Stack className={'container'}>
					<Stack className={'info-box'}>
						<Box component={'div'} className={'left'}>
							<span>Recommended Cars</span>
							<p>The best cars have been selected for you.</p>
						</Box>
						<Box component={'div'} className={'right'}>
							<div className={'pagination-box'}>
								<ArrowBackIosNewIcon className={'swiper-trend-prev'} />
								<div className={'swiper-trend-pagination'}></div>
								<ArrowForwardIosIcon className={'swiper-trend-next'} />
							</div>
						</Box>
					</Stack>
					<Stack className={'card-box'}>
						{recomCars?.length === 0 ? (
							<Box component={'div'} className={'empty-list'}>
								Recommmended Cars Empty
							</Box>
						) : (
							<Swiper
								className={'trend-property-swiper'}
								slidesPerView={'auto'}
								spaceBetween={10}
								modules={[Autoplay, Navigation, Pagination]}
								navigation={{
									nextEl: '.swiper-trend-next',
									prevEl: '.swiper-trend-prev',
								}}
								pagination={{
									el: '.swiper-trend-pagination',
								}}
							>
								{recomCars?.map((car: Car) => {
									return (
										<SwiperSlide key={car._id} className={'trend-property-slide'}>
											<TrendPropertyCard car={car} likeCarHandler={likeCarHandler} />
										</SwiperSlide>
									);
								})}
							</Swiper>
						)}
					</Stack>
				</Stack>
			</Stack>
		);
	}
};

RecommendedCars.defaultProps = {
	initialInput: {
		page: 1,
		limit: 8,
		sort: 'carLikes',
		direction: 'DESC',
		search: {},
	},
};

export default RecommendedCars;
