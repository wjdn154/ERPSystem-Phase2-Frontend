import React, {useMemo, useState} from 'react';
import { Box, Grid, Grow } from '@mui/material';
import WelcomeSection from '../../../../components/WelcomeSection.jsx';
import { tabItems } from './SalesPurchaseVoucherEntryUtil.jsx';
import {Typography} from '@mui/material';
import {Button} from 'antd';
import TemporarySection from "../../../../components/TemporarySection.jsx";

const SalesPurchaseVoucherEntryPage = () => {
    const [activeTabKey, setActiveTabKey] = useState('1');

    const handleTabChange = (key) => {
        setActiveTabKey(key);
    };

    return (
        <Box sx={{ margin: '20px' }}>
            <Grid container spacing={3}>
                <Grid item xs={12} md={12}>
                    <WelcomeSection
                        title="매입매출 전표 입력"
                        description={(
                            <Typography>
                                매입매출 전표 입력 페이지는 <span>기업의 매입 및 매출 내역을 기록하는 중요한 기능</span>을 제공함. 사용자는 <span>구매 및 판매 거래</span>에 대한 전표를 입력하고, 이 정보는 재무 보고서나 회계 처리를 위해 활용됨. <span>매입 전표</span>는 기업이 지불해야 할 금액을 기록하고, <span>매출 전표</span>는 발생한 수익을 기록함.<br/>
                                이 페이지에서는 새로운 매입/매출 전표를 <span>등록, 수정, 삭제</span>할 수 있으며, 각 전표에는 <span>거래처 정보, 금액, 세금 정보</span> 등을 입력할 수 있음.<br/>
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

export default SalesPurchaseVoucherEntryPage;