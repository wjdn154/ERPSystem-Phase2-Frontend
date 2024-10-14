import React, {useMemo, useState} from 'react';
import {Box, Grid, Grow, Paper} from '@mui/material';
import WelcomeSection from '../../../../components/WelcomeSection.jsx';
import { tabItems } from './CashBookUtil.jsx';
import {Typography} from '@mui/material';
import { Table, Button, DatePicker } from 'antd';
import TemporarySection from "../../../../components/TemporarySection.jsx";
import {useNotificationContext} from "../../../../config/NotificationContext.jsx";
import apiClient from "../../../../config/apiClient.jsx";
import {FINANCIAL_API} from "../../../../config/apiConstants.jsx";
import dayjs from "dayjs";
const { RangePicker } = DatePicker;

const CashBookPage = () => {
    const notify = useNotificationContext();
    const [activeTabKey, setActiveTabKey] = useState('1');
    const [cashJournalData, setCashJournalData] = useState(null);
    const [searchParams, setSearchParams] = useState({
        startDate: null,
        endDate: null,
    });

    const handleTabChange = (key) => {
        setActiveTabKey(key);
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
    const handleSearch = async () => {
        const { startDate, endDate } = searchParams;
        // 입력값 검증
        if (!startDate || !endDate) {
            notify('warning', '입력 오류', '모든 필드를 입력해 주세요.', 'bottomRight');
            return;
        }

        try {
            const response = await apiClient.post(FINANCIAL_API.CASH_JOURNAL_LEDGER_API, searchParams);
            const data = response.data;
            setCashJournalData(data);
        } catch (error) {
            notify('error', '조회 오류', '현금출납장 조회 중 오류가 발생했습니다.', 'top');
        }
    };

    return (
        <Box sx={{ margin: '20px' }}>
            <Grid container spacing={3}>
                <Grid item xs={12} md={12}>
                    <WelcomeSection
                        title="현금 출납장"
                        description={(
                            <Typography>
                                현금 출납장은 기업의 <span>현금 흐름을 관리</span>하는 페이지임. 현금의 <span>입출금 내역</span>을 기록하고, <span>일별, 월별 현금 흐름</span>을 조회할 수 있어 재무 상태를 명확하게 파악할 수 있음. 이를 통해 <span>현금 관리의 효율성을 극대화</span>할 수 있음.
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
                    <Grid item xs={12} md={8} sx={{ minWidth: '800px'}}>
                        <Grow in={true} timeout={200}>
                            <Paper elevation={3} sx={{ height: '100%' }}>
                                <Typography variant="h6" sx={{ padding: '20px' }} >현금출납장 조회</Typography>
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
                                        <Button type="primary" onClick={handleSearch} >
                                            검색
                                        </Button>
                                    </Grid>
                                    <Table
                                        dataSource={cashJournalData ? [
                                            {
                                                key: 'previousBalance',
                                                voucherDate: '[전 기 이 월]',
                                                transactionDescription: null,
                                                clientCode: null,
                                                clientName: null,
                                                depositAmount: cashJournalData.previousTotalDepositAmount,
                                                withdrawalAmount: cashJournalData.previousTotalWithdrawalAmount,
                                                cashAmount: cashJournalData.previousTotalCashAmount,
                                                isPreviousBalance: true,
                                            },
                                            ...cashJournalData.cashJournalShowAllDTOList.flatMap((monthData, index) => [
                                                // 각 월별 데이터
                                                ...monthData.cashJournalShows.map((entry) => ({
                                                    ...entry,
                                                    key: `voucher-${entry.voucherId}`,
                                                    isPreviousBalance: false,
                                                    isSummary: false,
                                                })),
                                                // 월계 데이터
                                                {
                                                    key: `monthlyTotal-${index}`,
                                                    voucherDate: '[월 계]',
                                                    transactionDescription: null,
                                                    depositAmount: monthData.monthlyTotalDepositAmount,
                                                    withdrawalAmount: monthData.monthlyTotalWithdrawalAmount,
                                                    cashAmount: monthData.monthlyTotalCashAmount,
                                                    isSummary: true,
                                                    isMonthlyTotal: true,
                                                },
                                                // 누계 데이터
                                                {
                                                    key: `cumulativeTotal-${index}`,
                                                    voucherDate: '[누 계]',
                                                    transactionDescription: null,
                                                    depositAmount: monthData.cumulativeTotalDepositAmount,
                                                    withdrawalAmount: monthData.cumulativeTotalWithdrawalAmount,
                                                    cashAmount: monthData.cumulativeTotalCashAmount,
                                                    isSummary: true,
                                                    isCumulativeTotal: true,
                                                },
                                            ]),
                                        ] : null}
                                        columns={[
                                            {
                                                title: '전표일자',
                                                dataIndex: 'voucherDate',
                                                key: 'voucherDate',
                                                align: 'center',
                                                render: (text, record) => {
                                                    return (record.isPreviousBalance || record.isMonthlyTotal || record.isCumulativeTotal) ?  <span className="medium-text">{text}</span> : <span className="small-text">{text}</span>;
                                                },
                                            },
                                            {
                                                title: '적요',
                                                dataIndex: 'transactionDescription',
                                                key: 'transactionDescription',
                                                align: 'center',
                                                render: (text, record) => {
                                                    return text ? <span className="small-text">{text}</span> : '';
                                                },
                                            },
                                            {
                                                title: '거래처',
                                                dataIndex: 'clientCode',
                                                key: 'clientCode',
                                                align: 'center',
                                                render: (text, record) => {
                                                    if (record.isSummary || record.isPreviousBalance) return ''; // 월계 및 누계는 거래처 코드 공백
                                                    return text ? <span className="small-text">[{text}] {record.clientName}</span> : '';
                                                },
                                            },
                                            {
                                                title: '입금',
                                                dataIndex: 'depositAmount',
                                                key: 'depositAmount',
                                                align: 'center',
                                                render: (text, record) => (record.isPreviousBalance || record.isMonthlyTotal || record.isCumulativeTotal) ? <span className="medium-text">{text.toLocaleString()}</span> :
                                                    <span className="small-text">{text.toLocaleString()}</span>,
                                            },
                                            {
                                                title: '출금',
                                                dataIndex: 'withdrawalAmount',
                                                key: 'withdrawalAmount',
                                                align: 'center',
                                                render: (text, record) => (record.isPreviousBalance || record.isMonthlyTotal || record.isCumulativeTotal) ? <span className="medium-text">{text.toLocaleString()}</span> :
                                                    <span className="small-text">{text.toLocaleString()}</span>,
                                            },
                                            {
                                                title: '잔액',
                                                dataIndex: 'cashAmount',
                                                key: 'cashAmount',
                                                align: 'center',
                                                render: (text, record) => (record.isPreviousBalance || record.isMonthlyTotal || record.isCumulativeTotal) ? <span className="medium-text">{text.toLocaleString()}</span> :
                                                    <span className="small-text">{text.toLocaleString()}</span>,
                                            },
                                        ]}
                                        rowKey="key"
                                        pagination={{ pageSize: 30, position: ['bottomCenter'], showSizeChanger: false }}
                                        // pagination={false}
                                        size={'small'}
                                        rowClassName={(record) => {
                                            if (record.isPreviousBalance || record.isMonthlyTotal || record.isCumulativeTotal) return 'summary-row';
                                            return '';
                                        }}
                                    />
                                </Grid>

                            </Paper>
                        </Grow>
                    </Grid>
                </Grid>
            )}

        </Box>
    );
};

export default CashBookPage;