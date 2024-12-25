import React, { useState } from 'react';
import { NextPage } from 'next';
import useDeviceDetect from '../../hooks/useDeviceDetect';
import { Pagination, Stack, Typography } from '@mui/material';
import { T } from '../../types/common';
import { useMutation, useQuery } from '@apollo/client';
import { GET_LIKED } from '../../../apollo/user/query';
import { sweetMixinErrorAlert } from '../../sweetAlert';
import { Messages } from '../../config';
import { LIKE_CAR } from '../../../apollo/user/mutation';
import FindingCarCard from '../homepage/FindingCarCard';
import { Car } from '../../types/car/car';

const MyLiked: NextPage = () => {
	const device = useDeviceDetect();
	const [myLiked, setMyLiked] = useState<Car[]>([]);
	const [total, setTotal] = useState<number>(0);
	const [searchFavorites, setSearchFavorites] = useState<T>({ page: 1, limit: 6 });

	/** APOLLO REQUESTS **/
	const [likeTargetCar] = useMutation(LIKE_CAR);

	const {
		loading: getFavoritesLoading,
		data: getFavoritesData,
		error: getFavoritesError,
		refetch: getFavoritesRefetch,
	} = useQuery(GET_LIKED, {
		fetchPolicy: 'network-only',
		variables: { input: searchFavorites },
		notifyOnNetworkStatusChange: true,
		onCompleted: (data: T) => {
			setMyLiked(data?.getFavorites?.list);
			setTotal(data?.getFavorites?.metaCounter?.[0]?.total ?? 0);
		},
	});


	/** HANDLERS **/
	const likeCarHandler = async (user: T, id: string) => {
		try {
			if (!id) return;
			if (!user._id) throw new Error(Messages.error2);

			await likeTargetCar({
				variables: { input: id },
			});

			getFavoritesRefetch({ input: searchFavorites });
		} catch (err: any) {
			sweetMixinErrorAlert(err.message).then();
		}
	};


	const paginationHandler = (e: T, value: number) => {
		setSearchFavorites({ ...searchFavorites, page: value });
	};

	if (device === 'mobile') {
		return <div>WCAR MY LIKED MOBILE</div>;
	} else {
		return (
			<div id="my-favorites-page">
				<Stack className="main-title-box">
					<Stack className="right-box">
						<Typography className="main-title">My Favorites</Typography>
						<Typography className="sub-title">We are glad to see you again!</Typography>
					</Stack>
				</Stack>
				<Stack className="favorites-list-box">
					{myLiked?.length ? (
						myLiked?.map((car: Car) => {
							return <FindingCarCard likeCarHandler={likeCarHandler} car={car} />;
						})
					) : (
						<div className={'no-data'}>
							<img src="/img/icons/icoAlert.svg" alt="" />
							<p>No Liked found!</p>
						</div>
					)}
				</Stack>
				{myLiked?.length ? (
					<Stack className="pagination-config">
						<Stack className="pagination-box">
							<Pagination
								count={Math.ceil(total / searchFavorites.limit)}
								page={searchFavorites.page}
								shape="rounded"
								color="secondary"
								onChange={paginationHandler}
							/>
						</Stack>
						<Stack className="total-result">
							<Typography>
								Total {total} favorite car{total > 1 ? 's' : ''}
							</Typography>
						</Stack>
					</Stack>
				) : null}
			</div>
		);
	}
};

export default MyLiked;
