import React, { useState } from 'react';
import {Box, Grid, Grow, Paper, Typography} from '@mui/material';
import WelcomeSection from '../../../common/components/WelcomeSection.jsx';
import { Button } from 'antd';
import { tabItems } from './DashBoardUtil.jsx';
import TemporarySection from "../../../common/components/TemporarySection.jsx"; // 그룹웨어 탭 항목

const DashboardPage = ({ initialData }) => {
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
                        title="통합관리 대시보드"
                        description={(
                            <Typography>
                                통합관리 대시보드는 <span>ERP 시스템의 전반적인 상태를 한눈에 볼 수 있는 페이지</span>임.<br/>
                                각 모듈에서 발생한 주요 데이터와 통계를 시각적으로 제공함으로써, 사용자는 <span>재무, 인사, 생산, 물류</span> 등 다양한 영역의 데이터를 쉽게 파악할 수 있음.<br/>
                                대시보드는 <span>각종 그래프와 통계 수치</span>를 통해 기업의 현재 상태를 한눈에 볼 수 있도록 함. <br/>
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
                    <Grid item xs={12} md={5} sx={{ minWidth: '500px !important', maxWidth: '700px !important' }}>
                        <Grow in={true} timeout={200}>
                            <div>
                                <TemporarySection />
                            </div>
                        </Grow>
                    </Grid>
                </Grid>
            )}

            {activeTabKey === '2' && (
                <Grid sx={{ padding: '0px 20px 0px 20px' }} container spacing={3}>
                    <Grid item xs={12} md={5} sx={{ minWidth: '500px !important', maxWidth: '700px !important' }}>
                        <Grow in={true} timeout={200}>
                            <div>
                                <TemporarySection />
                            </div>
                        </Grow>
                    </Grid>
                </Grid>
            )}
        </Box>
    );
};

export default DashboardPage;