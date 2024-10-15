import React, {useMemo, useState} from 'react';
import {Box, Grid, Grow, Paper} from '@mui/material';
import WelcomeSection from '../../../../components/WelcomeSection.jsx';
import { tabItems } from './ClientAccountLedgerUtil.jsx';
import {Typography} from '@mui/material';
import {Button, DatePicker, Input, Modal, Spin, Table, Tag} from 'antd';
import TemporarySection from "../../../../components/TemporarySection.jsx";
import {useNotificationContext} from "../../../../config/NotificationContext.jsx";
import {FINANCIAL_API} from "../../../../config/apiConstants.jsx";
import apiClient from "../../../../config/apiClient.jsx";
import dayjs from "dayjs";
const { RangePicker } = DatePicker;

const ClientAccountLedgerPage = () => {
    const notify = useNotificationContext();
    const [selectedRowKeys, setSelectedRowKeys] = useState([]);
    const [activeTabKey, setActiveTabKey] = useState('1');
    const [clientAndAccountLedgerData, setClientAndAccountLedgerData] = useState(null);
    const [clientAndAccountLedgerDetailData, setClientAndAccountLedgerDetailData] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [searchParams, setSearchParams] = useState({
        startDate: null,
        endDate: null,
        startAccountSubjectCode: '',
        endAccountSubjectCode: '',
        startClientCode: '',
        endClientCode: ''
    });
    const [searchDetailParams, setSearchDetailParams] = useState({
        startDate : null,
        endDate : null,
        startAccountSubjectCode : '',
        endAccountSubjectCode : '',
        clientId :  '',
    });
    const [displayValues, setDisplayValues] = useState({
        startAccountSubjectCode: '',
        endAccountSubjectCode: '',
        startClientCode: '',
        endClientCode: ''
    });

    const [isModalVisible, setIsModalVisible] = useState(false);
    const [currentField, setCurrentField] = useState('');
    const [modalData, setModalData] = useState(null);

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
        const apiPath = (fieldName === 'startAccountSubjectCode' || fieldName === 'endAccountSubjectCode')
            ? FINANCIAL_API.ACCOUNT_SUBJECTS_SEARCH_API
            : FINANCIAL_API.CLIENT_SEARCH_API;
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

        setSearchDetailParams((prevParams) => ({
            ...prevParams,
            [currentField]: record.code,
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
            setSearchDetailParams({
                ...searchDetailParams,
                startDate: dates[0].format('YYYY-MM-DD'),
                endDate: dates[1].format('YYYY-MM-DD'),
            });
        }
    };

    // 검색 처리
    const handleSearch = async () => {
        const { startDate, endDate, startAccountSubjectCode, endAccountSubjectCode, startClientCode, endClientCode } = searchParams;
        // 입력값 검증
        if (!startDate || !endDate || !startAccountSubjectCode || !endAccountSubjectCode || !startClientCode || !endClientCode) {
            notify('warning', '입력 오류', '모든 필드를 입력해 주세요.', 'bottomRight');
            return;
        }

        // 계정과목 코드 순서 검증
        if (Number(startAccountSubjectCode) > Number(endAccountSubjectCode)) {
            notify('warning', '입력 오류', '계정과목 시작 코드는 종료 코드보다 작아야 합니다.', 'bottomRight');
            return;
        }

        // 거래처 코드 순서 검증
        if (Number(startClientCode) > Number(endClientCode)) {
            notify('warning', '입력 오류', '거래처 시작 코드는 종료 코드보다 작아야 합니다.', 'bottomRight');
            return;
        }


        try {
            const response = await apiClient.post(FINANCIAL_API.CLIENT_AND_ACCOUNT_SUBJECT_LEDGER_API, searchParams);
            const data = response.data;
            setClientAndAccountLedgerData(data);
        } catch (error) {
            notify('error', '조회 오류', '거래처별 계정과목별 원장 조회 중 오류가 발생했습니다.', 'top');
        }
    };

    const ClientAndAccountSubjectLedgerColumns = [
        { title: '거래처', dataIndex: 'clientCode', key: 'clientCode', align: 'center', render: (text, record) => <span className="small-text">[{text.padStart(5, '0')}] {record.clientName} </span> },
        { title: '등록번호', dataIndex: 'clientRegisterNumber', key: 'clientRegisterNumber', align: 'center', render: (text) => <span className="small-text">{text}</span> },
        { title: '대표자명', dataIndex: 'ownerName', key: 'ownerName', align: 'center', render: (text) => <span className="small-text">{text}</span> },
    ];

    return (
        <Box sx={{ margin: '20px' }}>
            <Grid container spacing={3}>
                <Grid item xs={12} md={12}>
                    <WelcomeSection
                        title="거래처별 계정과목별 원장"
                        description={(
                            <Typography>
                                이 페이지는 <span>거래처별로 각 계정과목에 따라 거래 내역을 관리</span>하는 기능을 제공함. 기업은 특정 거래처와 <span>각 계정과목에 따른 재무 내역</span>을 정확히 파악할 수 있음. 이를 통해 <span>거래처별로 세분화된 재무 상황</span>을 분석하고 필요한 조치를 취할 수 있음.
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
                    <Grid item xs={12} md={6} sx={{ minWidth: '610px' }}>
                        <Grow in={true} timeout={200}>
                            <Paper elevation={3} sx={{ height: '100%' }}>
                                <Typography variant="h6" sx={{ padding: '20px' }} >거래처 원장 조회</Typography>
                                <Grid sx={{ padding: '0px 20px 0px 20px' }}>
                                    <Grid sx={{ display: 'flex' }}>
                                        <Input
                                            name="accountCode"
                                            placeholder="계정과목 시작 코드"
                                            value={displayValues.startAccountSubjectCode}
                                            onClick={() => handleInputClick('startAccountSubjectCode')}
                                            style={{
                                                width: '25%',
                                                marginRight: '10px',
                                                cursor: 'pointer',
                                                caretColor: 'transparent',
                                            }}
                                        />
                                        <Input
                                            name="accountCode"
                                            placeholder="계정과목 끝 코드"
                                            value={displayValues.endAccountSubjectCode}
                                            onClick={() => handleInputClick('endAccountSubjectCode')}
                                            style={{
                                                width: '25%',
                                                marginRight: '10px',
                                                cursor: 'pointer',
                                                caretColor: 'transparent',
                                            }}
                                        />
                                        <Input
                                            name="startClientCode"
                                            placeholder="거래처 시작 코드"
                                            value={displayValues.startClientCode}
                                            onClick={() => handleInputClick('startClientCode')}
                                            style={{
                                                width: '25%',
                                                marginRight: '10px',
                                                cursor: 'pointer',
                                                caretColor: 'transparent',
                                            }}
                                        />
                                        <Input
                                            name="endClientCode"
                                            placeholder="거래처 끝 코드"
                                            value={displayValues.endClientCode}
                                            onClick={() => handleInputClick('endClientCode')}
                                            style={{
                                                width: '25%',
                                                cursor: 'pointer',
                                                caretColor: 'transparent',
                                            }}
                                        />
                                    </Grid>
                                    <Grid sx={{ marginTop: '20px' }}>
                                        <RangePicker
                                            disabledDate={(current) => current && current.year() !== 2024}
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
                                        dataSource={clientAndAccountLedgerData}
                                        columns={ClientAndAccountSubjectLedgerColumns}
                                        rowKey="clientCode"
                                        rowSelection={{
                                            type: 'radio',
                                            selectedRowKeys,
                                            onChange: (newSelectedRowKeys) => {
                                                setSelectedRowKeys(newSelectedRowKeys);
                                            }
                                        }}
                                        pagination={{ pageSize: 10, position: ['bottomCenter'], showSizeChanger: false }}
                                        size={'small'}
                                        onRow={(record) => ({
                                            style: { cursor: 'pointer' },
                                            onClick: async () => {
                                                // 행 클릭 시 상태 업데이트 및 API 호출
                                                setSelectedRowKeys([record.clientCode]); // 클릭한 행의 키로 상태 업데이트

                                                try {
                                                    const updatedParams = {
                                                        ...searchDetailParams,
                                                        clientId: record.clientId,
                                                    };
                                                    // API 호출 시 updatedParams 사용
                                                    const response = await apiClient.post(FINANCIAL_API.CLIENT_AND_ACCOUNT_SUBJECT_LEDGER_DETAIL_API, { ...updatedParams });
                                                    setClientAndAccountLedgerDetailData(response.data);
                                                    notify('success', '조회 성공', '데이터를 성공적으로 조회했습니다.', 'bottomRight');
                                                } catch (error) {
                                                    notify('error', '조회 오류', '데이터 조회 중 오류가 발생했습니다.', 'top');
                                                }
                                            }
                                        })}
                                    />
                                </Grid>
                            </Paper>
                        </Grow>
                    </Grid>
                    { clientAndAccountLedgerDetailData ? (
                        <Grid item xs={12} md={6} sx={{ minWidth: '610px' }}>
                            <Grow in={true} timeout={200}>
                                <Paper elevation={3} sx={{ height: '100%' }}>
                                    <Typography variant="h6" sx={{ padding: '20px' }}>거래처 원장 상세 조회</Typography>
                                    <Grid sx={{ padding: '0px 20px 0px 20px' }}>
                                        <Table
                                            dataSource={clientAndAccountLedgerDetailData?.detailList}
                                            columns={[
                                                {
                                                    title: '계정과목', dataIndex: 'accountSubjectCode', key: 'accountSubjectCode', align: 'center',
                                                    render: (text, record) => text ? <span className="small-text">[{text}] {record.accountSubjectName}</span> : ''
                                                },
                                                {
                                                    title: '전기이월', dataIndex: 'previousTotalCash', key: 'previousTotalCash', align: 'center',
                                                    render: (text) => text ? <span className="small-text">{Number(text).toLocaleString()}</span> : ''
                                                },
                                                {
                                                    title: '차변', dataIndex: 'totalDebitAmount', key: 'totalDebitAmount', align: 'center',
                                                    render: (text) => text ? <span className="small-text">{Number(text).toLocaleString()}</span> : ''
                                                },
                                                {
                                                    title: '대변', dataIndex: 'totalCreditAmount', key: 'totalCreditAmount', align: 'center',
                                                    render: (text) => text ? <span className="small-text">{Number(text).toLocaleString()}</span> : ''
                                                },
                                                {
                                                    title: '잔액', dataIndex: 'totalCashAmount', key: 'totalCashAmount', align: 'center',
                                                    render: (text) => text ? <span className="small-text">{Number(text).toLocaleString()}</span> : <span className="small-text">0</span>
                                                },
                                            ]}
                                            pagination={{ pageSize: 15, position: ['bottomCenter'], showSizeChanger: false }}
                                            rowKey="accountSubjectCode"
                                            size={'small'}
                                            summary={() => (
                                                <Table.Summary.Row style={{ textAlign: 'center', backgroundColor: '#FAFAFA' }}>
                                                    <Table.Summary.Cell><span className="medium-text">합계</span></Table.Summary.Cell>
                                                    <Table.Summary.Cell><span className="medium-text">{Number(clientAndAccountLedgerDetailData?.totalSumPreviousCash).toLocaleString()}</span></Table.Summary.Cell>
                                                    <Table.Summary.Cell><span className="medium-text">{Number(clientAndAccountLedgerDetailData?.totalSumDebitAmount).toLocaleString()}</span></Table.Summary.Cell>
                                                    <Table.Summary.Cell><span className="medium-text">{Number(clientAndAccountLedgerDetailData?.totalSumCreditAmount).toLocaleString()}</span></Table.Summary.Cell>
                                                    <Table.Summary.Cell><span className="medium-text">{Number(clientAndAccountLedgerDetailData?.totalSumCashAmount).toLocaleString()}</span></Table.Summary.Cell>
                                                </Table.Summary.Row>
                                            )}
                                        />
                                    </Grid>
                                </Paper>
                            </Grow>
                        </Grid>
                    ) : (<></>)}
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
                        {currentField === 'startAccountSubjectCode' && (
                            <>
                                <Typography id="modal-modal-title" variant="h6" component="h2" sx={{ marginBottom: '20px' }}>
                                    계정과목 시작 코드 선택
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
                        {currentField === 'endAccountSubjectCode' && (
                            <>
                                <Typography id="modal-modal-title" variant="h6" component="h2" sx={{ marginBottom: '20px' }}>
                                    계정과목 끝 코드 선택
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

                        {currentField === 'startClientCode' && (
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

                        {currentField === 'endClientCode' && (
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

export default ClientAccountLedgerPage;