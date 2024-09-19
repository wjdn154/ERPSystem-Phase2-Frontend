import React, { useState } from 'react';
import {Box, Grid, Paper, Typography} from '@mui/material';
import WelcomeSection from '../../../modules/Common/components/WelcomeSection.jsx';
import { Button } from 'antd';
import { tabItems } from '../utils/DashBoard/DashBoardUtil.jsx'; // 그룹웨어 탭 항목

const GroupwareDashboardPage = ({ initialData }) => {
    const [activeTabKey, setActiveTabKey] = useState('1'); // 기본 탭 상태

    // 탭 변경 핸들러
    const handleTabChange = (key) => {
        setActiveTabKey(key);
    };

    return (
        <Box sx={{ margin: '20px' }}>
            <Grid container spacing={3}>
                <Grid item xs={12} md={12}>
                    <WelcomeSection
                        title="그룹웨어 대시보드"
                        description={(
                            <Typography>
                                그룹웨어 대시보드는 기업 내부에서 협업과 커뮤니케이션을 지원하는 시스템입니다.
                                이 페이지에서 다양한 그룹웨어 기능을 관리하고 모니터링할 수 있습니다.
                            </Typography>
                        )}
                        tabItems={tabItems()} // 그룹웨어 탭 항목
                        activeTabKey={activeTabKey}
                        handleTabChange={handleTabChange}
                    />
                </Grid>
            </Grid>

            {/* activeTabKey에 따른 콘텐츠 표시 */}
            {activeTabKey === '1' && (
                <Grid sx={{ padding: '0px 20px 0px 20px' }} container spacing={3}>
                    <Grid item xs={12} md={5}>
                        <Typography>여기는 그룹웨어 기본 탭의 콘텐츠입니다.</Typography>
                    </Grid>
                </Grid>
            )}

            {activeTabKey === '2' && (
                <Grid sx={{ padding: '0px 20px 0px 20px' }} container spacing={3}>
                    <Grid item xs={12} md={5}>
                        <Typography>다른 그룹웨어 탭의 콘텐츠입니다.</Typography>
                    </Grid>
                </Grid>
            )}
        </Box>
    );
};

export default GroupwareDashboardPage;