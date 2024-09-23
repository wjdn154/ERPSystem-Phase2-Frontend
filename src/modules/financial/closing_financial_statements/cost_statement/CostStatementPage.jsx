import React, {useMemo, useState} from 'react';
import { Box, Grid, Grow } from '@mui/material';
import WelcomeSection from '../../../../components/WelcomeSection.jsx';
import { tabItems } from './CostStatementUtil.jsx';
import {Typography} from '@mui/material';
import {Button} from 'antd';
import TemporarySection from "../../../../components/TemporarySection.jsx";

const CostStatementPage = () => {
    const [activeTabKey, setActiveTabKey] = useState('1');

    const handleTabChange = (key) => {
        setActiveTabKey(key);
    };

    return (
        <Box sx={{ margin: '20px' }}>
            <Grid container spacing={3}>
                <Grid item xs={12} md={12}>
                    <WelcomeSection
                        title="제조원가명세서"
                        description={(
                            <Typography>
                                제조원가명세서 페이지는 <span>기업의 제조 활동에 대한 원가</span>를 명세하는 기능을 제공함. 사용자는 <span>직접 재료비, 노무비, 제조경비</span> 등을 입력하여 제조 과정에서 발생한 비용을 정확히 파악할 수 있음. 이를 통해 <span>제조 원가를 효율적으로 관리</span>하고 개선할 수 있음.
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

export default CostStatementPage;