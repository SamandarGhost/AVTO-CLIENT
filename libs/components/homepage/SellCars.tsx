import { Box, Button, Stack, Typography } from "@mui/material";
import NorthEastRoundedIcon from '@mui/icons-material/NorthEastRounded';
import useDeviceDetect from "../../hooks/useDeviceDetect";



const SellCars = (props: any) => {
    const device = useDeviceDetect();

    if (device === 'mobile') {
        return <div>Header Sell Buy</div>
    } else {
        return (
            <>
                <Stack className={'start-box'}>
                    <Stack className={'frame'}>
                        <Stack className={'sell'}>
                            <Typography className={'big-text'}>Do You Want To Sell A Car?</Typography>
                            <Typography className={'small-text'}>We offer our top-quality services to help you sell your car effortlessly</Typography>
                            <Button className={'button'}>
                                Sell
                                <NorthEastRoundedIcon className={'icon'} />
                            </Button>
                        </Stack>
                        <Stack className={'sell'}>
                            <Typography className={'text'}>Do You Want To Create Your Own Dealership?</Typography>
                            <Typography className={'small-text'}>We offer our top-quality services to help you create dealer. Make it easy and reliable with us</Typography>
                            <Button className={'button'}>
                                Create
                                <NorthEastRoundedIcon className={'icon'} />
                            </Button>
                        </Stack>
                    </Stack>
                </Stack>
            </>
        )
    }
};

export default SellCars;