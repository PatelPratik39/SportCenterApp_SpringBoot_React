import { Backdrop, Box, CircularProgress, Typography } from "@mui/material"

interface Props {
    message?: string;
}

const Spinner = ({ message = "Loading..." }: Props) => {


    return (
        <>
            <Backdrop open={true} invisible={true}>
                <Box display='flex' flexDirection='column' justifyContent='center' alignItems='center' height='100vh'>

                </Box>
                <CircularProgress size={100} color="secondary"/>
                <Typography variant="h4" sx={{mt:2}}>{message}</Typography>
            </Backdrop>
        </>
    )
}

export default Spinner