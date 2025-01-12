import React, { useCallback, useEffect, useRef, useState } from 'react';
import { NextPage } from 'next';
import useDeviceDetect from '../../hooks/useDeviceDetect';
import { Button, Stack, Typography } from '@mui/material';
import { getJwtToken, updateStorage, updateUserInfo } from '../../auth';
import { useMutation, useReactiveVar } from '@apollo/client';
import { userVar } from '../../../apollo/store';
import { Brand, CarServiceType, Location } from '../../enums/member.enum';
import { UPDATE_MEMBER } from '../../../apollo/user/mutation';
import axios from 'axios';
import { sweetErrorHandling, sweetMixinErrorAlert, sweetMixinSuccessAlert } from '../../sweetAlert';
import { Messages, REACT_APP_API_URL } from '../../config';
import { MemberUpdate } from '../../types/member/member.update';

const MyProfile: NextPage = ({ initialValues, ...props }: any) => {
	const device = useDeviceDetect();
	const token = getJwtToken();
	const inputRef = useRef<any>(null);
	const user = useReactiveVar(userVar);
	const [updateData, setUpdateData] = useState<MemberUpdate>(initialValues);

	/** APOLLO REQUESTS **/
	const [updateMember] = useMutation(UPDATE_MEMBER);

	/** LIFECYCLES **/
	useEffect(() => {
		setUpdateData({
			...updateData,
			titleNick: user.titleNick,
			password: user.password,
			fullName: user.fullName,
			image: user.image,
			viewImage: user.viewImage,
			address: user.address,
			shortDesc: user.shortDesc,
			longDesc: user.longDesc,
			phone: user.phone,
			phone2: user.phone2,
			email: user.email,
			kakaoTalk: user.kakaoTalk,
			youtube: user.youtube,
			instagram: user.instagram,
			facebook: user.facebook,
			tikTok: user.tikTok,
			naverBlog: user.naverBlog,
			xcom: user.xcom,
			dealerFinancing: user.dealerFinancing,
			dealerCarService: user.dealerCarService,
			dealerTradeIn: user.dealerTradeIn,
			dealerCustomization: user.dealerCustomization,
			dealerWarranties: user.dealerWarranties,
			dealerParts: user.dealerParts,
			dealerAccessories: user.dealerAccessories,
			dealerCarDetailing: user.dealerCarDetailing,
			dealerCarWash: user.dealerCarWash,
			dealerCarTestDrive: user.dealerCarTestDrive,
			dealerCarDelivery: user.dealerCarDelivery,
			carOilChange: user.carOilChange,
			carAlignment: user.carAlignment,
			carTireChange: user.carTireChange,
			carBrakeCheck: user.carBrakeCheck,
			carBatteryCheck: user.carBatteryCheck,
			carTireBalance: user.carTireBalance,
			carSuspension: user.carSuspension,
			carAirCondition: user.carAirCondition,
			carTransmissionCheck: user.carTransmissionCheck,
			carEngineDiagnostic: user.carEngineDiagnostic,
			carExhaust: user.carExhaust,
			carDetailing: user.carDetailing,
			carWindshield: user.carWindshield,
			carTimingBelt: user.carTimingBelt,
			carChainReplacement: user.carChainReplacement,
			openAt: user.openAt,
			closeAt: user.closeAt,
			openSunday: user.openSunday,
			closeSunday: user.closeSunday,
			openSaturday: user.openSaturday,
			closeSaturday: user.closeSaturday,
			publicHolidays: user.publicHolidays,

		});
	}, [user]);

	/** HANDLERS **/
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

	// const uploadImage2 = async (e: any) => {
	// 	try {
	// 		const image = e.target.files[0];
	// 		console.log('+image:', image);

	// 		const formData = new FormData();
	// 		formData.append(
	// 			'operations',
	// 			JSON.stringify({
	// 				query: `mutation ImageUploader($file: Upload!, $target: String!) {
	// 					imageUploader(file: $file, target: $target) 
	// 			  }`,
	// 				variables: {
	// 					file: null,
	// 					target: 'member',
	// 				},
	// 			}),
	// 		);
	// 		formData.append(
	// 			'map',
	// 			JSON.stringify({
	// 				'0': ['variables.file'],
	// 			}),
	// 		);
	// 		formData.append('0', image);

	// 		const response = await axios.post(`${process.env.REACT_APP_API_GRAPHQL_URL}`, formData, {
	// 			headers: {
	// 				'Content-Type': 'multipart/form-data',
	// 				'apollo-require-preflight': true,
	// 				Authorization: `Bearer ${token}`,
	// 			},
	// 		});

	// 		const responseImage = response.data.data.imageUploader;
	// 		console.log('+responseImage: ', responseImage);
	// 		updateData.viewImage = responseImage;
	// 		setUpdateData({ ...updateData });

	// 		return `${REACT_APP_API_URL}/${responseImage}`;
	// 	} catch (err) {
	// 		console.log('Error, uploadImage:', err);
	// 	}
	// };

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
								<Typography className="title">Full Name</Typography>
								<input
									type="text"
									placeholder="Your Full Name"
									value={updateData.fullName}
									onChange={({ target: { value } }) => setUpdateData({ ...updateData, fullName: value })}
								/>
							</Stack>
						</Stack>
					)}
					{user?.type === 'SERVICE' && (
						<Stack className="small-input-box">
							<Stack className="input-box">
								<Typography className="title">Full Name</Typography>
								<input
									type="text"
									placeholder="Your Full Name"
									value={updateData.fullName}
									onChange={({ target: { value } }) => setUpdateData({ ...updateData, fullName: value })}
								/>
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
		image: '',
		titleNick: '',
		phone: '',
		address: ''
	},
};

export default MyProfile;
