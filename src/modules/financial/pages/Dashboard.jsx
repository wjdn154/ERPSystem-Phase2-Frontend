import React from 'react';
import { Card, CardContent, Typography } from '@mui/material';

function FinancialDashboard() {
    return (
        <Card>
            <CardContent>
                <Typography variant="h5" component="div">
                    Financial Dashboard
                </Typography>
                <Typography sx={{ mb: 1.5 }} color="text.secondary">
                    Financial Overview and Metrics
                </Typography>
                {/* 추가적인 내용이나 차트, 데이터 등을 여기에 넣을 수 있음 */}
            </CardContent>
        </Card>
    );
}

export default FinancialDashboard;