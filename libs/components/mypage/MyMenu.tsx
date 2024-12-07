import React from 'react';
import { useRouter } from 'next/router';
import { Stack, Typography, Box, List, ListItem } from '@mui/material';
import useDeviceDetect from '../../hooks/useDeviceDetect';
import Link from 'next/link';
import { useReactiveVar } from '@apollo/client';
import { userVar } from '../../../apollo/store';
import PortraitIcon from '@mui/icons-material/Portrait';
import IconButton from '@mui/material/IconButton';
import { REACT_APP_API_URL } from '../../config';
import { logOut } from '../../auth';
import { sweetConfirmAlert, sweetMixinErrorAlert } from '../../sweetAlert';
import PhoneOutlinedIcon from '@mui/icons-material/PhoneOutlined';
import AddHomeOutlinedIcon from '@mui/icons-material/AddHomeOutlined';
import PersonAddAlt1OutlinedIcon from '@mui/icons-material/PersonAddAlt1Outlined';
import GroupAddOutlinedIcon from '@mui/icons-material/GroupAddOutlined';

const MyMenu = () => {
	const device = useDeviceDetect();
	const router = useRouter();
	const pathname = router.query.category ?? 'myProfile';
	const category: any = router.query?.category ?? 'myProfile';
	const user = useReactiveVar(userVar);

	/** HANDLERS **/
	const logoutHandler = async () => {
		try {
			if (await sweetConfirmAlert('Do you want to logout?')) logOut();
		} catch (err: any) {
			console.log('ERROR, logoutHandler:', err.message);
		}
	};

	if (device === 'mobile') {
		return <div>MY MENU</div>;
	} else {
		return (
			<Stack width={'100%'} padding={'30px 24px'}>
				<Stack className={'profile'}>
					<Box component={'div'} className={'profile-img'}>
						<img
							src={user?.memberImage ? `${REACT_APP_API_URL}/${user?.memberImage}` : '/img/profile/defaultUser.svg'}
							alt={'member-photo'}
						/>
					</Box>
					<Stack className={'user-info'}>
						<Typography className={'user-name'}>{user?.memberNick}</Typography>
						<Box component={'div'} className={'user-phone'}>
							<PhoneOutlinedIcon className={'call'} />
							<Typography className={'p-number'}>{user?.memberPhone}</Typography>
						</Box>
						{user?.memberType === 'ADMIN' ? (
							<a href="/_admin/users" target={'_blank'}>
								<Typography className={'view-list'}>{user?.memberType}</Typography>
							</a>
						) : (
							<Typography className={'view-list'}>{user?.memberType}</Typography>
						)}
					</Stack>
				</Stack>
				<Stack className={'sections'}>
					<Stack className={'section'} style={{ height: user.memberType === 'AGENT' ? '228px' : '153px' }}>
						<List className={'sub-section'}>
							{user.memberType === 'AGENT' && (
								<>
									<ListItem className={pathname === 'addProperty' ? 'focus' : ''}>
										<Link
											href={{
												pathname: '/mypage',
												query: { category: 'addProperty' },
											}}
											scroll={false}
										>
											<div className={'flex-box'}>
												<img className={'com-icon'} src={'/img/icons/addCar.svg'} alt={'com-icon'} />
												<Typography className={'sub-title'} variant={'subtitle1'} component={'p'}>
													Add Car
												</Typography>
												<IconButton aria-label="delete" sx={{ ml: '40px' }}>
													<PortraitIcon style={{ color: 'red' }} />
												</IconButton>
											</div>
										</Link>
									</ListItem>
									<ListItem className={pathname === 'myProperties' ? 'focus' : ''}>
										<Link
											href={{
												pathname: '/mypage',
												query: { category: 'myProperties' },
											}}
											scroll={false}
										>
											<div className={'flex-box'}>
												<img className={'com-icon'} src={'/img/icons/myCar.svg'} alt={'com-icon'} />
												<Typography className={'sub-title'} variant={'subtitle1'} component={'p'}>
													My Cars
												</Typography>
												<IconButton aria-label="delete" sx={{ ml: '36px' }}>
													<PortraitIcon style={{ color: 'red' }} />
												</IconButton>
											</div>
										</Link>
									</ListItem>
								</>
							)}
							<ListItem className={pathname === 'mySaved' ? 'focus' : ''}>
								<Link
									href={{
										pathname: '/mypage',
										query: { category: 'mySaved' },
									}}
									scroll={false}
								>
									<div className={'flex-box'}>
										<img className={'com-icon'} src={'/img/icons/savedCar.svg'} alt={'com-icon'} />
										<Typography className={'sub-title'} variant={'subtitle1'} component={'p'}>
											Saved
										</Typography>
									</div>
								</Link>
							</ListItem>
							<ListItem className={pathname === 'myFavorites' ? 'focus' : ''}>
								<Link
									href={{
										pathname: '/mypage',
										query: { category: 'myFavorites' },
									}}
									scroll={false}
								>
									<div className={'flex-box'}>
										<img className={'com-icon'} src={'/img/icons/likeWhite.svg'} alt={'com-icon'} />
										<Typography className={'sub-title'} variant={'subtitle1'} component={'p'}>
											Liked
										</Typography>
									</div>
								</Link>
							</ListItem>
							<ListItem className={pathname === 'recentlyVisited' ? 'focus' : ''}>
								<Link
									href={{
										pathname: '/mypage',
										query: { category: 'recentlyVisited' },
									}}
									scroll={false}
								>
									<div className={'flex-box'}>
										<img className={'com-icon'} src={'/img/icons/searchWhite.svg'} alt={'com-icon'} />
										<Typography className={'sub-title'} variant={'subtitle1'} component={'p'}>
											Visited
										</Typography>
									</div>
								</Link>
							</ListItem>
							<ListItem className={pathname === 'followers' ? 'focus' : ''}>
								<Link
									href={{
										pathname: '/mypage',
										query: { category: 'followers' },
									}}
									scroll={false}
								>
									<div className={'flex-box'}>
										<PersonAddAlt1OutlinedIcon className={'icon'} />
										<Typography className={'sub-title'} variant={'subtitle1'} component={'p'}>
											Followers
										</Typography>
									</div>
								</Link>
							</ListItem>
							<ListItem className={pathname === 'followings' ? 'focus' : ''}>
								<Link
									href={{
										pathname: '/mypage',
										query: { category: 'followings' },
									}}
									scroll={false}
								>
									<div className={'flex-box'}>
										<GroupAddOutlinedIcon className={'icon'} />
										<Typography className={'sub-title'} variant={'subtitle1'} component={'p'}>
											Followings
										</Typography>
									</div>
								</Link>
							</ListItem>
						</List>
					</Stack>
					<Stack className={'section'} sx={{ marginTop: '10px' }}>
						<div>
							<List className={'sub-section'}>
								<ListItem className={pathname === 'myArticles' ? 'focus' : ''}>
									<Link
										href={{
											pathname: '/mypage',
											query: { category: 'myArticles' },
										}}
										scroll={false}
									>
										<div className={'flex-box'}>
											<img className={'com-icon'} src={'/img/icons/discoveryWhite.svg'} alt={'com-icon'} />
											<Typography className={'sub-title'} variant={'subtitle1'} component={'p'}>
												Articles
											</Typography>
										</div>
									</Link>
								</ListItem>
								<ListItem className={pathname === 'writeArticle' ? 'focus' : ''}>
									<Link
										href={{
											pathname: '/mypage',
											query: { category: 'writeArticle' },
										}}
										scroll={false}
									>
										<div className={'flex-box'}>
											<img className={'com-icon'} src={'/img/icons/whiteTab.svg'} alt={'com-icon'} />
											<Typography className={'sub-title'} variant={'subtitle1'} component={'p'}>
												Write Article
											</Typography>
										</div>
									</Link>
								</ListItem>
							</List>
						</div>
					</Stack>
					<Stack className={'section'} sx={{ marginTop: '30px' }}>
						<List className={'sub-section'}>
							<ListItem className={pathname === 'myProfile' ? 'focus' : ''}>
								<Link
									href={{
										pathname: '/mypage',
										query: { category: 'myProfile' },
									}}
									scroll={false}
								>
									<div className={'flex-box'}>
										<img className={'com-icon'} src={'/img/icons/profile.svg'} alt={'com-icon'} />
										<Typography className={'sub-title'} variant={'subtitle1'} component={'p'}>
											Profile
										</Typography>
									</div>
								</Link>
							</ListItem>
							<ListItem className={pathname === 'dealer' ? 'focus' : ''}>
								<Link
									href={{
										pathname: '/mypage',
										query: { category: 'dealer' },
									}}
									scroll={false}
								>
									<div className={'flex-box'}>
										<img className={'com-icon'} src={'/img/icons/profile.svg'} alt={'com-icon'} />
										<Typography className={'sub-title'} variant={'subtitle1'} component={'p'}>
											Dealer Info
										</Typography>
									</div>
								</Link>
							</ListItem>
							<ListItem className={pathname === 'service' ? 'focus' : ''}>
								<Link
									href={{
										pathname: '/mypage',
										query: { category: 'service' },
									}}
									scroll={false}
								>
									<div className={'flex-box'}>
										<img className={'com-icon'} src={'/img/icons/profile.svg'} alt={'com-icon'} />
										<Typography className={'sub-title'} variant={'subtitle1'} component={'p'}>
											Service Info
										</Typography>
									</div>
								</Link>
							</ListItem>
							<ListItem onClick={logoutHandler}>
								<div className={'flex-box'}>
									<img className={'com-icon'} src={'/img/icons/userLogout.svg'} alt={'com-icon'} />
									<Typography className={'sub-title'} variant={'subtitle1'} component={'p'}>
										Logout
									</Typography>
								</div>
							</ListItem>
						</List>
					</Stack>
				</Stack>
			</Stack>
		);
	}
};

export default MyMenu;
