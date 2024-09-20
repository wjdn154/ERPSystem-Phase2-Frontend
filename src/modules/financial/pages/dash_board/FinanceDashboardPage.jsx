import React, { useState } from 'react';
import {Box, Grid, Typography} from '@mui/material';
import WelcomeSection from '../../../common/components/WelcomeSection.jsx';
import { tabItems } from './DashBoardUtil.jsx';

const FinanceDashboardPage = ({ initialData }) => {
    const [activeTabKey, setActiveTabKey] = useState('1');

    const handleTabChange = (key) => {
        setActiveTabKey(key);
    };

    return (
        <Box sx={{ margin: '20px' }}>
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <WelcomeSection
                        title="재무회계 대시보드"
                        description={(
                            <Typography>
                                재무회계 대시보드는 기업의 재무 상태와 회계 정보를 관리하는 페이지입니다. 재무 보고 및 분석이 가능합니다.
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
                        <Typography>재무회계 기본 콘텐츠입니다.</Typography>
                    </Grid>
                </Grid>
            )}

            {activeTabKey === '2' && (
                <Grid sx={{ padding: '0px 20px 0px 20px' }} container spacing={3}>
                    <Grid item xs={12}>
                        <Typography>다른 재무회계 탭의 콘텐츠입니다.</Typography>
                    </Grid>
                </Grid>
            )}
        </Box>
    );
};

export default FinanceDashboardPage;