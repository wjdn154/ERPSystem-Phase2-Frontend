import React, {useMemo, useState} from 'react';
import { Box, Grid, Grow } from '@mui/material';
import WelcomeSection from '../../../../common/components/WelcomeSection.jsx';
import { tabItems } from './PreviousProfitDistributionUtil.jsx';
import {Typography} from '@mui/material';
import {Button} from 'antd';
import TemporarySection from "../../../../common/components/TemporarySection.jsx";

const PreviousProfitDistributionPage = () => {
    const [activeTabKey, setActiveTabKey] = useState('1');

    const handleTabChange = (key) => {
        setActiveTabKey(key);
    };

    return (
        <Box sx={{ margin: '20px' }}>
            <Grid container spacing={3}>
                <Grid item xs={12} md={12}>
                    <WelcomeSection
                        title="전기분 잉여금처분계산서"
                        description={(
                            <Typography>
                                전기분 잉여금처분계산서 페이지는 <span>이전 회계 기간 동안 발생한 잉여금의 처분 내역</span>을 기록하고 관리하는 기능을 제공함. 이 페이지를 통해 사용자는 <span>배당금, 적립금 등</span>으로 나누어 처리된 잉여금을 확인할 수 있으며, 과거의 잉여금 처분 내역을 바탕으로 <span>현재 회계 기간의 자본 관리 전략</span>을 수립할 수 있음.
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

export default PreviousProfitDistributionPage;