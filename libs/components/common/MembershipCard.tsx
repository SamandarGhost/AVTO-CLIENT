import React from 'react';
import useDeviceDetect from '../../hooks/useDeviceDetect';
import { Stack, Box, Typography } from '@mui/material';
import Link from 'next/link';
import { REACT_APP_API_URL } from '../../config';
import IconButton from '@mui/material/IconButton';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { useReactiveVar } from '@apollo/client';
import { userVar } from '../../../apollo/store';
import NorthEastOutlinedIcon from '@mui/icons-material/NorthEastOutlined';
import CheckOutlinedIcon from '@mui/icons-material/CheckOutlined';

const MembershipCard = () => {
	const device = useDeviceDetect();
	const user = useReactiveVar(userVar);
	if (device === 'mobile') {
		return <div>AGENT CARD</div>;
	} else {
		return (
			<Stack className="membership-general-card">
				<Stack className={'agent-month'}>
					<Box component={'div'} className={'agent-info'}>
						<strong>$49.9</strong>
					</Box>
					<Typography>/monthly</Typography>
				</Stack>

				<Stack className={'agent-plan'}>
					<Box component={'div'} className={'agent-info'}>
						<strong>Basic Plan</strong>
					</Box>
					<Typography >Nottingham Road, Alfreton, Derbyshire, DE55 4GR</Typography>
				</Stack>
				<Stack className={'agent-desc'}>
					<Box component={'div'} className={'agent-info'}>
						<Box className={'icon-box'}>
							<CheckOutlinedIcon className={'icon'} />
						</Box>
						<strong>KIA London Branch</strong>
					</Box>
					<Box component={'div'} className={'agent-info'}>
						<Box className={'icon-box'}>
							<CheckOutlinedIcon className={'icon'} />
						</Box>
						<strong>KIA London Branch</strong>
					</Box>
					<Box component={'div'} className={'agent-info'}>
						<Box className={'icon-box'}>
							<CheckOutlinedIcon className={'icon'} />
						</Box>
						<strong>KIA London Branch</strong>
					</Box>
					<Box component={'div'} className={'agent-info'}>
						<Box className={'icon-box'}>
							<CheckOutlinedIcon className={'icon'} />
						</Box>
						<strong>KIA London Branch</strong>
					</Box>
					<Box component={'div'} className={'agent-info'}>
						<Box className={'icon-box'}>
							<CheckOutlinedIcon className={'icon'} />
						</Box>
						<strong>KIA London Branch</strong>
					</Box>
					<Box component={'div'} className={'agent-info'}>
						<Box className={'icon-box'}>
							<CheckOutlinedIcon className={'icon'} />
						</Box>
						<strong>KIA London Branch</strong>
					</Box>
				</Stack>

				<Stack className={'button'}>
					<Box component={'div'} className={'agent-info'}>
						<Link
							href={{
								pathname: '/service/membership',
							}}
						>
							<strong className={'buy'}>Buy Now</strong>
							<NorthEastOutlinedIcon className={'btn-icon'} />
						</Link>
					</Box>
				</Stack>
			</Stack>
		);
	}
};

export default MembershipCard;
