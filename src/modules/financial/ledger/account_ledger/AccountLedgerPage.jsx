import React, {useMemo, useState} from 'react';
import {Box, Grid, Grow, Paper} from '@mui/material';
import WelcomeSection from '../../../../components/WelcomeSection.jsx';
import { tabItems } from './AccountLedgerUtil.jsx';
import {Typography} from '@mui/material';
import {Table, Button, DatePicker, Input, Modal, Spin} from 'antd';
import TemporarySection from "../../../../components/TemporarySection.jsx";
import dayjs from "dayjs";
import {useNotificationContext} from "../../../../config/NotificationContext.jsx";
import apiClient from "../../../../config/apiClient.jsx";
import {FINANCIAL_API} from "../../../../config/apiConstants.jsx";
const { RangePicker } = DatePicker;


const AccountLedgerPage = () => {
    const notify = useNotificationContext();
    const [selectedRowKeys, setSelectedRowKeys] = useState([]);
    const [activeTabKey, setActiveTabKey] = useState('1');
    const [searchData, setSearchData] = useState(null);
    const [searchDetailData, setSearchDetailData] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [currentField, setCurrentField] = useState('');
    const [modalData, setModalData] = useState(null);
    const [searchParams, setSearchParams] = useState({
        startDate: null,
        endDate: null,
        startAccountCode: '',
        endAccountCode: '',
    });
    const [searchDetailParams, setSearchDetailParams] = useState({
        startDate : null,
        endDate : null,
        accountId :  '',
    });
    const [displayValues, setDisplayValues] = useState({
        startAccountCode: '',
        endAccountCode: '',
        startClientCode: '',
        endClientCode: ''
    });

    // 입력 필드 클릭 시 모달 열기
    const handleInputClick = (fieldName) => {
        setCurrentField(fieldName);
        setModalData(null); // 모달 열기 전에 데이터를 초기화
        fetchModalData();  // 모달 데이터 가져오기 호출
        setIsModalVisible(true);  // 모달창 열기
    };

    // 날짜 선택 처리
    const handleDateChange = (dates) => {
        if (dates) {
            setSearchParams({
                ...searchParams,
                startDate: dates[0].format('YYYY-MM-DD'),
                endDate: dates[1].format('YYYY-MM-DD'),
            });
            setSearchDetailParams({
                ...searchDetailParams,
                startDate: dates[0].format('YYYY-MM-DD'),
                endDate: dates[1].format('YYYY-MM-DD'),
            });
        }
    };

    const handleModalCancel = () => {
        setIsModalVisible(false);  // 모달창 닫기
    };

    // 모달에서 선택한 값 searchParams에 반영
    const handleModalSelect = (record) => {
        const formattedValue = `[${record.code}] ${record.name}`;

        setSearchParams((prevParams) => ({
            ...prevParams,
            [currentField]: record.code, // 선택한 필드에 따라 값을 할당
        }));

        setDisplayValues((prevValues) => ({
            ...prevValues,
            [currentField]: formattedValue, // 화면에 표시될 형식으로 저장
        }));

        setIsModalVisible(false);  // 모달창 닫기
    };

    const handleTabChange = (key) => {
        setActiveTabKey(key);
    };

    const handleSearch = async () => {
        const { startDate, endDate, startAccountCode, endAccountCode } = searchParams;
        // 입력값 검증
        if (!startDate || !endDate || !startAccountCode || !endAccountCode) {
            notify('warning', '입력 오류', '모든 필드를 입력해 주세요.', 'bottomLeft');
            return;
        }

        // 계정과목 코드 순서 검증
        if (Number(startAccountCode) > Number(endAccountCode)) {
            notify('warning', '입력 오류', '계정과목 시작 코드는 종료 코드보다 작아야 합니다.', 'bottomLeft');
            return;
        }

        try {
            const response = await apiClient.post(FINANCIAL_API.ACCOUNT_SUBJECT_LEDGER_API, searchParams);
            const data = response.data;
            setSearchData(data);
        } catch (error) {
            notify('error', '조회 오류', '총계정원장 조회 중 오류가 발생했습니다.', 'top');
        }
    };

    // 모달 데이터 가져오기
    const fetchModalData = async () => {
        setIsLoading(true);

        try {
            const searchText = null;
            const response = await apiClient.post(FINANCIAL_API.ACCOUNT_SUBJECTS_SEARCH_API, { searchText });
            setModalData(response.data);
        } catch (error) {
            notify('error', '조회 오류', '데이터 조회 중 오류가 발생했습니다.', 'top');
        } finally {
            setIsLoading(false);
        }
    };


    return (
        <Box sx={{ margin: '20px' }}>
            <Grid container spacing={3}>
                <Grid item xs={12} md={12}>
                    <WelcomeSection
                        title="계정별 원장"
                        description={(
                            <Typography>
                                계정별 원장 페이지는 <span>각 계정과목에 따른 거래 내역을 기록하고 조회</span>하는 기능을 제공함. 이를 통해 기업은 각 계정과목의 <span>세부 거래 내역과 잔액</span>을 정확하게 파악할 수 있음. 이 페이지는 <span>총계정원장과 연계</span>되어 상세한 재무 관리를 도와줌.
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
                    <Grid item xs={12} md={2} sx={{ minWidth: '400px' }}>
                        <Grow in={true} timeout={200}>
                            <Paper elevation={3} sx={{ height: '100%' }}>
                                <Typography variant="h6" sx={{ padding: '20px' }} >계정별 원장 조회</Typography>
                                <Grid sx={{ padding: '0px 20px 0px 20px' }}>
                                    <Grid sx={{ display: 'flex' }}>
                                        <Input
                                            name="accountCode"
                                            placeholder="계정과목 시작 코드"
                                            value={displayValues.startAccountCode}
                                            onClick={() => handleInputClick('startAccountCode')}
                                            style={{
                                                width: '50%',
                                                marginRight: '10px',
                                                cursor: 'pointer',
                                                caretColor: 'transparent',
                                            }}
                                        />
                                        <Input
                                            name="accountCode"
                                            placeholder="계정과목 끝 코드"
                                            value={displayValues.endAccountCode}
                                            onClick={() => handleInputClick('endAccountCode')}
                                            style={{
                                                width: '50%',
                                                cursor: 'pointer',
                                                caretColor: 'transparent',
                                            }}
                                        />
                                    </Grid>
                                    <Grid sx={{ marginTop: '20px' }}>
                                        <RangePicker
                                            onChange={handleDateChange}
                                            style={{ width: '80%', marginRight: '10px' }}
                                            defaultValue={[
                                                searchParams.startDate ? dayjs(searchParams.startDate, 'YYYY-MM-DD') : null,
                                                searchParams.endDate ? dayjs(searchParams.endDate, 'YYYY-MM-DD') : null,
                                            ]}
                                            format="YYYY-MM-DD"
                                        />
                                        <Button type="primary" onClick={handleSearch} style={{ width: 'calc(20% - 10px)' }}>
                                            검색
                                        </Button>
                                    </Grid>
                                </Grid>

                                <Grid sx={{ margin: '20px' }}>
                                    <Table
                                        dataSource={searchData}
                                        columns={[
                                            {
                                                title: '계정과목',
                                                dataIndex: 'accountCode',
                                                key: 'accountId',
                                                align: 'center',
                                                render: (text, record) => <span style={{ fontSize: '0.8rem' }}>[{text}] {record.accountName}</span>,
                                            },
                                        ]}
                                        rowKey="accountId"
                                        rowSelection={{
                                            type: 'radio',
                                            selectedRowKeys,
                                            onChange: (newSelectedRowKeys) => {
                                                setSelectedRowKeys(newSelectedRowKeys);
                                            },
                                        }}
                                        pagination={{ pageSize: 10, position: ['bottomCenter'], showSizeChanger: false }}
                                        size={'small'}
                                        onRow={(record) => ({
                                            style: { cursor: 'pointer' },
                                            onClick: async () => {
                                                setSelectedRowKeys([record.accountId]); // 클릭한 행의 키로 상태 업데이트

                                                try {
                                                    const updatedParams = {
                                                        ...searchDetailParams,
                                                        accountId: record.accountId,
                                                    };
                                                    // API 호출 시 updatedParams 사용
                                                    const response = await apiClient.post(FINANCIAL_API.ACCOUNT_SUBJECT_LEDGER_DETAIL_API, { ...updatedParams });
                                                    setSearchDetailData(response.data);
                                                    notify('success', '조회 성공', '데이터를 성공적으로 조회했습니다.', 'bottomLeft');
                                                } catch (error) {
                                                    notify('error', '조회 오류', '데이터 조회 중 오류가 발생했습니다.', 'top');
                                                }
                                            },
                                        })}
                                    />
                                </Grid>
                            </Paper>
                        </Grow>
                    </Grid>
                    { searchDetailData ? (
                        <Grid item xs={12} md={9} sx={{ minWidth: '1100px' }}>
                            <Grow in={true} timeout={200}>
                                <Paper elevation={3} sx={{ height: '100%' }}>
                                    <Typography variant="h6" sx={{ padding: '20px' }}>계정별 원장 상세 조회</Typography>
                                    <Grid sx={{ padding: '0px 20px 20px 20px' }}>
                                        <Table
                                            dataSource={[
                                                {
                                                    voucherDate: '',
                                                    transactionDescription: '[전기이월]',
                                                    clientCode: '',
                                                    clientName: '',
                                                    debitAmount: searchDetailData.previousTotalDebitAmount,
                                                    creditAmount: searchDetailData.previousTotalCreditAmount,
                                                    cashAmount: searchDetailData.previousTotalCashAmount,
                                                    voucherNumber: '',
                                                    voucherRegistrationTime: '',
                                                    departmentName: '',
                                                    voucherManagerName: '',
                                                    isSummary: true,
                                                    key: 'previous-summary'
                                                },
                                                ...searchDetailData.cashJournalShowAllDTOList.flatMap((entry, index) => [
                                                    ...entry.accountLedgerShows.map(show => ({
                                                        ...show,
                                                        key: `ledger-${show.voucherId}`,
                                                    })),
                                                    {
                                                        voucherDate: '',
                                                        transactionDescription: '[월계]',
                                                        clientCode: '',
                                                        clientName: '',
                                                        debitAmount: entry.monthlyTotalDebitAmount,
                                                        creditAmount: entry.monthlyTotalCreditAmount,
                                                        cashAmount: '',  // 월계는 잔액 표시 없음
                                                        voucherNumber: '',
                                                        voucherRegistrationTime: '',
                                                        departmentName: '',
                                                        voucherManagerName: '',
                                                        isSummary: true,
                                                        key: `monthly-summary-${index}`,
                                                    },
                                                    {
                                                        voucherDate: '',
                                                        transactionDescription: '[누계]',
                                                        clientCode: '',
                                                        clientName: '',
                                                        debitAmount: entry.cumulativeTotalDebitAmount,
                                                        creditAmount: entry.cumulativeTotalCreditAmount,
                                                        cashAmount: entry.cumulativeTotalCashAmount,
                                                        voucherNumber: '',
                                                        voucherRegistrationTime: '',
                                                        departmentName: '',
                                                        voucherManagerName: '',
                                                        isSummary: true,
                                                        key: `cumulative-summary-${index}`,
                                                    }
                                                ])
                                            ]}
                                            columns={[
                                                {
                                                    title: '일자',
                                                    dataIndex: 'voucherDate',
                                                    key: 'voucherDate',
                                                    align: 'center',
                                                    render: (text) => text ? <span style={{fontSize: '0.8rem'}}>{new Date(text).toLocaleDateString()}</span> : ''
                                                },
                                                {
                                                    title: '적요',
                                                    dataIndex: 'transactionDescription',
                                                    key: 'transactionDescription',
                                                    align: 'center',
                                                    render: (text, record) => record.isSummary ?
                                                        <Typography style={{ fontSize: '0.9rem', fontWeight: 500 }}>{text}</Typography> :
                                                        <span style={{fontSize: '0.8rem'}}>{text}</span>
                                                },
                                                {
                                                    title: '거래처',
                                                    dataIndex: 'clientCode',
                                                    key: 'clientCode',
                                                    align: 'center',
                                                    render: (text, record) => text ? <span style={{fontSize: '0.8rem'}}>[{text}] {record.clientName}</span> : ''
                                                },
                                                {
                                                    title: '차변',
                                                    dataIndex: 'debitAmount',
                                                    key: 'debitAmount',
                                                    align: 'center',
                                                    render: (text, record) => record.isSummary ?
                                                        <Typography style={{ fontSize: '0.9rem' }}>{Number(text).toLocaleString()}</Typography> :
                                                        <span style={{fontSize: '0.8rem'}}>{Number(text).toLocaleString()}</span>
                                                },
                                                {
                                                    title: '대변',
                                                    dataIndex: 'creditAmount',
                                                    key: 'creditAmount',
                                                    align: 'center',
                                                    render: (text, record) => record.isSummary ?
                                                        <Typography style={{ fontSize: '0.9rem' }}>{Number(text).toLocaleString()}</Typography> :
                                                        <span style={{fontSize: '0.8rem'}}>{Number(text).toLocaleString()}</span>
                                                },
                                                {
                                                    title: '잔액',
                                                    dataIndex: 'cashAmount',
                                                    key: 'cashAmount',
                                                    align: 'center',
                                                    render: (text, record) => record.isSummary ?
                                                        <Typography style={{ fontSize: '0.9rem' }}>{Number(text).toLocaleString()}</Typography> :
                                                        <span style={{fontSize: '0.8rem'}}>{Number(text).toLocaleString()}</span>
                                                },
                                                {
                                                    title: '전표번호',
                                                    dataIndex: 'voucherNumber',
                                                    key: 'voucherNumber',
                                                    align: 'center',
                                                    render: (text) => <span style={{fontSize: '0.8rem'}}>{text}</span>
                                                },
                                                {
                                                    title: '등록일시',
                                                    dataIndex: 'voucherRegistrationTime',
                                                    key: 'voucherRegistrationTime',
                                                    align: 'center',
                                                    render: (text) => text ? <span style={{fontSize: '0.8rem'}}>{new Date(text).toLocaleString()}</span> : ''
                                                },
                                                {
                                                    title: '부서명',
                                                    dataIndex: 'departmentName',
                                                    key: 'departmentName',
                                                    align: 'center',
                                                    render: (text) => <span style={{fontSize: '0.8rem'}}>{text}</span>
                                                },
                                                {
                                                    title: '담당자',
                                                    dataIndex: 'voucherManagerName',
                                                    key: 'voucherManagerName',
                                                    align: 'center',
                                                    render: (text) => <span style={{fontSize: '0.8rem'}}>{text}</span>
                                                }
                                            ]}
                                            pagination={ false }
                                            size={'small'}
                                            rowClassName={(record) => {
                                                if (record.isSummary) return 'summary-row';
                                                return '';
                                            }}
                                        />
                                    </Grid>
                                </Paper>
                            </Grow>
                        </Grid>
                    ) : (<></>)}
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

            {/* 모달창 */}
            <Modal
                open={isModalVisible}
                onCancel={handleModalCancel}
                footer={null}
                width="40vw"
            >
                {isLoading ? (
                    <Spin />  // 로딩 스피너
                ) : (
                    <>
                        {currentField === 'startAccountCode' && (
                            <>
                                <Typography id="modal-modal-title" variant="h6" component="h2" sx={{ marginBottom: '20px' }}>
                                    계정과목 시작 코드 선택
                                </Typography>
                                <Table
                                    columns={[
                                        { title: '코드', dataIndex: 'code', key: 'code', align: 'center' },
                                        { title: '이름', dataIndex: 'name', key: 'name', align: 'center' },
                                    ]}
                                    dataSource={modalData}
                                    rowKey="id"
                                    size={'small'}
                                    pagination={{ pageSize: 15, position: ['bottomCenter'], showSizeChanger: false }}
                                    onRow={(record) => ({
                                        style: { cursor: 'pointer' },
                                        onClick: () => handleModalSelect(record), // 선택 시 처리
                                    })}
                                />
                            </>
                        )}
                        {currentField === 'endAccountCode' && (
                            <>
                                <Typography id="modal-modal-title" variant="h6" component="h2" sx={{ marginBottom: '20px' }}>
                                    계정과목 끝 코드 선택
                                </Typography>
                                <Table
                                    columns={[
                                        { title: '코드', dataIndex: 'code', key: 'code', align: 'center' },
                                        { title: '이름', dataIndex: 'name', key: 'name', align: 'center' },
                                    ]}
                                    dataSource={modalData}
                                    rowKey="id"
                                    size={'small'}
                                    pagination={{ pageSize: 15, position: ['bottomCenter'], showSizeChanger: false }}
                                    onRow={(record) => ({
                                        style: { cursor: 'pointer' },
                                        onClick: () => handleModalSelect(record), // 선택 시 처리
                                    })}
                                />
                            </>
                        )}

                        <Box sx={{ mt: 2, display: 'flex', justifyContent: 'flex-end' }}>
                            <Button onClick={handleModalCancel} variant="contained" type="danger" sx={{ mr: 1 }}>
                                닫기
                            </Button>
                        </Box>
                    </>
                )}
            </Modal>
        </Box>
    );
};

export default AccountLedgerPage;