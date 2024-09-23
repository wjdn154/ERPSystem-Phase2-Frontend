import React, {useMemo, useState} from 'react';
import { Box, Grid, Grow } from '@mui/material';
import WelcomeSection from '../../../../components/WelcomeSection.jsx';
import { tabItems } from './ClientAccountLedgerUtil.jsx';
import {Typography} from '@mui/material';
import {Button} from 'antd';
import TemporarySection from "../../../../components/TemporarySection.jsx";

const ClientAccountLedgerPage = () => {
    const [activeTabKey, setActiveTabKey] = useState('1');

    const handleTabChange = (key) => {
        setActiveTabKey(key);
    };

    return (
        <Box sx={{ margin: '20px' }}>
            <Grid container spacing={3}>
                <Grid item xs={12} md={12}>
                    <WelcomeSection
                        title="거래처별 계정과목별 원장"
                        description={(
                            <Typography>
                                이 페이지는 <span>거래처별로 각 계정과목에 따라 거래 내역을 관리</span>하는 기능을 제공함. 기업은 특정 거래처와 <span>각 계정과목에 따른 재무 내역</span>을 정확히 파악할 수 있음. 이를 통해 <span>거래처별로 세분화된 재무 상황</span>을 분석하고 필요한 조치를 취할 수 있음.
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

export default ClientAccountLedgerPage;