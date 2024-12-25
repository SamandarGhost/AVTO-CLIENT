import React, { useState } from 'react';
import { NextPage } from 'next';
import { Pagination, Stack, Typography } from '@mui/material';
import useDeviceDetect from '../../hooks/useDeviceDetect';
import { CarCard } from './CarCard';
import { useMutation, useQuery, useReactiveVar } from '@apollo/client';
import { T } from '../../types/common';
import { userVar } from '../../../apollo/store';
import { useRouter } from 'next/router';
import { sweetConfirmAlert, sweetErrorHandling } from '../../sweetAlert';
import { GET_ADCARS } from '../../../apollo/user/query';
import { UPDATE_CAR } from '../../../apollo/user/mutation';
import { Car } from '../../types/car/car';
import { AgentCarsInquiry } from '../../types/car/car.input';
import { CarStatus } from '../../enums/car.enum';

const MyCars: NextPage = ({ initialInput, ...props }: any) => {
	const device = useDeviceDetect();
	const [searchFilter, setSearchFilter] = useState<AgentCarsInquiry>(initialInput);
	const [cars, setCars] = useState<Car[]>([]);
	const [total, setTotal] = useState<number>(0);
	const user = useReactiveVar(userVar);
	const router = useRouter();

	/** APOLLO REQUESTS **/
	const [updateCar] = useMutation(UPDATE_CAR);

	const {
		loading: getCarsLoading,
		data: getCarsData,
		error: getCarsError,
		refetch: getCarsRefetch,
	} = useQuery(GET_ADCARS, {
		fetchPolicy: 'network-only',
		variables: { input: searchFilter },
		notifyOnNetworkStatusChange: true,
		onCompleted: (data: T) => {
			setCars(data?.getCars?.list);
			setTotal(data?.getCars?.metaCounter?.[0]?.total ?? 0);
		}
	});

	/** HANDLERS **/
	const paginationHandler = (e: T, value: number) => {
		setSearchFilter({ ...searchFilter, page: value });
	};

	const changeStatusHandler = (value: CarStatus) => {
		setSearchFilter({ ...searchFilter, search: { carStatus: value } });
	};

	const deleteCarHandler = async (id: string) => {
		try {
			if (await sweetConfirmAlert('Are you sure to delete this car?')) {
				await updateCar({
					variables: {
						input: {
							_id: id,
							carStatus: "DELETE",
						},
					},
				});

				await getCarsRefetch({ input: searchFilter });
			}
		} catch (err: any) {
			await sweetErrorHandling(err);
		}
	};

	const updateCarHandler = async (status: string, id: string) => {
		try {
			if (await sweetConfirmAlert(`Are you sure change to ${status} status?`)) {
				await updateCar({
					variables: {
						input: {
							_id: id,
							carStatus: status,
						},
					},
				});

				await getCarsRefetch({ input: searchFilter });
			}
		} catch (err: any) {
			await sweetErrorHandling(err);
		}
	};

	if (user?.type !== 'AGENT') {
		router.back();
	}

	if (device === 'mobile') {
		return <div>WCAR CARS MOBILE</div>;
	} else {
		return (
			<div id="my-property-page">
				<Stack className="main-title-box">
					<Stack className="right-box">
						<Typography className="main-title">My Cars</Typography>
						<Typography className="sub-title">We are glad to see you again!</Typography>
					</Stack>
				</Stack>
				<Stack className="property-list-box">
					<Stack className="tab-name-box">
						<Typography
							onClick={() => changeStatusHandler(CarStatus.ACTIVE)}
							className={searchFilter.search.carStatus === 'ACTIVE' ? 'active-tab-name' : 'tab-name'}
						>
							On Sale
						</Typography>
						<Typography
							onClick={() => changeStatusHandler(CarStatus.SOLD)}
							className={searchFilter.search.carStatus === 'SOLD' ? 'active-tab-name' : 'tab-name'}
						>
							On Sold
						</Typography>
					</Stack>
					<Stack className="list-box">
						<Stack className="listing-title-box">
							<Typography className="title-text">Listing title</Typography>
							<Typography className="title-text">Date Published</Typography>
							<Typography className="title-text">Status</Typography>
							<Typography className="title-text">View</Typography>
							{searchFilter.search.carStatus === 'ACTIVE' && <Typography className="title-text">Action</Typography>}
						</Stack>

						{cars?.length === 0 ? (
							<div className={'no-data'}>
								<img src="/img/icons/icoAlert.svg" alt="" />
								<p>No Car found!</p>
							</div>
						) : (
							cars?.map((car: Car) => {
								return (
									<CarCard
										car={car}
										deleteCarHandler={deleteCarHandler}
										updateCarHandler={updateCarHandler}
									/>
								);
							})
						)}

						{cars?.length !== 0 && (
							<Stack className="pagination-config">
								<Stack className="pagination-box">
									<Pagination
										count={Math.ceil(total / searchFilter.limit)}
										page={searchFilter.page}
										shape="rounded"
										color="secondary"
										onChange={paginationHandler}
									/>
								</Stack>
								<Stack className="total-result">
									<Typography>{total} car available</Typography>
								</Stack>
							</Stack>
						)}
					</Stack>
				</Stack>
			</div>
		);
	}
};

MyCars.defaultProps = {
	initialInput: {
		page: 1,
		limit: 5,
		sort: 'createdAt',
		search: {
			carStatus: 'ACTIVE',
		},
	},
};

export default MyCars;
