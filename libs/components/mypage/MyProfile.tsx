import React, { useCallback, useEffect, useRef, useState } from 'react';
import { NextPage } from 'next';
import useDeviceDetect from '../../hooks/useDeviceDetect';
import { Button, Stack, Typography } from '@mui/material';
import axios from 'axios';
import { Messages, REACT_APP_API_URL } from '../../config';
import { getJwtToken, updateStorage, updateUserInfo } from '../../auth';
import { useMutation, useReactiveVar } from '@apollo/client';
import { userVar } from '../../../apollo/store';
import { sweetErrorHandling, sweetMixinErrorAlert, sweetMixinSuccessAlert } from '../../sweetAlert';
import { MemberUpdate } from '../../types/member/member.update';
import { Brand, CarServiceType, Location } from '../../enums/member.enum';
import { UPDATE_MEMBER } from '../../../apollo/user/mutation';

const MyProfile: NextPage = ({ initialValues, ...props }: any) => {
	const device = useDeviceDetect();
	const token = getJwtToken();
	const inputRef = useRef<any>(null);
	const user = useReactiveVar(userVar);
	const [updateData, setUpdateData] = useState<MemberUpdate>(initialValues);
	const [dealerBrand, setDealerBrand] = useState<Brand[]>(Object.values(Brand));
	const [location, setLocation] = useState<Location[]>(Object.values(Location));
	const [service, setService] = useState<CarServiceType[]>(Object.values(CarServiceType));

	/** APOLLO REQUESTS **/
	const [updateMember] = useMutation(UPDATE_MEMBER);

	/** LIFECYCLES **/
	useEffect(() => {
		setUpdateData({
			...updateData,
			titleNick: user.titleNick,
			phone: user.phone,
			address: user.address,
			image: user.image,
		});
	}, [user]);

	/** HANDLERS **/
	async function uploadImages() {
		try {
			const formData = new FormData();
			const selectedFiles = inputRef.current.files;

			if (selectedFiles.length == 0) return false;
			if (selectedFiles.length > 5) throw new Error('Cannot upload more than 5 images!');

			formData.append(
				'operations',
				JSON.stringify({
					query: `mutation ImagesUploader($files: [Upload!]!, $target: String!) { 
						imagesUploader(files: $files, target: $target)
				  }`,
					variables: {
						files: [null, null, null, null, null],
						target: 'member',
					},
				}),
			);
			formData.append(
				'map',
				JSON.stringify({
					'0': ['variables.files.0'],
					'1': ['variables.files.1'],
					'2': ['variables.files.2'],
					'3': ['variables.files.3'],
					'4': ['variables.files.4'],
				}),
			);
			for (const key in selectedFiles) {
				if (/^\d+$/.test(key)) formData.append(`${key}`, selectedFiles[key]);
			}

			const response = await axios.post(`${process.env.REACT_APP_API_GRAPHQL_URL}`, formData, {
				headers: {
					'Content-Type': 'multipart/form-data',
					'apollo-require-preflight': true,
					Authorization: `Bearer ${token}`,
				},
			});

			const responseImages = response.data.data.imagesUploader;

			setUpdateData({ ...updateData, images: responseImages });
		} catch (err: any) {
			await sweetMixinErrorAlert(err.message);
		}
	}

	const uploadImage = async (e: any) => {
		try {
			const image = e.target.files[0];
			console.log('+image:', image);

			const formData = new FormData();
			formData.append(
				'operations',
				JSON.stringify({
					query: `mutation ImageUploader($file: Upload!, $target: String!) {
						imageUploader(file: $file, target: $target) 
				  }`,
					variables: {
						file: null,
						target: 'member',
					},
				}),
			);
			formData.append(
				'map',
				JSON.stringify({
					'0': ['variables.file'],
				}),
			);
			formData.append('0', image);

			const response = await axios.post(`${process.env.REACT_APP_API_GRAPHQL_URL}`, formData, {
				headers: {
					'Content-Type': 'multipart/form-data',
					'apollo-require-preflight': true,
					Authorization: `Bearer ${token}`,
				},
			});

			const responseImage = response.data.data.imageUploader;
			console.log('+responseImage: ', responseImage);
			updateData.image = responseImage;
			setUpdateData({ ...updateData });

			return `${REACT_APP_API_URL}/${responseImage}`;
		} catch (err) {
			console.log('Error, uploadImage:', err);
		}
	};

	const updatePropertyHandler = useCallback(async () => {
		try {
			if (!user._id) throw new Error(Messages.error2);
			updateData._id = user._id;
			const result = await updateMember({
				variables: {
					input: updateData,
				},
			});

			// @ts-ignore
			const jwtToken = result.data.updateMember?.accessToken;
			await updateStorage({ jwtToken });
			updateUserInfo(result.data.updateMember?.accessToken);
			await sweetMixinSuccessAlert('Information updated successfully');
		} catch (err: any) {
			sweetErrorHandling(err).then();
		}
	}, [updateData]);

	const doDisabledCheck = () => {
		if (
			updateData.titleNick === '' ||
			updateData.phone === '' ||
			updateData.address === '' ||
			updateData.image === ''
		) {
			return true;
		}
	};

	console.log('+updateData', updateData);

	if (device === 'mobile') {
		return <>MY PROFILE PAGE MOBILE</>;
	} else
		return (
			<div id="my-profile-page">
				<Stack className="main-title-box">
					<Stack className="right-box">
						<Typography className="main-title">My Profile</Typography>
						<Typography className="sub-title">We are glad to see you again!</Typography>
					</Stack>
				</Stack>
				<Stack className="top-box">
					<Stack className="photo-box">
						<Typography className="title">Photo</Typography>
						<Stack className="image-big-box">
							<Stack className="image-box">
								<img
									src={
										updateData?.image
											? `${REACT_APP_API_URL}/${updateData?.image}`
											: `/img/profile/defaultUser.svg`
									}
									alt=""
								/>
							</Stack>
							<Stack className="upload-big-box">
								<input
									type="file"
									hidden
									id="hidden-input"
									onChange={uploadImage}
									accept="image/jpg, image/jpeg, image/png"
								/>
								<label htmlFor="hidden-input" className="labeler">
									<Typography>Upload Profile Image</Typography>
								</label>
								<Typography className="upload-text">A photo must be in JPG, JPEG or PNG format!</Typography>
							</Stack>
						</Stack>
					</Stack>
					<Stack className="small-input-box">
						<Stack className="input-box">
							<Typography className="title">Username</Typography>
							<input
								type="text"
								placeholder="Your username"
								value={updateData.titleNick}
								onChange={({ target: { value } }) => setUpdateData({ ...updateData, titleNick: value })}
							/>
						</Stack>
						<Stack className="input-box">
							<Typography className="title">Phone</Typography>
							<input
								type="text"
								placeholder="Your Phone"
								value={updateData.phone}
								onChange={({ target: { value } }) => setUpdateData({ ...updateData, phone: value })}
							/>
						</Stack>
					</Stack>
					<Stack className="address-box">
						<Typography className="title">Address</Typography>
						<input
							type="text"
							placeholder="Your address"
							value={updateData.address}
							onChange={({ target: { value } }) => setUpdateData({ ...updateData, address: value })}
						/>
					</Stack>
					{['AGENT', 'DEALER', "SERVICE"].includes(user?.type) && (
						<>
							<Stack className="small-input-box">
								<Stack className="input-box">
									<Typography className="title">Email</Typography>
									<input
										type="text"
										placeholder="Your email"
										value={updateData.email}
										onChange={({ target: { value } }) => setUpdateData({ ...updateData, email: value })}
									/>
								</Stack>
								<Stack className="input-box">
									<Typography className="title">Phone 2</Typography>
									<input
										type="text"
										placeholder="Your Phone 2"
										value={updateData.phone2}
										onChange={({ target: { value } }) => setUpdateData({ ...updateData, phone2: value })}
									/>
								</Stack>
								<Stack className="input-box">
									<Typography className="title">Instagram</Typography>
									<input
										type="text"
										placeholder="Your Instagram"
										value={updateData.instagram}
										onChange={({ target: { value } }) => setUpdateData({ ...updateData, instagram: value })}
									/>
								</Stack>
							</Stack>
							<Stack className="small-input-box">
								<Stack className="input-box">
									<Typography className="title">Kako Talk</Typography>
									<input
										type="text"
										placeholder="Your Kakao Talk"
										value={updateData.kakaoTalk}
										onChange={({ target: { value } }) => setUpdateData({ ...updateData, kakaoTalk: value })}
									/>
								</Stack>
								<Stack className="input-box">
									<Typography className="title">You Tube</Typography>
									<input
										type="text"
										placeholder="Your You Tube"
										value={updateData.youtube}
										onChange={({ target: { value } }) => setUpdateData({ ...updateData, youtube: value })}
									/>
								</Stack>
								<Stack className="input-box">
									<Typography className="title">Naver Blog</Typography>
									<input
										type="text"
										placeholder="Your Naver Blog"
										value={updateData.naverBlog}
										onChange={({ target: { value } }) => setUpdateData({ ...updateData, naverBlog: value })}
									/>
								</Stack>
							</Stack></>
					)}
					{['DEALER', 'AGENT', 'SERVICE'].includes(user?.type) && (
						<Stack className="small-input-box">
							<Stack className="input-box">
								<Typography className="title">Facebook</Typography>
								<input
									type="text"
									placeholder="Your Facebook"
									value={updateData.facebook}
									onChange={({ target: { value } }) => setUpdateData({ ...updateData, facebook: value })}
								/>
							</Stack>
							<Stack className="input-box">
								<Typography className="title">Tik Tok</Typography>
								<input
									type="text"
									placeholder="Your Tik Tok"
									value={updateData.tikTok}
									onChange={({ target: { value } }) => setUpdateData({ ...updateData, tikTok: value })}
								/>
							</Stack>
							<Stack className="input-box">
								<Typography className="title">X.com</Typography>
								<input
									type="text"
									placeholder="Your X.com"
									value={updateData.xcom}
									onChange={({ target: { value } }) => setUpdateData({ ...updateData, xcom: value })}
								/>
							</Stack>
						</Stack>
					)}
					{user?.type === 'DEALER' || user?.type === 'SERVICE' && (
						<Stack className="address-box">
							<Typography className="title">Short Description</Typography>
							<input
								type="text"
								placeholder="Your Short Description"
								value={updateData.shortDesc}
								onChange={({ target: { value } }) => setUpdateData({ ...updateData, shortDesc: value })}
							/>
						</Stack>
					)}
					{user?.type === 'DEALER' && (
						<Stack className="small-input-box">
							<Stack className="input-box">
								<Typography className="title">Location</Typography>
								<select
									className={'select-description'}
									defaultValue={updateData?.location || 'select'}
									value={updateData?.location || 'select'}
									onChange={({ target: { value } }) =>
										// @ts-ignore
										setInsertCarData({ ...updateData, location: value })
									}
								>
									<>
										<option selected={true} disabled={true} value={'select'}>
											Select
										</option>
										{location?.length > 0 &&
											location?.map((loc: any) => (
												<option value={`${loc}`} key={loc}>
													{loc}
												</option>
											))}
									</>
								</select>
							</Stack>
							<Stack className="input-box">
								<Typography className="title">Full Name</Typography>
								<input
									type="text"
									placeholder="Your Full Name"
									value={updateData.fullName}
									onChange={({ target: { value } }) => setUpdateData({ ...updateData, fullName: value })}
								/>
							</Stack>
							<Stack className="input-box">
								<Typography className="title">Dealer Brand</Typography>
								<select
									className={'select-description'}
									defaultValue={updateData?.dealerBrand || 'select'}
									value={updateData?.dealerBrand || 'select'}
									onChange={({ target: { value } }) =>
										// @ts-ignore
										setInsertCarData({ ...updateData, dealerBrand: value })
									}
								>
									<>
										<option selected={true} disabled={true} value={'select'}>
											Select
										</option>
										{dealerBrand?.length > 0 &&
											dealerBrand?.map((brand: any) => (
												<option value={`${brand}`} key={brand}>
													{brand}
												</option>
											))}
									</>
								</select>
							</Stack>
						</Stack>
					)}
					{user?.type === 'SERVICE' && (
						<Stack className="small-input-box">
							<Stack className="input-box">
								<Typography className="title">Location</Typography>
								<select
									className={'select-description'}
									defaultValue={updateData?.location || 'select'}
									value={updateData?.location || 'select'}
									onChange={({ target: { value } }) =>
										// @ts-ignore
										setInsertCarData({ ...updateData, location: value })
									}
								>
									<>
										<option selected={true} disabled={true} value={'select'}>
											Select
										</option>
										{location?.length > 0 &&
											location?.map((loc: any) => (
												<option value={`${loc}`} key={loc}>
													{loc}
												</option>
											))}
									</>
								</select>
							</Stack>
							<Stack className="input-box">
								<Typography className="title">Full Name</Typography>
								<input
									type="text"
									placeholder="Your Full Name"
									value={updateData.fullName}
									onChange={({ target: { value } }) => setUpdateData({ ...updateData, fullName: value })}
								/>
							</Stack>
							<Stack className="input-box">
								<Typography className="title">Service Type</Typography>
								<select
									className={'select-description'}
									defaultValue={updateData?.carServiceType || 'select'}
									value={updateData?.carServiceType || 'select'}
									onChange={({ target: { value } }) =>
										// @ts-ignore
										setInsertCarData({ ...updateData, carServiceType: value })
									}
								>
									<>
										<option selected={true} disabled={true} value={'select'}>
											Select
										</option>
										{service?.length > 0 &&
											service?.map((ser: any) => (
												<option value={`${ser}`} key={ser}>
													{ser}
												</option>
											))}
									</>
								</select>
							</Stack>
						</Stack>
					)}
					{['DEALER', 'SERVICE'].includes(user?.type) && (
						<Stack className="config-column">
							<Typography className="title">Description</Typography>
							<textarea
								name=""
								id=""
								className="description-text"
								value={updateData?.longDesc}
								onChange={({ target: { value } }) =>
									setUpdateData({ ...updateData, longDesc: value })
								}
							></textarea>
						</Stack>
					)}
					{user?.type === 'DEALER' && (
						<>
							<Typography className={'key-features'}>Dealer Service</Typography>
							<Stack className="config-checkbox">
								<Stack className="price-year-after-price">
									<input
										type="checkbox"
										className="description-input"
										checked={!!updateData?.dealerFinancing}
										onChange={({ target: { checked } }) =>
											setUpdateData({ ...updateData, dealerFinancing: checked })
										}
									/>
									<Typography className="title">Financing</Typography>
								</Stack>
								<Stack className="price-year-after-price">
									<input
										type="checkbox"
										className="description-input"
										checked={!!updateData?.dealerCarService}
										onChange={({ target: { checked } }) =>
											setUpdateData({ ...updateData, dealerCarService: checked })
										}
									/>
									<Typography className="title">Car Service</Typography>
								</Stack>
								<Stack className="price-year-after-price">
									<input
										type="checkbox"
										className="description-input"
										checked={!!updateData?.dealerTradeIn}
										onChange={({ target: { checked } }) =>
											setUpdateData({ ...updateData, dealerTradeIn: checked })
										}
									/>
									<Typography className="title">Trade In</Typography>
								</Stack>
								<Stack className="price-year-after-price">
									<input
										type="checkbox"
										className="description-input"
										checked={!!updateData?.dealerCustomization}
										onChange={({ target: { checked } }) =>
											setUpdateData({ ...updateData, dealerCustomization: checked })
										}
									/>
									<Typography className="title">Customization</Typography>
								</Stack>

								<Stack className="price-year-after-price">
									<input
										type="checkbox"
										className="description-input"
										checked={!!updateData?.dealerWarranties}
										onChange={({ target: { checked } }) =>
											setUpdateData({ ...updateData, dealerWarranties: checked })
										}
									/>
									<Typography className="title">Warranties</Typography>
								</Stack>

								<Stack className="price-year-after-price">
									<input
										type="checkbox"
										className="description-input"
										checked={!!updateData?.dealerParts}
										onChange={({ target: { checked } }) =>
											setUpdateData({ ...updateData, dealerParts: checked })
										}
									/>
									<Typography className="title">Car Parts</Typography>
								</Stack>
							</Stack>
							<Stack className="config-checkbox">
								<Stack className="price-year-after-price">
									<input
										type="checkbox"
										className="description-input"
										checked={!!updateData?.dealerAccessories}
										onChange={({ target: { checked } }) =>
											setUpdateData({ ...updateData, dealerAccessories: checked })
										}
									/>
									<Typography className="title">Accessories</Typography>
								</Stack>
								<Stack className="price-year-after-price">
									<input
										type="checkbox"
										className="description-input"
										checked={!!updateData?.dealerCarDetailing}
										onChange={({ target: { checked } }) =>
											setUpdateData({ ...updateData, dealerCarDetailing: checked })
										}
									/>
									<Typography className="title">Car Detailing</Typography>
								</Stack>
								<Stack className="price-year-after-price">
									<input
										type="checkbox"
										className="description-input"
										checked={!!updateData?.dealerCarWash}
										onChange={({ target: { checked } }) =>
											setUpdateData({ ...updateData, dealerCarWash: checked })
										}
									/>
									<Typography className="title">Car Wash</Typography>
								</Stack>
								<Stack className="price-year-after-price">
									<input
										type="checkbox"
										className="description-input"
										checked={!!updateData?.dealerCarTestDrive}
										onChange={({ target: { checked } }) =>
											setUpdateData({ ...updateData, dealerCarTestDrive: checked })
										}
									/>
									<Typography className="title">Test Drive</Typography>
								</Stack>

								<Stack className="price-year-after-price">
									<input
										type="checkbox"
										className="description-input"
										checked={!!updateData?.dealerCarDelivery}
										onChange={({ target: { checked } }) =>
											setUpdateData({ ...updateData, dealerCarDelivery: checked })
										}
									/>
									<Typography className="title">Car Delivery</Typography>
								</Stack>
							</Stack></>
					)}

					{user?.type === 'SERVICE' && (
						<>
							<Typography className={'key-features'}>Car Service</Typography>
							<Stack className="config-checkbox">
								<Stack className="price-year-after-price">
									<input
										type="checkbox"
										className="description-input"
										checked={!!updateData?.carOilChange}
										onChange={({ target: { checked } }) =>
											setUpdateData({ ...updateData, carOilChange: checked })
										}
									/>
									<Typography className="title">Oil Changing</Typography>
								</Stack>
								<Stack className="price-year-after-price">
									<input
										type="checkbox"
										className="description-input"
										checked={!!updateData?.carTireChange}
										onChange={({ target: { checked } }) =>
											setUpdateData({ ...updateData, carTireChange: checked })
										}
									/>
									<Typography className="title">Tire Changing</Typography>
								</Stack>
								<Stack className="price-year-after-price">
									<input
										type="checkbox"
										className="description-input"
										checked={!!updateData?.carBrakeCheck}
										onChange={({ target: { checked } }) =>
											setUpdateData({ ...updateData, carBrakeCheck: checked })
										}
									/>
									<Typography className="title">Car Brake Check</Typography>
								</Stack>

								<Stack className="price-year-after-price">
									<input
										type="checkbox"
										className="description-input"
										checked={!!updateData?.carBatteryCheck}
										onChange={({ target: { checked } }) =>
											setUpdateData({ ...updateData, carBatteryCheck: checked })
										}
									/>
									<Typography className="title">Battery Check</Typography>
								</Stack>

								<Stack className="price-year-after-price">
									<input
										type="checkbox"
										className="description-input"
										checked={!!updateData?.carTireBalance}
										onChange={({ target: { checked } }) =>
											setUpdateData({ ...updateData, carTireBalance: checked })
										}
									/>
									<Typography className="title">Tire Balance</Typography>
								</Stack>
							</Stack>
							<Stack className="config-checkbox">
								<Stack className="price-year-after-price">
									<input
										type="checkbox"
										className="description-input"
										checked={!!updateData?.carAirCondition}
										onChange={({ target: { checked } }) =>
											setUpdateData({ ...updateData, carAirCondition: checked })
										}
									/>
									<Typography className="title">Car Air Condition</Typography>
								</Stack>
								<Stack className="price-year-after-price">
									<input
										type="checkbox"
										className="description-input"
										checked={!!updateData?.carTransmissionCheck}
										onChange={({ target: { checked } }) =>
											setUpdateData({ ...updateData, carTransmissionCheck: checked })
										}
									/>
									<Typography className="title">Transmission Check</Typography>
								</Stack>
								<Stack className="price-year-after-price">
									<input
										type="checkbox"
										className="description-input"
										checked={!!updateData?.carEngineDiagnostic}
										onChange={({ target: { checked } }) =>
											setUpdateData({ ...updateData, carEngineDiagnostic: checked })
										}
									/>
									<Typography className="title">Engine Diagnostic</Typography>
								</Stack>
								<Stack className="price-year-after-price">
									<input
										type="checkbox"
										className="description-input"
										checked={!!updateData?.carDetailing}
										onChange={({ target: { checked } }) =>
											setUpdateData({ ...updateData, carDetailing: checked })
										}
									/>
									<Typography className="title">Car Detailing</Typography>
								</Stack>
								<Stack className="price-year-after-price">
									<input
										type="checkbox"
										className="description-input"
										checked={!!updateData?.carAlignment}
										onChange={({ target: { checked } }) =>
											setUpdateData({ ...updateData, carAlignment: checked })
										}
									/>
									<Typography className="title">Car Alignment</Typography>
								</Stack>
							</Stack>
							<Stack className="config-checkbox">
								<Stack className="price-year-after-price">
									<input
										type="checkbox"
										className="description-input"
										checked={!!updateData?.carExhaust}
										onChange={({ target: { checked } }) =>
											setUpdateData({ ...updateData, carExhaust: checked })
										}
									/>
									<Typography className="title">Car Exhaust</Typography>
								</Stack>
								<Stack className="price-year-after-price">
									<input
										type="checkbox"
										className="description-input"
										checked={!!updateData?.carWindshield}
										onChange={({ target: { checked } }) =>
											setUpdateData({ ...updateData, carWindshield: checked })
										}
									/>
									<Typography className="title">Car Windshield</Typography>
								</Stack>
								<Stack className="price-year-after-price">
									<input
										type="checkbox"
										className="description-input"
										checked={!!updateData?.carTimingBelt}
										onChange={({ target: { checked } }) =>
											setUpdateData({ ...updateData, carTimingBelt: checked })
										}
									/>
									<Typography className="title">Timing Belt</Typography>
								</Stack>
								<Stack className="price-year-after-price">
									<input
										type="checkbox"
										className="description-input"
										checked={!!updateData?.carChainReplacement}
										onChange={({ target: { checked } }) =>
											setUpdateData({ ...updateData, carChainReplacement: checked })
										}
									/>
									<Typography className="title">Chain Replacement</Typography>
								</Stack>
								<Stack className="price-year-after-price">
									<input
										type="checkbox"
										className="description-input"
										checked={!!updateData?.carSuspension}
										onChange={({ target: { checked } }) =>
											setUpdateData({ ...updateData, carSuspension: checked })
										}
									/>
									<Typography className="title">Car Suspension</Typography>
								</Stack>
							</Stack></>
					)}
					{['DEALER', 'SERVICE'].includes(user?.type) && (
						<>
							<Stack className="small-input-box">
								<Stack className="input-box">
									<Typography className="title">Open Week Day</Typography>
									<input
										type="text"
										placeholder="Open At"
										value={updateData.openAt}
										onChange={({ target: { value } }) => setUpdateData({ ...updateData, openAt: value })}
									/>
								</Stack>
								<Stack className="input-box">
									<Typography className="title">Close Week Day</Typography>
									<input
										type="text"
										placeholder="Close At"
										value={updateData.closeAt}
										onChange={({ target: { value } }) => setUpdateData({ ...updateData, closeAt: value })}
									/>
								</Stack>
							</Stack>
							<Stack className="small-input-box">
								<Stack className="input-box">
									<Typography className="title">Open Saturday</Typography>
									<input
										type="text"
										placeholder="Saturday Open At"
										value={updateData.openSaturday}
										onChange={({ target: { value } }) => setUpdateData({ ...updateData, openSaturday: value })}
									/>
								</Stack>
								<Stack className="input-box">
									<Typography className="title">Close Saturday</Typography>
									<input
										type="text"
										placeholder="Saturday Close At"
										value={updateData.closeSaturday}
										onChange={({ target: { value } }) => setUpdateData({ ...updateData, closeSaturday: value })}
									/>
								</Stack>
							</Stack>
							<Stack className="small-input-box">
								<Stack className="input-box">
									<Typography className="title">Open Sunday</Typography>
									<input
										type="text"
										placeholder="Sunday Open At"
										value={updateData.openSunday}
										onChange={({ target: { value } }) => setUpdateData({ ...updateData, openSunday: value })}
									/>
								</Stack>
								<Stack className="input-box">
									<Typography className="title">Close Saturday</Typography>
									<input
										type="text"
										placeholder="Sunday Close At"
										value={updateData.closeSunday}
										onChange={({ target: { value } }) => setUpdateData({ ...updateData, closeSunday: value })}
									/>
								</Stack>
								<Stack className="input-box">
									<Typography className="title">Public Holidays</Typography>
									<select
										className={'select-description'}
										value={updateData?.publicHolidays ? 'yes' : 'no'}
										defaultValue={updateData?.publicHolidays ? 'yes' : 'no'}
										onChange={({ target: { value } }) =>
											setUpdateData({ ...updateData, publicHolidays: value === 'yes' })
										}
									>
										<option disabled={true} selected={true}>
											Select
										</option>
										<option value={'yes'}>Yes</option>
										<option value={'no'}>No</option>
									</select>
								</Stack>
							</Stack></>
					)}
					{['DEALER', 'SERVICE'].includes(user?.type) && (
						<>
							<Stack className="images-box">
								<Stack className="upload-box">
									<svg xmlns="http://www.w3.org/2000/svg" width="121" height="120" viewBox="0 0 121 120" fill="none">
										<g clipPath="url(#clip0_7037_5336)">
											<path
												d="M68.9453 52.0141H52.9703C52.4133 52.0681 51.8511 52.005 51.32 51.8289C50.7888 51.6528 50.3004 51.3675 49.886 50.9914C49.4716 50.6153 49.1405 50.1567 48.9139 49.645C48.6874 49.1333 48.5703 48.5799 48.5703 48.0203C48.5703 47.4607 48.6874 46.9073 48.9139 46.3956C49.1405 45.884 49.4716 45.4253 49.886 45.0492C50.3004 44.6731 50.7888 44.3878 51.32 44.2117C51.8511 44.0356 52.4133 43.9725 52.9703 44.0266H68.9828C69.5397 43.9725 70.1019 44.0356 70.633 44.2117C71.1642 44.3878 71.6527 44.6731 72.067 45.0492C72.4814 45.4253 72.8125 45.884 73.0391 46.3956C73.2657 46.9073 73.3827 47.4607 73.3827 48.0203C73.3827 48.5799 73.2657 49.1333 73.0391 49.645C72.8125 50.1567 72.4814 50.6153 72.067 50.9914C71.6527 51.3675 71.1642 51.6528 70.633 51.8289C70.1019 52.005 69.5397 52.0681 68.9828 52.0141H68.9453Z"
												fill="#DDDDDD"
											/>
											<path
												d="M72.4361 65.0288L63.6236 57.0413C62.8704 56.3994 61.9132 56.0469 60.9236 56.0469C59.934 56.0469 58.9768 56.3994 58.2236 57.0413L49.4111 65.0288C48.6807 65.7585 48.2597 66.7415 48.2355 67.7736C48.2113 68.8057 48.5859 69.8074 49.2813 70.5704C49.9767 71.3335 50.9394 71.7991 51.9693 71.8705C52.9992 71.9419 54.017 71.6136 54.8111 70.9538L56.9111 69.0413V88.0163C57.0074 89.0088 57.4697 89.9298 58.208 90.6C58.9464 91.2701 59.9077 91.6414 60.9048 91.6414C61.9019 91.6414 62.8633 91.2701 63.6016 90.6C64.34 89.9298 64.8023 89.0088 64.8986 88.0163V69.0413L66.9986 70.9538C67.3823 71.3372 67.8398 71.6387 68.3434 71.8403C68.8469 72.0418 69.3861 72.1392 69.9284 72.1265C70.4706 72.1138 71.0046 71.9913 71.4982 71.7664C71.9918 71.5415 72.4346 71.2188 72.8 70.8179C73.1653 70.417 73.4456 69.9463 73.6239 69.434C73.8022 68.9217 73.8748 68.3786 73.8373 67.8375C73.7997 67.2965 73.6529 66.7686 73.4056 66.2858C73.1584 65.8031 72.8158 65.3755 72.3986 65.0288H72.4361Z"
												fill="#DDDDDD"
											/>
											<path
												d="M100.975 120.003C100.418 120.057 99.8558 119.994 99.3247 119.818C98.7935 119.642 98.3051 119.357 97.8907 118.98C97.4763 118.604 97.1452 118.146 96.9186 117.634C96.6921 117.122 96.575 116.569 96.575 116.009C96.575 115.45 96.6921 114.896 96.9186 114.385C97.1452 113.873 97.4763 113.414 97.8907 113.038C98.3051 112.662 98.7935 112.377 99.3247 112.201C99.8558 112.025 100.418 111.962 100.975 112.016C104.158 112.016 107.21 110.751 109.46 108.501C111.711 106.25 112.975 103.198 112.975 100.016V19.9906C112.975 16.808 111.711 13.7558 109.46 11.5053C107.21 9.25491 104.158 7.99063 100.975 7.99063H36.9624C36.4055 8.04466 35.8433 7.98159 35.3122 7.80547C34.781 7.62935 34.2926 7.34408 33.8782 6.96797C33.4638 6.59186 33.1327 6.13324 32.9061 5.62156C32.6796 5.10989 32.5625 4.55648 32.5625 3.99688C32.5625 3.43728 32.6796 2.88386 32.9061 2.37219C33.1327 1.86051 33.4638 1.40189 33.8782 1.02578C34.2926 0.649674 34.781 0.364397 35.3122 0.188277C35.8433 0.0121578 36.4055 -0.05091 36.9624 0.00312538H100.975C106.273 0.0130374 111.351 2.12204 115.097 5.86828C118.844 9.61451 120.953 14.6927 120.962 19.9906V100.016C120.953 105.314 118.844 110.392 115.097 114.138C111.351 117.884 106.273 119.993 100.975 120.003Z"
												fill="#DDDDDD"
											/>
											<path
												d="M84.9609 120.003H20.9484C15.6505 119.993 10.5723 117.884 6.82609 114.138C3.07985 110.392 0.97085 105.314 0.960938 100.016L0.960938 19.9906C0.97085 14.6927 3.07985 9.61451 6.82609 5.86828C10.5723 2.12204 15.6505 0.0130374 20.9484 0.00312538C21.5054 -0.05091 22.0676 0.0121578 22.5987 0.188277C23.1299 0.364397 23.6183 0.649674 24.0327 1.02578C24.4471 1.40189 24.7782 1.86051 25.0047 2.37219C25.2313 2.88386 25.3484 3.43728 25.3484 3.99688C25.3484 4.55648 25.2313 5.10989 25.0047 5.62156C24.7782 6.13324 24.4471 6.59186 24.0327 6.96797C23.6183 7.34408 23.1299 7.62935 22.5987 7.80547C22.0676 7.98159 21.5054 8.04466 20.9484 7.99063C17.7658 7.99063 14.7136 9.25491 12.4632 11.5053C10.2127 13.7558 8.94844 16.808 8.94844 19.9906V100.016C8.94844 103.198 10.2127 106.25 12.4632 108.501C14.7136 110.751 17.7658 112.016 20.9484 112.016H84.9609C85.5179 111.962 86.08 112.025 86.6112 112.201C87.1424 112.377 87.6308 112.662 88.0452 113.038C88.4595 113.414 88.7907 113.873 89.0172 114.385C89.2438 114.896 89.3609 115.45 89.3609 116.009C89.3609 116.569 89.2438 117.122 89.0172 117.634C88.7907 118.146 88.4595 118.604 88.0452 118.98C87.6308 119.357 87.1424 119.642 86.6112 119.818C86.08 119.994 85.5179 120.057 84.9609 120.003Z"
												fill="#DDDDDD"
											/>
											<path
												d="M28.9704 24.0031H20.9454C19.9529 23.9068 19.0319 23.4445 18.3617 22.7062C17.6916 21.9679 17.3203 21.0065 17.3203 20.0094C17.3203 19.0123 17.6916 18.0509 18.3617 17.3126C19.0319 16.5743 19.9529 16.1119 20.9454 16.0156H28.9704C29.9628 16.1119 30.8839 16.5743 31.554 17.3126C32.2242 18.0509 32.5954 19.0123 32.5954 20.0094C32.5954 21.0065 32.2242 21.9679 31.554 22.7062C30.8839 23.4445 29.9628 23.9068 28.9704 24.0031Z"
												fill="#DDDDDD"
											/>
											<path
												d="M76.9736 24.0016C76.4485 24.0065 75.9275 23.9074 75.4409 23.7098C74.9543 23.5123 74.5117 23.2203 74.1386 22.8507C73.7655 22.481 73.4693 22.0412 73.2672 21.5564C73.0651 21.0717 72.9611 20.5517 72.9611 20.0266C72.9537 19.2314 73.1827 18.452 73.619 17.7872C74.0554 17.1224 74.6794 16.6023 75.4119 16.2929C76.1444 15.9834 76.9524 15.8986 77.7332 16.0491C78.514 16.1997 79.2324 16.5789 79.7973 17.1385C80.3623 17.6981 80.7482 18.413 80.906 19.1924C81.0639 19.9717 80.9867 20.7804 80.6841 21.5158C80.3816 22.2512 79.8673 22.8801 79.2067 23.3226C78.546 23.7652 77.7688 24.0015 76.9736 24.0016Z"
												fill="#DDDDDD"
											/>
											<path
												d="M88.9736 24.0016C88.4485 24.0065 87.9275 23.9074 87.4409 23.7098C86.9543 23.5123 86.5117 23.2203 86.1386 22.8507C85.7655 22.481 85.4693 22.0412 85.2672 21.5564C85.0651 21.0717 84.9611 20.5517 84.9611 20.0266C84.9537 19.2314 85.1827 18.452 85.619 17.7872C86.0554 17.1224 86.6794 16.6023 87.4119 16.2929C88.1444 15.9834 88.9524 15.8986 89.7332 16.0491C90.514 16.1997 91.2324 16.5789 91.7974 17.1385C92.3623 17.6981 92.7482 18.413 92.9061 19.1924C93.0639 19.9717 92.9867 20.7804 92.6841 21.5158C92.3816 22.2512 91.8673 22.8801 91.2067 23.3226C90.5461 23.7652 89.7688 24.0015 88.9736 24.0016Z"
												fill="#DDDDDD"
											/>
											<path
												d="M100.974 24.0016C100.448 24.0065 99.9275 23.9074 99.4409 23.7098C98.9543 23.5123 98.5117 23.2203 98.1386 22.8507C97.7655 22.481 97.4693 22.0412 97.2672 21.5564C97.0651 21.0717 96.9611 20.5517 96.9611 20.0266C96.9537 19.2314 97.1827 18.452 97.619 17.7872C98.0554 17.1224 98.6794 16.6023 99.4119 16.2929C100.144 15.9834 100.952 15.8986 101.733 16.0491C102.514 16.1997 103.232 16.5789 103.797 17.1385C104.362 17.6981 104.748 18.413 104.906 19.1924C105.064 19.9717 104.987 20.7804 104.684 21.5158C104.382 22.2512 103.867 22.8801 103.207 23.3226C102.546 23.7652 101.769 24.0015 100.974 24.0016Z"
												fill="#DDDDDD"
											/>
										</g>
										<defs>
											<clipPath id="clip0_7037_5336">
												<rect width="120" height="120" fill="white" transform="translate(0.960938)" />
											</clipPath>
										</defs>
									</svg>
									<Stack className="text-box">
										<Typography className="drag-title">Drag and drop images here</Typography>
										<Typography className="format-title">Photos must be JPEG or PNG format and least 2048x768</Typography>
									</Stack>
									<Button
										className="browse-button"
										onClick={() => {
											inputRef.current.click();
										}}
									>
										<Typography className="browse-button-text">Browse Files</Typography>
										<input
											ref={inputRef}
											type="file"
											hidden={true}
											onChange={uploadImages}
											multiple={true}
											accept="image/jpg, image/jpeg, image/png"
										/>
										<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
											<g clipPath="url(#clip0_7309_3249)">
												<path
													d="M15.5556 0H5.7778C5.53214 0 5.33334 0.198792 5.33334 0.444458C5.33334 0.690125 5.53214 0.888917 5.7778 0.888917H14.4827L0.130219 15.2413C-0.0434062 15.415 -0.0434062 15.6962 0.130219 15.8698C0.21701 15.9566 0.33076 16 0.444469 16C0.558177 16 0.671885 15.9566 0.758719 15.8698L15.1111 1.51737V10.2222C15.1111 10.4679 15.3099 10.6667 15.5556 10.6667C15.8013 10.6667 16.0001 10.4679 16.0001 10.2222V0.444458C16 0.198792 15.8012 0 15.5556 0Z"
													fill="#181A20"
												/>
											</g>
											<defs>
												<clipPath id="clip0_7309_3249">
													<rect width="16" height="16" fill="white" />
												</clipPath>
											</defs>
										</svg>
									</Button>
								</Stack>
								<Stack className="gallery-box">
									{updateData?.images?.map((image: string) => {
										const imagePath: string = `${REACT_APP_API_URL}/${image}`;
										return (
											<Stack className="image-box">
												<img src={imagePath} alt="" />
											</Stack>
										);
									})}
								</Stack>
							</Stack></>
					)}
					<Stack className="about-me-box">
						<Button className="update-button" onClick={updatePropertyHandler} disabled={doDisabledCheck()}>
							<Typography>Update Profile</Typography>
							<svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 13 13" fill="none">
								<g clipPath="url(#clip0_7065_6985)">
									<path
										d="M12.6389 0H4.69446C4.49486 0 4.33334 0.161518 4.33334 0.361122C4.33334 0.560727 4.49486 0.722245 4.69446 0.722245H11.7672L0.105803 12.3836C-0.0352676 12.5247 -0.0352676 12.7532 0.105803 12.8942C0.176321 12.9647 0.268743 13 0.361131 13C0.453519 13 0.545907 12.9647 0.616459 12.8942L12.2778 1.23287V8.30558C12.2778 8.50518 12.4393 8.6667 12.6389 8.6667C12.8385 8.6667 13 8.50518 13 8.30558V0.361122C13 0.161518 12.8385 0 12.6389 0Z"
										fill="white"
									/>
								</g>
								<defs>
									<clipPath id="clip0_7065_6985">
										<rect width="13" height="13" fill="white" />
									</clipPath>
								</defs>
							</svg>
						</Button>
					</Stack>
				</Stack>
			</div>
		);
};

MyProfile.defaultProps = {
	initialValues: {
		_id: '',
		memberImage: '',
		memberNick: '',
		memberPhone: '',
		memberAddress: '',
	},
};

export default MyProfile;
