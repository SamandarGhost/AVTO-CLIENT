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

interface AgentCardProps {
	service: any;
	likeMemberHandler: any;
}

const ServiceCard = (props: AgentCardProps) => {
	const { service, likeMemberHandler } = props;
	const device = useDeviceDetect();
	const user = useReactiveVar(userVar);
	const imagePath: string = service?.memberImage
		? `${REACT_APP_API_URL}/${service?.memberImage}`
		: '/img/profile/defaultUser.svg';

	if (device === 'mobile') {
		return <div>AGENT CARD</div>;
	} else {
		return (
			<Stack className="dealer-general-card">
				<Link
					href={{
						pathname: '/service/detail',
						query: { serviceId: service?._id },
					}}
				>
					<img src="/img/icons/kiad.svg" className={'agent-img'} alt="" />
				</Link>
				<Stack className={'agent-desc'}>
					<Box component={'div'} className={'agent-info'}>
						<strong>{service?.titleNick}</strong>
					</Box>
					<Typography className="view-cnt">{service?.address}</Typography>
				</Stack>

				<Stack className={'button'}>
					<Box component={'div'} className={'agent-info'}>
						<Link
							href={{
								pathname: '/service/detail',
								query: { serviceId: 'id' },
							}}
						>
							<strong>See More About</strong>
							<NorthEastOutlinedIcon className={'icon'} />
						</Link>
					</Box>
				</Stack>
			</Stack>
		);
	}
};

export default ServiceCard;
