import React, {useEffect, useState} from 'react';
import { Box, Grid, Typography } from '@mui/material';
import WelcomeSection from '../../../components/WelcomeSection.jsx';
import { tabItems } from './DashBoardUtil.jsx';
import ReactECharts from 'echarts-for-react';
import apiClient from "../../../config/apiClient.jsx";
import axios from "axios";

// const S3_FILE_URL = `${import.meta.env.VITE_AWS_S3_BASE_URL}/data.json`;

const FinanceDashboardPage = ({ initialData }) => {
    const [activeTabKey, setActiveTabKey] = useState('1');
    const [chartData, setChartData] = useState();

    const handleTabChange = (key) => {
        setActiveTabKey(key);
    };

    useEffect(() => {
        const fetchChartData = async () => {
            try {
                const response = await fetch(S3_FILE_URL);
                console.log(response);
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const data = await response.json();
                setChartData(data);
            } catch (error) {
                console.error('파일 불러오기 실패:', error);
            }
        };

        fetchChartData();
    }, []); // 빈 배열을 넣어 컴포넌트가 마운트될 때 한 번 실행

    return (
        <Box sx={{ margin: '20px' }}>
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <WelcomeSection
                        title="재무회계 대시보드"
                        description={(
                            <Typography>
                                재무회계 대시보드는 기업의 재무 상태와 회계 정보를 관리하는 페이지입니다. 재무 보고 및 분석이 가능합니다.
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
                    {/* chartData가 있을 때만 차트를 렌더링 */}
                    {chartData && (
                        <>
                            {/* 재무제표 (손익계산서) */}
                            <Grid item xs={12}>
                                <ReactECharts option={chartData.financialStatementOption} />
                            </Grid>

                            {/* 매출 및 비용 보고서 (Line chart) */}
                            <Grid item xs={12}>
                                <ReactECharts option={chartData.salesExpenseReportOption} />
                            </Grid>

                            {/* 계정과목별 내역 (Bar chart) */}
                            <Grid item xs={12}>
                                <ReactECharts option={chartData.accountDetailsOption} />
                            </Grid>

                            {/* 미수금 및 미지급금 현황 (Stacked bar chart) */}
                            <Grid item xs={6}>
                                <ReactECharts option={chartData.receivablesPayablesOption} />
                            </Grid>

                            {/* 예산 대비 실적 (Gauge chart) */}
                            <Grid item xs={6}>
                                <ReactECharts option={chartData.budgetVsActualOption} />
                            </Grid>
                        </>
                    )}
                </Grid>
            )}
        </Box>
    );
};

export default FinanceDashboardPage;
