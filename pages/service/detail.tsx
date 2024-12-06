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
import StarPurple500OutlinedIcon from '@mui/icons-material/StarPurple500Outlined';






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
            <div id={'service-detail-page'}>
                <div className={'container'}>
                    <Stack className={'property-detail-config'}>
                        <Stack className={'property-info-config'}>
                            <Stack className={'info'}>
                                <Stack className={'left-box'}>
                                    <Typography className={'title-main'}>KIA London Branch</Typography>
                                </Stack>
                            </Stack>
                            <Stack className={'brand-img'}>
                                <Stack className={'right'}>
                                    <Stack className={'config'}>
                                        <Stack className={'right'}>
                                            <Typography className={'main-title'}>BMW</Typography>
                                            <Typography className={'small-title'}>
                                                Award-winning, family owned dealership of new and pre-owned vehicles. Lowest prices and the best customer service guaranteed.
                                            </Typography>
                                            <Box component={'div'} className={'social'}>
                                                <img src="/img/icons/addressb.svg" alt="" />
                                                <Typography className={'data'}>Melbourne VIC3051, Australia.</Typography>
                                                <img src="/img/icons/mailb.svg" alt="" />
                                                <Typography className={'data'}>bmwlondon@gamil.com</Typography>
                                            </Box>
                                            <Box component={'div'} className={'social'}>
                                                <img src="/img/icons/phoneb.svg" alt="" />
                                                <Typography className={'data'}>01048675455</Typography>
                                                <img src="/img/icons/callb.svg" alt="" />
                                                <Typography className={'data'}>01007078899</Typography>
                                                <img src="/img/icons/kakaotalkb.svg" alt="" />
                                                <Typography className={'data'}>bmw kakao</Typography>
                                            </Box>
                                            <Box component={'div'} className={'info'}>
                                                <Typography className={'data'}>Join For Membership</Typography>
                                            </Box>
                                        </Stack>
                                    </Stack>
                                </Stack>
                                <Stack className={'main-image'}>
                                    <img
                                        src={slideImage ? `${REACT_APP_API_URL}/${slideImage}` : '/img/icons/bmwd.svg'}
                                        alt={'main-image'}
                                    />
                                </Stack>
                            </Stack>
                            <Stack className={'images'}>
                                <Stack className={'main-image'}>
                                    <img
                                        src={slideImage ? `${REACT_APP_API_URL}/${slideImage}` : '/img/property/bigImage.png'}
                                        alt={'main-image'}
                                    />
                                </Stack>
                            </Stack>
                        </Stack>
                        <Stack className={'property-desc-config'}>
                            <Stack className={'right-frame'}>
                                <Stack className={'hour'}>
                                    <Stack className={'time'}>
                                        <Stack className={'right'}>
                                            <Typography className={'main-title'}>Opening Hours</Typography>
                                            <Box component={'div'} className={'info'}>
                                                <Typography className={'data'}>Mon-Fri</Typography>
                                                <Typography className={'icons'}>10:00 - 17:00</Typography>
                                            </Box>
                                            <Box component={'div'} className={'info'}>
                                                <Typography className={'data'}>Weekend</Typography>
                                                <Typography className={'icons'}>10:00 - 14:00</Typography>
                                            </Box>
                                            <Box component={'div'} className={'info'}>
                                                <Typography className={'data'}>Public Holdiays</Typography>
                                                <Typography className={'icons'}>Closed</Typography>
                                            </Box>
                                        </Stack>
                                    </Stack>
                                </Stack>
                                <Stack className={'frame'}>
                                    <Box className={'top'}>
                                        <Typography className={'main'}>Service</Typography>
                                        <div className={'div-m'}></div>
                                        <Typography className={'second'}>Location</Typography>
                                        <div></div>
                                    </Box>
                                    <Box className={'top'}>
                                        <Typography className={'second'}>Service</Typography>
                                        <div ></div>
                                        <Typography className={'main'}>Location</Typography>
                                        <div className={'div-m'}></div>
                                    </Box>
                                </Stack>
                            </Stack>
                            <Stack className={'left-config'}>
                                <Stack className={'prop-desc-config'}>
                                    <Stack className={'top'}>
                                        <Typography className={'title'}>Description</Typography>
                                    </Stack>
                                    <Stack className={'bottom'}>
                                        <Typography className={'data'}>Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in section 1.10.32.

                                            The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested. Sections 1.10.32 and 1.10.33 from "de Finibus Bonorum et Malorum" by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.</Typography>
                                    </Stack>
                                </Stack>
                                <Stack className={'prop-desc-config'}>
                                    <Stack className={'bottom'}>
                                        <Typography className={'title'}>Our Service</Typography>
                                        <Stack className={'info-box'}>
                                            <Stack className={'left'}>
                                                <Box component={'div'} className={'info'}>
                                                    <img src="/img/icons/fincb.svg" alt="" />
                                                    <Typography className={'data'}>Financing</Typography>
                                                </Box>
                                                <Box component={'div'} className={'info'}>
                                                    <img src="/img/icons/serb.svg" alt="" />
                                                    <Typography className={'data'}>Car Service</Typography>
                                                </Box>
                                                <Box component={'div'} className={'info'}>
                                                    <img src="/img/icons/tradeb.svg" alt="" />
                                                    <Typography className={'data'}>Trade In</Typography>
                                                </Box>
                                                <Box component={'div'} className={'info'}>
                                                    <img src="/img/icons/custom.svg" alt="" />
                                                    <Typography className={'data'}>Customization</Typography>
                                                </Box>
                                                <Box component={'div'} className={'info'}>
                                                    <img src="/img/icons/warb.svg" alt="" />
                                                    <Typography className={'data'}>Warranties</Typography>
                                                </Box>
                                                <Box component={'div'} className={'info'}>
                                                    <img src="/img/icons/partb.svg" alt="" />
                                                    <Typography className={'data'}>Car Parts</Typography>
                                                </Box>
                                                <Box component={'div'} className={'info'}>
                                                    <img src="/img/icons/accb.svg" alt="" />
                                                    <Typography className={'data'}>Accessories</Typography>
                                                </Box>
                                                <Box component={'div'} className={'info'}>
                                                    <img src="/img/icons/detailb.svg" alt="" />
                                                    <Typography className={'data'}>Car Detailing</Typography>
                                                </Box>
                                                <Box component={'div'} className={'info'}>
                                                    <img src="/img/icons/washb.svg" alt="" />
                                                    <Typography className={'data'}>Car Wash</Typography>
                                                </Box>
                                                <Box component={'div'} className={'info'}>
                                                    <img src="/img/icons/testb.svg" alt="" />
                                                    <Typography className={'data'}>Test Drive</Typography>
                                                </Box>
                                                <Box component={'div'} className={'info'}>
                                                    <img src="/img/icons/delb.svg" alt="" />
                                                    <Typography className={'data'}>Delivery</Typography>
                                                </Box>
                                                <Box component={'div'} className={'info'}>
                                                    <img src="/img/icons/plus.svg" alt="" />
                                                    <Typography className={'data'}>Plus Service</Typography>
                                                </Box>
                                            </Stack>
                                        </Stack>
                                    </Stack>
                                </Stack>
                                <Stack className={'address-config'}>
                                    <Typography className={'title'}>Location</Typography>
                                    <Stack className={'map-box'}>
                                        <iframe
                                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d25867.098915951767!2d128.68632810247993!3d35.86402299180927!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x35660bba427bf179%3A0x1fc02da732b9072f!2sGeumhogangbyeon-ro%2C%20Dong-gu%2C%20Daegu!5e0!3m2!1suz!2skr!4v1695537640704!5m2!1suz!2skr"
                                            width="100%"
                                            height="100%"
                                            style={{ border: 0 }}
                                            allowFullScreen={true}
                                            loading="lazy"
                                            referrerPolicy="no-referrer-when-downgrade"
                                        ></iframe>
                                    </Stack>
                                </Stack>
                            </Stack>
                        </Stack>
                    </Stack>
                </div>
            </div >
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