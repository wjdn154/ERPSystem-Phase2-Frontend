import React, { useState } from 'react';
import {Box, Grid, Typography} from '@mui/material';
import WelcomeSection from '../../../components/WelcomeSection.jsx';
import { tabItems } from './DashBoardUtil.jsx';

const LogisticsDashboardPage = ({ initialData }) => {
    const [activeTabKey, setActiveTabKey] = useState('1');

    const handleTabChange = (key) => {
        setActiveTabKey(key);
    };

    return (
        <Box sx={{ margin: '20px' }}>
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <WelcomeSection
                        title="물류관리 대시보드"
                        description={(
                            <Typography>
                                물류
                            </Typography>
                        )}
                        tabItems={tabItems()}
                        activeTabKey={activeTabKey}
                        handleTabChange={handleTabChange}
                    />
                </Grid>
            </Grid>

            {activeTabKey === '1' && (
                <Grid sx={{ padding: '0px 20px 0px 20px' }} container spacing={3}>
                    <Grid item xs={12}>
                        <Typography>물류관리 기본 콘텐츠입니다.</Typography>
                    </Grid>
                </Grid>
            )}

            {activeTabKey === '2' && (
                <Grid sx={{ padding: '0px 20px 0px 20px' }} container spacing={3}>
                    <Grid item xs={12}>
                        <Typography>다른 물류관리 탭의 콘텐츠입니다.</Typography>
                    </Grid>
                </Grid>
            )}
        </Box>
    );
};

export default LogisticsDashboardPage;