import React, { ChangeEvent, useEffect, useState } from 'react';
import { Box, Button, Checkbox, CircularProgress, Stack, Typography } from '@mui/material';
import useDeviceDetect from '../../libs/hooks/useDeviceDetect';
import withLayoutFull from '../../libs/components/layout/LayoutFull';
import { NextPage } from 'next';
import Review from '../../libs/components/property/Review';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Autoplay, Navigation, Pagination } from 'swiper';
import PropertyBigCard from '../../libs/components/common/PropertyBigCard';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import WestIcon from '@mui/icons-material/West';
import EastIcon from '@mui/icons-material/East';
import { useMutation, useQuery, useReactiveVar } from '@apollo/client';
import { useRouter } from 'next/router';
import { Property } from '../../libs/types/property/property';
import moment from 'moment';
import { formatterStr } from '../../libs/utils';
import { REACT_APP_API_URL } from '../../libs/config';
import { userVar } from '../../apollo/store';
import { CommentInput, CommentsInquiry } from '../../libs/types/comment/comment.input';
import { Comment } from '../../libs/types/comment/comment';
import { CommentGroup } from '../../libs/enums/comment.enum';
import { Pagination as MuiPagination } from '@mui/material';
import Link from 'next/link';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import 'swiper/css';
import 'swiper/css/pagination';
import { GET_COMMENTS, GET_PROPERTIES, GET_PROPERTY } from '../../apollo/user/query';
import { CREATE_COMMENT, LIKE_TARGET_PROPERTY } from '../../apollo/user/mutation';
import { T } from '../../libs/types/common';
import { Direction, Message } from '../../libs/enums/common.enum';
import { sweetErrorHandling, sweetMixinErrorAlert, sweetTopSmallSuccessAlert } from '../../libs/sweetAlert';
import withLayoutBasic from '../../libs/components/layout/LayoutBasic';
import withLayoutMain from '../../libs/components/layout/LayoutHome';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import LanguageOutlinedIcon from '@mui/icons-material/LanguageOutlined'; // country
import CarRepairOutlinedIcon from '@mui/icons-material/CarRepairOutlined'; // brand
import HandymanOutlinedIcon from '@mui/icons-material/HandymanOutlined'; // repair
import MinorCrashOutlinedIcon from '@mui/icons-material/MinorCrashOutlined'; // crush
import ApartmentOutlinedIcon from '@mui/icons-material/ApartmentOutlined'; // city
import AddRoadOutlinedIcon from '@mui/icons-material/AddRoadOutlined'; // highway
import SpeedOutlinedIcon from '@mui/icons-material/SpeedOutlined'; // max speed
import ElectricBoltOutlinedIcon from '@mui/icons-material/ElectricBoltOutlined'; // hundred speed
import HeightOutlinedIcon from '@mui/icons-material/HeightOutlined'; // height
import DirectionsCarOutlinedIcon from '@mui/icons-material/DirectionsCarOutlined'; //width
import AirportShuttleOutlinedIcon from '@mui/icons-material/AirportShuttleOutlined'; // lenght
import ScaleOutlinedIcon from '@mui/icons-material/ScaleOutlined'; // weight
import LocalShippingOutlinedIcon from '@mui/icons-material/LocalShippingOutlined'; // load weight
import DonutSmallOutlinedIcon from '@mui/icons-material/DonutSmallOutlined'; // tire size
import AirlineSeatReclineNormalOutlinedIcon from '@mui/icons-material/AirlineSeatReclineNormalOutlined'; //seats up
import SwapHorizontalCircleOutlinedIcon from '@mui/icons-material/SwapHorizontalCircleOutlined'; // wheela base
import DoneAllOutlinedIcon from '@mui/icons-material/DoneAllOutlined';
import TimeToLeaveOutlinedIcon from '@mui/icons-material/TimeToLeaveOutlined'; // cruise control
import SurroundSoundOutlinedIcon from '@mui/icons-material/SurroundSoundOutlined'; // esc
import NoCrashOutlinedIcon from '@mui/icons-material/NoCrashOutlined'; // auto drive
import FlashlightOnOutlinedIcon from '@mui/icons-material/FlashlightOnOutlined'; // exterior light
import LightModeOutlinedIcon from '@mui/icons-material/LightModeOutlined'; // ponarama
import AirlineSeatLegroomExtraOutlinedIcon from '@mui/icons-material/AirlineSeatLegroomExtraOutlined'; // heated seat
import AcUnitOutlinedIcon from '@mui/icons-material/AcUnitOutlined'; // cool seat
import SmartDisplayOutlinedIcon from '@mui/icons-material/SmartDisplayOutlined'; // touch screen display
import HighlightOutlinedIcon from '@mui/icons-material/HighlightOutlined'; // auto head light
import PanToolAltOutlinedIcon from '@mui/icons-material/PanToolAltOutlined'; // start stop
import NoiseControlOffOutlinedIcon from '@mui/icons-material/NoiseControlOffOutlined'; // noise cencellation
import SettingsRemoteOutlinedIcon from '@mui/icons-material/SettingsRemoteOutlined'; // remote keyylass
import SendOutlinedIcon from '@mui/icons-material/SendOutlined'; // laneDw\
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined'; // blind monitoring
import CommuteOutlinedIcon from '@mui/icons-material/CommuteOutlined'; //  rear traffic alert
import AirplayOutlinedIcon from '@mui/icons-material/AirplayOutlined'; // apple play
import CastOutlinedIcon from '@mui/icons-material/CastOutlined'; // android play
import RecordVoiceOverOutlinedIcon from '@mui/icons-material/RecordVoiceOverOutlined'; // voice control
import BluetoothConnectedOutlinedIcon from '@mui/icons-material/BluetoothConnectedOutlined'; // car bluetooth
import ElectricalServicesOutlinedIcon from '@mui/icons-material/ElectricalServicesOutlined'; // charging
import LocalParkingOutlinedIcon from '@mui/icons-material/LocalParkingOutlined'; // parking assist
import ThreeSixtyOutlinedIcon from '@mui/icons-material/ThreeSixtyOutlined'; // 360 camera
import SkipPreviousOutlinedIcon from '@mui/icons-material/SkipPreviousOutlined'; // back sensor
import SkipNextOutlinedIcon from '@mui/icons-material/SkipNextOutlined'; // front sensor
import CameraOutlinedIcon from '@mui/icons-material/CameraOutlined'; // front camera
import FlipCameraAndroidOutlinedIcon from '@mui/icons-material/FlipCameraAndroidOutlined'; // rear camera
import LensBlurOutlinedIcon from '@mui/icons-material/LensBlurOutlined'; // heads up display
import ThunderstormOutlinedIcon from '@mui/icons-material/ThunderstormOutlined'; // climate control
import AirlineSeatReclineExtraOutlinedIcon from '@mui/icons-material/AirlineSeatReclineExtraOutlined'; // adjustable seat
import PsychologyOutlinedIcon from '@mui/icons-material/PsychologyOutlined'; // memory seat
import BatteryCharging20OutlinedIcon from '@mui/icons-material/BatteryCharging20Outlined'; // regenerative braking
import DeblurOutlinedIcon from '@mui/icons-material/DeblurOutlined'; // traction control
import VideoStableOutlinedIcon from '@mui/icons-material/VideoStableOutlined'; // stability
import TimelineOutlinedIcon from '@mui/icons-material/TimelineOutlined'; //hill start
import TireRepairOutlinedIcon from '@mui/icons-material/TireRepairOutlined'; // tire pressure
import TouchAppOutlinedIcon from '@mui/icons-material/TouchAppOutlined'; // push button
import TrendPropertyCard from '../../libs/components/homepage/TrendPropertyCard';
import PushPinOutlinedIcon from '@mui/icons-material/PushPinOutlined';
import FitbitOutlinedIcon from '@mui/icons-material/FitbitOutlined'; // flibit
import PasswordOutlinedIcon from '@mui/icons-material/PasswordOutlined';
import AlternateEmailOutlinedIcon from '@mui/icons-material/AlternateEmailOutlined';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import PropertyCard from '../../libs/components/shop/PropertyCard';






SwiperCore.use([Autoplay, Navigation, Pagination]);

export const getStaticProps = async ({ locale }: any) => ({
    props: {
        ...(await serverSideTranslations(locale, ['common'])),
    },
});

const PropertyDetail: NextPage = ({ initialComment, ...props }: any) => {
    const device = useDeviceDetect();
    const router = useRouter();
    const user = useReactiveVar(userVar);
    const [propertyId, setPropertyId] = useState<string | null>(null);
    const [property, setProperty] = useState<Property | null>(null);
    const [slideImage, setSlideImage] = useState<string>('');
    const [destinationProperties, setDestinationProperty] = useState<Property[]>([]);
    const [commentInquiry, setCommentInquiry] = useState<CommentsInquiry>(initialComment);
    const [propertyComments, setPropertyComments] = useState<Comment[]>([]);
    const [commentTotal, setCommentTotal] = useState<number>(0);
    const [insertCommentData, setInsertCommentData] = useState<CommentInput>({
        commentGroup: CommentGroup.PROPERTY,
        commentContent: '',
        commentRefId: '',
    });

    /** APOLLO REQUESTS **/
    const [likeTargetProperty] = useMutation(LIKE_TARGET_PROPERTY);
    const [createComment] = useMutation(CREATE_COMMENT);
    const {
        loading: getPropertyLoading,
        data: getPropertyData,
        error: getPropertyError,
        refetch: getPropertyRefetch
    } = useQuery(GET_PROPERTY, {
        fetchPolicy: 'network-only',
        variables: { input: propertyId },
        skip: !propertyId,
        notifyOnNetworkStatusChange: true,
        onCompleted: (data: T) => {
            if (data?.getProperty) setProperty(data?.getProperty);
            if (data?.getProperty) setSlideImage(data?.getProperty?.propertyImages[0]);
        },
    });

    const {
        loading: getPropertiesLoading,
        data: getPropertiesData,
        error: getPropertiesError,
        refetch: getPropertiesRefetch
    } = useQuery(GET_PROPERTIES, {
        fetchPolicy: 'cache-and-network',
        variables: {
            input: {
                page: 1,
                limit: 4,
                sort: 'createdAt',
                direction: Direction.DESC,
                search: {
                    locationList: property?.propertyLocation ? [property?.propertyLocation] : [],
                },

            },
        },
        skip: !propertyId && !property,
        notifyOnNetworkStatusChange: true,
        onCompleted: (data: T) => {
            if (data?.getProperties) setDestinationProperty(data?.getProperties?.list);
        },
    });

    const {
        loading: getCommentsLoading,
        data: getCommentsData,
        error: getCommentsError,
        refetch: getCommentsRefetch
    } = useQuery(GET_COMMENTS, {
        fetchPolicy: 'cache-and-network',
        variables: { input: initialComment },
        skip: !commentInquiry.search.commentRefId,
        notifyOnNetworkStatusChange: true,
        onCompleted: (data: T) => {
            if (data?.getComments?.list) setPropertyComments(data?.getComments?.list);
            setCommentTotal(data?.getComments?.metaCounter[0]?.total ?? 0);
        },
    });

    /** LIFECYCLES **/
    useEffect(() => {
        if (router.query.id) {
            setPropertyId(router.query.id as string);
            setCommentInquiry({
                ...commentInquiry,
                search: {
                    commentRefId: router.query.id as string,
                },
            });
            setInsertCommentData({
                ...insertCommentData,
                commentRefId: router.query.id as string,
            });
        }
    }, [router]);

    useEffect(() => {
        if (commentInquiry.search.commentRefId) {
            getCommentsRefetch({ input: commentInquiry });
        }
    }, [commentInquiry]);

    /** HANDLERS **/
    const changeImageHandler = (image: string) => {
        setSlideImage(image);
    };

    const likePropertyHandler = async (user: T, id: string) => {
        try {
            if (!id) return;
            if (!user._id) throw new Error(Message.NOT_AUTHENTICATED);

            // execute likePropertyHandler mutation

            await likeTargetProperty({
                variables: { input: id },
            });

            // execute getPropertiesRefetch
            await getPropertyRefetch({ input: id });
            getPropertiesRefetch({
                input: {
                    page: 1,
                    limit: 4,
                    sort: 'createdAt',
                    direction: Direction.DESC,
                    search: {
                        locationList: [property?.propertyLocation],
                    },
                },
            });

            await sweetTopSmallSuccessAlert('seccess', 800);
        } catch (err: any) {
            console.log('ERROR, likePropertyHandler:', err);
            sweetMixinErrorAlert(err.message).then;
        }
    };

    const commentPaginationChangeHandler = async (event: ChangeEvent<unknown>, value: number) => {
        commentInquiry.page = value;
        setCommentInquiry({ ...commentInquiry });
    };

    const createCommentHandler = async () => {
        try {
            if (!user._id) throw new Error(Message.NOT_AUTHENTICATED);
            await createComment({ variables: { input: insertCommentData } });

            setInsertCommentData({ ...insertCommentData, commentContent: '' });

            await getCommentsRefetch({ input: commentInquiry });
        } catch (err: any) {
            await sweetErrorHandling(err);
        }
    };

    if (getPropertyLoading) {
        return (
            <Stack sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%', height: '1080px' }}>
                <CircularProgress size={'4rem'} />
            </Stack>
        );
    };

    if (device === 'mobile') {
        return <div>PROPERTY DETAIL PAGE</div>;
    } else {
        return (
            <div id={'shop-detail-page'}>
                <div className={'container'}>
                    <Stack className={'property-detail-config'}>
                        <Typography className={'main-text'}>Shop Page:</Typography>
                        <Stack className={'property-info-config'}>
                            <Stack className={'info'}>
                                <Stack className={'right-box'}>
                                    <Stack className="buttons">
                                        <Stack className="button-box">
                                            <RemoveRedEyeIcon fontSize="medium" />
                                            <Typography>{property?.propertyViews}</Typography>
                                        </Stack>
                                        <Stack className="button-box">
                                            {property?.meLiked && property?.meLiked[0]?.myFavorite ? (

                                                <FavoriteIcon
                                                    // @ts-ignore
                                                    onClick={() => likePropertyHandler(user, property?._id)}
                                                    color="primary" fontSize={'medium'} />
                                            ) : (
                                                <FavoriteBorderIcon
                                                    fontSize={'medium'}
                                                    // @ts-ignore
                                                    onClick={() => likePropertyHandler(user, property?._id)}
                                                />
                                            )}
                                            <Typography>{property?.propertyLikes}</Typography>
                                        </Stack>
                                    </Stack>
                                </Stack>
                            </Stack>
                            <Stack className={'images'}>
                                <Stack className={'main-image'}>
                                    <Stack className={'sub-images'}>
                                        {property?.propertyImages.map((subImg: string) => {
                                            const imagePath: string = `${REACT_APP_API_URL}/${subImg}`;
                                            return (
                                                <Stack className={'sub-img-box'} onClick={() => changeImageHandler(subImg)} key={subImg}>
                                                    <img src={imagePath} alt={'sub-image'} />
                                                </Stack>
                                            );
                                        })}
                                    </Stack>
                                    <Stack className={'main'}>
                                        <img
                                            src={slideImage ? `${REACT_APP_API_URL}/${slideImage}` : '/img/property/bigImage.png'}
                                            alt={'main-image'}
                                        />
                                    </Stack>
                                </Stack>
                                <Stack className={'right-frame'}>
                                    <Stack className={'right-config'}>
                                        <Stack className={'text'}>
                                            <Typography className={'main-title'}>Kit Brembo DT BMW</Typography>
                                        </Stack>
                                        <Stack className={'info-box'}>
                                            <Typography className={'title'}>$399</Typography>
                                        </Stack>
                                        <Stack className={'info-box'}>
                                            <Typography className={'sub-title'}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Tempus nulla faucibus viverra nisl non senectus tortor. </Typography>
                                        </Stack>
                                        <Stack className={'info'}>
                                            <Box className={'box'}>
                                                <Typography className={'quantity'}>-</Typography>
                                                12
                                                <Typography className={'quantity'}>+</Typography>
                                            </Box>
                                            <Button className={'add'}>
                                                <ShoppingCartOutlinedIcon className={'icon'} />
                                                Add To Card
                                            </Button>
                                        </Stack>
                                        <Stack className={'info-box'}>
                                            <Typography className={'cat-title'}>Catergory: Oil</Typography>
                                            <Typography className={'cat-title'}>$399</Typography>
                                            <Typography className={'cat-title'}>$399</Typography>
                                        </Stack>
                                    </Stack>
                                </Stack>
                            </Stack>
                        </Stack>
                        <Stack className={'property-desc-config'}>
                            <Stack className={'right-frame'}>
                                <Box className={'top'}>
                                    <Typography className={'main'}>Description</Typography>
                                    <div className={'div-m'}></div>
                                    <Typography className={'second'}>Reviews</Typography>
                                    <div></div>
                                </Box>
                                <Box className={'top'}>
                                    <Typography className={'second'}>Description</Typography>
                                    <div ></div>
                                    <Typography className={'main'}>Reviews</Typography>
                                    <div className={'div-m'}></div>
                                </Box>
                            </Stack>
                            <Stack className={'left-config'}>
                                <Stack className={'prop-desc-config'}>
                                    <Stack className={'top'}>
                                        <Typography className={'title'}>Car Description</Typography>
                                    </Stack>
                                    <Stack className={'bottom'}>
                                        <Typography className={'data'}>Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in section 1.10.32.

                                            The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested. Sections 1.10.32 and 1.10.33 from "de Finibus Bonorum et Malorum" by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.</Typography>
                                    </Stack>
                                </Stack>
                                {commentTotal !== 0 && (
                                    <Stack className={'reviews-config'}>
                                        <Stack className={'filter-box'}>
                                            <Stack className={'review-cnt'}>
                                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="12" viewBox="0 0 16 12" fill="none">
                                                    <g clipPath="url(#clip0_6507_7309)">
                                                        <path
                                                            d="M15.7183 4.60288C15.6171 4.3599 15.3413 4.18787 15.0162 4.16489L10.5822 3.8504L8.82988 0.64527C8.7005 0.409792 8.40612 0.257812 8.07846 0.257812C7.7508 0.257812 7.4563 0.409792 7.32774 0.64527L5.57541 3.8504L1.14072 4.16489C0.815641 4.18832 0.540363 4.36035 0.438643 4.60288C0.337508 4.84586 0.430908 5.11238 0.676772 5.28084L4.02851 7.57692L3.04025 10.9774C2.96794 11.2275 3.09216 11.486 3.35771 11.636C3.50045 11.717 3.66815 11.7575 3.83643 11.7575C3.98105 11.7575 4.12577 11.7274 4.25503 11.667L8.07846 9.88098L11.9012 11.667C12.1816 11.7979 12.5342 11.7859 12.7992 11.636C13.0648 11.486 13.189 11.2275 13.1167 10.9774L12.1284 7.57692L15.4801 5.28084C15.7259 5.11238 15.8194 4.84641 15.7183 4.60288Z"
                                                            fill="#181A20"
                                                        />
                                                    </g>
                                                    <defs>
                                                        <clipPath id="clip0_6507_7309">
                                                            <rect width="15.36" height="12" fill="white" transform="translate(0.398438)" />
                                                        </clipPath>
                                                    </defs>
                                                </svg>
                                                <Typography className={'reviews'}>{commentTotal} reviews</Typography>
                                            </Stack>
                                        </Stack>
                                        <Stack className={'review-list'}>
                                            {propertyComments?.map((comment: Comment) => {
                                                return <Review comment={comment} key={comment?._id} />;
                                            })}
                                            <Box component={'div'} className={'pagination-box'}>
                                                <MuiPagination
                                                    page={commentInquiry.page}
                                                    count={Math.ceil(commentTotal / commentInquiry.limit)}
                                                    onChange={commentPaginationChangeHandler}
                                                    shape="circular"
                                                    color="secondary"
                                                />
                                            </Box>
                                        </Stack>
                                    </Stack>
                                )}
                                <Stack className={'leave-review-config'}>
                                    <Typography className={'main-title'}>Leave A Review</Typography>
                                    <Typography className={'review-title'}>Review</Typography>
                                    <textarea
                                        onChange={({ target: { value } }: any) => {
                                            setInsertCommentData({ ...insertCommentData, commentContent: value });
                                        }}
                                        value={insertCommentData.commentContent}
                                    ></textarea>
                                    <Box className={'submit-btn'} component={'div'}>
                                        <Button
                                            className={'submit-review'}
                                            disabled={insertCommentData.commentContent === '' || user?._id === ''}
                                            onClick={createCommentHandler}
                                        >
                                            <Typography className={'title'}>Comment Post</Typography>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="17" height="17" viewBox="0 0 17 17" fill="none">
                                                <g clipPath="url(#clip0_6975_3642)">
                                                    <path
                                                        d="M16.1571 0.5H6.37936C6.1337 0.5 5.93491 0.698792 5.93491 0.944458C5.93491 1.19012 6.1337 1.38892 6.37936 1.38892H15.0842L0.731781 15.7413C0.558156 15.915 0.558156 16.1962 0.731781 16.3698C0.818573 16.4566 0.932323 16.5 1.04603 16.5C1.15974 16.5 1.27345 16.4566 1.36028 16.3698L15.7127 2.01737V10.7222C15.7127 10.9679 15.9115 11.1667 16.1572 11.1667C16.4028 11.1667 16.6016 10.9679 16.6016 10.7222V0.944458C16.6016 0.698792 16.4028 0.5 16.1571 0.5Z"
                                                        fill="#181A20"
                                                    />
                                                </g>
                                                <defs>
                                                    <clipPath id="clip0_6975_3642">
                                                        <rect width="16" height="16" fill="white" transform="translate(0.601562 0.5)" />
                                                    </clipPath>
                                                </defs>
                                            </svg>
                                        </Button>
                                    </Box>
                                </Stack>
                            </Stack>
                        </Stack>
                        {destinationProperties.length !== 0 && (
                            <Stack className={'similar-properties-config'}>
                                <Stack className={'title-pagination-box'}>
                                    <Stack className={'title-box'}>
                                        <Typography className={'main-title'}>Destination Products</Typography>
                                        <Typography className={'sub-title'}>There are also similar Products available here</Typography>
                                    </Stack>
                                    <Stack className={'pagination-box'}>
                                        <WestIcon className={'swiper-similar-prev'} />
                                        <div className={'swiper-similar-pagination'}></div>
                                        <EastIcon className={'swiper-similar-next'} />
                                    </Stack>
                                </Stack>
                                <Stack className={'cards-box'}>
                                    <Swiper
                                        className={'similar-homes-swiper'}
                                        slidesPerView={'auto'}
                                        spaceBetween={35}
                                        modules={[Autoplay, Navigation, Pagination]}
                                        navigation={{
                                            nextEl: '.swiper-similar-next',
                                            prevEl: '.swiper-similar-prev',
                                        }}
                                        pagination={{
                                            el: '.swiper-similar-pagination',
                                        }}
                                    >
                                        {destinationProperties.map((property: Property) => {
                                            return (
                                                <SwiperSlide className={'similar-homes-slide'} key={property.propertyTitle}>
                                                    <PropertyCard property={property} likePropertyHandler={likePropertyHandler} key={property?._id} />
                                                </SwiperSlide>
                                            );
                                        })}
                                    </Swiper>
                                </Stack>
                            </Stack>
                        )}
                    </Stack>
                </div>
            </div>
        );
    }
};

PropertyDetail.defaultProps = {
    initialComment: {
        page: 1,
        limit: 5,
        sort: 'createdAt',
        direction: 'DESC',
        search: {
            commentRefId: '',
        },
    },
};

export default withLayoutBasic(PropertyDetail);