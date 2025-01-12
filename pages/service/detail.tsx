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
import { GET_CAR, GET_CARS, GET_COMMENTS, GET_MEMBER } from '../../apollo/user/query';
import { CREATE_COMMENT, LIKE_CAR, LIKE_MEMBER } from '../../apollo/user/mutation';
import { T } from '../../libs/types/common';
import { Direction, Message } from '../../libs/enums/common.enum';
import { sweetErrorHandling, sweetMixinErrorAlert, sweetTopSmallSuccessAlert } from '../../libs/sweetAlert';
import withLayoutBasic from '../../libs/components/layout/LayoutBasic';
import { Member } from '../../libs/types/member/member';
import Link from 'next/link';



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
    const [serviceId, setServiceId] = useState<string | null>(null);
    const [service, setService] = useState<Member | null>(null);
    const [slideImage, setSlideImage] = useState<string>('');

    /** APOLLO REQUESTS **/
    const [likeTargetMember] = useMutation(LIKE_MEMBER);
    const [createComment] = useMutation(CREATE_COMMENT);
    const {
        loading: getMemberLoading,
        data: getMmeberData,
        error: getMemberError,
        refetch: getMemberRefetch
    } = useQuery(GET_MEMBER, {
        fetchPolicy: 'network-only',
        variables: { input: serviceId },
        skip: !serviceId,
        notifyOnNetworkStatusChange: true,
        onCompleted: (data: T) => {
            if (data?.getMember) setService(data?.getMember);
            if (data?.getMember) setSlideImage(data?.getMember?.images?.[0]);
        },
    });

    /** LIFECYCLES **/
    useEffect(() => {
        if (router?.query?.serviceId) {
            setServiceId(router.query.serviceId as string);
        }
    }, [router]);

    /** HANDLERS **/
    const changeImageHandler = (image: string) => {
        setSlideImage(image);
    };

    const likeServiceHandler = async (user: T, id: string) => {
        try {
            if (!id) return;
            if (!user._id) throw new Error(Message.NOT_AUTHENTICATED);
            await likeTargetMember({
                variables: { input: id },
            });

            await getMemberRefetch({ input: id });

            await sweetTopSmallSuccessAlert('seccess', 800);
        } catch (err: any) {
            sweetMixinErrorAlert(err.message).then;
        }
    };

    if (getMemberLoading) {
        return (
            <Stack sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%', height: '1080px' }}>
                <CircularProgress size={'4rem'} />
            </Stack>
        );
    };

    if (device === 'mobile') {
        return <div>SERVICE DETAIL PAGE</div>;
    } else {
        return (
            <div id={'service-detail-page'}>
                <div className={'container'}>
                    <Stack className={'property-detail-config'}>
                        <Stack className={'property-info-config'}>
                            <Stack className={'info'}>
                                <Stack className={'left-box'}>
                                    <Typography className={'title-main'}>{service?.titleNick}</Typography>
                                </Stack>
                            </Stack>
                            <Stack className={'brand-img'}>
                                <Stack className={'right'}>
                                    <Stack className={'config'}>
                                        <Stack className={'right'}>
                                            <Typography className={'main-title'}>service type</Typography>
                                            <Typography className={'small-title'}>
                                                {service?.shortDesc}
                                            </Typography>
                                            <Box component={'div'} className={'social'}>
                                                {service?.address?.trim() && (
                                                    <>
                                                        <img src="/img/icons/addressb.svg" alt="" />
                                                        <Typography className={'data'}>{service?.address}</Typography>
                                                    </>
                                                )}
                                                {service?.email?.trim() && (
                                                    <>
                                                        <img src="/img/icons/mailb.svg" alt="" />
                                                        <Typography className={'data'}>{service?.email}</Typography>
                                                    </>
                                                )}
                                            </Box>
                                            <Box component={'div'} className={'social'}>
                                                {service?.phone.trim() && (
                                                    <>
                                                        <img src="/img/icons/phoneb.svg" alt="" />
                                                        <Typography className={'data'}>{service?.phone}</Typography>
                                                    </>
                                                )}
                                                {service?.phone2?.trim() && (
                                                    <>
                                                        <img src="/img/icons/callb.svg" alt="" />
                                                        <Typography className={'data'}>{service?.phone2}</Typography>
                                                    </>
                                                )}
                                                {service?.kakaoTalk?.trim() && (
                                                    <>
                                                        <img src="/img/icons/kakaotalkb.svg" alt="" />
                                                        <Typography className={'data'}>{service?.kakaoTalk}</Typography>
                                                    </>
                                                )}
                                            </Box>
                                            <Box component={'div'} className={'info'}>
                                                <Link
                                                    href={'/service/membership'}
                                                    className={'data'}>Join For Membership
                                                </Link>
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
                                                {(service?.openAt?.trim() || service?.closeAt?.trim()) ? (
                                                    <Typography className={'icons'}>
                                                        {`${service?.openAt || 'N/A'} - ${service?.closeAt || 'N/A'}`}
                                                    </Typography>
                                                ) : (
                                                    <Typography className={'icons'}>Not Yet</Typography>
                                                )}
                                            </Box>
                                            <Box component={'div'} className={'info'}>
                                                <Typography className={'data'}>Saturday</Typography>
                                                {(service?.openSaturday?.trim() || service?.closeSaturday?.trim()) ? (
                                                    <Typography className={'icons'}>
                                                        {`${service?.openSaturday || 'N/A'} - ${service?.closeSaturday || 'N/A'}`}
                                                    </Typography>
                                                ) : (
                                                    <Typography className={'icons'}>Not Yet</Typography>
                                                )}
                                            </Box>
                                            <Box component={'div'} className={'info'}>
                                                <Typography className={'data'}>Sunday</Typography>
                                                {(service?.openSunday?.trim() || service?.closeSunday?.trim()) ? (
                                                    <Typography className={'icons'}>
                                                        {`${service?.openSunday || 'N/A'} - ${service?.closeSunday || 'N/A'}`}
                                                    </Typography>
                                                ) : (
                                                    <Typography className={'icons'}>Not Yet</Typography>
                                                )}
                                            </Box>
                                            <Box component={'div'} className={'info'}>
                                                <Typography className={'data'}>Public Holdiays</Typography>
                                                {service?.publicHolidays === true ? (
                                                    <Typography className={'icons'}>Open</Typography>
                                                ) : (
                                                    <Typography className={'icons'}>Closed</Typography>
                                                )}
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
                                        <Typography className={'data'}>
                                            {service?.longDesc}
                                        </Typography>
                                    </Stack>
                                </Stack>
                                <Stack className={'prop-desc-config'}>
                                    <Stack className={'bottom'}>
                                        <Typography className={'title'}>Our Service</Typography>
                                        <Stack className={'info-box'}>
                                            <Stack className={'left'}>
                                                {service?.carOilChange === true && (
                                                    <Box component={'div'} className={'info'}>
                                                        <img src="/img/icons/fincb.svg" alt="" />
                                                        <Typography className={'data'}>Oil Change</Typography>
                                                    </Box>
                                                )}
                                                {service?.carAlignment === true && (
                                                    <Box component={'div'} className={'info'}>
                                                        <img src="/img/icons/serb.svg" alt="" />
                                                        <Typography className={'data'}>Car Alignment</Typography>
                                                    </Box>
                                                )}
                                                {service?.carTireChange === true && (
                                                    <Box component={'div'} className={'info'}>
                                                        <img src="/img/icons/tradeb.svg" alt="" />
                                                        <Typography className={'data'}>Tire Change</Typography>
                                                    </Box>
                                                )}
                                                {service?.carTireBalance === true && (
                                                    <Box component={'div'} className={'info'}>
                                                        <img src="/img/icons/partb.svg" alt="" />
                                                        <Typography className={'data'}>Car Parts</Typography>
                                                    </Box>
                                                )}
                                                {service?.carBrakeCheck === true && (
                                                    <Box component={'div'} className={'info'}>
                                                        <img src="/img/icons/custom.svg" alt="" />
                                                        <Typography className={'data'}>Brake Check</Typography>
                                                    </Box>
                                                )}
                                                {service?.carBatteryCheck === true && (
                                                    <Box component={'div'} className={'info'}>
                                                        <img src="/img/icons/custom.svg" alt="" />
                                                        <Typography className={'data'}>Battery Check</Typography>
                                                    </Box>
                                                )}
                                                {service?.carSuspension === true && (
                                                    <Box component={'div'} className={'info'}>
                                                        <img src="/img/icons/accb.svg" alt="" />
                                                        <Typography className={'data'}>Car Suspension</Typography>
                                                    </Box>
                                                )}
                                                {service?.carAirCondition === true && (
                                                    <Box component={'div'} className={'info'}>
                                                        <img src="/img/icons/detailb.svg" alt="" />
                                                        <Typography className={'data'}>Air Condition</Typography>
                                                    </Box>
                                                )}
                                                {service?.carTransmissionCheck === true && (
                                                    <Box component={'div'} className={'info'}>
                                                        <img src="/img/icons/washb.svg" alt="" />
                                                        <Typography className={'data'}>Tarnsmission Check</Typography>
                                                    </Box>
                                                )}
                                                {service?.carEngineDiagnostic === true && (
                                                    <Box component={'div'} className={'info'}>
                                                        <img src="/img/icons/testb.svg" alt="" />
                                                        <Typography className={'data'}>Engine Diagnostic</Typography>
                                                    </Box>
                                                )}
                                                {service?.carExhaust === true && (
                                                    <Box component={'div'} className={'info'}>
                                                        <img src="/img/icons/delb.svg" alt="" />
                                                        <Typography className={'data'}>Car Exhaust</Typography>
                                                    </Box>
                                                )}
                                                {service?.dealerCarDetailing === true && (
                                                    <Box component={'div'} className={'info'}>
                                                        <img src="/img/icons/detailb.svg" alt="" />
                                                        <Typography className={'data'}>Car Detailing</Typography>
                                                    </Box>
                                                )}
                                                {service?.carTimingBelt === true && (
                                                    <Box component={'div'} className={'info'}>
                                                        <img src="/img/icons/detailb.svg" alt="" />
                                                        <Typography className={'data'}>Timing Belt</Typography>
                                                    </Box>
                                                )}
                                                {service?.carChainReplacement === true && (
                                                    <Box component={'div'} className={'info'}>
                                                        <img src="/img/icons/detailb.svg" alt="" />
                                                        <Typography className={'data'}>Chain Replacement</Typography>
                                                    </Box>
                                                )}
                                                {service?.carWindshield === true && (
                                                    <Box component={'div'} className={'info'}>
                                                        <img src="/img/icons/detailb.svg" alt="" />
                                                        <Typography className={'data'}>Car Windshield</Typography>
                                                    </Box>
                                                )}
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
        },
    },
};

export default withLayoutBasic(PropertyDetail);