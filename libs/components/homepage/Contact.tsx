import { Box, Link, Stack } from "@mui/material";
import useDeviceDetect from "../../hooks/useDeviceDetect";
import NorthEastRoundedIcon from '@mui/icons-material/NorthEastRounded';

const LayoutFilter = (props: any) => {
    const device = useDeviceDetect();
    if (device === 'mobile') {
        return <div>HEADER FILTER MOBILE</div>;
    } else {
        return (
            <>
                <Stack className={'first-box'}>
                    <Stack className={'text'}>
                        <Box className={'small-text'}>We make finding the right car simple</Box>
                        <Box className={'big-text'}>Search Less. Watch More</Box>
                    </Stack>
                    <Stack className={'view'}>
                        <Link href="/car" className={'view-car'}>
                            <span className={'cars'}>View Cars</span>
                            <NorthEastRoundedIcon />
                        </Link>
                        <Link href="/contact" className={'contact-us'}>
                            <span className={'contact'}>Contact</span>
                            <NorthEastRoundedIcon />
                        </Link>
                    </Stack>
                </Stack>
            </>
        )
    }
};

export default LayoutFilter;