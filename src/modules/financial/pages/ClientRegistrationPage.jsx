import React, {useMemo, useState} from 'react';
import { Box, Grid, Grow } from '@mui/material';
import WelcomeSection from '../../../modules/Common/components/WelcomeSection.jsx';
import {ClientRegistrationHook} from '../hooks/ClientRegistrationHook.jsx';
import { tabItems } from '../utils/ClientRegistration/ClientRegistrationUtil.jsx';
import {Typography} from '@mui/material';
import {Button} from 'antd';

const ClientRegistrationPage = () => {

    const {
        activeTabKey,
        handleTabChange
    } = ClientRegistrationHook();


    return (
        <Box sx={{ margin: '20px' }}>
            <Grid container spacing={3}>
                <Grid item xs={12} md={12}>
                    <WelcomeSection
                        title="거래처 등록 및 관리"
                        description={(
                            <Typography>
                                계정과목 및 적요 등록 페이지는 재무 관리 시스템에서{' '}
                                <span style={{ color: '#00C1D8' }}>계정과목과 적요</span>
                                (거래의 내역이나 설명)를 <span style={{ color: '#00C1D8' }}>관리하고 등록</span>하는 중요한 기능을 제공하는 페이지임.
                                <br />
                                이 페이지는 기업의 재무 데이터를 정확하게 기록하고 관리하는 데 필수적인 역할을 함.
                            </Typography>
                        )}
                        tabItems={tabItems()}
                        activeTabKey={activeTabKey}
                        handleTabChange={handleTabChange}
                    />
                </Grid>
            </Grid>

        </Box>
    );
};

export default ClientRegistrationPage;