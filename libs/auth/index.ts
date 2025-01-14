import decodeJWT from 'jwt-decode';
import { initializeApollo } from '../../apollo/client';
import { sweetMixinErrorAlert } from '../sweetAlert';
import { CustomJwtPayload } from '../types/customJwtPayload';
import { userVar } from '../../apollo/store';
import { LOGIN, SIGN_UP } from '../../apollo/user/mutation';

export function getJwtToken(): any {
	if (typeof window !== 'undefined') {
		return localStorage.getItem('accessToken') ?? '';
	}
}

export function setJwtToken(token: string) {
	localStorage.setItem('accessToken', token);
}

export const logIn = async (nick: string, password: string): Promise<void> => {
	try {
		const { jwtToken } = await requestJwtToken({ nick, password });

		if (jwtToken) {
			updateStorage({ jwtToken });
			updateUserInfo(jwtToken);
		}
	} catch (err) {
		logOut();
	}
};

const requestJwtToken = async ({
	nick,
	password,
}: {
	nick: string;
	password: string;
}): Promise<{ jwtToken: string }> => {
	const apolloClient = await initializeApollo();

	try {
		const result = await apolloClient.mutate({
			mutation: LOGIN,
			variables: { input: { titleNick: nick, password: password } },
			fetchPolicy: 'network-only',
		});

		const { accessToken } = result?.data?.login;

		return { jwtToken: accessToken };
	} catch (err: any) {
		switch (err.graphQLErrors[0].message) {
			case 'Definer: login and password do not match':
				await sweetMixinErrorAlert('Please check your password again');
				break;
			case 'Definer: user has been blocked!':
				await sweetMixinErrorAlert('User has been blocked!');
				break;
		}
		throw new Error('token error');
	}
};

export const signUp = async (nick: string, password: string, phone: string, type: string): Promise<void> => {
	try {
		const { jwtToken } = await requestSignUpJwtToken({ nick, password, phone, type });

		if (jwtToken) {
			updateStorage({ jwtToken });
			updateUserInfo(jwtToken);
		}
	} catch (err) {
		logOut();
	}
};

const requestSignUpJwtToken = async ({
	nick,
	password,
	phone,
	type,
}: {
	nick: string;
	password: string;
	phone: string;
	type: string;
}): Promise<{ jwtToken: string }> => {
	const apolloClient = await initializeApollo();

	try {
		const result = await apolloClient.mutate({
			mutation: SIGN_UP,
			variables: {
				input: { titleNick: nick, password: password, phone: phone, type: type },
			},
			fetchPolicy: 'network-only',
		});

		const { accessToken } = result?.data?.signup;

		return { jwtToken: accessToken };
	} catch (err: any) {
		switch (err.graphQLErrors[0].message) {
			case 'Definer: login and password do not match':
				await sweetMixinErrorAlert('Please check your password again');
				break;
			case 'Definer: user has been blocked!':
				await sweetMixinErrorAlert('User has been blocked!');
				break;
		}
		throw new Error('token error');
	}
};

export const updateStorage = ({ jwtToken }: { jwtToken: any }) => {
	setJwtToken(jwtToken);
	window.localStorage.setItem('login', Date.now().toString());
};

export const updateUserInfo = (jwtToken: any) => {
	if (!jwtToken) return false;

	const claims = decodeJWT<CustomJwtPayload>(jwtToken);
	userVar({
		_id: claims._id ?? '',
		type: claims.type ?? '',
		status: claims.status ?? '',
		authType: claims.authType ?? '',
		titleNick: claims.titleNick ?? '',
		// password: claims.password ?? '',
		fullName: claims.fullName ?? '',
		image: claims.image === null || claims.image === undefined
			? '/img/profile/defaultUser.svg'
			: `${claims.image}`,
		viewImage: claims.viewImage === null || claims.viewImage === undefined
			? '/img/profile/defaultUser.svg'
			: `${claims.viewImage}`,
		address: claims.address ?? '',
		shortDesc: claims.shortDesc ?? '',
		longDesc: claims.longDesc ?? '',
		phone: claims.phone ?? '',
		phone2: claims.phone2 ?? '',
		email: claims.email ?? '',
		kakaoTalk: claims.kakaoTalk ?? '',
		youtube: claims.youtube ?? '',
		instagram: claims.instagram ?? '',
		facebook: claims.facebook ?? '',
		tikTok: claims.tikTok ?? '',
		naverBlog: claims.naverBlog ?? '',
		xcom: claims.xcom ?? '',
		followers: claims.followers ?? 0,
		followings: claims.followings ?? 0,
		likes: claims.likes ?? 0,
		views: claims.views ?? 0,
		comments: claims.comments ?? 0,
		warnings: claims.warnings ?? 0,
		articles: claims.articles ?? 0,
		blocks: claims.blocks ?? 0,
		memberCars: claims.memberCars ?? 0,
		usedCars: claims.usedCars ?? 0,
		newCars: claims.newCars ?? 0,
		rank: claims.rank ?? 0,
		points: claims.points ?? 0,
		sellerProducts: claims.sellerProducts ?? 0,
		dealerFinancing: claims.dealerFinancing ?? false,
		dealerCarService: claims.dealerCarService ?? false,
		dealerTradeIn: claims.dealerTradeIn ?? false,
		dealerCustomization: claims.dealerCustomization ?? false,
		dealerWarranties: claims.dealerWarranties ?? false,
		dealerParts: claims.dealerParts ?? false,
		dealerAccessories: claims.dealerAccessories ?? false,
		dealerCarDetailing: claims.dealerCarDetailing ?? false,
		dealerCarWash: claims.dealerCarWash ?? false,
		dealerCarTestDrive: claims.dealerCarTestDrive ?? false,
		dealerCarDelivery: claims.dealerCarDelivery ?? false,
		carOilChange: claims.carOilChange ?? false,
		carAlignment: claims.carAlignment ?? false,
		carTireChange: claims.carTireChange ?? false,
		carBrakeCheck: claims.carBrakeCheck ?? false,
		carBatteryCheck: claims.carBatteryCheck ?? false,
		carTireBalance: claims.carTireBalance ?? false,
		carSuspension: claims.carSuspension ?? false,
		carAirCondition: claims.carAirCondition ?? false,
		carTransmissionCheck: claims.carTransmissionCheck ?? false,
		carEngineDiagnostic: claims.carEngineDiagnostic ?? false,
		carExhaust: claims.carExhaust ?? false,
		carDetailing: claims.carDetailing ?? false,
		carWindshield: claims.carWindshield ?? false,
		carTimingBelt: claims.carTimingBelt ?? false,
		carChainReplacement: claims.carChainReplacement ?? false,
		comfort: claims.comfort ?? 0,
		performance: claims.performance ?? 0,
		exterior: claims.exterior ?? 0,
		interior: claims.interior ?? 0,
		reliability: claims.reliability ?? 0,
		fast: claims.fast ?? 0,
		openAt: claims.openAt ?? '',
		closeAt: claims.closeAt ?? '',
		openSunday: claims.openSunday ?? '',
		closeSunday: claims.closeSunday ?? '',
		openSaturday: claims.openSaturday ?? '',
		closeSaturday: claims.closeSaturday ?? '',
		publicHolidays: claims.publicHolidays ?? false,
	});
};

export const logOut = () => {
	deleteStorage();
	deleteUserInfo();
	window.location.reload();
};

const deleteStorage = () => {
	localStorage.removeItem('accessToken');
	window.localStorage.setItem('logout', Date.now().toString());
};

const deleteUserInfo = () => {
	userVar({
		_id: '',
		type: '',
		status: '',
		authType: '',
		titleNick: '',
		password: '',
		fullName: '',
		image: '',
		viewImage: '',
		address: '',
		shortDesc: '',
		longDesc: '',
		phone: '',
		phone2: '',
		email: '',
		kakaoTalk: '',
		youtube: '',
		instagram: '',
		facebook: '',
		tikTok: '',
		naverBlog: '',
		xcom: '',
		followers: 0,
		followings: 0,
		likes: 0,
		views: 0,
		comments: 0,
		warnings: 0,
		articles: 0,
		blocks: 0,
		memberCars: 0,
		usedCars: 0,
		newCars: 0,
		rank: 0,
		points: 0,
		sellerProducts: 0,
		dealerFinancing: false,
		dealerCarService: false,
		dealerTradeIn: false,
		dealerCustomization: false,
		dealerWarranties: false,
		dealerParts: false,
		dealerAccessories: false,
		dealerCarDetailing: false,
		dealerCarWash: false,
		dealerCarTestDrive: false,
		dealerCarDelivery: false,
		carOilChange: false,
		carAlignment: false,
		carTireChange: false,
		carBrakeCheck: false,
		carBatteryCheck: false,
		carTireBalance: false,
		carSuspension: false,
		carAirCondition: false,
		carTransmissionCheck: false,
		carEngineDiagnostic: false,
		carExhaust: false,
		carDetailing: false,
		carWindshield: false,
		carTimingBelt: false,
		carChainReplacement: false,
		comfort: 0,
		performance: 0,
		exterior: 0,
		interior: 0,
		reliability: 0,
		fast: 0,
		openAt: '',
		closeAt: '',
		openSunday: '',
		closeSunday: '',
		openSaturday: '',
		closeSaturday: '',
		publicHolidays: false,
	});
};