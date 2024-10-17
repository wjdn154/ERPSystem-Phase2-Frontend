import React, {useCallback, useEffect, useMemo, useState} from 'react';
import {Box, Grid, Grow, Paper} from '@mui/material';
import WelcomeSection from '../../../../components/WelcomeSection.jsx';
import { tabItems } from './PendingVoucherApprovalUtil.jsx';
import {Typography} from '@mui/material';
import {Button, DatePicker, Table, Tag} from 'antd';
import TemporarySection from "../../../../components/TemporarySection.jsx";
import {useSelector} from "react-redux";
import {useNotificationContext} from "../../../../config/NotificationContext.jsx";
import {format} from "date-fns";
import {ko} from "date-fns/locale";
import apiClient from "../../../../config/apiClient.jsx";
import {FINANCIAL_API} from "../../../../config/apiConstants.jsx";
import dayjs from "dayjs";

const PendingVoucherApprovalPage = () => {
    const token = useSelector(state => state.auth.token);
    const notify = useNotificationContext();
    const [selectedDate, setSelectedDate] = useState(new Date())
    const [searchData, setSearchData] = useState([])
    const [activeTabKey, setActiveTabKey] = useState('1');

    const fetchData = useCallback(async () => {
        try {
            const response = await apiClient.post(FINANCIAL_API.UNRESOLVED_VOUCHER_SEARCH_API, {
                searchDate: formattedDate,
            });

            console.log('response:', response.data);
            setSearchData(response.data); // API로 받은 데이터를 바로 상태로 설정

        } catch (err) {
            console.error('데이터를 불러오는 중 오류 발생:', err);
            notify('error', '오류', '데이터를 불러오는 중 오류가 발생했습니다.', 'top');
        }
    }, [selectedDate]);

    // selectedDate 변경 시 fetchData 호출
    useEffect(() => {
        fetchData();
    }, [selectedDate, fetchData]);

    const formattedDate = useMemo(() => {
        return format(selectedDate, 'yyyy-MM-dd', { locale: ko });
    }, [selectedDate]);

    const handleTabChange = (key) => {
        setActiveTabKey(key);
    };



    return (
        <Box sx={{ margin: '20px' }}>
            <Grid container spacing={3}>
                <Grid item xs={12} md={12}>
                    <WelcomeSection
                        title="미결전표 승인"
                        description={(
                            <Typography>
                                미결전표승인 페이지는 <span>미결 상태의 전표를 승인하는 기능</span>을 제공함. 이 페이지를 통해 승인자는 <span>거래 내역을 검토하고 승인 또는 반려</span>할 수 있음.<br/>
                                미결 전표를 승인하면 <span>전표가 확정되어 회계 처리</span>가 완료됨. 이를 통해 정확한 재무 데이터를 유지하고 결산을 원활하게 진행할 수 있음.
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
                    <Grid item xs={12} md={12}>
                        <Grow in={true} timeout={200}>
                            <Paper elevation={3} sx={{ height: '100%' }}>
                                <Typography variant="h6" sx={{ padding: '20px' }} >전표 목록</Typography>
                                <Grid sx={{ padding: '0px 20px 0px 20px' }}>
                                    <Grid item xs={12} md={3} sx={{ marginBottom: '20px' }}>
                                        <DatePicker
                                            disabledDate={(current) => current && current.year() !== 2024}
                                            value={selectedDate ? dayjs(selectedDate) : null}
                                            onChange={(date) => {
                                                if (date) {
                                                    setSelectedDate(date.toDate());
                                                } else {
                                                    setSelectedDate(null);
                                                }
                                            }}
                                            style={{ width: '100%' }}
                                        />
                                    </Grid>
                                    <Grid item xs={12} sx={{ marginBottom: '20px' }}>
                                        <Table
                                            dataSource={searchData?.voucherDtoList}
                                            columns={[
                                                {
                                                    title: '날짜',
                                                    dataIndex: 'voucherDate',
                                                    key: 'voucherDate',
                                                    width: '10%',
                                                    align: 'center',
                                                    render: (text, record) => <span className="small-text">{text || formattedDate}</span>
                                                },
                                                {
                                                    title: '전표번호',
                                                    dataIndex: 'voucherNumber',
                                                    key: 'voucherNumber',
                                                    width: '5%',
                                                    align: 'center',
                                                    render: (text, record) => record.total ? null : <span className="small-text">{text}</span>
                                                },
                                                {
                                                    title: '구분',
                                                    dataIndex: 'voucherType',
                                                    key: 'voucherType',
                                                    width: '10%',
                                                    align: 'center',
                                                    render: (text) => {
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
                                                    width: '10%',
                                                    align: 'center',
                                                    render: (text, record) => <span className="small-text">[{text.padStart(5, '0')}]] {record.accountSubjectName}</span>
                                                },
                                                {
                                                    title: '거래처',
                                                    dataIndex: 'clientCode',
                                                    key: 'clientCode',
                                                    width: '10%',
                                                    align: 'center',
                                                    render: (text, record) => <span className="small-text">[{text.padStart(5, '0')}] {record.clientName}</span>
                                                },
                                                {
                                                    title: '적요',
                                                    dataIndex: 'transactionDescription',
                                                    key: 'transactionDescription',
                                                    width: '20%',
                                                    align: 'center',
                                                    render: (text) => <span className="small-text">{text}</span>
                                                },
                                                {
                                                    title: <div style={{ textAlign: 'center' }}>차변</div>,
                                                    dataIndex: 'debitAmount',
                                                    key: 'debitAmount',
                                                    width: '10%',
                                                    align: 'right',
                                                    render: (text) => <span className="small-text">{text.toLocaleString()}</span>
                                                },
                                                {
                                                    title: <div style={{ textAlign: 'center' }}>대변</div>,
                                                    dataIndex: 'creditAmount',
                                                    key: 'creditAmount',
                                                    width: '10%',
                                                    align: 'right',
                                                    render: (text) => <span className="small-text">{text.toLocaleString()}</span>
                                                }
                                            ]}
                                            rowKey={(record) => record.id}
                                            pagination={false}
                                            size="small"
                                            scroll={{ x: 'max-content' }}
                                            summary={() =>  (
                                                <Table.Summary.Row style={{ textAlign: 'right', backgroundColor: '#FAFAFA' }}>
                                                    <Table.Summary.Cell index={0} ><div style={{ textAlign: 'center' }} className="medium-text">합계</div></Table.Summary.Cell>
                                                    <Table.Summary.Cell index={1} />
                                                    <Table.Summary.Cell index={2} />
                                                    <Table.Summary.Cell index={3} />
                                                    <Table.Summary.Cell index={4} />
                                                    <Table.Summary.Cell index={5} />
                                                    <Table.Summary.Cell index={6}><div className="medium-text">{Number(searchData.totalDebit).toLocaleString()}</div></Table.Summary.Cell>
                                                    <Table.Summary.Cell index={7}><div className="medium-text">{Number(searchData.totalCredit).toLocaleString()}</div></Table.Summary.Cell>
                                                </Table.Summary.Row>
                                            )}
                                        />
                                    </Grid>
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

export default PendingVoucherApprovalPage;