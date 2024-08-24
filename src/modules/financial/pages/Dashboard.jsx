import React from 'react';
import { Card, CardContent, Typography } from '@mui/material';

function FinancialDashboard() {
    return (
        <Card>
            <CardContent>
                <Typography variant="h5" component="div">
                    재무회계 대시보드
                </Typography>
                <Typography sx={{ mb: 1.5 }} color="text.secondary">
                    재무회계 대시보드
                </Typography>
            </CardContent>
        </Card>
    );
}

export default FinancialDashboard;