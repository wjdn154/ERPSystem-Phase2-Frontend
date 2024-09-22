import React, {useMemo, useState} from 'react';
import { Box, Grid, Grow } from '@mui/material';
import WelcomeSection from '../../../../common/components/WelcomeSection.jsx';
import { tabItems } from './PreviousIncomeStatementUtil.jsx';
import {Typography} from '@mui/material';
import {Button} from 'antd';
import TemporarySection from "../../../../common/components/TemporarySection.jsx";

const PreviousIncomeStatementPage = () => {
    const [activeTabKey, setActiveTabKey] = useState('1');

    const handleTabChange = (key) => {
        setActiveTabKey(key);
    };

    return (
        <Box sx={{ margin: '20px' }}>
            <Grid container spacing={3}>
                <Grid item xs={12} md={12}>
                    <WelcomeSection
                        title="전기분 손익계산서"
                        description={(
                            <Typography>
                                전기분 손익계산서 페이지는 <span>이전 회계 기간 동안의 수익과 비용</span>을 통해 <span>순이익을 계산</span>하는 기능을 제공함. 이 페이지에서는 전기분 손익 데이터를 통해 <span>과거 경영 성과</span>를 분석할 수 있으며, 이를 통해 <span>미래의 경영 계획</span>을 수립하는 데 도움을 줌. 전기분 손익계산서는 <span>기업의 장기적인 경영 전략</span>에 중요한 역할을 함.
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

export default PreviousIncomeStatementPage;