import React, { useState } from 'react';
import { Stack, Box, Link } from '@mui/material';
import useDeviceDetect from '../../hooks/useDeviceDetect';
import WestIcon from '@mui/icons-material/West';
import EastIcon from '@mui/icons-material/East';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation, Pagination } from 'swiper';
import TopPropertyCard from './TopPropertyCard';
import { PropertiesInquiry } from '../../types/property/property.input';
import { Property } from '../../types/property/property';
import { useMutation, useQuery } from '@apollo/client';
import { GET_PROPERTIES } from '../../../apollo/user/query';
import { T } from '../../types/common';
import { LIKE_TARGET_PROPERTY } from '../../../apollo/user/mutation';
import { Message } from '../../enums/common.enum';
import { sweetMixinErrorAlert } from '../../sweetAlert';
import FeedbackCard from './FeedbackCard';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';

interface TopPropertiesProps {
    initialInput: PropertiesInquiry;
}

const Feedback = (props: TopPropertiesProps) => {
    const { initialInput } = props;
    const device = useDeviceDetect();
    const [topProperties, setTopProperties] = useState<Property[]>([]);


    /** APOLLO REQUESTS **/
    const [likeTargetProperty] = useMutation(LIKE_TARGET_PROPERTY);

    const {
        loading: getPropertiesLoading,
        data: getPropertiesData,
        error: getPropertiesError,
        refetch: getPropertiesRefetch
    } = useQuery(GET_PROPERTIES, {
        fetchPolicy: 'cache-and-network',
        variables: { input: initialInput },
        notifyOnNetworkStatusChange: true,
        onCompleted: (data: T) => {
            setTopProperties(data?.getProperties?.list);
        },
    });
    /** HANDLERS **/
    const likePropertyHandler = async (user: T, id: string) => {
        try {
            if (!id) return;
            if (!user._id) throw new Error(Message.SOMETHING_WENT_WRONG);

            await likeTargetProperty({
                variables: { input: id },
            });
            await getPropertiesRefetch({ input: initialInput });
        } catch (err: any) {
            console.log('Error, likePropertyHandler:', err.message);
            sweetMixinErrorAlert(err.message).then();
        }
    }

    if (device === 'mobile') {
        return (
            <Stack className={'top-properties'}>
                <Stack className={'container'}>
                    <Stack className={'info-box'}>
                        <span>Top properties</span>
                    </Stack>
                    <Stack className={'card-box'}>
                        <Swiper
                            className={'top-property-swiper'}
                            slidesPerView={'auto'}
                            centeredSlides={true}
                            spaceBetween={15}
                            modules={[Autoplay]}
                        >
                            {topProperties.map((property: Property) => {
                                return (
                                    <SwiperSlide className={'top-property-slide'} key={property?._id}>
                                        <TopPropertyCard property={property} likePropertyHandler={likePropertyHandler} />
                                    </SwiperSlide>
                                );
                            })}
                        </Swiper>
                    </Stack>
                </Stack>
            </Stack>
        );
    } else {
        return (
            <Stack className={'top-cars'}>
                <Stack className={'container'}>
                    <Stack className={'info-box'}>
                        <Box component={'div'} className={'left'}>
                            <span style={{ color: 'black', marginTop: '20px' }}>What Our Customers say:</span>
                        </Box>
                        <Box component={'div'} className={'right'}>
                            <div className={'more-box'}>
                                <Link href={'/property'}>
                                    <span style={{ color: 'black' }}>See All Articles</span>
                                </Link>
                                <img src="/img/icons/rightup.svg" alt="" />
                            </div>
                        </Box>
                    </Stack>
                    <Stack className={'card-box'}>
                        <Swiper
                            className={'top-property-swiper'}
                            slidesPerView={'auto'}
                            spaceBetween={15}
                            modules={[Autoplay, Navigation, Pagination]}
                            navigation={{
                                nextEl: '.swiper-top-next',
                                prevEl: '.swiper-top-prev',
                            }}
                            pagination={{
                                el: '.swiper-top-pagination',
                            }}
                        >
                            {topProperties.map((property: Property) => {
                                return (
                                    <SwiperSlide className={'top-property-slide'} key={property?._id}>
                                        <FeedbackCard property={property} />
                                    </SwiperSlide>
                                );
                            })}
                        </Swiper>
                    </Stack>
                    <Box component={'div'} className={'right'}>
                        <div className={'pagination-box'}>
                            <ArrowBackIosNewIcon className={'swiper-top-prev'} />
                            <div className={'swiper-top-pagination'}></div>
                            <ArrowForwardIosIcon className={'swiper-top-next'} />
                        </div>
                    </Box>
                </Stack>
            </Stack>
        );
    }
};

Feedback.defaultProps = {
    initialInput: {
        page: 1,
        limit: 10,
        sort: 'propertyRank',
        direction: 'DESC',
        search: {},
    },
};

export default Feedback;