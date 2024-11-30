import React from 'react';
import { Stack, Typography, Box, Divider, Button } from '@mui/material';
import useDeviceDetect from '../../hooks/useDeviceDetect';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { Property } from '../../types/property/property';
import Link from 'next/link';
import { formatterStr } from '../../utils';
import { REACT_APP_API_URL, topPropertyRank } from '../../config';
import { useReactiveVar } from '@apollo/client';
import { userVar } from '../../../apollo/store';
import IconButton from '@mui/material/IconButton';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import SpeedIcon from '@mui/icons-material/Speed';
import LocalGasStationIcon from '@mui/icons-material/LocalGasStation';
import BookmarkIcon from '@mui/icons-material/Bookmark';

interface PropertyCardType {
	property: Property;
	likePropertyHandler?: any;
	myFavorites?: boolean;
	recentlyVisited?: boolean;
}

const PropertyCard = (props: PropertyCardType) => {
	const { property, likePropertyHandler, myFavorites, recentlyVisited } = props;
	const device = useDeviceDetect();
	const user = useReactiveVar(userVar);
	const imagePath: string = property?.propertyImages[0]
		? `${REACT_APP_API_URL}/${property?.propertyImages[0]}`
		: '/img/banner/header1.svg';

	if (device === 'mobile') {
		return <div>PROPERTY CARD</div>;
	} else {
		return (
			<Stack className="card-config">
				<Stack className="top">
					<Link
						href={{
							pathname: '/cars/detail',
							query: { id: property?._id },
						}}
					>
						<img src={imagePath} alt="" />
					</Link>
					{property && property?.propertyRank > topPropertyRank && (
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
									pathname: '/property/detail',
									query: { id: property?._id },
								}}
							>
								<Typography>Mercedes Benz AMG GTR</Typography>
							</Link>
						</Stack>
						<Stack className="address">
							<Typography>
								{property.propertyAddress}, {property.propertyLocation}
							</Typography>
						</Stack>
					</Stack>
					<Stack className="options">
						<Stack className="option">
							<Box className={'box'}>
								<img src="/img/icons/speedb.svg" alt="" /> <Typography>Mileage</Typography>
							</Box>
							<Typography>123,500 Mile</Typography>
						</Stack>
						<Stack className="option">
							<Box className={'box'}>
								<img src="/img/icons/petrolb.svg" alt="" /> <Typography>Petrol</Typography>
							</Box>
							<Typography>GASOLINE</Typography>
						</Stack>
						<Stack className="option">
							<Box className={'box'}>
								<img src="/img/icons/transb.svg" alt="" /> <Typography>Transmission</Typography>
							</Box>
							<Typography>AUTOMATIC</Typography>
						</Stack>
					</Stack>
					<Stack className="type-buttons">
						<Stack className="type">
							<Box className={'feature'}>Rent</Box>
							<Box className={'feature'}>Barter</Box>
							<Box className={'feature'}>Keyless Start</Box>
							<Box className={'feature'}>Bluetooth</Box>
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
							<Typography className="view-cnt">{property?.propertyViews}</Typography>
							<IconButton color={'default'} onClick={() => likePropertyHandler(user, property?._id)}>
								{myFavorites ? (
									<FavoriteIcon color="primary" />
								) : property?.meLiked && property?.meLiked[0]?.myFavorite ? (
									<FavoriteIcon color="primary" />
								) : (
									<FavoriteBorderIcon />
								)}
							</IconButton>
							<Typography className="view-cnt">{property?.propertyLikes}</Typography>
						</Stack>
					)}
					<Box className={'save-box'}>
						<span>Save</span>
						<div>
							<BookmarkIcon />
						</div>
					</Box>
					<Typography className={'price'}>$1,000,000</Typography>
					<Box className={'btn-box'}>
						<Button className={'button'}>View Detail</Button>
					</Box>
				</Stack>
			</Stack>
		);
	}
};

export default PropertyCard;
