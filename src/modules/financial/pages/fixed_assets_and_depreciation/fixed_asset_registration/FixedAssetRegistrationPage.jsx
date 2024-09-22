import React, {useMemo, useState} from 'react';
import { Box, Grid, Grow } from '@mui/material';
import WelcomeSection from '../../../../common/components/WelcomeSection.jsx';
import { tabItems } from './FixedAssetRegistrationUtil.jsx';
import {Typography} from '@mui/material';
import {Button} from 'antd';
import TemporarySection from "../../../../common/components/TemporarySection.jsx";

const FixedAssetRegistrationPage = () => {
    const [activeTabKey, setActiveTabKey] = useState('1');

    const handleTabChange = (key) => {
        setActiveTabKey(key);
    };

    return (
        <Box sx={{ margin: '20px' }}>
            <Grid container spacing={3}>
                <Grid item xs={12} md={12}>
                    <WelcomeSection
                        title="고정자산등록"
                        description={(
                            <Typography>
                                고정자산등록 페이지는 <span>기업의 고정자산</span>을 체계적으로 관리하기 위해 <span>고정자산을 등록하고 유지</span>하는 기능을 제공함. 이 페이지에서는 <span>건물, 기계, 차량 등 고정자산을 등록</span>할 수 있으며, 자산의 <span>취득 일자, 취득 비용, 사용 연한</span> 등의 정보를 기록하여 자산 관리를 효율적으로 수행할 수 있음. 이를 통해 <span>자산의 현황과 사용 상태</span>를 파악할 수 있으며, 회계와 재무 관리에 중요한 기초 자료를 제공함.
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

export default FixedAssetRegistrationPage;