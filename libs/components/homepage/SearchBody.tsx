import { Box, Stack } from "@mui/material";
import NorthEastRoundedIcon from '@mui/icons-material/NorthEastRounded';
import useDeviceDetect from "../../hooks/useDeviceDetect";



const SearchBody = (props: any) => {
    const device = useDeviceDetect();

    if (device === 'mobile') {
        return <div>Header Search Body</div>
    } else {
        return (
            <>
                <Stack className={'search-body'}>
                    <Box className={'title'}>Find Car For Every LifeStyle</Box>
                    <Box className={'view-all'}>
                        View All
                        <NorthEastRoundedIcon className={'icon'} />
                    </Box>
                    <Stack className={'car-body'}>
                        <Stack className={'body-box'}>
                            <Box className={'body'}>
                                <img src="/img/carBody/sedan.svg" alt="" />
                            </Box>
                            <Box className={'body'}>
                                <img src="/img/carBody/coupe.svg" alt="" />
                            </Box>
                            <Box className={'body'}>
                                <img src="/img/carBody/suv.svg" alt="" />
                            </Box>
                            <Box className={'body'}>
                                <img src="/img/carBody/truck.svg" alt="" />
                            </Box>
                            <Box className={'body'}>
                                <img src="/img/carBody/hatchback.svg" alt="" />
                            </Box>
                            <Box className={'body'}>
                                <img src="/img/carBody/minivan.svg" alt="" />
                            </Box>
                        </Stack>
                    </Stack>
                    <Stack className={'name-box'}>
                        <Box className={'body-name'}>
                            <span className={'name'}>Sedan</span>
                        </Box>
                        <Box className={'body-name'}>
                            <span className={'name'}>Coupe</span>
                        </Box>
                        <Box className={'body-name'}>
                            <span className={'name'}>SUV</span>
                        </Box>
                        <Box className={'body-name'}>
                            <span className={'name'}>Truck</span>
                        </Box>
                        <Box className={'body-name'}>
                            <span className={'name'}>Hatchback</span>
                        </Box>
                        <Box className={'body-name'}>
                            <span className={'name'}>Minivan</span>
                        </Box>
                    </Stack>
                </Stack>
            </>
        )
    }
};

export default SearchBody;