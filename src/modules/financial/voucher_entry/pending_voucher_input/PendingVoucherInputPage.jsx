import React, { useState, useEffect, useCallback, useMemo } from 'react'
import {Box, Grid, Grow, Paper, Typography} from '@mui/material'
import { DeleteOutlined, PlusOutlined, SaveOutlined, ExclamationCircleOutlined } from '@ant-design/icons'
import { Table, Button, Input, Select, DatePicker, InputNumber, message, Spin, AutoComplete, Modal } from 'antd'
import { format } from 'date-fns'
import { ko } from 'date-fns/locale'
import dayjs from "dayjs"
import WelcomeSection from "../../../../components/WelcomeSection"
import { tabItems } from "./PendingVoucherInputUtil"
import TemporarySection from "../../../../components/TemporarySection"
import {useNotificationContext} from "../../../../config/NotificationContext.jsx";

const { Option } = Select

const PendingVoucherInputPage = () => {
    const notify = useNotificationContext();
    const [selectedDate, setSelectedDate] = useState(new Date())
    const [entries, setEntries] = useState([])
    const [totalAmount, setTotalAmount] = useState({ debit: 0, credit: 0 })
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState(null)
    const [activeTabKey, setActiveTabKey] = useState('1')
    const [newEntry, setNewEntry] = useState({
        type: '차변',
        account: '',
        accountName: '',
        counterpart: '',
        counterpartName: '',
        details: '',
        debit: 0,
        credit: 0
    })
    const [isAccountModalOpen, setIsAccountModalOpen] = useState(false)
    const [isCounterpartModalOpen, setIsCounterpartModalOpen] = useState(false)
    const [detailOptions, setDetailOptions] = useState([])

    const handleTabChange = (key) => {
        setActiveTabKey(key)
    }

    const fetchData = useCallback(async () => {
        setIsLoading(true)
        setError(null)
        try {
            // API call would go here
            const response = await new Promise(resolve => setTimeout(() => {
                resolve([
                    { id: 1, date: selectedDate, code: '00001', type: '차변', accountCode: '0110', accountName: '받을어음', counterpart: '00101', counterpartName: '(주)한아름', details: '상품매출 관련 어음수취', debit: 10000000, credit: 0 },
                    { id: 2, date: selectedDate, code: '00002', type: '차변', accountCode: '0113', accountName: '대손충당금', counterpart: '00101', counterpartName: '(주)한아름', details: '대손충당금 설정', debit: 123456000, credit: 0 },
                    { id: 3, date: selectedDate, code: '00003', type: '대변', accountCode: '0101', accountName: '현금', counterpart: '00101', counterpartName: '(주)한아름', details: '거스름 입금', debit: 0, credit: 50000000 },
                ])
            }, 0))
            setEntries(response)
            calculateTotal(response)
        } catch (err) {
            setError('데이터를 불러오는 중 오류가 발생했습니다.')
            notify('error', '오류', '데이터를 불러오는 중 오류가 발생했습니다.', 'top');
        } finally {
            setIsLoading(false)
        }
    }, [selectedDate])

    useEffect(() => {
        fetchData()
    }, [fetchData])

    const calculateTotal = (entries) => {
        const totalDebit = entries.reduce((sum, entry) => sum + entry.debit, 0);
        const totalCredit = entries.reduce((sum, entry) => sum + entry.credit, 0);
        setTotalAmount({ debit: totalDebit, credit: totalCredit }); // 합계 저장
    };

    const handleInputChange = (field, value) => {
        setNewEntry(prev => ({ ...prev, [field]: value }))
    }

    const handleSubmit = async () => {
        setIsLoading(true);
        try {
            const updatedEntries = [...entries, { ...newEntry, id: Date.now(), date: selectedDate, code: `0000${entries.length + 1}` }];
            setEntries(updatedEntries);
            calculateTotal(updatedEntries);
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
            notify('success', '저장 완료', '새 항목이 저장되었습니다.', 'bottomLeft');
        } catch (err) {
            notify('error', '저장 실패', '항목 저장 중 오류가 발생했습니다.', 'bottomLeft');
        } finally {
            setIsLoading(false);
        }
    };

    const formattedDate = useMemo(() => {
        return format(selectedDate, 'yyyy년 MM월 dd일', { locale: ko })
    }, [selectedDate])

    const entriesWithTotal = useMemo(() => {
        if (entries.length === 0) return entries;
        return [
            ...entries,
            {
                id: 'total',
                date: null,
                code: null,
                type: null,
                accountCode: null,
                accountName: null,
                counterpart: null,
                details: null,
                debit: totalAmount.debit,
                credit: totalAmount.credit
            }
        ];
    }, [entries, totalAmount]);

    const voucherColumns = [
        {
            title: <span style={{ fontSize:'0.8rem' }}>날짜</span>,
            dataIndex: 'date',
            key: 'date',
            width: '10%',
            align: 'center',

            render: (text, record) => (record.id === 'total' ? <strong>합계</strong> : <span style={{ fontSize: '0.7rem' }}>{formattedDate}</span> || '-')
        },
        {
            title: <span style={{ fontSize:'0.8rem' }}>전표번호</span>,
            dataIndex: 'code',
            key: 'code',
            width: '10%',
            align: 'center',
            render: (text) => <span style={{ fontSize: '0.7rem' }}>{text}</span>
        },
        {
            title: <span style={{ fontSize:'0.8rem' }}>구분</span>,
            dataIndex: 'type',
            key: 'type',
            width: '10%',
            align: 'center',
            render: (text) => <span style={{ fontSize: '0.7rem' }}>{text}</span>
        },
        {
            title: <span style={{ fontSize:'0.8rem' }}>코드</span>,
            dataIndex: 'accountCode',
            key: 'accountCode',
            width: '5%',
            align: 'center',
            render: (text, record) => (record.id === 'total' ? null : <span style={{ fontSize: '0.7rem' }}>{text}</span>)
        },
        {
            title: <span style={{ fontSize:'0.8rem' }}>계정과목명</span>,
            dataIndex: 'accountCode',
            key: 'accountCode',
            width: '10%',
            align: 'center',
            render: (text, record) => (record.id === 'total' ? null : <span style={{ fontSize: '0.7rem' }}>{record.accountName}</span>)
        },
        {
            title: <span style={{ fontSize:'0.8rem' }}>코드</span>,
            dataIndex: 'counterpart',
            key: 'counterpart',
            width: '5%',
            align: 'center',
            render: (text, record) => (record.id === 'total' ? null : <span style={{ fontSize: '0.7rem' }}>{text}</span>)
        },
        {
            title: <span style={{ fontSize:'0.8rem' }}>거래처명</span>,
            dataIndex: 'counterpart',
            key: 'counterpart',
            width: '10%',
            align: 'center',
            render: (text, record) => (record.id === 'total' ? null : <span style={{ fontSize: '0.7rem' }}>{record.counterpartName}</span>)
        },
        {
            title: <span style={{ fontSize:'0.8rem' }}>적요</span>,
            dataIndex: 'details',
            key: 'details',
            width: '20%',
            align: 'center',
            render: (text) => <span style={{ fontSize: '0.7rem' }}>{text}</span>
        },
        {
            title: <span style={{ fontSize:'0.8rem' }}>차변</span>,
            dataIndex: 'debit',
            key: 'debit',
            width: '10%',
            align: 'right',
            render: (text, record) => (record.id === 'total' ? <strong>{text.toLocaleString()}원</strong> : <span style={{ fontSize: '0.7rem' }}>{text.toLocaleString()}</span>)
        },
        {
            title: <span style={{ fontSize:'0.8rem' }}>대변</span>,
            dataIndex: 'credit',
            key: 'credit',
            width: '10%',
            align: 'right',
            render: (text, record) => (record.id === 'total' ? <strong>{text.toLocaleString()}원</strong> : <span style={{ fontSize: '0.7rem' }}>{text.toLocaleString()}</span>)
        }
    ];

    const handleAccountClick = () => {
        setIsAccountModalOpen(true)
    }

    const handleCounterpartClick = () => {
        setIsCounterpartModalOpen(true)
    }

    const handleDetailsSearch = (value) => {
        // This would typically be an API call
        setDetailOptions(
            !value ? [] : [
                { value: '상품매출' },
                { value: '대손충당금 설정' },
                { value: '거스름 입금' },
            ]
        )
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
                                        {isLoading ? (
                                            <div style={{ textAlign: 'center', padding: '24px' }}>
                                                <Spin size="large" />
                                            </div>
                                        ) : error ? (
                                            <div style={{ textAlign: 'center', color: '#ff4d4f', padding: '24px' }}>
                                                <ExclamationCircleOutlined style={{ fontSize: '24px', marginBottom: '8px' }} />
                                                <p>{error}</p>
                                            </div>
                                        ) : (
                                            <Table
                                                columns={voucherColumns}
                                                dataSource={entriesWithTotal} // 합계 행 포함
                                                rowKey="id"
                                                pagination={false}
                                                size="small"
                                                scroll={{ x: 'max-content' }}
                                            />
                                        )}
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
                                            loading={isLoading}
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