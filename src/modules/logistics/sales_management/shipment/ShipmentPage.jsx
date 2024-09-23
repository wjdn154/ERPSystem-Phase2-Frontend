import React, {useMemo, useState} from 'react';
import { Box, Grid, Grow } from '@mui/material';
import WelcomeSection from '../../../../components/WelcomeSection.jsx';
import { tabItems } from './ShipmentUtil.jsx';
import {Typography} from '@mui/material';
import {Button} from 'antd';
import TemporarySection from "../../../../components/TemporarySection.jsx";

const ShipmentPage = () => {
    const [activeTabKey, setActiveTabKey] = useState('1');

    const handleTabChange = (key) => {
        setActiveTabKey(key);
    };

    return (
        <Box sx={{ margin: '20px' }}>
            <Grid container spacing={3}>
                <Grid item xs={12} md={12}>
                    <WelcomeSection
                        title="출하"
                        description={(
                            <Typography>
                                출하 페이지는 <span>고객에게 실제로 상품을 출하하는 과정</span>을 관리함. 이 페이지에서는 <span>출하 상태를 확인, 수정</span>할 수 있으며, <span>출하 완료</span>된 상품들의 내역을 기록함. 출하가 완료되면 <span>송장 번호</span>와 <span>배송 상태</span>를 확인할 수 있는 기능도 제공됨.
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

export default ShipmentPage;