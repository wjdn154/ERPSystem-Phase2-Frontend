import React, { useEffect, useState } from 'react';
import {Box, Grid, Grow, Paper, Typography} from '@mui/material';
import {Space, Tag, Form, Table, Button, Col, Input, Row, Checkbox, Modal, DatePicker, Spin, Select, notification, Upload, Divider} from 'antd';
import dayjs from 'dayjs';
import apiClient from "../../../../config/apiClient.jsx";
import {EMPLOYEE_API, FINANCIAL_API, LOGISTICS_API} from "../../../../config/apiConstants.jsx";
import { useNotificationContext } from "../../../../config/NotificationContext.jsx";
import WelcomeSection from "../../../../components/WelcomeSection.jsx";
import TemporarySection from "../../../../components/TemporarySection.jsx";
import {tabItems} from "../../purchase_management/purchase_request/PurchaseRequestUtil.jsx";
import {DownSquareOutlined, SearchOutlined} from "@ant-design/icons";

const { RangePicker } = DatePicker;

const PurchaseRequestPage = ( {initialData} ) => {
    const notify = useNotificationContext(); // 알림 컨텍스트 사용
    const [activeTabKey, setActiveTabKey] = useState('1');
    const [form] = Form.useForm();
    const [purchaseRequestList, setPurchaseRequestList] = useState(initialData);
    const [isLoading, setIsLoading] = useState(false);
    const [selectedRowKeys, setSelectedRowKeys] = useState([]);
    const [selectedDetailRowKeys, setSelectedDetailRowKeys] = useState([]); // 발주 요청 상세 항목의 선택된 키
    const [editPurchaseRequest, setEditPurchaseRequest] = useState(false);
    const [detailPurchaseRequest, setDetailPurchaseRequest] = useState(false);
    const [editingRow, setEditingRow] = useState(null);
    const [purchaseRequestParam, setPurchaseRequestParam] = useState(false);
    const [editingValues, setEditingValues] = useState({});
    const [searchParams, setSearchParams] = useState({
        startDate: null,
        endDate: null,
        clientCode: '',
        state: '',
    });
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [displayValues, setDisplayValues] = useState({});
    const [currentField, setCurrentField] = useState('');
    const [modalData, setModalData] = useState(null);
    const [initialModalData, setInitialModalData] = useState(null);

    useEffect(() => {

        if(!detailPurchaseRequest) return;

        form.setFieldsValue(detailPurchaseRequest);
        setPurchaseRequestParam(detailPurchaseRequest);

        setDisplayValues({
            managerName: `[${detailPurchaseRequest.managerCode}] ${detailPurchaseRequest.managerName}`,
            warehouseName:  `[${detailPurchaseRequest.warehouseCode}] ${detailPurchaseRequest.warehouseName}`,

        }, [detailPurchaseRequest, form]);



    }, [detailPurchaseRequest, form]);

    const calculateSupplyPrice = (quantity, price) => {
        return quantity * price;
    };

    const calculateVat = (supplyPrice) => {
        return supplyPrice * 0.1;  // 부가세는 공급가액의 10%
    };

    // 수량 또는 단가 변경 시 공급가액과 부가세를 자동 계산하는 함수
    const updateSupplyAndVat = (quantity, price, recordKey) => {
        const supplyPrice = calculateSupplyPrice(quantity, price);
        const vat = calculateVat(supplyPrice);

        updateField('supplyPrice', supplyPrice, recordKey);
        updateField('vat', vat, recordKey);
    };

    const updateField = (fieldName, value, recordId) => {
        const updatedDetails = [...purchaseRequestParam.purchaseRequestDetails];
        const detailIndex = updatedDetails.findIndex((detail) => detail.id === recordId);
        if (detailIndex !== -1) {
            updatedDetails[detailIndex][fieldName] = value;

            // 수량이나 단가가 변경되면 공급가액을 재계산
            if (fieldName === 'quantity' || fieldName === 'price') {
                const { quantity, price } = updatedDetails[detailIndex];
                const supplyPrice = calculateSupplyPrice(quantity, price);
                const vat = calculateVat(supplyPrice);

                updatedDetails[detailIndex].supplyPrice = supplyPrice;
                updatedDetails[detailIndex].vat = vat;
            }
        }
        setPurchaseRequestParam((prevParams) => ({
            ...prevParams,
            purchaseRequestDetails: updatedDetails,
        }));
    };

    const handleRowSelectionChange = (selectedRowKeys) => {
        setSelectedDetailRowKeys(selectedRowKeys);  // 선택된 행의 키 상태 업데이트
        console.log('선택된 행 키:', selectedRowKeys[0]);  // 선택된 키 출력

    };


    const handleTabChange = (key) => {
        setActiveTabKey(key);
    };

    // 입력 필드 클릭 시 모달 열기
    const handleInputClick = (fieldName, index) => {
        setCurrentField(fieldName);
        setSelectedDetailRowKeys(index);
        setEditingRow(index);
        setModalData(null);  // 모달 데이터 초기화
        setInitialModalData(null); // 모달 열기 전에 데이터를 초기화
        fetchModalData(fieldName);  // 모달 데이터 가져오기 호출
        setIsModalVisible(true);  // 모달창 열기
    };

    // 모달 데이터 가져오기
    const fetchModalData = async (fieldName) => {
        setIsLoading(true);
        let apiPath;
        console.log("선택한 행: ")
        console.log(editingRow)

        if(fieldName === 'managerName') apiPath = EMPLOYEE_API.EMPLOYEE_DATA_API;
        if(fieldName === 'warehouseName') apiPath = LOGISTICS_API.WAREHOUSE_LIST_API;
        if(fieldName === 'product') apiPath = LOGISTICS_API.PRODUCT_LIST_API;

        try {
            const response = await apiClient.post(apiPath);

            // 데이터가 문자열이고 JSON 배열 형식일 경우 파싱, 아니면 그대로 배열로 처리
            let data = response.data;
            console.log(data)
            if (typeof data === 'string' && data.startsWith('[') && data.endsWith(']')) {
                data = JSON.parse(data);
            }

            const modalData = Array.isArray(data) ? data : [data];

            setModalData(modalData);
            setInitialModalData(modalData);
        } catch (error) {
            notify('error', '조회 오류', '데이터 조회 중 오류가 발생했습니다.', 'top');
        } finally {
            setIsLoading(false);
        }
    };

    // 모달에서 선택한 값 searchParams에 반영
    const handleModalSelect = (record, index) => {
        console.log('purchaseRequestParam: ')
        console.log(purchaseRequestParam);
        console.log('record: ')
        console.log(record)
        console.log('selectedDetailRowKeys: ')
        console.log(index)

        switch (currentField) {
            case 'managerName':
                setPurchaseRequestParam((prevParams) => ({
                    ...prevParams,
                    manager: {
                        id: record.id,
                        code: record.employeeNumber,
                        name: `${record.lastName}${record.firstName}`,
                    },
                }));
                setDisplayValues((prevValues) => ({
                    ...prevValues,
                    managerName: `[${record.employeeNumber}] ${record.lastName}${record.firstName}`,
                }));
                break;

            case 'warehouseName':
                setPurchaseRequestParam((prevParams) => ({
                    ...prevParams,
                    warehouse: {
                        id: record.id,
                        code: record.code,
                        name: record.name,
                    },
                }));
                setDisplayValues((prevValues) => ({
                    ...prevValues,
                    warehouseName: `[${record.code}] ${record.name}`,
                }));
                break;

            case 'product':
                // 제품 선택 시 해당 제품을 상태에 반영
                const updatedDetails = [...purchaseRequestParam.purchaseRequestDetails];
                const detailIndex = updatedDetails.findIndex((detail) => detail.id === editingRow);
                console.log(detailIndex)
                // if (detailIndex !== -1) {
                //     // 해당 품목 코드와 이름을 업데이트
                //     updatedDetails[detailIndex].productCode = record.code;
                //     updatedDetails[detailIndex].productName = record.name;
                //     updatedDetails[detailIndex].client.clientId = record.clientId;
                //     updatedDetails[detailIndex].client.clientCode = record.clientCode;
                //     updatedDetails[detailIndex].client.clientName = record.clientName;
                //     updatedDetails[detailIndex].price = record.purchasePrice;
                //
                //
                // }
                if (detailIndex !== -1) {
                    // 제품 선택 시 필드 업데이트
                    updateField('productCode', record.code, editingRow);
                    updateField('productName', record.name, editingRow);
                    updateField('price', record.purchasePrice, editingRow);

                    const { quantity } = updatedDetails[detailIndex];
                    const supplyPrice = calculateSupplyPrice(quantity, record.purchasePrice);
                    const vat = calculateVat(supplyPrice);

                    updatedDetails[detailIndex].supplyPrice = supplyPrice;
                    updatedDetails[detailIndex].vat = vat;
                }
                setPurchaseRequestParam((prevParams) => ({
                    ...prevParams,
                    purchaseRequestDetails: updatedDetails,
                }));

                break;
        }

        // 모달창 닫기
        setIsModalVisible(false);
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

    // 등록 일자 변경 핸들러
    const handleRegiDateChange = (date) => {
        setPurchaseRequestParam((prevState) => ({
            ...prevState,
            date: dayjs(date),
        }));
    };

    // 납기 일자 변경 핸들러
    const handleDeliveryDateChange = (date) => {
        setPurchaseRequestParam((prevState) => ({
            ...prevState,
            date: dayjs(date),
        }));
    };

    // 모달창 닫기 핸들러
    const handleModalCancel = () => {
        setEditingRow(null); // 수정 중인 행 초기화
        setIsModalVisible(false);
    };

    // 입력 필드 변경 시 값 업데이트
    const handleFieldChange = (value, recordKey, fieldName) => {
        const newDetails = [...purchaseRequestParam.purchaseRequestDetails];
        const index = newDetails.findIndex(detail => detail.key === recordKey);
        if (index !== -1) {
            newDetails[index][fieldName] = value;

            if (fieldName === 'quantity') {
                const quantity = value;
                const price = newDetails[index].price;
                newDetails[index].supplyPrice = quantity * price; // 공급가액 = 수량 * 단가
                updateSupplyAndVat(quantity, price, recordKey);
            }
        }
        setPurchaseRequestParam({
            ...purchaseRequestParam,
            purchaseRequestDetails: newDetails,
        });
    };

    const handleSearch = async () => {
        const { startDate, endDate, clientCode, state } = searchParams;

        try {
            const response = await apiClient.post(FINANCIAL_API.CLIENT_LEDGER_API, searchParams);
            const data = response.data;

            notify('success', '조회 성공', '거래처 원장 조회 성공.', 'bottomRight');
        } catch (error) {
            notify('error', '조회 오류', '거래처 원장 조회 중 오류가 발생했습니다.', 'top');
        }
    };

    const columns = [
        {
            title: <div className="title-text">상태</div>,
            dataIndex: 'status',
            key: 'status',
            align: 'center',
            render: (text, record) => {
                let color;
                let value;
                switch (text) {
                    case 'WAITING_FOR_PURCHASE':
                        color = 'orange';
                        value = '발주대기';
                        break;
                    case 'PURCHASE_COMPLETED':
                        color = 'green';
                        value = '발주완료';
                        break;
                    default:
                        color = 'gray'; // 기본 색상
                }
                return <Tag style={{ marginLeft: '5px' }} color={color}>{value}</Tag>;
            },
            width: '15%'
        },
        {
            title: <div className="title-text">발주 요청 일자</div>,
            dataIndex: 'date',
            key: 'date',
            align: 'center',
        },
        {
            title: <div className="title-text">거래처명</div>,
            dataIndex: 'clientName',
            key: 'clientName',
            align: 'center',
        },
        {
            title: <div className="title-text">품목명</div>,
            dataIndex: 'productName',
            key: 'productName',
            align: 'center',
        },
        {
            title: <div className="title-text">총 수량</div>,
            dataIndex: 'totalQuantity',
            key: 'totalQuantity',
            align: 'center',
        },
        {
            title: <div className="title-text">총 가격</div>,
            dataIndex: 'totalPrice',
            key: 'totalPrice',
            align: 'center',
        },
        {
            title: <div className="title-text">납기 일자</div>,
            dataIndex: 'deliveryDate',
            key: 'deliveryDate',
            align: 'center',
        },
    ];

    return (
        <Box sx={{ margin: '20px' }}>
            <Grid container spacing={3}>
                <Grid item xs={12} md={12}>
                    <WelcomeSection
                        title="발주 요청"
                        description={(
                            <Typography>
                                발주 요청 페이지는 <span>회사의 필요에 따라 특정 물품을 구매하기 위해 요청을 제출</span>하는 곳임.<br/>
                                이 페이지에서는 <span>발주 요청서를 생성, 수정, 삭제</span>할 수 있으며, 요청된 물품과 수량을 입력하고 <span>필요한 납기일</span>을 지정할 수 있음. <br/>
                                <span>구매 담당자</span>는 이 요청서를 바탕으로 <span>발주 계획을 수립</span>하게 됨.

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
                    <Grid item xs={12} md={12} sx={{ minWidth: '800px !important', maxWidth: '1500px !important' }}>
                        <Grow in={true} timeout={200}>
                            <Paper elevation={3} sx={{ height: '100%'}}>
                                <Typography variant="h6" sx={{ padding: '20px' }}>발주 요청 목록</Typography>
                                <Grid sx={{ padding: '0px 20px 0px 20px' }}>
                                    <Form layout="vertical">
                                        <Row gutter={16} style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between'}}>
                                            <Col>
                                                <Form.Item
                                                    label="조회 기간"
                                                    required
                                                    tooltip="검색할 기간의 시작일과 종료일을 선택하세요"
                                                >
                                                    <RangePicker
                                                        disabledDate={(current) => current && current.year() !== 2024}
                                                        onChange={handleDateChange}
                                                        defaultValue={[
                                                            searchParams.startDate ? dayjs(searchParams.startDate, 'YYYY-MM-DD') : null,
                                                            searchParams.endDate ? dayjs(searchParams.endDate, 'YYYY-MM-DD') : null,
                                                        ]}
                                                        format="YYYY-MM-DD"
                                                        style={{ width: '250px' }}
                                                    />
                                                </Form.Item>
                                            </Col>
                                            <Col flex="1">
                                                <Form.Item
                                                    label="거래처 코드"
                                                    required
                                                    tooltip="검색할 거래처의 코드를 선택하세요"
                                                >
                                                    <Form.Item
                                                        noStyle
                                                        rules={[{ required: true, message: '거래처 코드를 선택하세요' }]}
                                                    >
                                                        <Input
                                                            placeholder="거래처 코드"
                                                            value={displayValues.clientCode}
                                                            onClick={() => handleInputClick('clientCode')}
                                                            className="search-input"
                                                            style={{ width: '30%' }}
                                                            suffix={<DownSquareOutlined />}
                                                        />
                                                    </Form.Item>
                                                </Form.Item>
                                            </Col>
                                            <Col>
                                                <Form.Item>
                                                    <Button style={{ width: '100px' }} type="primary" onClick={handleSearch}  icon={<SearchOutlined />} block>
                                                        검색
                                                    </Button>
                                                </Form.Item>
                                            </Col>
                                        </Row>
                                        <Row gutter={16} style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between'}}>

                                        </Row>

                                    </Form>
                                    <Table
                                        dataSource={purchaseRequestList}
                                        columns={columns}
                                        rowKey={(record) => record.id}
                                        pagination={{ pageSize: 10, position: ['bottomCenter'], showSizeChanger: false }}
                                        size="small"
                                        rowSelection={{
                                            type: 'radio',
                                            selectedRowKeys,
                                            onChange: (newSelectedRowKeys) => {
                                                setSelectedRowKeys(newSelectedRowKeys);
                                            }
                                        }}
                                        onRow={(record) => ({
                                            style: { cursor: 'pointer' },
                                            onClick: async () => {
                                                console.log(detailPurchaseRequest)
                                                setSelectedRowKeys([record.id]); // 클릭한 행의 키로 상태 업데이트
                                                setSelectedDetailRowKeys([]);
                                                const id = record.id;
                                                try {
                                                    const response = await apiClient.post(LOGISTICS_API.PURCHASE_REQUEST_DETAIL_API(id));
                                                    setDetailPurchaseRequest(response.data);
                                                    setEditPurchaseRequest(true);

                                                    notify('success', '발주요청 조회', '발주요청 정보 조회 성공.', 'bottomRight')
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

                    {editPurchaseRequest && (
                        <Grid item xs={12} md={12} sx={{ minWidth: '1000px !important', maxWidth: '1500px !important' }}>
                            <Grow in={true} timeout={200}>
                                <Paper elevation={3} sx={{ height: '100%' }}>
                                    <Typography variant="h6" sx={{ padding: '20px' }}>발주요청 상세정보 및 수정</Typography>
                                    <Grid sx={{ padding: '0px 20px 0px 20px' }}>
                                        <Form
                                            initialValues={detailPurchaseRequest}
                                            form={form}
                                            onFinish={(values) => { handleFormSubmit(values, 'update') }}
                                            >
                                            {/* 발주 요청 정보 */}
                                            <Divider orientation={'left'} orientationMargin="0" style={{ marginTop: '0px', fontWeight: 600 }}>발주 요청 정보</Divider>
                                            <Row align="middle" gutter={16} style={{ marginBottom: '16px' }}>
                                                <Col>
                                                    <Typography>등록 일자</Typography>
                                                </Col>
                                                <Col>
                                                    <Form.Item style={{ marginBottom: 0 }} rules={[{ required: true, message: '등록 일자를 입력하세요.' }]}>
                                                        <DatePicker
                                                            disabledDate={(current) => current && current.year() !== 2024}
                                                            value={dayjs(purchaseRequestParam.date)}
                                                            onChange={handleRegiDateChange}
                                                        />
                                                    </Form.Item>
                                                </Col>
                                                <Col>
                                                    <Typography>납기 일자</Typography>
                                                </Col>
                                                <Col>
                                                    <Form.Item style={{ marginBottom: 0 }} rules={[{ required: true, message: '납기 일자를 입력하세요.' }]}>
                                                        <DatePicker
                                                            disabledDate={(current) => current && current.year() !== 2024}
                                                            value={dayjs(purchaseRequestParam.deliveryDate)}
                                                            onChange={handleDeliveryDateChange}
                                                        />
                                                    </Form.Item>
                                                </Col>


                                            </Row>

                                            {/*  */}
                                            <Row gutter={16}>
                                                <Col span={6}>
                                                    <Form.Item style={{ marginBottom: 0 }} >
                                                        <Input
                                                            addonBefore="담당자"
                                                            value={displayValues.managerName}
                                                            onClick={() => handleInputClick('managerName')}
                                                            onFocus={(e) => e.target.blur()}
                                                        />
                                                    </Form.Item>
                                                </Col>
                                                <Col span={6}>
                                                    <Form.Item style={{ marginBottom: 0 }} >
                                                        <Input
                                                            addonBefore="입고창고"
                                                            value={displayValues.warehouseName}
                                                            onClick={() => handleInputClick('warehouseName')}
                                                            onFocus={(e) => e.target.blur()}
                                                        />
                                                    </Form.Item>
                                                </Col>
                                                <Col span={6}>
                                                    <Form.Item name="currency">
                                                        <Space.Compact>
                                                            <Input style={{ width: '60%', backgroundColor: '#FAFAFA', color: '#000', textAlign: 'center' }} defaultValue="통화 종류" disabled />
                                                            <Select
                                                                style={{ width: '70%' }}
                                                                value={purchaseRequestParam.currency}
                                                                onChange={(value) => {
                                                                    setPurchaseRequestParam((prevState) => ({
                                                                        ...prevState,
                                                                        currency: value,
                                                                    }));
                                                                }}
                                                            >
                                                                <Select.Option value="KRW">한국 원</Select.Option>
                                                                <Select.Option value="USD">미국 달러</Select.Option>
                                                                <Select.Option value="EUR">유로</Select.Option>
                                                                <Select.Option value="JPY">일본 엔</Select.Option>
                                                                <Select.Option value="CNY">중국 위안</Select.Option>
                                                                <Select.Option value="GBP">영국 파운드</Select.Option>
                                                            </Select>
                                                        </Space.Compact>
                                                    </Form.Item>
                                                </Col>
                                                <Col span={4}>
                                                    <Form.Item name="vatType" valuePropName="checked">
                                                        <Checkbox>부가세 적용 여부</Checkbox>
                                                    </Form.Item>
                                                </Col>
                                                <Col span={12 }>
                                                    <Form.Item name="remarks">
                                                        <Input addonBefore="비고" />
                                                    </Form.Item>
                                                </Col>

                                            </Row>

                                            {/* 발주 요청 상세 항목 */}
                                            <Divider orientation={'left'} orientationMargin="0" style={{ marginTop: '0px', fontWeight: 600 }}>발주 요청 상세 항목</Divider>
                                            <Table
                                                dataSource={purchaseRequestParam?.purchaseRequestDetails || []}
                                                columns={[
                                                    {
                                                        title: '품목 코드',
                                                        dataIndex: 'productCode',
                                                        key: 'productCode',
                                                        align: 'center',
                                                        render: (text, record) => (
                                                            <Input
                                                                value={record.productCode}
                                                                onClick={() => handleInputClick('product', record.id)}
                                                                onFocus={(e) => e.target.blur()}
                                                                className="small-text"
                                                            />
                                                        ),
                                                        width: '10%'
                                                    },
                                                    {
                                                        title: '품목명',
                                                        dataIndex: 'productName',
                                                        key: 'productName',
                                                        align: 'center',
                                                        render: (text, record) => (
                                                            <Input
                                                                value={record.productName}
                                                                onClick={() => handleInputClick('product')}
                                                                onFocus={(e) => e.target.blur()}
                                                                className="small-text"
                                                            />
                                                        ),
                                                        width: '20%'
                                                    },
                                                    {
                                                        title: '거래처',
                                                        dataIndex: ['client', 'clientName'],
                                                        key: 'clientName',
                                                        align: 'center',
                                                        render: (text, record) => (
                                                            <Input
                                                                value={text}
                                                                onChange={(e) => handleFieldChange(e.target.value, record.key, 'clientName')}
                                                                className="small-text"
                                                            />
                                                        ),
                                                        width: '15%'
                                                    },
                                                    {
                                                        title: '수량',
                                                        dataIndex: 'quantity',
                                                        key: 'quantity',
                                                        align: 'center',
                                                        render: (text, record) => (
                                                            <Input
                                                                value={text}
                                                                onChange={(e) => handleFieldChange(e.target.value, record.key, 'quantity')}
                                                                className="small-text"
                                                            />
                                                        ),
                                                        width: '6%'
                                                    },
                                                    {
                                                        title: '단가',
                                                        dataIndex: 'price',
                                                        key: 'price',
                                                        align: 'center',
                                                        render: (text) => <div className="small-text">{text}</div>
                                                    },
                                                    {
                                                        title: '공급가액',
                                                        dataIndex: 'supplyPrice',
                                                        key: 'supplyPrice',
                                                        align: 'center',
                                                        render: (text) => <div className="small-text">{text}</div>
                                                    },
                                                    {
                                                        title: '부가세',
                                                        dataIndex: 'vat',
                                                        key: 'vat',
                                                        align: 'center',
                                                        render: (text) => <div className="small-text">{text}</div>
                                                    },
                                                    {
                                                        title: '비고',
                                                        dataIndex: 'remarks',
                                                        key: 'remarks',
                                                        align: 'center',
                                                        render: (text, record) => (
                                                            <Input
                                                                value={text}
                                                                onChange={(e) => handleFieldChange(e.target.value, record.key, 'remarks')}
                                                                className="small-text"
                                                            />
                                                        ),
                                                    },
                                                ]}
                                                rowKey={(record, index) => index}
                                                pagination={false}
                                                rowSelection={{
                                                    type: 'radio', // 행을 선택할 때 체크박스 사용
                                                    selectedRowKeys: selectedDetailRowKeys,
                                                    onChange: handleRowSelectionChange,
                                                }}
                                                onRow={(record) => ({
                                                    onClick: () => setEditingRow(record.id),  // 행 클릭 시 해당 행의 id를 상태로 저장
                                                })}
                                            />

                                            <Divider />
                                            <Box sx={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '20px' }}>
                                                <Button type="primary" htmlType="submit">
                                                    저장
                                                </Button>
                                            </Box>

                                            {/* 모달창 */}
                                            <Modal
                                                open={isModalVisible}
                                                onCancel={handleModalCancel}
                                                width="40vw"
                                                footer={null}
                                            >
                                                {isLoading ? (
                                                    <Spin />
                                                ) : (
                                                    <>
                                                        {/* 담당자 선택 모달 */}
                                                        {currentField === 'managerName' && (
                                                            <>
                                                                <Typography id="modal-modal-title" variant="h6" component="h2" sx={{ marginBottom: '20px' }}>
                                                                    담당자 선택
                                                                </Typography>
                                                                <Input
                                                                    placeholder="검색"
                                                                    prefix={<SearchOutlined />}
                                                                    onChange={(e) => {
                                                                        const value = e.target.value.toLowerCase(); // 입력값을 소문자로 변환
                                                                        if (!value) {
                                                                            setModalData(initialModalData);
                                                                        } else {
                                                                            const filtered = initialModalData.filter((item) => {
                                                                                return (
                                                                                    (item.employeeNumber && item.employeeNumber.toLowerCase().includes(value)) ||
                                                                                    (item.firstName && item.lastName &&
                                                                                        `${item.lastName}${item.firstName}`.toLowerCase().includes(value.toLowerCase()))
                                                                                );
                                                                            });
                                                                            setModalData(filtered);
                                                                        }
                                                                    }}
                                                                    style={{ marginBottom: 16 }}
                                                                />
                                                                {modalData &&(
                                                                    <>
                                                                        <Table
                                                                            columns={[
                                                                                {
                                                                                    title: <div className="title-text">코드</div>,
                                                                                    dataIndex: 'employeeNumber',
                                                                                    key: 'employeeNumber',
                                                                                    align: 'center',
                                                                                    render: (text) => <div className="small-text">{text}</div>
                                                                                },
                                                                                {
                                                                                    title: <div className="title-text">이름</div>,
                                                                                    key: 'name',
                                                                                    align: 'center',
                                                                                    render: (_, record) => (
                                                                                        <div className="small-text">{`${record.lastName}${record.firstName}`}</div>
                                                                                    ),
                                                                                },
                                                                            ]}
                                                                            dataSource={modalData}
                                                                            rowKey="id"
                                                                            size={'small'}
                                                                            pagination={{
                                                                                pageSize: 15,
                                                                                position: ['bottomCenter'],
                                                                                showSizeChanger: false,
                                                                                showTotal: (total) => `총 ${total}개`,  // 총 개수 표시
                                                                            }}
                                                                            onRow={(record) => ({
                                                                                style: { cursor: 'pointer' },
                                                                                onClick: () => handleModalSelect(record), // 선택 시 처리
                                                                            })}
                                                                        />
                                                                    </>
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
                                                                        const value = e.target.value.toLowerCase(); // 입력값을 소문자로 변환
                                                                        if (!value) {
                                                                            setModalData(initialModalData);
                                                                        } else {
                                                                            const filtered = initialModalData.filter((item) => {
                                                                                return (
                                                                                    (item.code && item.code.toLowerCase().includes(value)) ||
                                                                                    (item.warehouseName && item.warehouseName.toLowerCase().includes(value.toLowerCase()))
                                                                                );
                                                                            });
                                                                            setModalData(filtered);
                                                                        }
                                                                    }}
                                                                    style={{ marginBottom: 16 }}
                                                                />
                                                                {modalData &&(
                                                                    <>
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
                                                                                    render: (text) => (<div className="small-text">{text}</div>
                                                                                    ),
                                                                                },
                                                                            ]}
                                                                            dataSource={modalData}
                                                                            rowKey="id"
                                                                            size={'small'}
                                                                            pagination={{
                                                                                pageSize: 15,
                                                                                position: ['bottomCenter'],
                                                                                showSizeChanger: false,
                                                                                showTotal: (total) => `총 ${total}개`,  // 총 개수 표시
                                                                            }}
                                                                            onRow={(record) => ({
                                                                                style: { cursor: 'pointer' },
                                                                                onClick: () => handleModalSelect(record), // 선택 시 처리
                                                                            })}
                                                                        />
                                                                    </>
                                                                )}
                                                            </>
                                                        )}
                                                        {/* 품목 선택 모달 */}
                                                        {currentField === 'product' && (
                                                            <>
                                                                <Typography id="modal-modal-title" variant="h6" component="h2" sx={{ marginBottom: '20px' }}>
                                                                    품목 선택
                                                                </Typography>
                                                                <Input
                                                                    placeholder="검색"
                                                                    prefix={<SearchOutlined />}
                                                                    onChange={(e) => {
                                                                        const value = e.target.value.toLowerCase(); // 입력값을 소문자로 변환
                                                                        if (!value) {
                                                                            setModalData(initialModalData);
                                                                        } else {
                                                                            const filtered = initialModalData.filter((item) => {
                                                                                return (
                                                                                    (item.code && item.code.toLowerCase().includes(value)) ||
                                                                                    (item.name && item.name.toLowerCase().includes(value.toLowerCase()))
                                                                                );
                                                                            });
                                                                            setModalData(filtered);
                                                                        }
                                                                    }}
                                                                    style={{ marginBottom: 16 }}
                                                                />
                                                                {modalData &&(
                                                                    <>
                                                                        <Table
                                                                            columns={[
                                                                                {
                                                                                    title: <div className="title-text">품목 코드</div>,
                                                                                    dataIndex: 'code',
                                                                                    key: 'code',
                                                                                    align: 'center',
                                                                                    render: (text) => <div className="small-text">{text}</div>
                                                                                },
                                                                                {
                                                                                    title: <div className="title-text">품목명</div>,
                                                                                    dataIndex: 'name',
                                                                                    key: 'name',
                                                                                    align: 'center',
                                                                                    render: (text) => (<div className="small-text">{text}</div>
                                                                                    ),
                                                                                },
                                                                            ]}
                                                                            dataSource={modalData}
                                                                            rowKey="id"
                                                                            size={'small'}
                                                                            pagination={{
                                                                                pageSize: 15,
                                                                                position: ['bottomCenter'],
                                                                                showSizeChanger: false,
                                                                                showTotal: (total) => `총 ${total}개`,  // 총 개수 표시
                                                                            }}
                                                                            onRow={(record) => ({
                                                                                style: { cursor: 'pointer' },
                                                                                onClick: () => handleModalSelect(record, selectedDetailRowKeys), // 선택 시 처리
                                                                            })}
                                                                        />
                                                                    </>
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

export default PurchaseRequestPage;