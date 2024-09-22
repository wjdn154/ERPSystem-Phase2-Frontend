import React, { useState } from 'react';
import {Box, Grid, Typography} from '@mui/material';
import WelcomeSection from '../../common/components/WelcomeSection.jsx';
import { tabItems } from '../utils/dash_board/DashBoardUtil.jsx';

const ProductionDashboardPage = ({ initialData }) => {
    const [activeTabKey, setActiveTabKey] = useState('1');

    const handleTabChange = (key) => {
        setActiveTabKey(key);
    };

    return (
        <Box sx={{ margin: '20px' }}>
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <WelcomeSection
                        title="생산관리 대시보드"
                        description={(
                            <Typography>
                                생산관리 대시보드는 생산 프로세스를 효율적으로 관리하고 모니터링하는 데 사용됩니다.
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
                        <Typography>생산관리 기본 콘텐츠입니다.</Typography>
                    </Grid>
                </Grid>
            )}

            {activeTabKey === '2' && (
                <Grid sx={{ padding: '0px 20px 0px 20px' }} container spacing={3}>
                    <Grid item xs={12}>
                        <Typography>다른 생산관리 탭의 콘텐츠입니다.</Typography>
                    </Grid>
                </Grid>
            )}
        </Box>
    );
};

export default ProductionDashboardPage;