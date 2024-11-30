import React from 'react';
import { Stack, Box, Divider, Typography } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import useDeviceDetect from '../../hooks/useDeviceDetect';
import { Property } from '../../types/property/property';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import { REACT_APP_API_URL, topPropertyRank } from '../../config';
import { useRouter } from 'next/router';
import { useReactiveVar } from '@apollo/client';
import { userVar } from '../../../apollo/store';
import NorthEastIcon from '@mui/icons-material/NorthEast';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import BookmarkIcon from '@mui/icons-material/Bookmark';

interface PopularPropertyCardProps {
    property: Property;
}

const FeedbackCard = (props: PopularPropertyCardProps) => {
    const { property } = props;
    const device = useDeviceDetect();
    const router = useRouter();
    const user = useReactiveVar(userVar);

    /** HANDLERS **/
    const pushDetailhandler = async (propertyId: string) => {
        console.log("propertyId:", propertyId);
        await router.push({ pathname: '/property/detail', query: { id: propertyId } })
    };

    if (device === 'mobile') {
        return (
            <Stack className="popular-card-box">
                <Box
                    component={'div'}
                    className={'card-img'}
                    style={{ backgroundImage: `url(${REACT_APP_API_URL}/${property?.propertyImages[0]})` }}
                    onClick={() => {
                        pushDetailhandler(property._id);
                    }}
                >
                    {property && property?.propertyRank >= topPropertyRank ? (
                        <div className={'status'}>
                            <img src="/img/icons/electricity.svg" alt="" />
                            <span>top</span>
                        </div>
                    ) : (
                        ''
                    )}

                    <div className={'price'}>${property.propertyPrice}</div>
                </Box>
                <Box component={'div'} className={'info'}>
                    <strong className={'title'}
                        onClick={() => {
                            pushDetailhandler(property._id);
                        }}>{property.propertyTitle}</strong>
                    <p className={'desc'}>{property.propertyAddress}</p>
                    <div className={'options'}>
                        <div>
                            <CalendarMonthIcon />
                            <span>{property?.propertyBeds} bed</span>
                        </div>
                        <div>
                            <img src="/img/icons/room.svg" alt="" />
                            <span>{property?.propertyRooms} rooms</span>
                        </div>
                        <div>
                            <img src="/img/icons/expand.svg" alt="" />
                            <span>{property?.propertySquare} m2</span>
                        </div>
                    </div>
                    <Divider sx={{ mt: '15px', mb: '17px' }} />
                    <div className={'bott'}>
                        <p>{property?.propertyRent ? 'rent' : 'sale'}</p>
                        <div className="view-like-box">
                            <IconButton color={'default'}>
                                <RemoveRedEyeIcon />
                            </IconButton>
                            <Typography className="view-cnt">{property?.propertyViews}</Typography>
                        </div>
                    </div>
                </Box>
            </Stack>
        );
    } else {
        return (
            <Stack className="post-card-box">
                <Box component={'div'} className={'top'}>
                    <Typography className={'title'}>Awesome Design</Typography>
                    <Box className={'img'}>
                        <img src="" alt="" />
                    </Box>
                </Box>
                <Box className={'middel'}>
                    <Typography className={'desc'}> “Amazing design, easy to customize and a design quality superlative account on its cloud platform for the optimized performance. And we didn’t on our original designs.”“Amazing design, easy to customize and a design quality superlative account on its cloud platform for the optimized performance. And we didn’t on our original designs.”“Amazing design, easy to customize and a design quality superlative account on its cloud platform for the optimized performance. And we didn’t on our original designs.”</Typography>
                </Box>
                <Box className={'member'}>
                    <div className={'member-img'}>
                        <img src="" alt="" />
                    </div>
                    <Box className={'info'}>
                        <span className={'name'}>Flyod Miles</span>
                        <p className={'member-address'}>Bank of America</p>
                    </Box>
                </Box>
            </Stack>
        );
    }
};

export default FeedbackCard;