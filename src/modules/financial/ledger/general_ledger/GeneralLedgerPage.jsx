import React, {useMemo, useState} from 'react';
import {Box, Grid, Grow, Paper} from '@mui/material';
import WelcomeSection from '../../../../components/WelcomeSection.jsx';
import { tabItems } from './GeneralLedgerUtil.jsx';
import {Typography} from '@mui/material';
import {Button, DatePicker, Input, Modal, Spin, Table} from 'antd';
import TemporarySection from "../../../../components/TemporarySection.jsx";
import {useNotificationContext} from "../../../../config/NotificationContext.jsx";
import {FINANCIAL_API} from "../../../../config/apiConstants.jsx";
import apiClient from "../../../../config/apiClient.jsx";
import dayjs from "dayjs";
const { RangePicker } = DatePicker;

const GeneralLedgerPage = () => {
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
        startSubjectCode: '',
        endSubjectCode: '',
    });
    const [searchDetailParams, setSearchDetailParams] = useState({
        startDate : null,
        endDate : null,
        startSubjectCode : '',
        endSubjectCode : '',
        accountCode :  '',
    });
    const [displayValues, setDisplayValues] = useState({
        startSubjectCode: '',
        endSubjectCode: '',
        startClientCode: '',
        endClientCode: ''
    });

    const handleTabChange = (key) => {
        setActiveTabKey(key);
    };

    // 입력 필드 클릭 시 모달 열기
    const handleInputClick = (fieldName) => {
        setCurrentField(fieldName);
        setModalData(null); // 모달 열기 전에 데이터를 초기화
        fetchModalData();  // 모달 데이터 가져오기 호출
        setIsModalVisible(true);  // 모달창 열기
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
        const { startDate, endDate, startSubjectCode, endSubjectCode } = searchParams;
        // 입력값 검증
        if (!startDate || !endDate || !startSubjectCode || !endSubjectCode) {
            notify('warning', '입력 오류', '모든 필드를 입력해 주세요.', 'bottomRight');
            return;
        }

        // 계정과목 코드 순서 검증
        if (Number(startSubjectCode) > Number(endSubjectCode)) {
            notify('warning', '입력 오류', '계정과목 시작 코드는 종료 코드보다 작아야 합니다.', 'bottomRight');
            return;
        }

        try {
            const response = await apiClient.post(FINANCIAL_API.GENERAL_ACCOUNT_LEDGER_API, searchParams);
            const data = response.data;
            setSearchData(data);
        } catch (error) {
            notify('error', '조회 오류', '총계정원장 조회 중 오류가 발생했습니다.', 'top');
        }
    };

    return (
        <Box sx={{ margin: '20px' }}>
            <Grid container spacing={3}>
                <Grid item xs={12} md={12}>
                    <WelcomeSection
                        title="총계정원장"
                        description={(
                            <Typography>
                                총계정원장 페이지는 <span>기업의 모든 계정과목에 대한 총괄적인 거래 내역을 관리</span>하는 페이지임. 이 페이지를 통해 <span>전체 재무 상태를 한눈에 파악</span>할 수 있으며, 각 계정과목의 <span>거래 내역과 잔액</span>을 종합적으로 관리할 수 있음.
                            </Typography>
                        )}
                        tabItems={tabItems()}
                        activeTabKey={activeTabKey}
                        handleTabChange={handleTabChange}
                    />
                </Grid>
            </Grid>

            <Grid sx={{ padding: '0px 20px 0px 20px' }} container spacing={3}>
                <Grid item xs={12} md={2} sx={{ minWidth: '400px' }}>
                    <Grow in={true} timeout={200}>
                        <Paper elevation={3} sx={{ height: '100%' }}>
                            <Typography variant="h6" sx={{ padding: '20px' }} >총계정원장 조회</Typography>
                            <Grid sx={{ padding: '0px 20px 0px 20px' }}>
                                <Grid sx={{ display: 'flex' }}>
                                    <Input
                                        name="accountCode"
                                        placeholder="계정과목 시작 코드"
                                        value={displayValues.startSubjectCode}
                                        onClick={() => handleInputClick('startSubjectCode')}
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
                                        value={displayValues.endSubjectCode}
                                        onClick={() => handleInputClick('endSubjectCode')}
                                        style={{
                                            width: '50%',
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
                                    dataSource={searchData}
                                    columns={[
                                        {
                                            title: <div className="title-text">계정과목</div>,
                                            dataIndex: 'accountCode',
                                            key: 'accountId',
                                            align: 'center',
                                            render: (text, record) => <div style={{ fontSize: '0.8rem' }}>[{text.padStart(5, '0')}] {record.accountName}</div>,
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
                                                    accountCode: record.accountCode,
                                                };
                                                // API 호출 시 updatedParams 사용
                                                const response = await apiClient.post(FINANCIAL_API.GENERAL_ACCOUNT_LEDGER_DETAIL_API, { ...updatedParams });
                                                console.log(response.data);
                                                setSearchDetailData(response.data);
                                                notify('success', '조회 성공', '데이터를 성공적으로 조회했습니다.', 'bottomRight');
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
                    <Grid item xs={12} md={6} sx={{ minWidth: '610px' }}>
                        <Grow in={true} timeout={200}>
                            <Paper elevation={3} sx={{ height: '100%' }}>
                                <Typography variant="h6" sx={{ padding: '20px' }}>총계정원장 상세 조회</Typography>
                                <Grid sx={{ padding: '0px 20px 0px 20px' }}>
                                    <Table
                                        dataSource={[
                                            {
                                                month: '전기이월',
                                                totalDebit: searchDetailData.previousDebitAmount,
                                                totalCredit: searchDetailData.previousCreditAmount,
                                                totalCash: searchDetailData.previousCashAmount,
                                                isPrevious: true,
                                            },
                                            ...Object.keys(searchDetailData.allShows).map(key => ({
                                                ...searchDetailData.allShows[key],
                                                month: `${searchDetailData.allShows[key].month}월`
                                            }))
                                        ]}
                                        columns={[
                                            {
                                                title: <div className="title-text">월</div>,
                                                dataIndex: 'month',
                                                key: 'month',
                                                align: 'center',
                                                render: (text, record) => record.isPrevious ?
                                                    <div className="medium-text">{text}</div> :
                                                    <div className="small-text">{text}</div>
                                            },
                                            {
                                                title: <div className="title-text">차변</div>,
                                                dataIndex: 'totalDebit',
                                                key: 'totalDebit',
                                                align: 'center',
                                                render: (text) => text ? <div className="small-text" style={{ textAlign: 'right' }}>{Number(text).toLocaleString()}</div> : ''
                                            },
                                            {
                                                title: <div className="title-text">대변</div>,
                                                dataIndex: 'totalCredit',
                                                key: 'totalCredit',
                                                align: 'center',
                                                render: (text) => text ? <div className="small-text" style={{ textAlign: 'right' }}>{Number(text).toLocaleString()}</div> : ''
                                            },
                                            {
                                                title: <div className="title-text">잔액</div>,
                                                dataIndex: 'totalCash',
                                                key: 'totalCash',
                                                align: 'center',

                                                render: (text, record) => record.isPrevious ?
                                                    <div className="medium-text" style={{ textAlign: 'right' }}>{Number(text).toLocaleString()}</div> :
                                                    <div className="small-text" style={{ textAlign: 'right' }}>{Number(text).toLocaleString()}</div>
                                            }
                                        ]}
                                        pagination={{ pageSize: 15, position: ['bottomCenter'], showSizeChanger: false }}
                                        rowKey={(record) => record.month}  // 전기이월과 월을 기준으로 키 설정
                                        size={'small'}
                                        summary={() => (
                                            <Table.Summary.Row style={{ textAlign: 'center', backgroundColor: '#FAFAFA' }}>
                                                <Table.Summary.Cell index={0}><div className="medium-text">합계</div></Table.Summary.Cell>
                                                <Table.Summary.Cell index={1}><div className="medium-text" style={{ textAlign: 'right' }}>{searchDetailData.totalDebitAmount.toLocaleString()}</div></Table.Summary.Cell>
                                                <Table.Summary.Cell index={2}><div className="medium-text" style={{ textAlign: 'right' }}>{searchDetailData.totalCreditAmount.toLocaleString()}</div></Table.Summary.Cell>
                                                <Table.Summary.Cell index={3}><div className="medium-text" style={{ textAlign: 'right' }}>{searchDetailData.totalCashAmount.toLocaleString()}</div></Table.Summary.Cell>
                                            </Table.Summary.Row>
                                        )}
                                        rowClassName={(record) => {
                                            if (record.isPrevious) return 'summary-row';
                                            return '';
                                        }}
                                    />
                                </Grid>
                            </Paper>
                        </Grow>
                    </Grid>
                ) : (<></>)}
            </Grid>
            )

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
                        {currentField === 'startSubjectCode' && (
                            <>
                                <Typography id="modal-modal-title" variant="h6" component="h2" sx={{ marginBottom: '20px' }}>
                                    계정과목 시작 코드 선택
                                </Typography>
                                <Table
                                    columns={[
                                        {
                                            title: <div className="title-text">코드</div>,
                                            dataIndex: 'code',
                                            key: 'code',
                                            align: 'center',
                                            render: (text) => <div className="small-text">{text}</div>
                                        },
                                        {
                                            title: <div className="title-text">이름</div>,
                                            dataIndex: 'name',
                                            key: 'name',
                                            align: 'center',
                                            render: (text) => <div className="small-text">{text}</div>
                                        },
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
                        {currentField === 'endSubjectCode' && (
                            <>
                                <Typography id="modal-modal-title" variant="h6" component="h2" sx={{ marginBottom: '20px' }}>
                                    계정과목 끝 코드 선택
                                </Typography>
                                <Table
                                    columns={[
                                        {
                                            title: <div className="title-text">코드</div>,
                                            dataIndex: 'code',
                                            key: 'code',
                                            align: 'center'
                                        },
                                        {
                                            title: <div className="title-text">이름</div>,
                                            dataIndex: 'name',
                                            key: 'name',
                                            align: 'center'
                                        },
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
                            <Button onClick={handleModalCancel} variant="contained" danger sx={{ mr: 1 }}>
                                닫기
                            </Button>
                        </Box>
                    </>
                )}
            </Modal>
        </Box>
    );
};

export default GeneralLedgerPage;