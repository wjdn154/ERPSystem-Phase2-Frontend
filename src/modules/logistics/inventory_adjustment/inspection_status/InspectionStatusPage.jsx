import React, {useMemo, useState} from 'react';
import { Box, Grid, Grow } from '@mui/material';
import WelcomeSection from '../../../../components/WelcomeSection.jsx';
import { tabItems } from './InspectionStatusUtil.jsx';
import {Typography} from '@mui/material';
import {Button} from 'antd';
import TemporarySection from "../../../../components/TemporarySection.jsx";

const InspectionStatusPage = () => {
    const [activeTabKey, setActiveTabKey] = useState('1');

    const handleTabChange = (key) => {
        setActiveTabKey(key);
    };

    return (
        <Box sx={{ margin: '20px' }}>
            <Grid container spacing={3}>
                <Grid item xs={12} md={12}>
                    <WelcomeSection
                        title="재고실사현황"
                        description={(
                            <Typography>
                                재고실사현황 페이지는 <span>재고 실사의 진행 상태와 실사 완료 여부</span>를 관리하는 곳임. 이 페이지에서는 <span>실사 진행 상황을 실시간으로 추적</span>할 수 있으며, 실사 중인 항목의 상태를 <span>조정하거나 검토</span>할 수 있음. 재고 실사의 <span>진행 단계</span>를 한눈에 파악하여 일정에 따라 실사를 완료할 수 있도록 함.
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

export default InspectionStatusPage;