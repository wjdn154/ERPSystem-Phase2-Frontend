import React, {useMemo, useState} from 'react';
import {Box, Grid, Grow, Paper} from '@mui/material';
import WelcomeSection from '../../../../components/WelcomeSection.jsx';
import { tabItems } from './TaxInvoiceStatusUtil.jsx';
import {Typography} from '@mui/material';
import {Space, Button, Col, DatePicker, Input, Modal, Row, Select, Spin, Table} from 'antd';
import TemporarySection from "../../../../components/TemporarySection.jsx";
import dayjs from "dayjs";
import {FINANCIAL_API} from "../../../../config/apiConstants.jsx";
import apiClient from "../../../../config/apiClient.jsx";
import {useNotificationContext} from "../../../../config/NotificationContext.jsx";
const { RangePicker } = DatePicker;

const TaxInvoiceStatusPage = () => {
    const notify = useNotificationContext();
    const [activeTabKey, setActiveTabKey] = useState('1');
    const [currentField, setCurrentField] = useState('');
    const [modalData, setModalData] = useState(null);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [searchData, setSearchData] = useState([]);
    const [searchParams, setSearchParams] = useState({
        startDate: null,
        endDate: null,
        transactionType: '',
        startClientCode: '',
        endClientCode: ''
    });
    const [displayValues, setDisplayValues] = useState({
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

    const handleModalCancel = () => {
        setIsModalVisible(false);  // 모달창 닫기
    };

    // 검색 처리
    const handleSearch = async () => {
        const { startDate, endDate, transactionType, startClientCode, endClientCode } = searchParams;

        // 입력값 검증
        if (!startDate || !endDate || !transactionType || !startClientCode || !endClientCode) {
            notify('warning', '입력 오류', '모든 필드를 입력해 주세요.', 'bottomRight');
            return;
        }

        // 거래처 코드 순서 검증
        if (Number(startClientCode) > Number(endClientCode)) {
            notify('warning', '입력 오류', '거래처 시작 코드는 종료 코드보다 작아야 합니다.', 'bottomRight');
            return;
        }


        try {
            console.log(searchParams);
            const response = await apiClient.post(FINANCIAL_API.TAX_INVOICE_LEDGER_API, searchParams);
            const data = response.data;
            setSearchData(data);
            console.log(data);
        } catch (error) {
            notify('error', '조회 오류', '세금계산서(계산서) 조회 중 오류가 발생했습니다.', 'top');
        }
    };

    const handleTransactionTypeChange = (value) => {
        setSearchParams(prevParams => ({
            ...prevParams,
            transactionType: value
        }));
    };

    return (
        <Box sx={{ margin: '20px' }}>
            <Grid container spacing={3}>
                <Grid item xs={12} md={12}>
                    <WelcomeSection
                        title="세금계산서(계산서) 현황"
                        description={(
                            <Typography>
                                세금계산서 현황 페이지는 <span>기업이 발행한 모든 세금계산서</span>를 관리하는 기능을 제공함. 이 페이지를 통해 <span>세금계산서의 발행 내역</span>을 조회하고, 발행 상태 및 내용을 관리할 수 있음. 이를 통해 <span>세무 신고 및 결산</span>에 필요한 자료를 효율적으로 관리 가능함.
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
                                <Typography variant="h6" sx={{ padding: '20px' }} >세금계산서(계산서) 조회</Typography>
                                <Grid sx={{ padding: '0px 20px 0px 20px' }}>
                                    <Row gutter={16}>
                                        <Col span={6}>
                                            <Space.Compact>
                                                <Input style={{ width: '30%', backgroundColor: '#FAFAFA', color: '#000', textAlign: 'center' }} defaultValue="구분" disabled />
                                                <Select
                                                    value={searchParams.transactionType || "선택"} // 선택되지 않은 경우 기본 안내문
                                                    onChange={handleTransactionTypeChange}
                                                    style={{ width: 200 }} // 드롭다운 너비 설정
                                                >
                                                    <Select.Option value="Sales">매출</Select.Option>
                                                    <Select.Option value="Purchase">매입</Select.Option>
                                                </Select>
                                            </Space.Compact>
                                        </Col>
                                        <Col span={7}>
                                            <Input
                                                name="startClientCode"
                                                addonBefore="거래처 시작 코드"
                                                value={displayValues.startClientCode}
                                                onClick={() => handleInputClick('startClientCode')}
                                                style={{
                                                    cursor: 'pointer',
                                                    caretColor: 'transparent',
                                                }}
                                            />
                                        </Col>
                                        <Col span={7}>
                                            <Input
                                                name="endClientCode"
                                                addonBefore="거래처 끝 코드"
                                                value={displayValues.endClientCode}
                                                onClick={() => handleInputClick('endClientCode')}
                                                style={{
                                                    cursor: 'pointer',
                                                    caretColor: 'transparent',
                                                }}
                                            />
                                        </Col>
                                    </Row>
                                    <Row style={{ marginTop: '20px', marginBottom: '20px' }}>
                                    <Col>
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
                                        </Col>
                                    <Col>
                                        <Button type="primary" onClick={handleSearch}>
                                            검색
                                        </Button>
                                    </Col>
                                    </Row>
                                    <Table
                                        dataSource={searchData}  // 제공된 데이터
                                        columns={[
                                            {
                                                title: '거래처 코드',
                                                dataIndex: 'clientCode',
                                                key: 'clientCode',
                                                align: 'center',
                                                render: (text) => text ? <span className="small-text">{text}</span> : ''
                                            },
                                            {
                                                title: '거래처 이름',
                                                dataIndex: 'clientName',
                                                key: 'clientName',
                                                align: 'center',
                                                render: (text) => text ? <span className="small-text">{text}</span> : ''
                                            },
                                            {
                                                title: '등록번호',
                                                dataIndex: 'clientNumber',
                                                key: 'clientNumber',
                                                align: 'center',
                                                render: (text) => text ? <span className="small-text">{text}</span> : ''
                                            },
                                            {
                                                title: '월',
                                                dataIndex: 'month',
                                                key: 'month',
                                                align: 'center',
                                                render: (text) => text ? <span className="small-text">{text}</span> : ''
                                            },
                                            {
                                                title: '전표 건수',
                                                dataIndex: 'voucherCount',
                                                key: 'voucherCount',
                                                align: 'center',
                                                render: (text) => text !== undefined ? <span className="small-text">{text}</span> : ''
                                            },
                                            {
                                                title: '공급 가액',
                                                dataIndex: 'supplyAmount',
                                                key: 'supplyAmount',
                                                align: 'center',
                                                render: (text) => text !== undefined ? <span className="small-text">{text.toLocaleString()}</span> : ''
                                            },
                                            {
                                                title: '부가세',
                                                dataIndex: 'vatAmount',
                                                key: 'vatAmount',
                                                align: 'center',
                                                render: (text) => text !== undefined ? <span className="small-text">{text.toLocaleString()}</span> : ''
                                            },
                                        ]}
                                        rowKey="clientCode"
                                        pagination={{ pageSize: 15, position: ['bottomCenter'], showSizeChanger: false }}
                                        size={'small'}
                                        // summary={() => (
                                        //     <Table.Summary.Row style={{ backgroundColor: '#FAFAFA'}}>
                                        //         <Table.Summary.Cell colSpan={4}><Typography.Text strong>총 합계</Typography.Text></Table.Summary.Cell>
                                        //         <Table.Summary.Cell><Typography.Text>{data.reduce((total, item) => total + item.voucherCount, 0)}건</Typography.Text></Table.Summary.Cell>
                                        //         <Table.Summary.Cell><Typography.Text>{data.reduce((total, item) => total + item.supplyAmount, 0).toLocaleString()}</Typography.Text></Table.Summary.Cell>
                                        //         <Table.Summary.Cell><Typography.Text>{data.reduce((total, item) => total + item.vatAmount, 0).toLocaleString()}</Typography.Text></Table.Summary.Cell>
                                        //     </Table.Summary.Row>
                                        // )}
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

export default TaxInvoiceStatusPage;