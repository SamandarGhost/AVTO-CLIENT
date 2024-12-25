import React from 'react';
import { Stack, Box, Divider, Typography } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import useDeviceDetect from '../../hooks/useDeviceDetect';
import FavoriteIcon from '@mui/icons-material/Favorite';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import { REACT_APP_API_URL } from '../../config';
import { useRouter } from 'next/router';
import { useReactiveVar } from '@apollo/client';
import { userVar } from '../../../apollo/store';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import { Car } from '../../types/car/car';

interface TopPropertyCardProps {
	car: Car;
	likeCarHandler: any;
}

const FindingCarCard = (props: TopPropertyCardProps) => {
	const { car, likeCarHandler } = props;
	const device = useDeviceDetect();
	const router = useRouter();
	const user = useReactiveVar(userVar);

	/** HANDLERS **/
	const pushDetailhandler = async (carId: string) => {
		await router.push({ pathname: '/cars/detail', query: { id: carId } })
	};

	if (device === 'mobile') {
		return (
			<Stack className="top-card-box">
				<Box
					component={'div'}
					className={'card-img'}
					style={{ backgroundImage: `url(${REACT_APP_API_URL}/${car?.carImages?.[0]})` }}
					onClick={() => {
						pushDetailhandler(car?._id);
					}}
				>
					<div>
						<BookmarkIcon />
					</div>
				</Box>
				<Box component={'div'} className={'info'}>
					<strong className={'title'}
						onClick={() => {
							pushDetailhandler(car?._id);
						}}>{car?.carTitle}</strong>
					<p className={'desc'}>{car?.carAddress}</p>
					<div className={'options'}>
						<div>
							<img src="/img/icons/bed.svg" alt="" />
							<span>{car?.carFuelType} bed</span>
						</div>
						<div>
							<img src="/img/icons/room.svg" alt="" />
							<span>{car?.carMileage} rooms</span>
						</div>
						<div>
							<img src="/img/icons/expand.svg" alt="" />
							<span>{car?.carTransmission} m2</span>
						</div>
					</div>
					<Divider sx={{ mt: '15px', mb: '17px' }} />
					<div className={'bott'}>
						<p>
							{' '}
							{car?.carRent ? 'Rent' : ''} {car?.carRent && car.carBarter && '/'}{' '}
							{car?.carBarter ? 'Barter' : ''}
						</p>
						<div className="view-like-box">
							<IconButton color={'default'}>
								<RemoveRedEyeIcon />
							</IconButton>
							<Typography className="view-cnt">{car?.carViews}</Typography>
							<IconButton color={'default'} onClick={() => likeCarHandler(user, car?._id)} >
								{car?.meLiked && car?.meLiked[0]?.myFavorite ? (
									<FavoriteIcon style={{ color: 'red' }} />
								) : (
									<FavoriteIcon />
								)}
							</IconButton>
							<Typography className="view-cnt">{car?.carLikes}</Typography>
						</div>
					</div>
				</Box>
			</Stack>
		);
	} else {
		return (
			<Stack className="find-card-box">
				<Box
					component={'div'}
					className={'card-img'}
					style={{ backgroundImage: `url(${REACT_APP_API_URL}/${car?.carImages?.[0]})` }}
					onClick={() => {
						pushDetailhandler(car?._id);
					}}
				>
					<div>
						<BookmarkIcon style={{ color: 'white' }} />
					</div>
				</Box>
				<Box component={'div'} className={'info'}>
					<strong className={'title'}
						onClick={() => {
							pushDetailhandler(car?._id);
						}}>{car?.carTitle}Merc</strong>
					<p className={'desc'}>{car?.carAddress}Seoul, Iteawon</p>
					<Divider sx={{ mt: '2px', mb: '2px' }} />
					<div className={'options'}>
						<div>
							<img src="/img/icons/speed.svg" alt="" />
							<span>{car?.carMileage}100,000 Mile </span>
						</div>
						<div>
							<img src="/img/icons/petrol.svg" alt="" />
							<span>{car?.carFuelType}Gasoline</span>
						</div>
						<div>
							<img src="/img/icons/trans.svg" alt="" />
							<span>{car?.carTransmission}Automatic</span>
						</div>
					</div>
					<Divider sx={{ mt: '5px', mb: '5px' }} />
					<div className={'bott'}>
						<p>
							{car?.carPrice}
							$ 90,000
						</p>
						<div className="view-like-box">
							<IconButton color={'default'}>
								<RemoveRedEyeIcon style={{ color: 'white' }} />
							</IconButton>
							<Typography className="view-cnt">{car?.carViews}</Typography>
							<IconButton color={'default'} onClick={() => likeCarHandler(user, car?._id)}>
								{car?.meLiked && car?.meLiked[0]?.myFavorite ? (
									<FavoriteIcon style={{ color: 'red' }} />
								) : (
									<FavoriteIcon style={{ color: 'white' }} />
								)}
							</IconButton>
							<Typography className="view-cnt">{car?.carLikes}</Typography>
						</div>
					</div>
				</Box>
			</Stack>
		);
	}
};

export default FindingCarCard;
