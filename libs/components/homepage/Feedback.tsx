import React, { useState } from 'react';
import { Stack, Box, Link } from '@mui/material';
import useDeviceDetect from '../../hooks/useDeviceDetect';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation, Pagination } from 'swiper';
import TopPropertyCard from './FindingCarCard';
import { PropertiesInquiry } from '../../types/property/property.input';
import { Property } from '../../types/property/property';
import { useMutation, useQuery } from '@apollo/client';
import { GET_ARTICLES, GET_CARS } from '../../../apollo/user/query';
import { T } from '../../types/common';
import { Message } from '../../enums/common.enum';
import { sweetMixinErrorAlert } from '../../sweetAlert';
import FeedbackCard from './FeedbackCard';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import { ArticlesInquiry } from '../../types/article/article.input';
import { ArticleCategory } from '../../enums/article.enum';
import { Article } from '../../types/article/article';

interface TopPropertiesProps {
    initialInput: ArticlesInquiry;
}

const Feedback = (props: TopPropertiesProps) => {
    const { initialInput } = props;
    const device = useDeviceDetect();
    const [topArticle, setTopArticle] = useState<Article[]>([]);


    /** APOLLO REQUESTS **/

    const {
        loading: getArticlesLoading,
        data: getArticlesData,
        error: getArticlesError,
        refetch: getArticlesRefetch
    } = useQuery(GET_ARTICLES, {
        fetchPolicy: 'cache-and-network',
        variables: {
            input:
            {
                page: 1,
                limit: 10,
                direction: 'DESC',
                search: {
                    articleCategory: ArticleCategory.FORWEB
                },
            }
        },
        notifyOnNetworkStatusChange: true,
        onCompleted: (data: T) => {
            setTopArticle(data?.getArticles?.list);
        },
    });

    if (device === 'mobile') {
        return (
            null
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
                            {topArticle.map((article: Article) => {
                                return (
                                    <SwiperSlide className={'top-property-slide'} key={article?._id}>
                                        <FeedbackCard article={article} />
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

export default Feedback;