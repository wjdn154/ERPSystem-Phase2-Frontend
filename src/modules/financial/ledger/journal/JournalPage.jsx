import React, {useMemo, useState} from 'react';
import {Box, Grid, Grow, Paper} from '@mui/material';
import WelcomeSection from '../../../../components/WelcomeSection.jsx';
import { tabItems } from './JournalUtil.jsx';
import {Typography} from '@mui/material';
import {Button, DatePicker, Input, Table, Tag} from 'antd';
import TemporarySection from "../../../../components/TemporarySection.jsx";
import {useNotificationContext} from "../../../../config/NotificationContext.jsx";
import apiClient from "../../../../config/apiClient.jsx";
import {FINANCIAL_API} from "../../../../config/apiConstants.jsx";
import dayjs from "dayjs";
const { RangePicker } = DatePicker;

const JournalPage = () => {
    const notify = useNotificationContext();
    const [activeTabKey, setActiveTabKey] = useState('1');
    const [journalData, setJournalData] = useState(null);
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
            notify('warning', '입력 오류', '모든 필드를 입력해 주세요.', 'bottomLeft');
            return;
        }

        try {
            const response = await apiClient.post(FINANCIAL_API.JOURNAL_LEDGER_API, searchParams);
            const data = response.data;
            setJournalData(data);
        } catch (error) {
            notify('error', '조회 오류', '분개장 조회 중 오류가 발생했습니다.', 'top');
        }
    };

    return (
        <Box sx={{ margin: '20px' }}>
            <Grid container spacing={3}>
                <Grid item xs={12} md={12}>
                    <WelcomeSection
                        title="분개장"
                        description={(
                            <Typography>
                                분개장 페이지는 <span>모든 거래를 계정과목별로 분류하여 기록</span>하는 페이지임. 각 거래는 <span>차변과 대변</span>으로 나뉘며, 이를 통해 <span>재무 상태를 명확히 파악</span>할 수 있음. 분개장은 재무 보고서 작성에 필요한 기본 자료를 제공함.<br/>
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
                    <Grid item xs={12} md={8} sx={{ minWidth: '1200px'}}>
                        <Grow in={true} timeout={200}>
                            <Paper elevation={3} sx={{ height: '100%' }}>
                                <Typography variant="h6" sx={{ padding: '20px' }} >분개장 조회</Typography>
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
                                        dataSource={journalData?.journalShowDetailDTO}
                                        columns={[
                                            {
                                                title: '전표일자',
                                                dataIndex: 'voucherDate',
                                                key: 'voucherDate',
                                                align: 'center',
                                                render: (text) => text ? <span style={{ fontSize: '0.7rem' }}>{text}</span> : ''
                                            },
                                            {
                                                title: '전표번호',
                                                dataIndex: 'voucherNumber',
                                                key: 'voucherNumber',
                                                align: 'center',
                                                render: (text) => text ? <span style={{ fontSize: '0.7rem' }}>{text}</span> : ''
                                            },
                                            {
                                                title: '구분',
                                                dataIndex: 'voucherType',
                                                key: 'voucherType',
                                                align: 'center',
                                                render: (text, record) => {
                                                    let color;
                                                    let value;
                                                    switch (text) {
                                                        case 'DEPOSIT':
                                                            color = 'green';
                                                            value = '입금';
                                                            break;
                                                        case 'WITHDRAWAL':
                                                            color = 'red';
                                                            value = '출금';
                                                            break;
                                                        case 'DEBIT':
                                                            color = 'green';
                                                            value = '차변';
                                                            break;
                                                        case 'CREDIT':
                                                            color = 'red';
                                                            value = '대변';
                                                            break;
                                                        default:
                                                            color = 'gray';
                                                            value = text;
                                                    }
                                                    return <Tag style={{ marginLeft: '5px' }} color={color}>{value}</Tag>;
                                                }
                                            },
                                            {
                                                title: '계정과목',
                                                dataIndex: 'accountSubjectCode',
                                                key: 'accountSubjectCode',
                                                align: 'center',
                                                render: (text, record) => text ? <span style={{ fontSize: '0.7rem' }}>[{text}] {record.accountSubjectName}</span> : ''
                                                // render: (text, record) => { return <span><Tag style={{ marginLeft: '5px' }} color='gray'>{text}</Tag>{record.accountSubjectName}</span>; }
                                            },
                                            {
                                                title: (
                                                    <div>
                                                        금액
                                                    </div>
                                                ),
                                                align: 'center',
                                                children: [
                                                    {
                                                        title: '차변',
                                                        dataIndex: 'debitAmount',
                                                        key: 'debitAmount',
                                                        align: 'center',
                                                        render: (text) => text ? <span style={{ fontSize: '0.7rem' }}>{text.toLocaleString()}</span> : ''
                                                    },
                                                    {
                                                        title: '대변',
                                                        dataIndex: 'creditAmount',
                                                        key: 'creditAmount',
                                                        align: 'center',
                                                        render: (text) => text ? <span style={{ fontSize: '0.7rem' }}>{text.toLocaleString()}</span> : ''
                                                    },
                                                ],
                                                colSpan: 2,
                                            },
                                            {
                                                title: '적요',
                                                dataIndex: 'transactionDescription',
                                                key: 'transactionDescription',
                                                align: 'center',
                                                render: (text) => text ? <span style={{ fontSize: '0.7rem' }}>{text}</span> : ''
                                            },
                                            {
                                                title: '거래처',
                                                dataIndex: 'clientCode',
                                                key: 'clientCode',
                                                align: 'center',
                                                render: (text, record) => text ? <span style={{ fontSize: '0.7rem' }}>[{text.padStart(5, '0')}] {record.clientName}</span> : ''
                                                // render: (text, record) => { return <span><Tag style={{ marginLeft: '5px' }} color='gray'>{text.padStart(5, '0')}</Tag>{record.clientName}</span>; }
                                            },
                                            {
                                                title: '등록번호',
                                                dataIndex: 'clientRegisterNumber',
                                                key: 'clientRegisterNumber',
                                                align: 'center',
                                                render: (text, record) => text ? <span style={{ fontSize: '0.7rem' }}>{text}</span> : ''
                                            },
                                            {
                                                title: '담당자',
                                                dataIndex: 'voucherManagerName',
                                                key: 'voucherManagerName',
                                                align: 'center',
                                                render: (text) => text ? <span style={{ fontSize: '0.7rem' }}>{text}</span> : ''
                                            },
                                            {
                                                title: '유형',
                                                dataIndex: 'voucherKind',
                                                key: 'voucherKind',
                                                align: 'center',
                                                render: (text, record) => {
                                                    let color;
                                                    let value;
                                                    switch (text) {
                                                        case 'SALE_AND_PURCHASE':
                                                            color = 'blue';
                                                            value = '매출매입전표';
                                                            break;
                                                        case 'GENERAL':
                                                            color = 'orange';
                                                            value = '일반전표';
                                                            break;
                                                        default:
                                                            color = 'gray';
                                                            value = text;
                                                    }
                                                    return <Tag style={{ marginLeft: '5px' }} color={color}>{value}</Tag>;
                                                }
                                            },
                                        ]}
                                        rowKey="id"
                                        pagination={{ pageSize: 15, position: ['bottomCenter'], showSizeChanger: false }}
                                        // pagination={false}
                                        size={'small'}
                                        summary={() => (
                                            <Table.Summary.Row style={{ backgroundColor: '#FAFAFA'}}>
                                                <Table.Summary.Cell><Typography sx={{ textAlign: 'center', fontSize: '0.8rem' }}>총 합계</Typography></Table.Summary.Cell>
                                                <Table.Summary.Cell></Table.Summary.Cell>
                                                <Table.Summary.Cell></Table.Summary.Cell>
                                                <Table.Summary.Cell><Typography sx={{ textAlign: 'center', fontSize: '0.8rem' }}>{journalData?.totalVoucherCount}건</Typography></Table.Summary.Cell>
                                                <Table.Summary.Cell><Typography sx={{ textAlign: 'center', fontSize: '0.8rem' }}>{journalData?.totalCredit.toLocaleString()}</Typography></Table.Summary.Cell>
                                                <Table.Summary.Cell><Typography sx={{ textAlign: 'center', fontSize: '0.8rem' }}>{journalData?.totalDebit.toLocaleString()}</Typography></Table.Summary.Cell>
                                                <Table.Summary.Cell></Table.Summary.Cell>
                                                <Table.Summary.Cell></Table.Summary.Cell>
                                                <Table.Summary.Cell></Table.Summary.Cell>
                                            </Table.Summary.Row>
                                        )}
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

export default JournalPage;