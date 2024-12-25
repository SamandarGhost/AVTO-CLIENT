import React, { ChangeEvent, useEffect, useState } from 'react';
import { Box, CircularProgress, Stack, Typography } from '@mui/material';
import useDeviceDetect from '../../libs/hooks/useDeviceDetect';
import { NextPage } from 'next';
import SwiperCore, { Autoplay, Navigation, Pagination } from 'swiper';
import { useMutation, useQuery, useReactiveVar } from '@apollo/client';
import { useRouter } from 'next/router';
import { Property } from '../../libs/types/property/property';
import { REACT_APP_API_URL } from '../../libs/config';
import { userVar } from '../../apollo/store';
import { CommentInput, CommentsInquiry } from '../../libs/types/comment/comment.input';
import { Comment } from '../../libs/types/comment/comment';
import { CommentGroup } from '../../libs/enums/comment.enum';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import 'swiper/css';
import 'swiper/css/pagination';
import { GET_COMMENTS, GET_PROPERTIES, GET_PROPERTY } from '../../apollo/user/query';
import { CREATE_COMMENT, LIKE_CAR } from '../../apollo/user/mutation';
import { T } from '../../libs/types/common';
import { Direction, Message } from '../../libs/enums/common.enum';
import { sweetErrorHandling, sweetMixinErrorAlert, sweetTopSmallSuccessAlert } from '../../libs/sweetAlert';
import withLayoutBasic from '../../libs/components/layout/LayoutBasic';






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
        commentGroup: CommentGroup.CAR,
        commentContent: '',
        commentRefId: '',
    });

    /** APOLLO REQUESTS **/
    const [likeTargetProperty] = useMutation(LIKE_CAR);
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