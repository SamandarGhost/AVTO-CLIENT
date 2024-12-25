import React, { useCallback, useEffect, useState } from 'react';
import { NextPage } from 'next';
import useDeviceDetect from '../../hooks/useDeviceDetect';
import { Button, Stack, Typography } from '@mui/material';
import axios from 'axios';
import { Messages, REACT_APP_API_URL } from '../../config';
import { getJwtToken, updateStorage, updateUserInfo } from '../../auth';
import { useMutation, useReactiveVar } from '@apollo/client';
import { userVar } from '../../../apollo/store';
import { UPDATE_MEMBER } from '../../../apollo/user/mutation';
import { sweetErrorHandling, sweetMixinSuccessAlert } from '../../sweetAlert';
import { MemberUpdate } from '../../types/member/member.update';

const MyProfile: NextPage = ({ initialValues, ...props }: any) => {
	const device = useDeviceDetect();
	const token = getJwtToken();
	const user = useReactiveVar(userVar);
	const [updateData, setUpdateData] = useState<MemberUpdate>(initialValues);

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
					</Stack>
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
