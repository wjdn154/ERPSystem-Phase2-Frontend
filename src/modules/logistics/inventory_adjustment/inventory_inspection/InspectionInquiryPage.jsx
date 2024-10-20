import React, {useEffect, useMemo, useState} from 'react';
import {Box, Grid, Grow, Paper} from '@mui/material';
import WelcomeSection from '../../../../components/WelcomeSection.jsx';
import {tabItems} from './InspectionInquiryUtil.jsx';
import {Typography} from '@mui/material';
import {useNotificationContext} from '../../../../config/NotificationContext.jsx';
import TemporarySection from "../../../../components/TemporarySection.jsx";
import apiClient from "../../../../config/apiClient.jsx";
import {LOGISTICS_API} from "../../../../config/apiConstants.jsx";
import dayjs from "dayjs";
import {Button, Col, DatePicker, Divider, Form, Input, Row, Spin, Table} from "antd";
import {SearchOutlined} from "@ant-design/icons";

const {RangePicker} = DatePicker;

const InspectionInquiryPage = () => {
    const notify = useNotificationContext();
    const [activeTabKey, setActiveTabKey] = useState('1');
    const [inspectionListData, setInspectionListData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [searchParams, setSearchParams] = useState({
        startDate: dayjs().subtract(30, 'day').format('YYYY-MM-DD'),
        endDate: dayjs().format('YYYY-MM-DD'),
    });
    const [selectedRowKeys, setSelectedRowKeys] = useState([]);
    const [editInspection, setEditInspection] = useState(false);
    const [detailInspectionData, setDetailInspectionData] = useState(false);
    const [form] = Form.useForm();
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [modalData, setModalData] = useState([]);
    const [initialModalData, setInitialModalData] = useState([]);
    const [currentField, setCurrentField] = useState('');


    // 탭 전환 처리 함수
    const handleTabChange = (key) => {
        setActiveTabKey(key);
    };

    const fetchInspectionStatus = async (startDate, endDate) => {
        setLoading(true);
        try {
            // API 호출
            const response = await apiClient.post(LOGISTICS_API.INVENTORY_INSPECTION_LIST_API(startDate, endDate));
            setInspectionListData(response.data);  // 데이터 설정
            console.log(response.data);
            notify('success', '데이터 조회 성공', '재고실사 현황 데이터를 성공적으로 조회했습니다.', 'bottomRight');
        } catch (error) {
            notify('error', '데이터 조회 오류', '재고실사 현황 데이터를 조회하는 중 오류가 발생했습니다.', 'top');
        } finally {
            setLoading(false);
        }
    }

    const handleFormSubmit = async (values) => {
        try {
            // 수정할 실사의 ID를 가져옵니다. (id는 수정하고자 하는 실사의 고유 식별자라고 가정)
            const id = detailInspectionData.id;  // 수정할 값에 따라 다르게 설정 가능

            // API 호출
            const response = await apiClient.put(LOGISTICS_API.INVENTORY_INSPECTION_UPDATE_API(id), values);

            // 성공 시 알림 표시
            notify('success', '수정 완료', '재고 실사 정보가 성공적으로 저장되었습니다.', 'bottomRight');
        } catch (error) {
            console.error('실사 정보 저장 중 오류 발생:', error);
            // 실패 시 알림 표시
            notify('error', '저장 오류', '재고 실사 정보 저장 중 오류가 발생했습니다.', 'top');
        }
    };

    // 모달 닫기 핸들러
    const handleModalCancel = () => setIsModalVisible(false);

    // 모달창 열기 핸들러
    const handleInputClick = async (field) => {
        setCurrentField(fieldName);
        setModalData(null);
        setInitialModalData(null);
        fetchModalData(fieldName);
        setIsModalVisible(true);
    }

    // 모달 데이터 조회 함수
    const fetchModalData = async (fieldName) => {
        setLoading(true);
        let apiPath;
    }

    // 날짜 범위 변경 핸들러
    const handleDateChange = (dates, dateStrings) => {
        setSearchParams({
            startDate: dateStrings[0],
            endDate: dateStrings[1],
        });
    };

    // 검색 버튼 클릭 시 데이터 로드
    const handleSearch = () => {
        fetchInspectionStatus(searchParams.startDate, searchParams.endDate);
    };

    useEffect(() => {
        if (editInspection && detailInspectionData) {
            form.setFieldsValue(detailInspectionData);
        }
    }, [detailInspectionData, form, editInspection]);

    useEffect(() => {
        fetchInspectionStatus(searchParams.startDate, searchParams.endDate);
    }, []);

    return (
        <Box sx={{margin: '20px'}}>
            <Grid container spacing={3}>
                <Grid item xs={12} md={12}>
                    <WelcomeSection
                        title="재고실사조회"
                        description={(
                            <Typography>
                                재고실사조회 페이지는 <span>현재 진행 중인 재고 실사의 내용을 조회</span>하는 곳임. 이 페이지에서는 <span>각 창고별, 품목별</span>로
                                실사된 재고 정보를 확인할 수 있으며, 재고 실사 결과를 <span>기록 및 보고</span>하는 기능을 제공함. 실사 중
                                발생한 <span>불일치 항목</span>을 쉽게 파악하여 즉시 조정할 수 있음.
                            </Typography>
                        )}
                        tabItems={tabItems()}
                        activeTabKey={activeTabKey}
                        handleTabChange={handleTabChange}
                    />
                </Grid>
            </Grid>

            {activeTabKey === '1' && (
                <Grid sx={{padding: '0px 20px 0px 20px'}} container spacing={3}>
                    <Grid item xs={12} md={12} sx={{minWidth: '1000px !important', maxWidth: '1500px !important'}}>
                        <Grow in={true} timeout={200}>
                            <Paper elevation={3} sx={{height: '100%'}}>
                                <Typography variant="h6" sx={{padding: '20px'}}>재고실사 조회</Typography>
                                <Grid sx={{padding: '0px 20px 0px 20px'}}>
                                    <Form layout="vertical">
                                        <Row gutter={16} style={{
                                            display: 'flex',
                                            alignItems: 'flex-end',
                                            justifyContent: 'space-between'
                                        }}>
                                            <Col>
                                                <Form.Item
                                                    label="조회 기간"
                                                    required
                                                    tooltip="검색할 기간의 시작일과 종료일을 선택하세요"
                                                >
                                                    <RangePicker
                                                        onChange={handleDateChange}
                                                        defaultValue={[
                                                            searchParams.startDate ? dayjs(searchParams.startDate, 'YYYY-MM-DD') : null,
                                                            searchParams.endDate ? dayjs(searchParams.endDate, 'YYYY-MM-DD') : null,
                                                        ]}
                                                        format="YYYY-MM-DD"
                                                        style={{width: '300px'}}
                                                    />
                                                </Form.Item>
                                            </Col>
                                            <Col>
                                                <Form.Item>
                                                    <Button style={{width: '100px'}} type="primary"
                                                            onClick={handleSearch} icon={<SearchOutlined/>} block>
                                                        검색
                                                    </Button>
                                                </Form.Item>
                                            </Col>
                                        </Row>
                                    </Form>
                                </Grid>
                                <Table
                                    dataSource={inspectionListData}
                                    columns={[
                                        {
                                            title: <div className="title-text">입력일자</div>,
                                            dataIndex: 'inspectionNumber',
                                            key: 'inspectionNumber',
                                            align: 'center',
                                            render: (text) => <div className="small-text">{text}</div>,
                                        },
                                        {
                                            title: <div className="title-text">창고명</div>,
                                            dataIndex: 'warehouseName',
                                            key: 'warehouseName',
                                            align: 'center',
                                            render: (text) => <div className="small-text">{text}</div>,
                                        },
                                        {
                                            title: <div className="title-text">담당자</div>,
                                            dataIndex: 'employeeName',
                                            key: 'employeeName',
                                            align: 'center',
                                            render: (text) => <div className="small-text">{text}</div>,
                                        },
                                        {
                                            title: <div className="title-text">품목명[규격]</div>,
                                            dataIndex: 'productSummary',
                                            key: 'productSummary',
                                            align: 'center',
                                            render: (text) => <div className="small-text">{text}</div>

                                        },
                                        {
                                            title: <div className="title-text">조정 수량</div>,
                                            dataIndex: 'totalDifferenceQuantity',
                                            key: 'totalDifferenceQuantity',
                                            align: 'center',
                                            render: (text) => <div className="small-text">{text}</div>
                                        },
                                        {
                                            title: <div className="title-text">조정 전표</div>,
                                            dataIndex: 'adjustmentSlip',
                                            key: 'adjustmentSlip',
                                            align: 'center',
                                            render: (text) => <div className="small-text">{text}</div>
                                        },
                                        {
                                            title: <div className="title-text">적요</div>,
                                            dataIndex: 'comments',
                                            key: 'comments',
                                            align: 'center',
                                            render: (text) => <div className="small-text">{text}</div>,
                                        }
                                    ]}
                                    rowKey={(record) => record.id}
                                    pagination={{pageSize: 15, position: ['bottomCenter'], showSizeChanger: false}}
                                    size="small"
                                    rowSelection={{
                                        type: 'radio',
                                        selectedRowKeys,
                                        onChange: (newSelectedRowKeys) => {
                                            setSelectedRowKeys(newSelectedRowKeys);
                                        }
                                    }}
                                    onRow={(record) => ({
                                        style: {cursor: 'pointer'},
                                        onClick: async () => {
                                            setSelectedRowKeys([record.id]); // 클릭한 행의 키로 상태 업데이트
                                            const id = record.id;
                                            try {
                                                const response = await apiClient.post(LOGISTICS_API.INVENTORY_INSPECTION_DETAIL_API(id));
                                                setDetailInspectionData(response.data);
                                                setEditInspection(true);
                                                console.log('실사 상세데이터:', response.data);
                                                notify('success', '실사 조회', '실사 정보 조회 성공.', 'bottomRight')
                                            } catch (error) {
                                                notify('error', '조회 오류', '데이터 조회 중 오류가 발생했습니다.', 'top');
                                            }
                                        },
                                    })}
                                />
                            </Paper>
                        </Grow>
                    </Grid>
                    {editInspection && (
                        <Grid item xs={12} md={12} sx={{minWidth: '1000px !important', maxWidth: '1500px !important'}}>
                            <Grow in={true} timeout={200}>
                                <Paper elevation={3} sx={{height: '100%'}}>
                                    <Typography variant="h6" sx={{padding: '20px'}}>재고 실사 정보</Typography>
                                    <Grid sx={{padding: '0px 20px 0px 20px'}}>
                                        <Form
                                            initialValues={detailInspectionData}
                                            form={form}
                                            onFinish={(values) => {
                                                handleFormSubmit(values, 'update');
                                            }}
                                        >
                                            {/* 기초 정보 */}
                                            <Divider orientation={'left'} orientationMargin="0" style={{marginTop: '0px', fontWeight: 600}}>
                                                기초 정보
                                            </Divider>
                                            <Row gutter={16}>
                                                <Col span={6}>
                                                    <Form.Item
                                                        name="inspectionDate"
                                                        rules={[{required: true, message: '실사 날짜를 입력하세요.'}]}
                                                    >
                                                        <Input addonBefore="실사 날짜"/>
                                                    </Form.Item>
                                                </Col>
                                                <Col span={6}>
                                                    <Form.Item
                                                        name="inspectionNumber"
                                                        rules={[{required: true, message: '실사 번호를 입력하세요.'}]}
                                                    >
                                                        <Input addonBefore="실사 번호" disabled={true}/>
                                                    </Form.Item>
                                                </Col>
                                                <Col span={6}>
                                                    <Form.Item
                                                        name="employeeName"
                                                        rules={[{required: true, message: '담당자명을 입력하세요.'}]}
                                                    >
                                                        <Input addonBefore="담당자명"/>
                                                    </Form.Item>
                                                </Col>
                                                <Col span={6}>
                                                    <Form.Item
                                                        name="warehouseName"
                                                        rules={[{required: true, message: '창고명을 입력하세요.'}]}
                                                    >
                                                        <Input addonBefore="창고명"/>
                                                    </Form.Item>
                                                </Col>
                                            </Row>

                                            {/* 실사 품목 정보 */}
                                            <Divider orientation={'left'} orientationMargin="0" style={{marginTop: '0px', fontWeight: 600}}>
                                                실사 품목 정보
                                            </Divider>

                                            <Form.List name="details">
                                                {(fields, { add, remove }) => (
                                                    <>
                                                        {fields.map(({ key, name, ...restField }) => (
                                                            <Row gutter={16} key={key} style={{ marginBottom: '10px' }}>
                                                                <Col span={6}>
                                                                    <Form.Item
                                                                        {...restField}
                                                                        name={[name, 'productCode']}
                                                                        rules={[{ required: true, message: '품목 코드를 입력하세요.' }]}
                                                                    >
                                                                        <Input addonBefore="품목 코드" />
                                                                    </Form.Item>
                                                                </Col>
                                                                <Col span={6}>
                                                                    <Form.Item
                                                                        {...restField}
                                                                        name={[name, 'productName']}
                                                                        rules={[{ required: true, message: '품목명을 입력하세요.' }]}
                                                                    >
                                                                        <Input addonBefore="품목명" />
                                                                    </Form.Item>
                                                                </Col>
                                                                <Col span={6}>
                                                                    <Form.Item
                                                                        {...restField}
                                                                        name={[name, 'standard']}
                                                                        >
                                                                        <Input addonBefore="규격" />
                                                                    </Form.Item>
                                                                </Col>
                                                                <Col span={6}>
                                                                    <Form.Item
                                                                        {...restField}
                                                                        name={[name, 'unit']}
                                                                        >
                                                                        <Input addonBefore="단위" />
                                                                    </Form.Item>
                                                                </Col>
                                                                <Col span={6}>
                                                                    <Form.Item
                                                                        {...restField}
                                                                        name={[name, 'warehouseLocationName']}
                                                                        rules={[{ required: true, message: '창고 위치를 입력하세요.' }]}
                                                                    >
                                                                        <Input addonBefore="창고 위치" />
                                                                    </Form.Item>
                                                                </Col>
                                                                <Col span={6}>
                                                                    <Form.Item
                                                                        {...restField}
                                                                        name={[name, 'actualQuantity']}
                                                                        rules={[{ required: true, message: '실사 수량을 입력하세요.' }]}
                                                                    >
                                                                        <Input addonBefore="실사 수량" />
                                                                    </Form.Item>
                                                                </Col>
                                                                <Col span={12}>
                                                                    <Form.Item
                                                                        {...restField}
                                                                        name={[name, 'comments']}
                                                                    >
                                                                        <Input addonBefore="코멘트" />
                                                                    </Form.Item>
                                                                </Col>
                                                            </Row>
                                                        ))}
                                                    </>
                                                )}
                                            </Form.List>

                                            <Box sx={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '20px' }}>
                                                <Button type="primary" htmlType="submit">저장</Button>
                                            </Box>
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
                                                        {/* 담당자 선택 모달 */}
                                                        {currentField === 'employeeName' && (
                                                            <>
                                                                <Typography id="modal-modal-title" variant="h6" component="h2" sx={{ marginBottom: '20px' }}>
                                                                    담당자 선택
                                                                </Typography>
                                                                <Input
                                                                    placeholder="검색"
                                                                    prefix={<SearchOutlined />}
                                                                    onChange={(e) => {
                                                                        const value = e.target.value.toLowerCase();
                                                                        if (!value) {
                                                                            setModalData(initialModalData);
                                                                        } else {
                                                                            const filtered = initialModalData.filter((item) => {
                                                                                return (
                                                                                    (item.employeeNumber && item.employeeNumber.toLowerCase().includes(value)) ||
                                                                                    (`${item.lastName}${item.firstName}`.toLowerCase().includes(value))
                                                                                );
                                                                            });
                                                                            setModalData(filtered);
                                                                        }
                                                                    }}
                                                                    style={{ marginBottom: 16 }}
                                                                />
                                                                {modalData && (
                                                                    <Table
                                                                        columns={[
                                                                            { title: '사번', dataIndex: 'employeeNumber', key: 'employeeNumber', align: 'center' },
                                                                            { title: '이름', dataIndex: 'name', key: 'name', align: 'center', render: (_, record) => `${record.lastName}${record.firstName}` }
                                                                        ]}
                                                                        dataSource={modalData}
                                                                        rowKey="id"
                                                                        size="small"
                                                                        pagination={{ pageSize: 15, position: ['bottomCenter'], showSizeChanger: false, showTotal: (total) => `총 ${total}개` }}
                                                                        onRow={(record) => ({
                                                                            style: { cursor: 'pointer' },
                                                                            onClick: () => handleModalSelect(record)
                                                                        })}
                                                                    />
                                                                )}
                                                            </>
                                                        )}

                                                        {/* 창고 선택 모달 */}
                                                        {currentField === 'warehouseName' && (
                                                            <>
                                                                <Typography id="modal-modal-title" variant="h6" component="h2" sx={{ marginBottom: '20px' }}>
                                                                    창고 선택
                                                                </Typography>
                                                                <Input
                                                                    placeholder="검색"
                                                                    prefix={<SearchOutlined />}
                                                                    onChange={(e) => {
                                                                        const value = e.target.value.toLowerCase();
                                                                        if (!value) {
                                                                            setModalData(initialModalData);
                                                                        } else {
                                                                            const filtered = initialModalData.filter((item) => {
                                                                                return (
                                                                                    (item.code && item.code.toLowerCase().includes(value)) ||
                                                                                    (item.name && item.name.toLowerCase().includes(value))
                                                                                );
                                                                            });
                                                                            setModalData(filtered);
                                                                        }
                                                                    }}
                                                                    style={{ marginBottom: 16 }}
                                                                />
                                                                {modalData && (
                                                                    <Table
                                                                        columns={[
                                                                            { title: '창고 코드', dataIndex: 'code', key: 'code', align: 'center' },
                                                                            { title: '창고명', dataIndex: 'name', key: 'name', align: 'center' },
                                                                            { title: '창고 유형', dataIndex: 'warehouseType', key: 'warehouseType', align: 'center' }
                                                                        ]}
                                                                        dataSource={modalData}
                                                                        rowKey="id"
                                                                        size="small"
                                                                        pagination={{ pageSize: 15, position: ['bottomCenter'], showSizeChanger: false, showTotal: (total) => `총 ${total}개` }}
                                                                        onRow={(record) => ({
                                                                            style: { cursor: 'pointer' },
                                                                            onClick: () => handleModalSelect(record)
                                                                        })}
                                                                    />
                                                                )}
                                                            </>
                                                        )}

                                                        {/* 품목 코드 선택 모달 */}
                                                        {currentField === 'productCode' && (
                                                            <>
                                                                <Typography id="modal-modal-title" variant="h6" component="h2" sx={{ marginBottom: '20px' }}>
                                                                    품목 코드 선택
                                                                </Typography>
                                                                <Input
                                                                    placeholder="검색"
                                                                    prefix={<SearchOutlined />}
                                                                    onChange={(e) => {
                                                                        const value = e.target.value.toLowerCase();
                                                                        if (!value) {
                                                                            setModalData(initialModalData);
                                                                        } else {
                                                                            const filtered = initialModalData.filter((item) => {
                                                                                return (
                                                                                    (item.productCode && item.productCode.toLowerCase().includes(value)) ||
                                                                                    (item.productName && item.productName.toLowerCase().includes(value))
                                                                                );
                                                                            });
                                                                            setModalData(filtered);
                                                                        }
                                                                    }}
                                                                    style={{ marginBottom: 16 }}
                                                                />
                                                                {modalData && (
                                                                    <Table
                                                                        columns={[
                                                                            { title: '품목 코드', dataIndex: 'productCode', key: 'productCode', align: 'center' },
                                                                            { title: '품목명', dataIndex: 'productName', key: 'productName', align: 'center' },
                                                                            { title: '수량', dataIndex: 'quantity', key: 'quantity', align: 'center' },
                                                                            { title: '창고명', dataIndex: 'warehouseName', key: 'warehouseName', align: 'center' },
                                                                            { title: '위치', dataIndex: 'locationName', key: 'locationName', align: 'center' }
                                                                        ]}
                                                                        dataSource={modalData}
                                                                        rowKey="id"
                                                                        size="small"
                                                                        pagination={{ pageSize: 15, position: ['bottomCenter'], showSizeChanger: false, showTotal: (total) => `총 ${total}개` }}
                                                                        onRow={(record) => ({
                                                                            style: { cursor: 'pointer' },
                                                                            onClick: () => handleModalSelect(record)
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
                                        </Form>
                                    </Grid>
                                </Paper>
                            </Grow>
                        </Grid>
                    )}
                </Grid>
            )}

            {activeTabKey === '2' && (
                <Grid sx={{padding: '0px 20px 0px 20px'}} container spacing={3}>
                    <Grid item xs={12} md={5} sx={{minWidth: '500px !important', maxWidth: '700px !important'}}>
                        <Grow in={true} timeout={200}>
                            <div>
                                <TemporarySection/>
                            </div>
                        </Grow>
                    </Grid>
                </Grid>
            )}

        </Box>
    );
};

export default InspectionInquiryPage;