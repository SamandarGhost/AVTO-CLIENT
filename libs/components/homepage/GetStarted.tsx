import { Box, Button, Stack, Typography } from "@mui/material";
import NorthEastRoundedIcon from '@mui/icons-material/NorthEastRounded';
import OfflinePinIcon from '@mui/icons-material/OfflinePin';
import useDeviceDetect from "../../hooks/useDeviceDetect";



const GetStarted = (props: any) => {
    const device = useDeviceDetect();

    if (device === 'mobile') {
        return <div>Header Get Started</div>
    } else {
        return (
            <>
                <Stack className={'get-box'}>
                    <Stack className={'top-frame'}>
                        <Stack className={'left-box'}>
                            <Box className={'first-img'}>
                                <img src="/img/banner/banner.webp" alt="" />
                            </Box>
                            <Box className={'second-img'}>
                                <img src="/img/banner/banner.webp" alt="" />
                            </Box>
                            <Box className={'third-img'}>
                                <img src="/img/banner/banner.webp" alt="" />
                            </Box>
                        </Stack>
                        <Stack className={'right-box'}>
                            <Typography className={'big-text'}>The Fire Price Sell or Buy Your Car Everytime and Everywhere</Typography>
                            <Typography className={'small-text'}>We provide you with the most convenient, fast, and optimal way to buy and sell your cars. With us, everything is easy!</Typography>
                            <Stack className={'check-box'}>
                                <Box className={'text'}>
                                    <OfflinePinIcon className={'icon'} />
                                    <span>Wa are EveryTime and EveryWhere</span>
                                </Box>
                                <Box className={'text'}>
                                    <OfflinePinIcon className={'icon'} />
                                    <span>You can use 24/7 our WebSite and Servcie</span>
                                </Box>
                                <Box className={'text'}>
                                    <OfflinePinIcon className={'icon'} />
                                    <span>Sell, Buy or Watch. Do what you want!</span>
                                </Box>
                            </Stack>
                            <Box className={'button'}>
                                <Button className={'get-started'}>
                                    Get Started
                                    <NorthEastRoundedIcon className={'icon'} />
                                </Button>
                            </Box>
                        </Stack>
                    </Stack>
                    <Stack className={'under-box'}>
                        <Box className={'text'}>
                            <div>796M</div>
                            <span>CARS FOR SALE</span>
                        </Box>
                        <Box className={'text'}>
                            <div>834M</div>
                            <span>DEALERS REVIEWS</span>
                        </Box>
                        <Box className={'text'}>
                            <div>957M</div>
                            <span>VISITORS PER DAY</span>
                        </Box>
                        <Box className={'text'}>
                            <div>123M</div>
                            <span>VERIFIED DEALERS</span>
                        </Box>
                    </Stack>
                    <div className={'divider'}></div>
                </Stack>
            </>
        )
    }
};

export default GetStarted;