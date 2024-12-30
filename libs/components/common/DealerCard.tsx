import React from 'react';
import useDeviceDetect from '../../hooks/useDeviceDetect';
import { Stack, Box, Typography } from '@mui/material';
import Link from 'next/link';
import { REACT_APP_API_URL } from '../../config';
import { useReactiveVar } from '@apollo/client';
import { userVar } from '../../../apollo/store';
import NorthEastOutlinedIcon from '@mui/icons-material/NorthEastOutlined';

interface DealerCardProps {
	dealer: any;
	likeMemberHandler: any;
}

const DealerCard = (props: DealerCardProps) => {
	const { dealer, likeMemberHandler } = props;
	const device = useDeviceDetect();
	const user = useReactiveVar(userVar);
	const imagePath: string = dealer?.image
		? `${REACT_APP_API_URL}/${dealer?.image}`
		: '/img/profile/defaultUser.svg';

	if (device === 'mobile') {
		return <div>DEALER CARD</div>;
	} else {
		return (
			<Stack className="dealer-general-card">
				<Link
					href={{
						pathname: '/dealers/detail',
						query: { dealerId: dealer?._id },
					}}
				>
					<img src="/img/icons/kiad.svg" className={'agent-img'} alt="" />
				</Link>
				<Stack className={'agent-desc'}>
					<Box component={'div'} className={'agent-info'}>
						<strong>{dealer?.titleNick}</strong>
					</Box>
					<Typography className="view-cnt">{dealer?.address}</Typography>
				</Stack>

				<Stack className={'button'}>
					<Box component={'div'} className={'agent-info'}>
						<Link
							href={{
								pathname: '/dealers/detail',
								query: { dealerId: dealer?._id },
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

export default DealerCard;
