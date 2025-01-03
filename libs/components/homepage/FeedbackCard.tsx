import React from 'react';
import { Stack, Box, Divider, Typography } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import useDeviceDetect from '../../hooks/useDeviceDetect';
import { Property } from '../../types/property/property';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import { REACT_APP_API_URL } from '../../config';
import { useRouter } from 'next/router';
import { useReactiveVar } from '@apollo/client';
import { userVar } from '../../../apollo/store';
import NorthEastIcon from '@mui/icons-material/NorthEast';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import { Article } from '../../types/article/article';

interface TopArticleCardProps {
    article: Article;
}

const FeedbackCard = (props: TopArticleCardProps) => {
    const { article } = props;
    const device = useDeviceDetect();
    const router = useRouter();
    const user = useReactiveVar(userVar);

    /** HANDLERS **/
    const pushDetailhandler = async (articleId: string) => {
        console.log("articleId:", articleId);
        await router.push({ pathname: '/community/detail', query: { id: articleId } })
    };

    if (device === 'mobile') {
        return (
            null
        );
    } else {
        return (
            <Stack className="post-card-box">
                <Box component={'div'} className={'top'}>
                    <Typography className={'title'}>{article.articleTitle}</Typography>
                    <Box className={'img'}>
                        <img src="" alt="" />
                    </Box>
                </Box>
                <Box className={'middel'}>
                    <Typography className={'desc'}>
                        {article.articleContent}
                    </Typography>
                </Box>
                <Box className={'member'}>
                    <div className={'member-img'}>
                        <img src="" alt="" />
                    </div>
                    <Box className={'info'}>
                        <span className={'name'}>{article.creatorData.titleNick}</span>
                        <p className={'member-address'}>{article.creatorData.address}</p>
                    </Box>
                </Box>
            </Stack>
        );
    }
};

export default FeedbackCard;