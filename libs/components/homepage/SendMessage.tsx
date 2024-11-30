import { Box, Button, Stack, Typography } from "@mui/material";
import NorthEastRoundedIcon from '@mui/icons-material/NorthEastRounded';
import OfflinePinIcon from '@mui/icons-material/OfflinePin';
import useDeviceDetect from "../../hooks/useDeviceDetect";
import SmartphoneIcon from '@mui/icons-material/Smartphone';
import AlternateEmailIcon from '@mui/icons-material/AlternateEmail';



const SendMessage = (props: any) => {
    const device = useDeviceDetect();

    if (device === 'mobile') {
        return <div>Header Get Started</div>
    } else {
        return (
            <>
                <Stack className={'contact-box'}>
                    <Stack className={'frame'}>
                        <Stack className={'left-box'}>
                            <Box className={'first-img'}>
                                <img src="/img/banner/banner.webp" alt="" />
                            </Box>
                        </Stack>
                        <Stack className={'right-box'}>
                            <Typography className={'big-text'}>"Do you have a lot of questions? Don't wait—contact us now!"</Typography>
                            <Typography className={'small-text'}>Our address: South Korea, Seoul, Gangnam Street. <br></br>
                                Wa are EveryTime halp you</Typography>
                            <Stack className={'check-box'}>
                                <Box className={'text'}>
                                    <SmartphoneIcon className={'icon'} />
                                    <span>+82 10 4867 5455</span>
                                </Box>
                                <Box className={'text'}>
                                    <AlternateEmailIcon className={'icon'} />
                                    <span>wcarsouthkorea@gmail.com</span>
                                </Box>
                            </Stack>
                            <Box className={'button'}>
                                <Button className={'get-started'}>
                                    Contact Us
                                    <NorthEastRoundedIcon className={'icon'} />
                                </Button>
                            </Box>
                        </Stack>
                    </Stack>
                </Stack>
            </>
        )
    }
};

export default SendMessage;