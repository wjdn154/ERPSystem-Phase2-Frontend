import React, {useMemo, useState} from 'react';
import { Box, Grid, Grow } from '@mui/material';
import WelcomeSection from '../../../../common/components/WelcomeSection.jsx';
import { tabItems } from './ElectronicTaxInvoiceUtil.jsx';
import {Typography} from '@mui/material';
import {Button} from 'antd';
import TemporarySection from "../../../../common/components/TemporarySection.jsx";

const ElectronicTaxInvoicePage = () => {
    const [activeTabKey, setActiveTabKey] = useState('1');

    const handleTabChange = (key) => {
        setActiveTabKey(key);
    };

    return (
        <Box sx={{ margin: '20px' }}>
            <Grid container spacing={3}>
                <Grid item xs={12} md={12}>
                    <WelcomeSection
                        title="전자세금계산서 발행"
                        description={(
                            <Typography>
                                전자세금계산서 발행 페이지는 <span>기업의 전자세금계산서 발행을 관리</span>하는 기능을 제공함. 이 페이지에서는 <span>매출 및 매입 거래에 대한 세금계산서를 전자적으로 발행</span>할 수 있으며, 발행된 계산서는 세무 당국에 제출되기 때문에 법적 효력을 가짐. 사용자는 거래에 대한 <span>세금 계산서 정보를 입력</span>하고 <span>전자 서명을 통해 발행</span>할 수 있음.<br/>
                                또한 발행된 전자세금계산서를 <span>조회 및 수정</span>할 수 있으며, 발행 내역을 확인하여 관리할 수 있음.
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

export default ElectronicTaxInvoicePage;