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
import StarBorderIcon from '@mui/icons-material/StarBorder';






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
            <div id={'dealer-detail-page'}>
                <div className={'container'}>
                    <Stack className={'property-detail-config'}>
                        <Stack className={'property-info-config'}>
                            <Stack className={'info'}>
                                <Stack className={'left-box'}>
                                    <Typography className={'title-main'}>KIA London Branch</Typography>
                                    <Stack className={'bottom-box'}>
                                        <Stack className="option">
                                            <img src="/img/icons/perb.svg" alt="" />
                                            <Typography className={'icon'}>Performance:</Typography>
                                            <Typography>Good</Typography>
                                        </Stack>
                                        <Stack className="option">
                                            <img src="/img/icons/comfortb.svg" alt="" />
                                            <Typography className={'icon'}>Comfort:</Typography>
                                            <Typography>Perfect</Typography>
                                        </Stack>
                                        <Stack className="option">
                                            <img src="/img/icons/extb.svg" alt="" />
                                            <Typography className={'icon'}>Exteriror:</Typography>
                                            <Typography>Good</Typography>
                                        </Stack>
                                        <Stack className="option">
                                            <img src="/img/icons/intb.svg" alt="" />
                                            <Typography className={'icon'}>Interior:</Typography>
                                            <Typography>Nice</Typography>
                                        </Stack>
                                        <Stack className="option">
                                            <img src="/img/icons/relb.svg" alt="" />
                                            <Typography className={'icon'}>Realibility:</Typography>
                                            <Typography>Perfect</Typography>
                                        </Stack>
                                        <Stack className="option">
                                            <img src="/img/icons/fastb.svg" alt="" />
                                            <Typography className={'icon'}>Fast:</Typography>
                                            <Typography>Wow</Typography>
                                        </Stack>
                                    </Stack>
                                    <Stack className={'bottom-box'} sx={{ marginTop: '10px' }}>
                                        <Stack className="option">
                                            <Typography className={'icon'} sx={{ color: 'red' }}>Used Cars:</Typography>
                                            <Typography sx={{ color: 'red' }}>200</Typography>
                                        </Stack>
                                        <Stack className="option">
                                            <Typography className={'icon'} sx={{ color: 'blue' }}>New Cars:</Typography>
                                            <Typography sx={{ color: 'blue' }}>300</Typography>
                                        </Stack>
                                    </Stack>
                                </Stack>
                            </Stack>
                            <Stack className={'brand-img'}>
                                <Stack className={'main-image'}>
                                    <img
                                        src={slideImage ? `${REACT_APP_API_URL}/${slideImage}` : '/img/icons/bmwd.svg'}
                                        alt={'main-image'}
                                    />
                                </Stack>
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
                                                <img src="/img/icons/youtubeb.svg" alt="" />
                                                <Typography className={'data'}>bmw london branch</Typography>
                                                <img src="/img/icons/instab.svg" alt="" />
                                                <Typography className={'data'}>bmwlondon</Typography>
                                            </Box>
                                            <Box component={'div'} className={'social'}>
                                                <img src="/img/icons/nb.svg" alt="" />
                                                <Typography className={'data'}>kr blog bmw</Typography>
                                                <img src="/img/icons/tiktokb.svg" alt="" />
                                                <Typography className={'data'}>bmw tik tok</Typography>
                                                <img src="/img/icons/kakaotalkb.svg" alt="" />
                                                <Typography className={'data'}>bmw kakao</Typography>
                                                <img src="/img/icons/xcomb.svg" alt="" />
                                                <Typography className={'data'}>bmw xcom</Typography>
                                            </Box>
                                            <Box component={'div'} className={'info'}>
                                                <Typography className={'data'}>View All Cars</Typography>
                                            </Box>
                                        </Stack>
                                    </Stack>
                                </Stack>
                                <Stack className={'right-frame'}>
                                    <Stack className={'right-config'}>
                                        <Stack className={'right'}>
                                            <Typography className={'main-title'}>Opening Hours</Typography>
                                            <Box component={'div'} className={'info'}>
                                                <Typography className={'data'}>Mon-Fri</Typography>
                                                <Typography className={'icons'}>10:00 - 17:00</Typography>
                                            </Box>
                                            <Box component={'div'} className={'info'}>
                                                <Typography className={'data'}>Saturday</Typography>
                                                <Typography className={'icons'}>10:00 - 14:00</Typography>
                                            </Box>
                                            <Box component={'div'} className={'info'}>
                                                <Typography className={'data'}>Sunday</Typography>
                                                <Typography className={'icons'}>Closed</Typography>
                                            </Box>
                                            <Box component={'div'} className={'info'}>
                                                <Typography className={'data'}>Public Holdiays</Typography>
                                                <Typography className={'icons'}>Closed</Typography>
                                            </Box>
                                        </Stack>
                                    </Stack>
                                </Stack>
                            </Stack>
                            <Stack className={'images'}>
                                <Stack className={'sub-images'}>
                                    {property?.propertyImages.slice(0, 4).map((subImg: string) => {
                                        const imagePath: string = `${REACT_APP_API_URL}/${subImg}`;
                                        return (
                                            <Stack className={'sub-img-box'} onClick={() => changeImageHandler(subImg)} key={subImg}>
                                                <img src={''} alt={'sub-image'} />
                                            </Stack>
                                        );
                                    })}
                                </Stack>
                                <Stack className={'main-image'}>
                                    <img
                                        src={'/img/property/'}
                                        alt={'main-image'}
                                    />
                                </Stack>
                            </Stack>
                        </Stack>
                        <Stack className={'property-desc-config'}>
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
                                            <Stack className={'right'}>
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
                                    <Typography className={'title'}>Our Location</Typography>
                                    <Typography className={'address'}>United Kingdom, London City, London Street, BMW Branch 234-12</Typography>
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
                            <Stack className={'right-frame'}>
                                <Stack className={'like'}>
                                    <Stack className={'like-box'}>
                                        <Stack className={'right'}>
                                            <Box component={'div'} className={'overall'}>
                                                <Typography className={'data'}>Overall Rating</Typography>
                                                <Typography className={'num'}>7.9</Typography>
                                                <Typography className={'icons'}>Out Of 10</Typography>
                                            </Box>
                                            <Box component={'div'} className={'info'}>
                                                <Typography className={'data'}>Performance</Typography>
                                                <Typography className={'icons'}>
                                                    <StarPurple500OutlinedIcon />
                                                    7.9
                                                </Typography>
                                            </Box>
                                            <Box component={'div'} className={'info'}>
                                                <Typography className={'data'}>Comfort</Typography>
                                                <Typography className={'icons'}>
                                                    <StarPurple500OutlinedIcon />
                                                    8
                                                </Typography>
                                            </Box>
                                            <Box component={'div'} className={'info'}>
                                                <Typography className={'data'}>Exteriror</Typography>
                                                <Typography className={'icons'}>
                                                    <StarPurple500OutlinedIcon />
                                                    7.8
                                                </Typography>
                                            </Box>
                                            <Box component={'div'} className={'info'}>
                                                <Typography className={'data'}>Interior</Typography>
                                                <Typography className={'icons'}>
                                                    <StarPurple500OutlinedIcon />
                                                    8.5
                                                </Typography>
                                            </Box>
                                            <Box component={'div'} className={'info'}>
                                                <Typography className={'data'}>Perfect</Typography>
                                                <Typography className={'icons'}>
                                                    <StarPurple500OutlinedIcon />
                                                    7.3
                                                </Typography>
                                            </Box>
                                            <Box component={'div'} className={'info'}>
                                                <Typography className={'data'}>Fast</Typography>
                                                <Typography className={'icons'}>
                                                    <StarPurple500OutlinedIcon />
                                                    7.9
                                                </Typography>
                                            </Box>
                                        </Stack>
                                    </Stack>
                                </Stack>
                                <Stack className={'right-star'}>
                                    <Stack className={'info-box'}>
                                        <Typography className={'main-title'}>Were you satisfied with our service? (Rate from 1 to 10) </Typography>
                                    </Stack>
                                    <Stack className={'info-box'}>
                                        <Typography className={'sub-title'}>Performance:</Typography>
                                        <Box className={'star-box'}>
                                            <StarPurple500OutlinedIcon className={'star'} />
                                            <StarPurple500OutlinedIcon className={'star'} />
                                            <StarPurple500OutlinedIcon className={'star'} />
                                            <StarPurple500OutlinedIcon className={'star'} />
                                            <StarPurple500OutlinedIcon className={'star'} />
                                        </Box>
                                    </Stack>
                                    <Stack className={'info-box'}>
                                        <Typography className={'sub-title'}>Comfort:</Typography>
                                        <Box className={'star-box'}>
                                            <StarPurple500OutlinedIcon className={'star'} />
                                            <StarPurple500OutlinedIcon className={'star'} />
                                            <StarPurple500OutlinedIcon className={'star'} />
                                            <StarPurple500OutlinedIcon className={'star'} />
                                            <StarPurple500OutlinedIcon className={'star'} />
                                        </Box>
                                    </Stack>
                                    <Stack className={'info-box'}>
                                        <Typography className={'sub-title'}>Exteriror:</Typography>
                                        <Box className={'star-box'}>
                                            <StarPurple500OutlinedIcon className={'star'} />
                                            <StarPurple500OutlinedIcon className={'star'} />
                                            <StarPurple500OutlinedIcon className={'star'} />
                                            <StarPurple500OutlinedIcon className={'star'} />
                                            <StarPurple500OutlinedIcon className={'star'} />
                                        </Box>
                                    </Stack>
                                    <Stack className={'info-box'}>
                                        <Typography className={'sub-title'}>Interior:</Typography>
                                        <Box className={'star-box'}>
                                            <StarPurple500OutlinedIcon className={'star'} />
                                            <StarPurple500OutlinedIcon className={'star'} />
                                            <StarPurple500OutlinedIcon className={'star'} />
                                            <StarPurple500OutlinedIcon className={'star'} />
                                            <StarPurple500OutlinedIcon className={'star'} />
                                        </Box>
                                    </Stack>
                                    <Stack className={'info-box'}>
                                        <Typography className={'sub-title'}>Realibility:</Typography>
                                        <Box className={'star-box'}>
                                            <StarPurple500OutlinedIcon className={'star'} />
                                            <StarPurple500OutlinedIcon className={'star'} />
                                            <StarPurple500OutlinedIcon className={'star'} />
                                            <StarPurple500OutlinedIcon className={'star'} />
                                            <StarPurple500OutlinedIcon className={'star'} />
                                        </Box>
                                    </Stack>
                                    <Stack className={'info-box'}>
                                        <Typography className={'sub-title'}>Fast:</Typography>
                                        <Box className={'star-box'}>
                                            <StarPurple500OutlinedIcon className={'star'} />
                                            <StarPurple500OutlinedIcon className={'star'} />
                                            <StarPurple500OutlinedIcon className={'star'} />
                                            <StarPurple500OutlinedIcon className={'star'} />
                                            <StarPurple500OutlinedIcon className={'star'} />
                                        </Box>
                                    </Stack>
                                    <Stack className={'info-box'}>
                                        <Typography className={'sub-title'}>What suggestions do you have to improve our service?</Typography>
                                        <textarea placeholder={'Hello, I am interested in \n' + '[your posted car]'}></textarea>
                                    </Stack>
                                    <Stack className={'info-box'}>
                                        <Button className={'send-message'}>
                                            <Typography className={'title'}>Post Ranking</Typography>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="17" height="17" viewBox="0 0 17 17" fill="none">
                                                <g clipPath="url(#clip0_6975_593)">
                                                    <path
                                                        d="M16.0556 0.5H6.2778C6.03214 0.5 5.83334 0.698792 5.83334 0.944458C5.83334 1.19012 6.03214 1.38892 6.2778 1.38892H14.9827L0.630219 15.7413C0.456594 15.915 0.456594 16.1962 0.630219 16.3698C0.71701 16.4566 0.83076 16.5 0.944469 16.5C1.05818 16.5 1.17189 16.4566 1.25872 16.3698L15.6111 2.01737V10.7222C15.6111 10.9679 15.8099 11.1667 16.0556 11.1667C16.3013 11.1667 16.5001 10.9679 16.5001 10.7222V0.944458C16.5 0.698792 16.3012 0.5 16.0556 0.5Z"
                                                        fill="white"
                                                    />
                                                </g>
                                                <defs>
                                                    <clipPath id="clip0_6975_593">
                                                        <rect width="16" height="16" fill="white" transform="translate(0.5 0.5)" />
                                                    </clipPath>
                                                </defs>
                                            </svg>
                                        </Button>
                                    </Stack>
                                </Stack>
                                <Stack className={'right-config'}>
                                    <Stack className={'info-box'}>
                                        <Typography className={'main-title'}>Get More Information</Typography>
                                    </Stack>
                                    <Stack className={'info-box'}>
                                        <Typography className={'sub-title'}>Name</Typography>
                                        <input type={'text'} placeholder={'Enter your name'} />
                                    </Stack>
                                    <Stack className={'info-box'}>
                                        <Typography className={'sub-title'}>Phone</Typography>
                                        <input type={'text'} placeholder={'Enter your phone'} />
                                    </Stack>
                                    <Stack className={'info-box'}>
                                        <Typography className={'sub-title'}>Email</Typography>
                                        <input type={'text'} placeholder={'creativelayers088'} />
                                    </Stack>
                                    <Stack className={'info-box'}>
                                        <Typography className={'sub-title'}>Message</Typography>
                                        <textarea placeholder={'Hello, I am interested in \n' + '[your posted car]'}></textarea>
                                    </Stack>
                                    <Stack className={'info-box'}>
                                        <Button className={'send-message'}>
                                            <Typography className={'title'}>Send Message</Typography>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="17" height="17" viewBox="0 0 17 17" fill="none">
                                                <g clipPath="url(#clip0_6975_593)">
                                                    <path
                                                        d="M16.0556 0.5H6.2778C6.03214 0.5 5.83334 0.698792 5.83334 0.944458C5.83334 1.19012 6.03214 1.38892 6.2778 1.38892H14.9827L0.630219 15.7413C0.456594 15.915 0.456594 16.1962 0.630219 16.3698C0.71701 16.4566 0.83076 16.5 0.944469 16.5C1.05818 16.5 1.17189 16.4566 1.25872 16.3698L15.6111 2.01737V10.7222C15.6111 10.9679 15.8099 11.1667 16.0556 11.1667C16.3013 11.1667 16.5001 10.9679 16.5001 10.7222V0.944458C16.5 0.698792 16.3012 0.5 16.0556 0.5Z"
                                                        fill="white"
                                                    />
                                                </g>
                                                <defs>
                                                    <clipPath id="clip0_6975_593">
                                                        <rect width="16" height="16" fill="white" transform="translate(0.5 0.5)" />
                                                    </clipPath>
                                                </defs>
                                            </svg>
                                        </Button>
                                    </Stack>
                                </Stack>
                            </Stack>
                        </Stack>
                        {destinationProperties.length !== 0 && (
                            <Stack className={'similar-properties-config'}>
                                <Stack className={'title-pagination-box'}>
                                    <Stack className={'title-box'}>
                                        <Typography className={'main-title'}>Destination Cars</Typography>
                                        <Typography className={'sub-title'}>There are also similar cars available here</Typography>
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
                                                    <TrendPropertyCard property={property} likePropertyHandler={likePropertyHandler} key={property?._id} />
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