import React, { useState } from 'react';
import { Box, Grid, Grow, Paper, Typography } from '@mui/material';
import { Spin, Table, Button, DatePicker, Input, Modal, Tag} from 'antd';
import dayjs from 'dayjs';
import apiClient from "../../../../config/apiClient.jsx";
import { FINANCIAL_API } from "../../../../config/apiConstants.jsx";
import { useNotificationContext } from "../../../../config/NotificationContext.jsx";
import WelcomeSection from '../../../../components/WelcomeSection.jsx';
import { tabItems } from './ClientLedgerUtil.jsx';
const { RangePicker } = DatePicker;

const ClientLedgerPage = () => {
    const notify = useNotificationContext();
    const [activeTabKey, setActiveTabKey] = useState('1');
    const [ledgerData, setLedgerData] = useState(null);
    const [totals, setTotals] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [searchParams, setSearchParams] = useState({
        startDate: null,
        endDate: null,
        accountCode: '',
        clientStartCode: '',
        clientEndCode: ''
    });
    const [displayValues, setDisplayValues] = useState({
        accountCode: '',
        clientStartCode: '',
        clientEndCode: ''
    });

    const [isModalVisible, setIsModalVisible] = useState(false);
    const [currentField, setCurrentField] = useState('');
    const [modalData, setModalData] = useState(null);

    // 탭 변경 처리
    const handleTabChange = (key) => {
        setActiveTabKey(key);
    };

    // 입력 필드 클릭 시 모달 열기
    const handleInputClick = (fieldName) => {
        setCurrentField(fieldName);
        setModalData(null); // 모달 열기 전에 데이터를 초기화
        fetchModalData(fieldName);  // 모달 데이터 가져오기 호출
        setIsModalVisible(true);  // 모달창 열기
    };

    // 모달 데이터 가져오기
    const fetchModalData = async (fieldName) => {
        setIsLoading(true);
        const apiPath = fieldName === 'accountCode' ? FINANCIAL_API.ACCOUNT_SUBJECTS_SEARCH_API : FINANCIAL_API.CLIENT_SEARCH_API;
        try {
            const searchText = null;
            const response = await apiClient.post(apiPath, { searchText });
            setModalData(response.data);
        } catch (error) {
            notify('error', '조회 오류', '데이터 조회 중 오류가 발생했습니다.', 'top');
        } finally {
            setIsLoading(false);
        }
    };

    // 모달에서 선택한 값 searchParams에 반영
    const handleModalSelect = (record) => {
        const formattedValue = `[${record.code}] ${record.name || record.printClientName}`;

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

    const handleModalCancel = () => {
        setIsModalVisible(false);  // 모달창 닫기
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
        const { startDate, endDate, accountCode, clientStartCode, clientEndCode } = searchParams;

        // 입력값 검증
        if (!startDate || !endDate || !accountCode || !clientStartCode || !clientEndCode) {
            notify('warning', '입력 오류', '모든 필드를 입력해 주세요.', 'bottomRight');
            return;
        }

        // 거래처 코드 순서 검증
        if (Number(clientStartCode) > Number(clientEndCode)) {
            notify('warning', '입력 오류', '거래처 시작 코드는 종료 코드보다 작아야 합니다.', 'bottomRight');
            return;
        }


        try {
            const response = await apiClient.post(FINANCIAL_API.CLIENT_LEDGER_API, searchParams);
            const data = response.data;
            setLedgerData(data.clientLedgerShowAllDTO);
            setTotals({
                totalSumPreviousCash: data.totalSumPreviousCash,
                totalSumDebitAmount: data.totalSumDebitAmount,
                totalSumCreditAmount: data.totalSumCreditAmount,
                totalSumTotalCashAmount: data.totalSumTotalCashAmount
            });
        } catch (error) {
            notify('error', '조회 오류', '거래처 원장 조회 중 오류가 발생했습니다.', 'top');
        }
    };

    const ClientLedgerColumns = [
        { title: '거래처', dataIndex: 'clientCode', key: 'clientCode', align: 'center', render: (text, record) => <span className="small-text">[{text.padStart(5, '0')}] {record.clientName} </span> },
        { title: '등록번호', dataIndex: 'clientRegisterNumber', key: 'clientRegisterNumber', align: 'center', render: (text) => <span className="small-text">{text}</span> },
        { title: '대표자명', dataIndex: 'ownerName', key: 'ownerName', align: 'center', render: (text) => <span className="small-text">{text}</span> },
        { title: '전기이월', dataIndex: 'previousCash', key: 'previousCash', align: 'center', render: (text) => <span className="small-text">{Number(text).toLocaleString()}</span> },
        { title: '차변', dataIndex: 'debitTotalAmount', key: 'debitTotalAmount', align: 'center', render: (text) => <span className="small-text">{Number(text).toLocaleString()}</span> },
        { title: '대변', dataIndex: 'creditTotalAmount', key: 'creditTotalAmount', align: 'center', render: (text) => <span className="small-text">{Number(text).toLocaleString()}</span> },
        { title: '잔액', dataIndex: 'cashTotalAmount', key: 'cashTotalAmount', align: 'center', render: (text) => <span className="small-text">{Number(text).toLocaleString()}</span> },
        {
            title: '담당 부서명',
            dataIndex: 'managerDepartment',
            key: 'managerDepartment',
            align: 'center',
            render: (text, record) => {
                let color;
                let value;
                switch (text) {
                    case '재무부':
                        color = 'red';
                        value = '재무';
                        break;
                    case '인사부':
                        color = 'green';
                        value = '인사';
                        break;
                    case '생산부':
                        color = 'blue';
                        value = '생산';
                        break;
                    case '물류부':
                        color = 'orange';
                        value = '물류';
                        break;
                    default:
                        color = 'gray'; // 기본 색상
                }
                return <Tag style={{marginLeft: '5px'}} color={color}>{value}</Tag>;
            }
        },
        { title: '담당자명', dataIndex: 'managerName', key: 'managerName', align: 'center', render: (text) => <span className="small-text">{text}</span> },
    ];

    const summaryRow = totals ? (
        ledgerData && ledgerData.length > 0 &&
        <Table.Summary.Row style={{ textAlign: 'center', backgroundColor: '#FAFAFA' }}>
            <Table.Summary.Cell index={0}><span className="medium-text">합계</span></Table.Summary.Cell>
            <Table.Summary.Cell index={1}></Table.Summary.Cell>
            <Table.Summary.Cell index={2}></Table.Summary.Cell>
            <Table.Summary.Cell index={3}><span className="medium-text">{totals.totalSumPreviousCash.toLocaleString()}</span></Table.Summary.Cell>
            <Table.Summary.Cell index={4}><span className="medium-text">{totals.totalSumDebitAmount.toLocaleString()}</span></Table.Summary.Cell>
            <Table.Summary.Cell index={5}><span className="medium-text">{totals.totalSumCreditAmount.toLocaleString()}</span></Table.Summary.Cell>
            <Table.Summary.Cell index={6}><span className="medium-text">{totals.totalSumTotalCashAmount.toLocaleString()}</span></Table.Summary.Cell>
            <Table.Summary.Cell index={7}><span className="medium-text"></span></Table.Summary.Cell>
            <Table.Summary.Cell index={8}><span className="medium-text"></span></Table.Summary.Cell>
        </Table.Summary.Row>
    ) : null;

    return (
        <Box sx={{ margin: '20px' }}>
            <Grid container spacing={3}>
                <Grid item xs={12} md={12}>
                    <WelcomeSection
                        title="거래처 원장"
                        description={(
                            <Typography>
                                거래처 원장 페이지는 <span>거래처별로 발생한 거래 내역을 관리</span>하는 기능을 제공함.
                                기업은 각 거래처와의 <span>거래 기록을 한눈에 확인</span>할 수 있으며, <span>매출, 매입, 미수금, 미지급금</span> 등 모든 거래 내역을 체계적으로 관리할 수 있음.<br/>
                                이 페이지를 통해 <span>각 거래처와의 재무 상태</span>를 명확히 파악할 수 있음.
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
                    <Grid item xs={12} md={8} sx={{ minWidth: '1000px' }}>
                        <Grow in={true} timeout={200}>
                            <Paper elevation={3} sx={{ height: '100%' }}>
                                <Typography variant="h6" sx={{ padding: '20px' }} >거래처 원장 조회</Typography>
                                <Grid sx={{ padding: '0px 20px 0px 20px' }}>
                                    <Input
                                        name="accountCode"
                                        placeholder="계정과목 코드"
                                        value={displayValues.accountCode}
                                        onClick={() => handleInputClick('accountCode')}
                                        style={{
                                            width: '150px',
                                            marginRight: '10px',
                                            cursor: 'pointer',
                                            caretColor: 'transparent',
                                        }}
                                    />
                                    <Input
                                        name="clientStartCode"
                                        placeholder="거래처 시작 코드"
                                        value={displayValues.clientStartCode}
                                        onClick={() => handleInputClick('clientStartCode')}
                                        style={{
                                            width: '150px',
                                            marginRight: '10px',
                                            cursor: 'pointer',
                                            caretColor: 'transparent',
                                        }}
                                    />
                                    <Input
                                        name="clientEndCode"
                                        placeholder="거래처 끝 코드"
                                        value={displayValues.clientEndCode}
                                        onClick={() => handleInputClick('clientEndCode')}
                                        style={{
                                            width: '150px',
                                            marginRight: '10px',
                                            cursor: 'pointer',
                                            caretColor: 'transparent',
                                        }}
                                    />
                                    <RangePicker
                                        disabledDate={(current) => current && current.year() !== 2024}
                                        onChange={handleDateChange}
                                        style={{ marginRight: '10px' }}
                                        defaultValue={[
                                            searchParams.startDate ? dayjs(searchParams.startDate, 'YYYY-MM-DD') : null,
                                            searchParams.endDate ? dayjs(searchParams.endDate, 'YYYY-MM-DD') : null,
                                        ]}
                                        format="YYYY-MM-DD"
                                    />
                                    <Button type="primary" onClick={handleSearch}>
                                        검색
                                    </Button>
                                </Grid>

                                <Grid sx={{ margin: '20px' }}>
                                    <Table
                                        dataSource={ledgerData}
                                        columns={ClientLedgerColumns}
                                        rowKey="clientCode"
                                        pagination={false}
                                        size={'small'}
                                        summary={() => summaryRow}
                                    />
                                </Grid>
                            </Paper>
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
                    {currentField === 'accountCode' && (
                        <>
                            <Typography id="modal-modal-title" variant="h6" component="h2" sx={{ marginBottom: '20px' }}>
                                계정과목 코드 선택
                            </Typography>
                            {modalData && (
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
                            )}
                        </>
                    )}

                    {currentField === 'clientStartCode' && (
                        <>
                            <Typography id="modal-modal-title" variant="h6" component="h2" sx={{ marginBottom: '20px' }}>
                                거래처 시작 코드 선택
                            </Typography>
                            {modalData && (
                                <Table
                                    columns={[
                                        { title: '코드', dataIndex: 'code', key: 'code', align: 'center' },
                                        { title: '거래처명', dataIndex: 'printClientName', key: 'printClientName', align: 'center' },
                                    ]}
                                    dataSource={modalData}
                                    rowKey="code"
                                    size={'small'}
                                    pagination={{ pageSize: 15, position: ['bottomCenter'], showSizeChanger: false }}
                                    onRow={(record) => ({
                                        style: { cursor: 'pointer' },
                                        onClick: () => handleModalSelect(record), // 선택 시 처리
                                    })}
                                />
                            )}
                        </>
                    )}

                    {currentField === 'clientEndCode' && (
                        <>
                            <Typography id="modal-modal-title" variant="h6" component="h2" sx={{ marginBottom: '20px' }}>
                                거래처 끝 코드 선택
                            </Typography>
                            {modalData && (
                                <Table
                                    columns={[
                                        { title: '코드', dataIndex: 'code', key: 'code', align: 'center' },
                                        { title: '거래처명', dataIndex: 'printClientName', key: 'printClientName', align: 'center' },
                                    ]}
                                    dataSource={modalData}
                                    rowKey="code"
                                    size={'small'}
                                    pagination={{ pageSize: 15, position: ['bottomCenter'], showSizeChanger: false }}
                                    onRow={(record) => ({
                                        style: { cursor: 'pointer' },
                                        onClick: () => handleModalSelect(record), // 선택 시 처리
                                    })}
                                />
                            )}
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

export default ClientLedgerPage;