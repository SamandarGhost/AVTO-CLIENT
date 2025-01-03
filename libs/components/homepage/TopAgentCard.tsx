import React from 'react';
import { useRouter } from 'next/router';
import { Stack } from '@mui/material';
import useDeviceDetect from '../../hooks/useDeviceDetect';
import { Member } from '../../types/member/member';

interface TopAgentProps {
	agent: Member;
}
const TopAgentCard = (props: TopAgentProps) => {
	const { agent } = props;
	const device = useDeviceDetect();
	const router = useRouter();
	const agentImage = agent?.image
		? `${process.env.REACT_APP_API_URL}/${agent?.image}`
		: '/img/profile/defaultUser.svg';

	/** HANDLERS **/

	if (device === 'mobile') {
		return (
			<Stack className="top-agent-card">
				<img src={agentImage} alt="" />

				<strong>{agent?.titleNick}</strong>
				<span>{agent?.type}</span>
			</Stack>
		);
	} else {
		return (
			<Stack className="top-agent-card">
				<div>
					<div className={'email'}>{agent.email}</div>
					<div className={'phone'}>{agent.phone}</div>
					<img src={agentImage} alt="" />
				</div>

				<strong>{agent?.titleNick}</strong>
				<span>{agent?.type}</span>
			</Stack>
		);
	}
};

export default TopAgentCard;
