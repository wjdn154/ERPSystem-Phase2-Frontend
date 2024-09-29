import React, { useState, useEffect, useCallback, useMemo } from 'react'
import {Box, Grid, Grow, Paper, Typography} from '@mui/material'
import { DeleteOutlined, PlusOutlined, SaveOutlined, ExclamationCircleOutlined } from '@ant-design/icons'
import {Table, Button, Input, Select, DatePicker, InputNumber, message, Spin, AutoComplete, Modal, Tag} from 'antd'
import { format } from 'date-fns'
import { ko } from 'date-fns/locale'
import dayjs from "dayjs"
import WelcomeSection from "../../../../components/WelcomeSection"
import { tabItems } from "./PendingVoucherInputUtil"
import TemporarySection from "../../../../components/TemporarySection"
import {useNotificationContext} from "../../../../config/NotificationContext.jsx";
import axios from "axios";
import {FINANCIAL_API} from "../../../../config/apiConstants.jsx";
import apiClient from "../../../../config/apiClient.jsx";

const { Option } = Select

const PendingVoucherInputPage = () => {
    const notify = useNotificationContext();
    const [selectedDate, setSelectedDate] = useState(new Date())
    const [entries, setEntries] = useState([])
    const [activeTabKey, setActiveTabKey] = useState('1')
    const [newEntry, setNewEntry] = useState({})
    const [isAccountModalOpen, setIsAccountModalOpen] = useState(false)
    const [isCounterpartModalOpen, setIsCounterpartModalOpen] = useState(false)

    const handleTabChange = (key) => {
        setActiveTabKey(key)
    }

    const fetchData = useCallback(async () => {
        try {
            // 백엔드로부터 데이터를 불러옴
            const response = await apiClient.post(FINANCIAL_API.UNRESOLVED_VOUCHER_SEARCH_API, {
                searchDate: selectedDate.toISOString().split('T')[0] // LocalDate 형식으로 전송
            });

            const responseData = response.data;
            console.log('responseData:', responseData);

            // 응답 데이터에서 전표 리스트 추출 및 합계 행 추가
            const formattedEntries = responseData.voucherDtoList.map((entry, index) => ({
                ...entry,
                key: `${entry.voucherNumber}-${entry.voucherType}-${index}`, // 고유한 키 생성
            }));

            // 합계 행 추가
            const totalRow = {
                voucherNumber: '합계',
                voucherDate: '',
                voucherType: '',
                accountSubjectCode: '',
                accountSubjectName: '',
                clientCode: '',
                clientName: '',
                transactionDescription: '',
                debitAmount: responseData.totalDebit,
                creditAmount: responseData.totalCredit,
                key: 'total', // 고유 키
            };

            // 실제 전표 리스트와 합계 행 설정
            setEntries([...formattedEntries, totalRow]);

        } catch (err) {
            console.error('데이터를 불러오는 중 오류 발생:', err);
            notify('error', '오류', '데이터를 불러오는 중 오류가 발생했습니다.', 'top');
        }
    }, [selectedDate]);

    // selectedDate 변경 시 fetchData 호출
    useEffect(() => {
        fetchData();
    }, [selectedDate, fetchData]);

    const handleInputChange = (field, value) => {
        setNewEntry(prev => ({ ...prev, [field]: value }))
    }

    const handleSubmit = async () => {
        try {
            // 서버로 보낼 새로운 항목 데이터 정의
            const newEntryData = {
                ...newEntry,
                id: Date.now(),
                date: selectedDate.toISOString().split('T')[0], // 날짜를 ISO 형식으로 변환
                code: `0000${entries.length + 1}`
            };

            // 서버에 새로운 항목을 저장하는 API 호출
            const response = await axios.post(FINANCIAL_API.SAVE_ACCOUNT_SUBJECT_API, newEntryData);

            // 서버 응답에서 새로운 항목을 받아 로컬 상태 업데이트
            const updatedEntries = [...entries, response.data];
            setEntries(updatedEntries);

            // 저장 완료 알림
            notify('success', '저장 완료', '새 항목이 저장되었습니다.', 'bottomLeft');

            // 입력 폼 초기화
            setNewEntry({
                type: '차변',
                accountCode: '',
                accountName: '',
                counterpart: '',
                counterpartName: '',
                details: '',
                debit: 0,
                credit: 0
            });
        } catch (err) {
            // 오류 발생 시 알림
            notify('error', '저장 실패', '항목 저장 중 오류가 발생했습니다.', 'bottomLeft');
        }
    };

    const formattedDate = useMemo(() => {
        return format(selectedDate, 'yyyy-MM-dd', { locale: ko });
    }, [selectedDate]);

    const voucherColumns = [
        {
            title: <span style={{ fontSize: '0.8rem' }}>날짜</span>,
            dataIndex: 'voucherDate',
            key: 'voucherDate',
            width: '10%',
            align: 'center',
            render: (text, record) => (record.key === 'total' ? <Typography>합계</Typography> : <span style={{ fontSize: '0.7rem' }}>{text || formattedDate}</span>)
        },
        {
            title: <span style={{ fontSize: '0.8rem' }}>전표번호</span>,
            dataIndex: 'voucherNumber',
            key: 'voucherNumber',
            width: '5%',
            align: 'center',
            render: (text, record) => (record.key === 'total' ? null : <span style={{ fontSize: '0.7rem' }}>{text}</span>)
        },
        {
            title: <span style={{ fontSize: '0.8rem' }}>구분</span>,
            dataIndex: 'voucherType',
            key: 'voucherType',
            width: '10%',
            align: 'center',
            render: (text, record) => {
                if (record.key === 'total') {
                    return null;
                }

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
                        color = 'blue';
                        value = '차변';
                        break;
                    case 'CREDIT':
                        color = 'orange';
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
            title: <span style={{ fontSize: '0.8rem' }}>계정과목</span>,
            dataIndex: 'accountSubjectCode',
            key: 'accountSubjectCode',
            width: '10%',
            align: 'center',
            render: (text, record) => (record.key === 'total' ? null : <span style={{ fontSize: '0.7rem' }}>[{text}] {record.accountSubjectName}</span>)
        },
        {
            title: <span style={{ fontSize: '0.8rem' }}>거래처</span>,
            dataIndex: 'clientCode',
            key: 'clientCode',
            width: '10%',
            align: 'center',
            render: (text, record) => (record.key === 'total' ? null : <span style={{ fontSize: '0.7rem' }}>[{text}] {record.clientName}</span>)
        },
        {
            title: <span style={{ fontSize: '0.8rem' }}>적요</span>,
            dataIndex: 'transactionDescription',
            key: 'transactionDescription',
            width: '20%',
            align: 'center',
            render: (text, record) => (record.key === 'total' ? null : <span style={{ fontSize: '0.7rem' }}>{text}</span>)
        },
        {
            title: <span style={{ fontSize: '0.8rem' }}>차변</span>,
            dataIndex: 'debitAmount',
            key: 'debitAmount',
            width: '10%',
            align: 'right',
            render: (text, record) => (record.key === 'total' ? <span>{text.toLocaleString()}</span> : <span style={{ fontSize: '0.7rem' }}>{text.toLocaleString()}</span>)
        },
        {
            title: <span style={{ fontSize: '0.8rem' }}>대변</span>,
            dataIndex: 'creditAmount',
            key: 'creditAmount',
            width: '10%',
            align: 'right',
            render: (text, record) => (record.key === 'total' ? <span>{text.toLocaleString()}</span> : <span style={{ fontSize: '0.7rem' }}>{text.toLocaleString()}</span>)
        }
    ];

    const handleAccountClick = () => {
        setIsAccountModalOpen(true)
    }

    const handleCounterpartClick = () => {
        setIsCounterpartModalOpen(true)
    }

    return (
        <Box sx={{ margin: '20px' }}>
            <Grid container spacing={3}>
                <Grid item xs={12} md={12}>
                    <WelcomeSection
                        title="미결전표 입력"
                        description={(
                            <Typography>
                                미결전표 입력 페이지는 <span>아직 승인되지 않은 전표</span>를 등록하고 관리하는 기능을 제공합니다. 이 페이지에서는 <span>거래 내역, 적요, 금액, 계정과목</span> 등을 입력하여 <span>미결 상태의 전표를 작성</span>할 수 있으며, 전표 승인 전까지 <span>수정 및 검토</span>가 가능합니다. 이를 통해 <span>전표 처리 과정</span>을 효율적으로 관리하고 추적할 수 있습니다.
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
                                            value={dayjs(selectedDate)}
                                            onChange={(date) => setSelectedDate(date.toDate())}
                                            style={{ width: '100%' }}
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Table
                                            columns={voucherColumns}
                                            dataSource={entries} // 합계 행 포함
                                            rowKey={(record) => record.key}
                                            pagination={false}
                                            size="small"
                                            scroll={{ x: 'max-content' }}
                                        />
                                    </Grid>
                                </Grid>
                            </Paper>
                        </Grow>
                    </Grid>
                    <Grid item xs={12} md={12}>
                        <Grow in={true} timeout={200}>
                            <Paper elevation={3} sx={{ height: '100%' }}>
                                <Typography variant="h6" sx={{ padding: '20px' }}>전표 입력</Typography>
                                <Grid container spacing={2} alignItems="center" justifyContent="space-between" sx={{ padding: '0px 20px 0px 20px' }}>

                                    {/* 구분 입력 */}
                                    <Grid item xs={2}>
                                        <Select
                                            style={{ width: '100%' }}
                                            value={newEntry.type}
                                            onChange={(value) => setNewEntry({ ...newEntry, type: value })}
                                        >
                                            <Option value="입금">입금</Option>
                                            <Option value="출금">출금</Option>
                                            <Option value="차변">차변</Option>
                                            <Option value="대변">대변</Option>
                                        </Select>
                                    </Grid>

                                    {/* 계정과목 입력 */}
                                    <Grid item xs={2}>
                                        <Input
                                            placeholder="계정과목"
                                            value={newEntry.accountName}
                                            onClick={() => setIsAccountModalOpen(true)}
                                        />
                                    </Grid>

                                    {/* 거래처명 입력 */}
                                    <Grid item xs={2}>
                                        <Input
                                            placeholder="거래처명"
                                            value={newEntry.counterpartName}
                                            onClick={() => setIsCounterpartModalOpen(true)}
                                        />
                                    </Grid>

                                    {/* 적요 입력 */}
                                    <Grid item xs={4}>
                                        <AutoComplete
                                            style={{ width: '100%' }}
                                            placeholder="적요"
                                            value={newEntry.details}
                                            onChange={(value) => setNewEntry({ ...newEntry, details: value })}
                                        />
                                    </Grid>

                                    {/* 차변 금액 입력 */}
                                    <Grid item xs={1}>
                                        <InputNumber
                                            style={{ width: '100%' }}
                                            placeholder="차변"
                                            value={newEntry.debit}
                                            onChange={(value) => setNewEntry({ ...newEntry, debit: value })}
                                            disabled={newEntry.type === '대변'}
                                        />
                                    </Grid>

                                    {/* 대변 금액 입력 */}
                                    <Grid item xs={1}>
                                        <InputNumber
                                            style={{ width: '100%' }}
                                            placeholder="대변"
                                            value={newEntry.credit}
                                            onChange={(value) => setNewEntry({ ...newEntry, credit: value })}
                                            disabled={newEntry.type === '차변'}
                                        />
                                    </Grid>

                                </Grid>

                                {/* 저장 버튼을 오른쪽 하단에 위치 */}
                                <Grid container justifyContent="flex-end" sx={{ padding: '20px' }}>
                                    <Grid item>
                                        <Button
                                            type="primary"
                                            icon={<SaveOutlined />}
                                            onClick={handleSubmit}
                                        >
                                            저장
                                        </Button>
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
                        <TemporarySection />
                    </Grid>
                </Grid>
            )}

            <Modal
                title="계정과목 선택"
                open={isAccountModalOpen}
                onCancel={() => setIsAccountModalOpen(false)}
                footer={null}
            >
                <p>계정과목 선택 모달 내용</p>
                {/* 계정과목 선택 로직 구현 */}
            </Modal>

            <Modal
                title="거래처 선택"
                open={isCounterpartModalOpen}
                onCancel={() => setIsCounterpartModalOpen(false)}
                footer={null}
            >
                <p>거래처 선택 모달 내용</p>
                {/* 거래처 선택 로직 구현 */}
            </Modal>
        </Box>
    )
}

export default PendingVoucherInputPage