import {Typography, Paper} from "@mui/material";

const TemporarySection = () => {
    return (
        <Paper elevation={3} sx={{ height: '100%' }}>
            <Typography variant="h6" sx={{ padding: '20px' }} >임시 영역</Typography>
        </Paper>
    )
}

export default TemporarySection;