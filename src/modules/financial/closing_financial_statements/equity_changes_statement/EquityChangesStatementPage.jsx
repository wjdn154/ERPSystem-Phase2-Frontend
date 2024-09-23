import React, {useMemo, useState} from 'react';
import { Box, Grid, Grow } from '@mui/material';
import WelcomeSection from '../../../../components/WelcomeSection.jsx';
import { tabItems } from './EquityChangesStatementUtil.jsx';
import {Typography} from '@mui/material';
import {Button} from 'antd';
import TemporarySection from "../../../../components/TemporarySection.jsx";

const EquityChangesStatementPage = () => {
    const [activeTabKey, setActiveTabKey] = useState('1');

    const handleTabChange = (key) => {
        setActiveTabKey(key);
    };

    return (
        <Box sx={{ margin: '20px' }}>
            <Grid container spacing={3}>
                <Grid item xs={12} md={12}>
                    <WelcomeSection
                        title="자본변동표"
                        description={(
                            <Typography>
                                자본변동표 페이지는 <span>기업의 일정 기간 동안 자본의 변동 내역</span>을 관리하는 기능을 제공함. 이 페이지를 통해 사용자는 <span>자본금, 이익잉여금, 기타 자본 항목</span>의 변동을 명확하게 파악할 수 있으며, 이를 통해 <span>자본 구조의 건전성</span>을 평가할 수 있음.
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

export default EquityChangesStatementPage;