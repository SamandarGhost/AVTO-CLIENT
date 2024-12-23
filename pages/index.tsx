import { NextPage } from 'next';
import useDeviceDetect from '../libs/hooks/useDeviceDetect';
import withLayoutMain from '../libs/components/layout/LayoutHome';
import PopularProperties from '../libs/components/homepage/PopularProperties';
import TopAgents from '../libs/components/homepage/TopAgents';
import Events from '../libs/components/homepage/Events';
import TopProperties from '../libs/components/homepage/FindingCars';
import { Stack } from '@mui/material';
import Advertisement from '../libs/components/homepage/Advertisement';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import GetStarted from '../libs/components/homepage/GetStarted';
import SellCars from '../libs/components/homepage/SellCars';
import Feedback from '../libs/components/homepage/Feedback';
import SendMessage from '../libs/components/homepage/SendMessage';
import RecommendedCars from '../libs/components/homepage/RecommendedCars';

export const getStaticProps = async ({ locale }: any) => ({
	props: {
		...(await serverSideTranslations(locale, ['common'])),
	},
});

const Home: NextPage = () => {
	const device = useDeviceDetect();

	if (device === 'mobile') {
		return (
			<Stack className={'home-page'}>
			</Stack>
		);
	} else {
		return (
			<Stack className={'home-page'}>
				<RecommendedCars />
				<TopProperties />
				<SellCars />
				<Advertisement />
				<GetStarted />
				<PopularProperties />
				<TopAgents />
				<Feedback />
				<Events />
			</Stack>
		);
	}
};

export default withLayoutMain(Home);
