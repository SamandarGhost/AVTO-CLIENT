import React from 'react';
import { Stack, Typography, Box, Button } from '@mui/material';
import useDeviceDetect from '../../hooks/useDeviceDetect';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import Link from 'next/link';
import { REACT_APP_API_URL, topCarRank } from '../../config';
import { useReactiveVar } from '@apollo/client';
import { userVar } from '../../../apollo/store';
import IconButton from '@mui/material/IconButton';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import { Car } from '../../types/car/car';
import { useRouter } from 'next/router';

interface CarCardType {
	car: Car;
	likeCarHandler?: any;
	saveCarHandler?: any;
	myFavorites?: boolean;
	mySaved?: boolean;
	recentlyVisited?: boolean;
}

const CarCard = (props: CarCardType) => {
	const { car, likeCarHandler, saveCarHandler, mySaved, myFavorites, recentlyVisited } = props;
	const device = useDeviceDetect();
	const user = useReactiveVar(userVar);
	const router = useRouter();
	const imagePath: string = car?.carImages?.[0]
		? `${REACT_APP_API_URL}/${car?.carImages?.[0]}`
		: '/img/banner/header1.svg';


	const pushDetailhandler = async (carId: string) => {
		console.log("carId:", carId);
		await router.push({ pathname: '/cars/detail', query: { id: carId } })
	};

	if (device === 'mobile') {
		return <div>CAR CARD</div>;
	} else {
		return (
			<Stack className="card-config">
				<Stack className="top">
					<Link
						href={{
							pathname: '/cars/detail',
							query: { id: car?._id },
						}}
					>
						<img src={imagePath} alt="" />
					</Link>
					{car && car?.carRank > topCarRank && (
						<Box component={'div'} className={'top-badge'}>
							<img src="/img/icons/electricity.svg" alt="" />
							<Typography>TOP</Typography>
						</Box>
					)}
				</Stack>
				<Stack className="bottom">
					<Stack className="name-address">
						<Stack className="name">
							<Link
								href={{
									pathname: '/cars/detail',
									query: { id: car?._id },
								}}
							>
								<Typography>{car?.carTitle}</Typography>
							</Link>
						</Stack>
						<Stack className="address">
							<Typography>
								{car?.carAddress}, {car?.carLocation}
							</Typography>
						</Stack>
					</Stack>
					<Stack className="options">
						<Stack className="option">
							<Box className={'box'}>
								<img src="/img/icons/speedb.svg" alt="" /> <Typography>Mileage</Typography>
							</Box>
							<Typography>{car?.carMileage} Mile</Typography>
						</Stack>
						<Stack className="option">
							<Box className={'box'}>
								<img src="/img/icons/petrolb.svg" alt="" /> <Typography>Petrol</Typography>
							</Box>
							<Typography>{car?.carFuelType}</Typography>
						</Stack>
						<Stack className="option">
							<Box className={'box'}>
								<img src="/img/icons/transb.svg" alt="" /> <Typography>Transmission</Typography>
							</Box>
							<Typography>{car?.carTransmission}</Typography>
						</Stack>
					</Stack>
					<Stack className="type-buttons">
						<Stack className="type">
							{car?.carRent === true && (<Box className={'feature'}>Rent</Box>)}
							{car?.carBarter === true && (<Box className={'feature'}>Barter</Box>)}
							{car?.carRemoteKeyless === true && (<Box className={'feature'}>Keyless Start</Box>)}
							{car?.carBluetoothConnectivity === true && (<Box className={'feature'}>Bluetooth</Box>)}
						</Stack>
					</Stack>
				</Stack>
				<div className={'divider'}></div>
				<Stack className={'second-box'}>
					{!recentlyVisited && (
						<Stack className="buttons">
							<IconButton color={'default'}>
								<RemoveRedEyeIcon />
							</IconButton>
							<Typography className="view-cnt">{car?.carViews}</Typography>
							<IconButton color={'default'} onClick={() => likeCarHandler(user, car?._id)}>
								{myFavorites ? (
									<FavoriteIcon color="primary" />
								) : car?.meLiked && car?.meLiked[0]?.myFavorite ? (
									<FavoriteIcon color="primary" />
								) : (
									<FavoriteBorderIcon />
								)}
							</IconButton>
							<Typography className="view-cnt">{car?.carLikes}</Typography>
						</Stack>
					)}
					<Box className={'save-box'}>
						<span>Save</span>
						<div onClick={() => saveCarHandler(user, car?._id)}>
							{mySaved ? (
								<BookmarkIcon color="secondary" />

							) : car?.meSaved && car?.meSaved?.[0]?.mySaved ? (

								<BookmarkIcon color="secondary" />

							) : (
								<BookmarkIcon />
							)}
						</div>
					</Box>
					<Typography className={'price'}>${car?.carPrice}</Typography>
					<Box className={'btn-box'}>
						<Button className={'button'} onClick={() => pushDetailhandler(car?._id)}>View Detail</Button>
					</Box>
				</Stack>
			</Stack>
		);
	}
};

export default CarCard;
