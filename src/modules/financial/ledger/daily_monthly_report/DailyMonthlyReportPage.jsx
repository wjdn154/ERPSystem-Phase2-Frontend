import React, {useEffect, useMemo, useState} from 'react';
import {Box, Grid, Grow, Paper} from '@mui/material';
import WelcomeSection from '../../../../components/WelcomeSection.jsx';
import { tabItems } from './DailyMonthlyReportUtil.jsx';
import {Typography} from '@mui/material';
import { Table, Button, DatePicker } from 'antd';
import TemporarySection from "../../../../components/TemporarySection.jsx";
import dayjs from "dayjs";
import {useNotificationContext} from "../../../../config/NotificationContext.jsx";
import apiClient from "../../../../config/apiClient.jsx";
import {FINANCIAL_API} from "../../../../config/apiConstants.jsx";
const { RangePicker } = DatePicker;

const DailyMonthlyReportPage = () => {
    const notify = useNotificationContext();
    const [activeTabKey, setActiveTabKey] = useState('1');
    const [DMReportData, setDMReportData] = useState(null);
    const [processedData, setProcessedData] = useState([]);
    const [searchParams, setSearchParams] = useState({
        journalType: null,
        startDate: null,
        endDate: null,
    });

    useEffect(() => {
        if (DMReportData) {
            let categoryCounter = 1; // Medium_category 카운터 초기화
            const newData = DMReportData.map((item) => {
                if (item.level === 'Medium_category' && !item.isCounted) {
                    item.name = `${categoryCounter}. [${item.name}]`;
                    item.isCounted = true;
                    categoryCounter++;
                }
                return item;
            });
            setProcessedData(newData);
        }
    }, [DMReportData]);

    const handleRenderName = (level, text) => {
        if (level === 'Medium_category') {
            return <Typography style={{ fontSize: '0.9rem', fontWeight: 500 }}>{text}</Typography>;
        } else if (level === 'Small_category') {
            return <Typography style={{ fontSize: '0.9rem', fontWeight: 500 }}>[{text}]</Typography>;
        } else if (level === 'Account_name') {
            return <Typography style={{ fontSize: '0.9rem' }}>{text}</Typography>;
        } else if (level === null) {
            return <Typography style={{ fontSize: '0.9rem' }}>{text}</Typography>;
        }
    };

    // 날짜 선택 처리
    const handleDateChange = (dates) => {
        if (dates) {
            setSearchParams({
                ...searchParams,
                startDate: dates[0].format('YYYY-MM-DD'),
                endDate: dates[1].format('YYYY-MM-DD'),
            });
        }
    };

    // 검색 처리
    const handleSearch = async (params) => {
        const { startDate, endDate, journalType } = params;

        // 입력값 검증
        if (!startDate || !endDate || !journalType) {
            notify('warning', '입력 오류', '모든 필드를 입력해 주세요.', 'bottomLeft');
            return;
        }

        try {
            const response = await apiClient.post(FINANCIAL_API.DAILY_AND_MONTH_JOURNAL_LEDGER_API, params);
            const data = response.data;
            setDMReportData(data);
            console.log(data);
        } catch (error) {
            notify('error', '조회 오류', '일계표/월계표 조회 중 오류가 발생했습니다.', 'top');
        }
    };

    const handleTabChange = (key) => {
        setActiveTabKey(key);
    };

    return (
        <Box sx={{ margin: '20px' }}>
            <Grid container spacing={3}>
                <Grid item xs={12} md={12}>
                    <WelcomeSection
                        title="일계표/월계표"
                        description={(
                            <Typography>
                                일계표/월계표 페이지는 기업의 재무 데이터를 <span>일별 혹은 월별로 집계</span>하여 보여주는 기능을 제공함. 일계표와 월계표를 통해 사용자는 <span>각종 거래 내역의 요약</span>을 확인하고, 특정 기간 동안의 <span>재무 상태를 분석</span>할 수 있음. 이를 통해 <span>신속한 재무 보고서 작성</span>이 가능함.
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
                    <Grid item xs={12} md={12} sx={{ minWidth: '500px !important', maxWidth: '1500px !important' }}>
                        <Grow in={true} timeout={200}>
                            <Paper elevation={3} sx={{ height: '100%' }}>
                                <Typography variant="h6" sx={{ padding: '20px' }} >일계표 조회</Typography>
                                <Grid sx={{ padding: '0px 20px 0px 20px' }}>
                                    <Grid sx={{ marginTop: '20px', marginBottom: '20px' }}>
                                        <RangePicker
                                            onChange={handleDateChange}
                                            style={{ marginRight: '10px' }}
                                            defaultValue={[
                                                searchParams.startDate ? dayjs(searchParams.startDate, 'YYYY-MM-DD') : null,
                                                searchParams.endDate ? dayjs(searchParams.endDate, 'YYYY-MM-DD') : null,
                                            ]}
                                            format="YYYY-MM-DD"
                                        />
                                        <Button
                                            type="primary"
                                            onClick={() => {
                                                setSearchParams((prevParams) => {
                                                    const updatedParams = {
                                                        ...prevParams,
                                                        journalType: 'Daily',
                                                    };
                                                    handleSearch(updatedParams); // 상태 업데이트 후 바로 검색 실행
                                                    return updatedParams;
                                                });
                                            }}
                                        >
                                            검색
                                        </Button>
                                    </Grid>
                                    <Table
                                        style={{ marginBottom: '20px' }}
                                        dataSource={processedData ? processedData.map((item, index) => ({
                                            key: `entry-${index}`,
                                            level: item.level,
                                            name: item.name,
                                            cashTotalDebit: item.cashTotalDebit,
                                            subTotalDebit: item.subTotalDebit,
                                            sumTotalDebit: item.sumTotalDebit,
                                            cashTotalCredit: item.cashTotalCredit,
                                            subTotalCredit: item.subTotalCredit,
                                            sumTotalCredit: item.sumTotalCredit,
                                        })) : []}
                                        columns={[
                                            {
                                                title: '차변',
                                                children: [
                                                    {
                                                        title: '현금',
                                                        dataIndex: 'cashTotalDebit',
                                                        key: 'cashTotalDebit',
                                                        align: 'center',
                                                        render: (text, record) => record.level === null ?
                                                            <Typography style={{ fontSize: '0.8rem' }}>{text.toLocaleString()}</Typography>
                                                            : (text !== null ? <span style={{ fontSize: '0.7rem' }}>{text.toLocaleString()}</span> : ''),
                                                    },
                                                    {
                                                        title: '대체',
                                                        dataIndex: 'subTotalDebit',
                                                        key: 'subTotalDebit',
                                                        align: 'center',
                                                        render: (text, record) => record.level === null ?
                                                            <Typography style={{ fontSize: '0.8rem' }}>{text.toLocaleString()}</Typography>
                                                            : (text !== null ? <span style={{ fontSize: '0.7rem' }}>{text.toLocaleString()}</span> : ''),
                                                    },
                                                    {
                                                        title: '합계',
                                                        dataIndex: 'sumTotalDebit',
                                                        key: 'sumTotalDebit',
                                                        align: 'center',
                                                        render: (text, record) => record.level === null ?
                                                            <Typography style={{ fontSize: '0.8rem' }}>{text.toLocaleString()}</Typography>
                                                            : (text !== null ? <span style={{ fontSize: '0.7rem' }}>{text.toLocaleString()}</span> : ''),
                                                    },
                                                ],
                                            },
                                            {
                                                title: '계정과목',
                                                dataIndex: 'name',
                                                key: 'name',
                                                align: 'center',
                                                render: (text, record) => handleRenderName(record.level, text),
                                            },
                                            {
                                                title: '대변',
                                                children: [
                                                    {
                                                        title: '현금',
                                                        dataIndex: 'cashTotalCredit',
                                                        key: 'cashTotalCredit',
                                                        align: 'center',
                                                        render: (text, record) => record.level === null ?
                                                            <Typography style={{ fontSize: '0.8rem' }}>{text.toLocaleString()}</Typography>
                                                            : (text !== null ? <span style={{ fontSize: '0.7rem' }}>{text.toLocaleString()}</span> : ''),
                                                    },
                                                    {
                                                        title: '대체',
                                                        dataIndex: 'subTotalCredit',
                                                        key: 'subTotalCredit',
                                                        align: 'center',
                                                        render: (text, record) => record.level === null ?
                                                            <Typography style={{ fontSize: '0.8rem' }}>{text.toLocaleString()}</Typography>
                                                            : (text !== null ? <span style={{ fontSize: '0.7rem' }}>{text.toLocaleString()}</span> : ''),
                                                    },
                                                    {
                                                        title: '합계',
                                                        dataIndex: 'sumTotalCredit',
                                                        key: 'sumTotalCredit',
                                                        align: 'center',
                                                        render: (text, record) => record.level === null ?
                                                            <Typography style={{ fontSize: '0.8rem' }}>{text.toLocaleString()}</Typography>
                                                            : (text !== null ? <span style={{ fontSize: '0.7rem' }}>{text.toLocaleString()}</span> : ''),
                                                    },
                                                ],
                                            }
                                        ]}
                                        rowKey="key"
                                        // pagination={{ pageSize: 30, position: ['bottomCenter'], showSizeChanger: false }}
                                        pagination={ false }
                                        size={'small'}
                                        rowClassName={(record) => {
                                            return record.level !== 'Account_name' ? 'summary-row' : '';
                                        }}
                                    />
                                </Grid>
                            </Paper>
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

export default DailyMonthlyReportPage;