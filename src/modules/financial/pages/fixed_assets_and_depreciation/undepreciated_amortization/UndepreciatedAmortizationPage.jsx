import React, {useMemo, useState} from 'react';
import { Box, Grid, Grow } from '@mui/material';
import WelcomeSection from '../../../../common/components/WelcomeSection.jsx';
import { tabItems } from './UndepreciatedAmortizationUtil.jsx';
import {Typography} from '@mui/material';
import {Button} from 'antd';
import TemporarySection from "../../../../common/components/TemporarySection.jsx";

const UndepreciatedAmortizationPage = () => {
    const [activeTabKey, setActiveTabKey] = useState('1');

    const handleTabChange = (key) => {
        setActiveTabKey(key);
    };

    return (
        <Box sx={{ margin: '20px' }}>
            <Grid container spacing={3}>
                <Grid item xs={12} md={12}>
                    <WelcomeSection
                        title="미상각분감가상각비"
                        description={(
                            <Typography>
                                미상각분감가상각비 페이지는 <span>아직 상각되지 않은 감가상각비</span>를 관리하고, 기업이 보유한 <span>자산의 감가상각 내역</span>을 기록하는 기능을 제공함. 이 페이지에서는 <span>미상각 감가상각비</span>를 확인하고, 이를 바탕으로 <span>자산의 사용 상태</span>를 평가할 수 있으며, <span>장부에 반영할 감가상각비</span>를 계산하고 관리할 수 있음. 이를 통해 기업은 자산의 가치를 정확하게 파악하고 회계 처리에 반영할 수 있음.
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

export default UndepreciatedAmortizationPage;