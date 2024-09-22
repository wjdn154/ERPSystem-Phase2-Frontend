import React, { useState } from 'react';
import {Box, Grid, Typography} from '@mui/material';
import WelcomeSection from '../../../common/components/WelcomeSection.jsx';
import { tabItems } from './DashBoardUtil.jsx';

const HRDashboardPage = ({ initialData }) => {
    const [activeTabKey, setActiveTabKey] = useState('1');

    const handleTabChange = (key) => {
        setActiveTabKey(key);
    };

    return (
        <Box sx={{ margin: '20px' }}>
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <WelcomeSection
                        title="인사관리 대시보드"
                        description={(
                            <Typography>
                                인사관리 대시보드는 직원 정보를 효율적으로 관리하고, 인사 관련 기능을 제공합니다.
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
                        <Typography>인사관리 기본 콘텐츠입니다.</Typography>
                    </Grid>
                </Grid>
            )}

            {activeTabKey === '2' && (
                <Grid sx={{ padding: '0px 20px 0px 20px' }} container spacing={3}>
                    <Grid item xs={12}>
                        <Typography>다른 인사관리 탭의 콘텐츠입니다.</Typography>
                    </Grid>
                </Grid>
            )}
        </Box>
    );
};

export default HRDashboardPage;