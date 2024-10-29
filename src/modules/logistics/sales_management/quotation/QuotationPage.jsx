import React, {useMemo, useEffect, useState} from 'react';

import {Box, Grid, Grow, Paper, Typography} from '@mui/material';
import WelcomeSection from '../../../../components/WelcomeSection.jsx';
import { tabItems } from './QuotationUtil.jsx';
import {Space, Tag, Form, Table, Button, Col, Input, Row, Checkbox, Modal, DatePicker, Spin, Select, InputNumber, notification, Upload, Divider, Tooltip} from 'antd';
import dayjs from 'dayjs';
import {DownSquareOutlined, SearchOutlined, PlusOutlined} from "@ant-design/icons";
import {useNotificationContext} from "../../../../config/NotificationContext.jsx";
import {EMPLOYEE_API, FINANCIAL_API, LOGISTICS_API} from "../../../../config/apiConstants.jsx";
import apiClient from "../../../../config/apiClient.jsx";
const { confirm } = Modal;

const { RangePicker } = DatePicker;

const QuotationPage = ({initialData}) => {
    const [activeTabKey, setActiveTabKey] = useState('1');
    const notify = useNotificationContext(); // 알림 컨텍스트 사용
    const [quotationList, setQuotationList] = useState(initialData)
    const [displayValues, setDisplayValues] = useState({});
    const [status, setStatus] = useState({});
    const [selectedRowKeys, setSelectedRowKeys] = useState([]);
    const [currentField, setCurrentField] = useState('');
    const [editingRow, setEditingRow] = useState(null);
    const [modalData, setModalData] = useState(null);
    const [initialModalData, setInitialModalData] = useState(null);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [quotationParam, setQuotationParam] = useState({
        quotationDetails: [], });
    const [detailQuotation, setDetailQuotation] = useState(false);
    const [form] = Form.useForm();
    const [quotationDetails, setQuotationDetails] = useState(detailQuotation.quotationDetails || []);
    const [editQuotation, setEditQuotation] = useState(false);
    const [selectedDetailRowKeys, setSelectedDetailRowKeys] = useState([]); // 발주 요청 상세 항목의 선택된 키
    const [registrationForm] = Form.useForm(); // 폼 인스턴스 생성



    useEffect(() => {

        if(!detailQuotation) return;

        form.setFieldsValue(detailQuotation);
        form.setFieldsValue({
            quotationOrderDetails: quotationDetails,
        })
        setQuotationParam(detailQuotation);

        setDisplayValues({
            managerName: detailQuotation.managerCode ? `[${detailQuotation.managerCode}] ${detailQuotation.managerName}` : null,
            warehouseName:  detailQuotation.warehouseCode ? `[${detailQuotation.warehouseCode}] ${detailQuotation.warehouseName}` : null,
            client: detailQuotation.clientId ?`[${detailQuotation.clientId}] ${detailQuotation.clientName}` : null,
            vatType: detailQuotation.vatCode ? `[${detailQuotation.vatCode}] ${detailQuotation.vatName}` : null

        }, [detailQuotation, form, quotationDetails]);

    }, [detailQuotation], form);

    const [searchParams, setSearchParams] = useState({
        startDate: null,
        endDate: null,
        clientId: null,
        state: null,
    });

    const [searchData, setSearchData] = useState(null);


    const handleTabChange = (key) => {
        setEditQuotation(false);
        setEditingRow(null);
        setQuotationDetails(null)

        setSelectedRowKeys(null)
        form.resetFields();
        registrationForm.resetFields();
        registrationForm.setFieldValue('isActive', true);

        setActiveTabKey(key);
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

    // 콤마 적용
    const formatNumberWithComma = (value) => {
        // value가 숫자인 경우 문자열로 변환
        const stringValue = String(value);
        return stringValue.replace(/\B(?=(\d{3})+(?!\d))/g, ','); // 천 단위마다 콤마 추가
    };

    // 콤마 제거 함수
    const removeComma = (value) => {
        return value ? value.toString().replace(/,/g, '') : value;
    };

    const handleStatusChange = (value) => {
        setStatus(value);
        setSearchParams((prevParams) => ({
            ...prevParams,
            state: value,  // 선택된 상태 값 반영
        }));
    };

    const handleSearch = async () => {
        const { startDate, endDate, clientCode, state } = searchParams;

        try {
            const response = await apiClient.post(LOGISTICS_API.QUOTATION_LIST_API, searchParams);
            const data = response.data;
            setSearchData(data);
            console.log(data)

            notify('success', '조회 성공', '견적서 조회 성공.', 'bottomRight');
        } catch (error) {
            notify('error', '조회 오류', '견적서 조회 중 오류가 발생했습니다.', 'top');
        }
    };

    // 입력 필드 클릭 시 모달 열기
    const handleInputClick = (fieldName, index) => {
        setCurrentField(fieldName);
        setEditingRow(index);
        setModalData(null); // 모달 열기 전에 데이터를 초기화
        setInitialModalData(null); // 모달 열기 전에 데이터를 초기화
        fetchModalData(fieldName);  // 모달 데이터 가져오기 호출
        setIsModalVisible(true);  // 모달창 열기
    };

    // 모달 데이터 가져오기
    const fetchModalData = async (fieldName) => {
        setIsLoading(true);
        let apiPath;

        if(fieldName === 'client') apiPath = FINANCIAL_API.FETCH_CLIENT_LIST_API;
        if(fieldName === 'managerName') apiPath = EMPLOYEE_API.EMPLOYEE_DATA_API;
        if(fieldName === 'warehouseName') apiPath = LOGISTICS_API.WAREHOUSE_LIST_API;
        if(fieldName === 'product') apiPath = LOGISTICS_API.PRODUCT_LIST_API;
        if(fieldName === 'vatType') apiPath = FINANCIAL_API.VAT_TYPE_SEARCH_API;

        try {
            const response = await apiClient.post(apiPath);

            // 데이터가 문자열이고 JSON 배열 형식일 경우 파싱, 아니면 그대로 배열로 처리
            let data = response.data;
            console.log(data);
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

    const handleModalCancel = () => {
        if(currentField === 'client'){
            setSearchParams({
                clientId: null,
            })
            setDisplayValues((prevValues) => ({
                ...prevValues,
                client: null,
            }));
        }
        setCurrentField(null);
        setIsModalVisible(false);  // 모달창 닫기
    };

    const handleModalSelect = (record) => {

        switch (currentField) {
            case 'managerName':
                setQuotationParam((prevParams) => ({
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
                setQuotationParam((prevParams) => ({
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

            case 'client':
                setQuotationParam((prevParams) => ({
                    ...prevParams,
                    client: {
                        id: record.id,
                        name: record.printClientName,
                    },
                }));
                setSearchParams((prevParams) => ({
                    ...prevParams,
                    clientId: record.id,
                }));
                setDisplayValues((prevValues) => ({
                    ...prevValues,
                    client: `[${record.id}] ${record.printClientName}`,
                }));
                break;

            case 'product':
                // 제품 선택 시 해당 제품을 상태에 반영
                const updatedDetails = [...quotationParam.quotationDetails];

                console.log(editingRow)

                // 해당 품목 코드와 이름을 업데이트
                updateField('productCode', record.code, editingRow);
                updateField('productName', record.name, editingRow);
                updateField('price', record.salesPrice, editingRow);

                const { quantity } = updatedDetails[editingRow].quantity;
                const supplyPrice = calculateSupplyPrice(quantity, (record.salesPrice));
                console.log(supplyPrice)
                const vat = calculateVat(supplyPrice);


                setQuotationParam((prevParams) => ({
                    ...prevParams,
                    quotationDetails: updatedDetails,
                }));
                setEditingRow(null);
                break;

            case 'vatType':
                setQuotationParam((prevParams) => ({
                    ...prevParams,
                    vatType: {
                        code: record.code,
                        name: record.name,
                    },
                }));
                setDisplayValues((prevValues) => ({
                    ...prevValues,
                    vatType: `[${record.code}] ${record.name}`,
                }));
                break;
        }

        // 모달창 닫기
        setIsModalVisible(false);
    };

    // 등록 일자 변경 핸들러
    const handleRegiDateChange = (date) => {
        setQuotationParam((prevState) => ({
            ...prevState,
            date: dayjs(date),
        }));
    };

    // 필드 값 변경 시 호출되는 함수
    const handleFieldChange = (value, index, field) => {
        const updatedDetails = [...quotationParam.quotationDetails];

        setEditingRow(index);

        updatedDetails[index][field] = value;

        if (field === 'quantity') {
            const quantity = value;

            const price = updatedDetails[index].price;

            updatedDetails[index].supplyPrice = quantity * price; // 공급가액 = 수량 * 단가

            updatedDetails[index].vat = calculateVat(updatedDetails[index].supplyPrice);

        }


        setQuotationDetails(updatedDetails); // 상태 업데이트
        setQuotationParam( {
            ...quotationParam,
            quotationDetails: updatedDetails, // 최종 상태에 수정된 배열 반영
        });
        setEditingRow(null);
    };

    const calculateSupplyPrice = (quantity, price) => {
        return quantity * price;
    };

    const calculateVat = (supplyPrice) => {
        return supplyPrice * 0.1;  // 부가세는 공급가액의 10%
    };

    const updateField = (fieldName, value) => {
        const updatedDetails = [...quotationParam.quotationDetails];

        console.log('editingRow: ', editingRow)

        updatedDetails[editingRow][fieldName] = value;

        console.log('updatedDetails: ', updatedDetails)

        // 수량이나 단가가 변경되면 공급가액을 재계산
        if (fieldName === 'quantity' || fieldName === 'price') {
            const { quantity, price } = updatedDetails[editingRow];
            const supplyPrice = calculateSupplyPrice(quantity, price);
            const vat = calculateVat(supplyPrice);

            updatedDetails[editingRow].supplyPrice = supplyPrice;
            updatedDetails[editingRow].vat = vat;
        }

        setQuotationParam((prevParams) => ({
            ...prevParams,
            quotationOrderDetails: updatedDetails,
        }));
    };

    const handleRowSelectionChange = (selectedRowKeys) => {
        setSelectedDetailRowKeys(selectedRowKeys);  // 선택된 행의 키 상태 업데이트
        console.log('선택된 행 키:', selectedRowKeys);  // 선택된 키 출력

    };

    const handleAddRow = () => {
        const newRow = {
            productCode: '',
            productName: '',
            quantity: 0,
            price: 0,
            supplyPrice: 0,
            vat: 0,
            remarks: '',
        };

        // 기존 항목에 새로운 항목 추가
        setQuotationParam((prev) => ({
            ...prev,
            quotationDetails: [...prev.quotationDetails, newRow],
        }));
    };

    const handleDeleteRow = (index) => {
        console.log(index)
        confirm({
            title: '삭제 확인',
            content: '정말로 삭제하시겠습니까?',
            okText: '확인',
            cancelText: '취소',
            onOk: async () => {
                try {
                    // 삭제 API 호출해서 해야함 (수정)
                    const updatedDetails = [...quotationParam.quotationDetails]; // 배열을 복사
                    updatedDetails.splice(index, 1); // 인덱스에 해당하는 항목 삭제

                    setQuotationDetails(updatedDetails); // 상태 업데이트
                    setQuotationParam((prev) => ({
                            ...prev,
                            quotationDetails: updatedDetails, // 최종 상태에 수정된 배열 반영
                        })
                    );

                } catch (error) {
                    notify('error', '삭제 실패', '데이터 삭제 중 오류가 발생했습니다.', 'top');
                }
            },
        });
    };

    // 폼 제출 핸들러
    const handleFormSubmit = async (values, type) => {
        console.log('Form values:', values); // 폼 값 확인
        console.log('detailPurchaseOrder', detailPurchaseOrder)
        console.log('quotationParam: ', quotationParam)
        confirm({
            title: '저장 확인',
            content: '정말로 저장하시겠습니까?',
            okText: '확인',
            cancelText: '취소',
            onOk: async () => {
                try {
                    const quotationData = {
                        clientId: quotationParam.clientId,
                        managerId: quotationParam.managerId,
                        warehouseId: quotationParam.warehouseId,
                        currencyId: quotationParam.currencyId,
                        date: quotationParam.date,
                        deliveryDate: quotationParam.deliveryDate,
                        vatType: quotationParam.vatType,
                        items: Array.isArray(quotationParam.quotationDetails
                        ) ? quotationParam.quotationDetails.map(item => ({
                            productId: item.productId,
                            quantity: item.quantity,
                            remarks: item.remarks,
                        })) : [],  // items가 존재할 경우에만 map 실행, 없으면 빈 배열로 설정
                        remarks: values.remarks
                    };

                    console.log('Sending data to API:', quotationData); // API로 전송할 데이터 확인

                    const API_PATH = type === 'update' ? LOGISTICS_API.QUOTATION_UPDATE_API(quotationParam.id) : LOGISTICS_API.PURCHASE_ORDER_CREATE_API;
                    const method = type === 'update' ? 'put' : 'post';

                    const response = await apiClient[method](API_PATH, quotationData, {
                        headers: {
                            'Content-Type': 'application/json',
                        },
                    });

                    const updatedData = response.data;

                    if (type === 'update') {
                        setPurchaseOrderList((prevList) =>
                            prevList.map((order) => (order.id === updatedData.id ? updatedData : order))
                        );
                    } else {
                        setPurchaseOrderList((prevList) => [...prevList, updatedData]);
                        registrationForm.resetFields();
                    }

                    setEditPurchaseOrder(false);
                    setDetailPurchaseOrder(null);
                    setPurchaseOrderParam(null);
                    setDisplayValues({});

                    type === 'update'
                        ? notify('success', '발주서 수정', '발주서 정보 수정 성공.', 'bottomRight')
                        : notify('success', '발주서 저장', '발주서 정보 저장 성공.', 'bottomRight');
                } catch (error) {
                    console.error('Error saving data:', error); // 오류 로그 출력
                    notify('error', '저장 실패', '데이터 저장 중 오류가 발생했습니다.', 'top');
                }
            },
            onCancel() {
                notification.warning({
                    message: '저장 취소',
                    description: '저장이 취소되었습니다.',
                    placement: 'bottomLeft',
                });
            },
        });
    };

    const columns = [
        {
            title: <div className="title-text">상태</div>,
            dataIndex: 'status',
            key: 'status',
            align: 'center',
            render: (text) => {
                let color;
                let value;
                switch (text) {
                    case "WAITING_FOR_SHIPMENT":
                        color = "orange";
                        value = "출하 대기";
                        break;
                    case "SHIPMENT_COMPLETED":
                        color = "green";
                        value = "출하 완료";
                        break;
                    case "IN_PROGRESS":
                        color = "purple";
                        value = "진행중";
                        break;
                    case "COMPLETED":
                        color = "blue";
                        value = "진행완료";
                        break;
                    case "CANCELED":
                        color = "red";
                        value = "취소";
                        break;
                    default:
                        color = "gray"; // 기본 색상
                        value = "미확인";
                }
                return <Tag style={{ marginLeft: '5px' }} color={color}>{value}</Tag>;
            },
            width: '10%',
        },
        {
            title: <div className="title-text">입력 일자</div>,
            dataIndex: 'date',
            key: 'date',
            align: 'center',
            render: (text) => (text ? dayjs(text).format('YYYY-MM-DD') : ''),
            width: '10%',
        },
        {
            title: <div className="title-text">거래처명</div>,
            dataIndex: 'clientName',
            key: 'clientName',
            align: 'center',
            width: '15%',
        },
        {
            title: <div className="title-text">품목명</div>,
            dataIndex: 'productName',
            key: 'productName',
            align: 'center',
            width: '25%',
        },
        {
            title: <div className="title-text">과세 유형</div>,
            dataIndex: 'vatName',
            key: 'vatName',
            align: 'center',
            width: '10%',
        },
        {
            title: <div className="title-text">총 수량</div>,
            dataIndex: 'totalQuantity',
            key: 'totalQuantity',
            align: 'center',
            width: '10%',
        },
        {
            title: <div className="title-text">총 가격</div>,
            dataIndex: 'totalPrice',
            key: 'totalPrice',
            align: 'center',
            render: (text) => <div className="small-text" style={{ textAlign: 'right' }}>{formatNumberWithComma(text)}</div>,
            width: '15%',
        },
    ];

    return (
        <Box sx={{ margin: '20px' }}>
            <Grid container spacing={3}>
                <Grid item xs={12} md={12}>
                    <WelcomeSection
                        title="견적서"
                        description={(
                            <Typography>
                                견적서 페이지는 <span>고객에게 제품이나 서비스를 제공하기 전 예상 비용</span>을 산출하고, 이를 문서화하는 곳임. 이 페이지에서는 <span>견적서를 작성, 수정, 삭제</span>할 수 있으며, 작성된 견적서는 <span>고객에게 직접 전송</span>하거나 내부적으로 <span>승인 절차를 거치는 기능</span>을 제공함. 또한, <span>견적 항목</span>을 추가하고 <span>수량, 단가, 총 비용</span>을 자동으로 계산하는 기능이 포함됨.
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
                    <Grid item xs={12} md={12} sx={{ minWidth: '1000px !important', maxWidth: '1500px !important' }}>
                        <Grow in={true} timeout={200}>
                            <Paper elevation={3} sx={{ height: '100%'}}>
                                <Typography variant="h6" sx={{ padding: '20px' }}>견적서 목록</Typography>
                                <Grid sx={{ padding: '0px 20px 0px 20px' }}>
                                    <Form layout="vertical">
                                        <Row gutter={16} style={{ display: 'flex', alignItems: 'flex-end' }}>
                                            <Col flex="0 0 300px">
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
                                                        style={{ width: '100%' }}
                                                    />
                                                </Form.Item>
                                            </Col>
                                            <Col flex="0 0 200px">
                                                <Form.Item
                                                    label="거래처"
                                                    required
                                                    tooltip="검색할 거래처를 선택하세요"
                                                >
                                                    <Form.Item
                                                        noStyle
                                                        rules={[{ required: true, message: '거래처를 선택하세요' }]}
                                                    >
                                                        <Input
                                                            placeholder="거래처"
                                                            value={displayValues.client}
                                                            onClick={() => handleInputClick('client')}
                                                            className="search-input"
                                                            style={{ width: '100%' }}
                                                            suffix={<DownSquareOutlined />}
                                                        />
                                                    </Form.Item>
                                                </Form.Item>
                                            </Col>
                                            <Col flex="1">
                                                <Form.Item
                                                    label="상태"
                                                    required
                                                    tooltip="검색할 상태를 선택하세요"
                                                >
                                                    <Select
                                                        placeholder="상태"
                                                        style={{ width: '200px' }}
                                                        value={status.status}
                                                        onChange={handleStatusChange}
                                                    >
                                                        <Select.Option value="WAITING_FOR_SHIPMENT">출하 대기</Select.Option>
                                                        <Select.Option value="SHIPMENT_COMPLETED">출하 완료</Select.Option>
                                                        <Select.Option value="IN_PROGRESS">진행중</Select.Option>
                                                        <Select.Option value="COMPLETED">진행완료</Select.Option>
                                                        <Select.Option value="CANCELED">취소</Select.Option>
                                                    </Select>
                                                </Form.Item>
                                            </Col>
                                            <Col >
                                                <Form.Item>
                                                    <Button style={{ width: '100px' }} type="primary" onClick={handleSearch} icon={<SearchOutlined />} block>
                                                        검색
                                                    </Button>
                                                </Form.Item>
                                            </Col>
                                        </Row>
                                    </Form>

                                    <Table
                                        dataSource={Object.values(searchParams).every(value => value === null) ? quotationList : searchData} // 발주서 리스트 데이터
                                        columns={columns} // 테이블 컬럼 정의
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
                                                setSelectedRowKeys([record.id]); // 클릭한 행의 키로 상태 업데이트
                                                const id = record.id;
                                                try {
                                                    const response = await apiClient.post(LOGISTICS_API.QUOTATION_DETAIL_API(id));
                                                    setDetailQuotation(response.data);
                                                    console.log('detailQuotation: ', response.data)
                                                    setQuotationDetails(detailQuotation)
                                                    setEditQuotation(true);

                                                    notify('success', '견적 조회', '견적 정보 조회 성공.', 'bottomRight')
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
                    {editQuotation && (
                        <Grid item xs={12} md={12} sx={{ minWidth: '1000px !important', maxWidth: '1500px !important' }}>
                            <Grow in={true} timeout={200}>
                                <Paper elevation={3} sx={{ height: '100%' }}>
                                    <Typography variant="h6" sx={{ padding: '20px' }}>견적 상세정보 및 수정</Typography>
                                    <Grid sx={{ padding: '0px 20px 0px 20px' }}>
                                        <Form
                                            initialValues={detailQuotation}
                                            form={form}
                                            onFinish={(values) => { handleFormSubmit(values, 'update') }}
                                        >
                                            {/* 견적 정보 */}
                                            <Divider orientation={'left'} orientationMargin="0" style={{ marginTop: '0px', fontWeight: 600 }}>견적서 정보</Divider>
                                            <Row align="middle" gutter={16} style={{ marginBottom: '16px' }}>
                                                <Col>
                                                    <Typography>등록 일자</Typography>
                                                </Col>
                                                <Col>
                                                    <Form.Item style={{ marginBottom: 0 }} rules={[{ required: true, message: '등록 일자를 입력하세요.' }]}>
                                                        <DatePicker
                                                            disabledDate={(current) => current && current.year() !== 2024}
                                                            value={dayjs(quotationParam.date)}
                                                            onChange={handleRegiDateChange}
                                                        />
                                                    </Form.Item>
                                                </Col>
                                            </Row>

                                            <Row gutter={16} style={{ marginBottom: '16px' }}>
                                                <Col span={6}>
                                                    <Form.Item style={{ marginBottom: 0 }} >
                                                        <Input
                                                            addonBefore="담당자"
                                                            value={displayValues.managerName}
                                                            onClick={() => handleInputClick('managerName')}
                                                            onFocus={(e) => e.target.blur()}
                                                            suffix={<DownSquareOutlined />}
                                                        />
                                                    </Form.Item>
                                                </Col>
                                                <Col span={8}>
                                                    <Form.Item style={{ marginBottom: 0 }} >
                                                        <Input
                                                            addonBefore="출하창고"
                                                            value={displayValues.warehouseName}
                                                            onClick={() => handleInputClick('warehouseName')}
                                                            onFocus={(e) => e.target.blur()}
                                                            suffix={<DownSquareOutlined />}
                                                        />
                                                    </Form.Item>
                                                </Col>
                                                <Col span={6}>
                                                    <Form.Item style={{ marginBottom: 0 }} >
                                                        <Input
                                                            addonBefore="거래처"
                                                            value={displayValues.client}
                                                            onClick={() => handleInputClick('client')}
                                                            onFocus={(e) => e.target.blur()}
                                                            suffix={<DownSquareOutlined />}
                                                        />
                                                    </Form.Item>
                                                </Col>
                                            </Row>

                                            <Row gutter={16} >
                                                <Col span={6}>
                                                    <Form.Item style={{ marginBottom: 0 }} >
                                                        <Input
                                                            addonBefore="과세 유형"
                                                            value={displayValues.vatType}
                                                            onClick={() => handleInputClick('vatType')}
                                                            onFocus={(e) => e.target.blur()}
                                                            suffix={<DownSquareOutlined />}
                                                        />
                                                    </Form.Item>
                                                </Col>

                                                <Col span={6}>
                                                    <Form.Item name="journalEntry">
                                                        <Space.Compact>
                                                            <Input style={{ width: '60%', backgroundColor: '#FAFAFA', color: '#000', textAlign: 'center' }} defaultValue="분개유형" disabled />
                                                            <Select
                                                                style={{ width: '70%' }}
                                                                value={quotationParam.journalEntryCode}
                                                                onChange={(value) => {
                                                                    setQuotationParam((prevState) => ({
                                                                        ...prevState,
                                                                        journalEntryCode: value,
                                                                    }));
                                                                }}
                                                            >
                                                                <Select.Option value="4">현금</Select.Option>
                                                                <Select.Option value="5">외상</Select.Option>
                                                                <Select.Option value="6">카드</Select.Option>

                                                            </Select>
                                                        </Space.Compact>
                                                    </Form.Item>
                                                </Col>

                                                <Col span={6}>
                                                    <Form.Item name="electronicTaxInvoiceStatus" valuePropName="checked">
                                                        <Checkbox>세금계산서 발행 여부</Checkbox>
                                                    </Form.Item>
                                                </Col>

                                            </Row>

                                            <Row gutter={16}>

                                                <Col span={6}>
                                                    <Form.Item name="currency">
                                                        <Space.Compact>
                                                            <Input style={{ width: '60%', backgroundColor: '#FAFAFA', color: '#000', textAlign: 'center' }} defaultValue="통화 종류" disabled />
                                                            <Select
                                                                style={{ width: '70%' }}
                                                                value={quotationParam.currency}
                                                                onChange={(value) => {
                                                                    setQuotationParam((prevState) => ({
                                                                        ...prevState,
                                                                        currency: value,
                                                                    }));
                                                                }}
                                                            >
                                                                <Select.Option value="KRW">한국 [원]</Select.Option>
                                                                <Select.Option value="USD">미국 [달러]</Select.Option>
                                                                <Select.Option value="EUR">유럽 [유로]</Select.Option>
                                                                <Select.Option value="JPY">일본 [엔]</Select.Option>
                                                                <Select.Option value="CNY">중국 [위안]</Select.Option>
                                                                <Select.Option value="GBP">영국 [파운드]</Select.Option>
                                                            </Select>
                                                        </Space.Compact>
                                                    </Form.Item>
                                                </Col>


                                                {(quotationParam.currency !== '한국 [원]' && quotationParam.currency !== 'KRW') && (
                                                    <Col span={6}>
                                                        <Form.Item  style={{ marginBottom: 0 }} >
                                                            <Input
                                                                addonBefore="환율"
                                                                value={quotationParam.exchangeRate}
                                                                onClick={() => handleInputClick('exchangeRate')}
                                                                onFocus={(e) => e.target.blur()}
                                                            />
                                                        </Form.Item>
                                                    </Col>
                                                )}


                                                <Col span={12}>
                                                    <Form.Item name="remarks">
                                                        <Input addonBefore="비고" />
                                                    </Form.Item>
                                                </Col>

                                            </Row>

                                            {/* 견적 상세 항목 */}
                                            <Divider orientation={'left'} orientationMargin="0" style={{ marginTop: '0px', fontWeight: 600 }}>견적 상세 항목</Divider>
                                            <Table
                                                dataSource={quotationParam?.quotationDetails || []}
                                                columns={[
                                                    {
                                                        title: '품목',
                                                        key: 'product',
                                                        align: 'center',
                                                        render: (text, record, index) => {
                                                            const productCode = record?.productCode || ''; // 품목 코드
                                                            const productName = record?.productName || ''; // 품목명
                                                            return (
                                                                <Input
                                                                    value={`[${productCode}] ${productName}`} // 두 필드를 결합한 형태
                                                                    onClick={() => handleInputClick('product', index)} // 클릭 시 동작
                                                                    onFocus={(e) => e.target.blur()} // 포커스 제거
                                                                    className="small-text"
                                                                    suffix={<DownSquareOutlined />}
                                                                />
                                                            );
                                                        },
                                                        width: '20%'
                                                    },
                                                    {
                                                        title: '수량',
                                                        dataIndex: 'quantity',
                                                        key: 'quantity',
                                                        align: 'center',
                                                        render: (text, record, index) => (

                                                            <Input
                                                                value={text}
                                                                onChange={(e) => handleFieldChange(e.target.value, index, 'quantity')}
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
                                                        render: (text) => <div className="small-text" style={{ textAlign: 'right' }}>{formatNumberWithComma(text)}</div>,

                                                    },
                                                    {
                                                        title: '공급가액',
                                                        dataIndex: 'supplyPrice',
                                                        key: 'supplyPrice',
                                                        align: 'center',
                                                        render: (text) => <div className="small-text" style={{ textAlign: 'right' }}>{formatNumberWithComma(text)}</div>,

                                                    },
                                                    {
                                                        title: '부가세',
                                                        dataIndex: 'vat',
                                                        key: 'vat',
                                                        align: 'center',
                                                        render: (text) => <div className="small-text" style={{ textAlign: 'right' }}>{formatNumberWithComma(text)}</div>,

                                                    },
                                                    {
                                                        title: '비고',
                                                        dataIndex: 'remarks',
                                                        key: 'remarks',
                                                        align: 'center',
                                                        render: (text, record, index) => (
                                                            <Input
                                                                value={text}
                                                                onChange={(e) => handleFieldChange(e.target.value, index, 'remarks')}
                                                                className="small-text"
                                                            />
                                                        ),

                                                    },
                                                ]}
                                                rowKey={(record, index) => index}
                                                pagination={false}
                                                rowSelection={{
                                                    type: 'radio', // 행을 선택할 때 체크박스 사용

                                                    onChange: handleRowSelectionChange,
                                                }}
                                                onRow={(record) => ({
                                                    // onClick: () => setEditingRow(record.id),  // 행 클릭 시 해당 행의 id를 상태로 저장
                                                })}

                                            />

                                            <Divider style={{ marginBottom: '10px'}} />
                                            <Box sx={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '20px' }}>
                                                <Button type="default" onClick={handleAddRow} style={{ marginRight: '10px' }}>
                                                    <PlusOutlined /> 항목 추가
                                                </Button>

                                                <Button type="danger" onClick={() => handleDeleteRow(selectedDetailRowKeys)} style={{ marginRight: '10px'}} >
                                                    삭제
                                                </Button>

                                                <Button type="primary" htmlType="submit">
                                                    저장
                                                </Button>
                                            </Box>
                                        </Form>


                                    </Grid>
                                </Paper>
                            </Grow>
                        </Grid>
                    )}
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

                        {/* 거래처 선택 모달 */}
                        {currentField === 'client' && (
                            <>
                                <Typography id="modal-modal-title" variant="h6" component="h2" sx={{ marginBottom: '20px' }}>
                                    거래처 선택
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
                                                    (item.id && item.id.toString().toLowerCase().includes(value)) ||
                                                    (item.printClientName && item.printClientName.toLowerCase().includes(value))
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
                                            { title: '코드', dataIndex: 'id', key: 'id', align: 'center' },
                                            { title: '거래처명', dataIndex: 'printClientName', key: 'printClientName', align: 'center' }
                                        ]}
                                        dataSource={modalData}
                                        rowKey="id"
                                        size="small"
                                        pagination={{
                                            pageSize: 15,
                                            position: ['bottomCenter'],
                                            showSizeChanger: false,
                                            showTotal: (total) => `총 ${total}개`,
                                        }}
                                        onRow={(record) => ({
                                            style: { cursor: 'pointer' },
                                            onClick: () => handleModalSelect(record) // 선택 시 처리
                                        })}
                                    />
                                )}
                            </>
                        )}

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
                        {/* 과세 유형 선택 모달 */}
                        {currentField === 'vatType' && (
                            <>
                                <Typography id="modal-modal-title" variant="h6" component="h2" sx={{ marginBottom: '20px' }}>
                                    과세 유형 선택
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
                                                    (item.code && item.code.toString().toLowerCase().includes(value)) ||
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
                                            { title: '코드', dataIndex: 'code', key: 'code', align: 'center' },
                                            { title: '과세명', dataIndex: 'name', key: 'name', align: 'center' }
                                        ]}
                                        dataSource={modalData}
                                        rowKey="code"
                                        size="small"
                                        pagination={{
                                            pageSize: 15,
                                            position: ['bottomCenter'],
                                            showSizeChanger: false,
                                            showTotal: (total) => `총 ${total}개`,
                                        }}
                                        onRow={(record) => ({
                                            style: { cursor: 'pointer' },
                                            onClick: () => handleModalSelect(record) // 선택 시 처리
                                        })}
                                    />
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
                                                onClick: () => handleModalSelect(record), // 선택 시 처리
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

            {activeTabKey === '2' && (
                <Grid item xs={12} md={12} sx={{ minWidth: '1000px !important', maxWidth: '1500px !important' }}>
                    <Grow in={true} timeout={200}>
                        <Paper elevation={3} sx={{ height: '100%' }}>
                            <Typography variant="h6" sx={{ padding: '20px' }}>견적서 등록</Typography>
                            <Grid sx={{ padding: '0px 20px 0px 20px' }}>
                                <Form
                                    initialValues={detailQuotation}
                                    form={form}
                                    onFinish={(values) => { handleFormSubmit(values, 'update') }}
                                >
                                    {/* 견적 정보 */}
                                    <Divider orientation={'left'} orientationMargin="0" style={{ marginTop: '0px', fontWeight: 600 }}>견적서 정보</Divider>
                                    <Row align="middle" gutter={16} style={{ marginBottom: '16px' }}>
                                        <Col>
                                            <Typography>등록 일자</Typography>
                                        </Col>
                                        <Col>
                                            <Form.Item style={{ marginBottom: 0 }} rules={[{ required: true, message: '등록 일자를 입력하세요.' }]}>
                                                <DatePicker
                                                    disabledDate={(current) => current && current.year() !== 2024}
                                                    value={dayjs(quotationParam.date)}
                                                    onChange={handleRegiDateChange}
                                                />
                                            </Form.Item>
                                        </Col>
                                    </Row>

                                    <Row gutter={16} style={{ marginBottom: '16px' }}>
                                        <Col span={6}>
                                            <Form.Item style={{ marginBottom: 0 }} >
                                                <Input
                                                    addonBefore="담당자"
                                                    value={displayValues.managerName}
                                                    onClick={() => handleInputClick('managerName')}
                                                    onFocus={(e) => e.target.blur()}
                                                    suffix={<DownSquareOutlined />}
                                                />
                                            </Form.Item>
                                        </Col>
                                        <Col span={8}>
                                            <Form.Item style={{ marginBottom: 0 }} >
                                                <Input
                                                    addonBefore="출하창고"
                                                    value={displayValues.warehouseName}
                                                    onClick={() => handleInputClick('warehouseName')}
                                                    onFocus={(e) => e.target.blur()}
                                                    suffix={<DownSquareOutlined />}
                                                />
                                            </Form.Item>
                                        </Col>
                                        <Col span={6}>
                                            <Form.Item style={{ marginBottom: 0 }} >
                                                <Input
                                                    addonBefore="거래처"
                                                    value={displayValues.client}
                                                    onClick={() => handleInputClick('client')}
                                                    onFocus={(e) => e.target.blur()}
                                                    suffix={<DownSquareOutlined />}
                                                />
                                            </Form.Item>
                                        </Col>
                                    </Row>

                                    <Row gutter={16} >
                                        <Col span={6}>
                                            <Form.Item style={{ marginBottom: 0 }} >
                                                <Input
                                                    addonBefore="과세 유형"
                                                    value={displayValues.vatType}
                                                    onClick={() => handleInputClick('vatType')}
                                                    onFocus={(e) => e.target.blur()}
                                                    suffix={<DownSquareOutlined />}
                                                />
                                            </Form.Item>
                                        </Col>

                                        <Col span={6}>
                                            <Form.Item name="journalEntry">
                                                <Space.Compact>
                                                    <Input style={{ width: '60%', backgroundColor: '#FAFAFA', color: '#000', textAlign: 'center' }} defaultValue="분개유형" disabled />
                                                    <Select
                                                        style={{ width: '70%' }}
                                                        value={quotationParam.journalEntryCode}
                                                        onChange={(value) => {
                                                            setQuotationParam((prevState) => ({
                                                                ...prevState,
                                                                journalEntryCode: value,
                                                            }));
                                                        }}
                                                    >
                                                        <Select.Option value="4">현금</Select.Option>
                                                        <Select.Option value="5">외상</Select.Option>
                                                        <Select.Option value="6">카드</Select.Option>

                                                    </Select>
                                                </Space.Compact>
                                            </Form.Item>
                                        </Col>

                                        <Col span={6}>
                                            <Form.Item name="electronicTaxInvoiceStatus" valuePropName="checked">
                                                <Checkbox>세금계산서 발행 여부</Checkbox>
                                            </Form.Item>
                                        </Col>

                                    </Row>

                                    <Row gutter={16}>

                                        <Col span={6}>
                                            <Form.Item name="currency">
                                                <Space.Compact>
                                                    <Input style={{ width: '60%', backgroundColor: '#FAFAFA', color: '#000', textAlign: 'center' }} defaultValue="통화 종류" disabled />
                                                    <Select
                                                        style={{ width: '70%' }}
                                                        value={quotationParam.currency}
                                                        onChange={(value) => {
                                                            setQuotationParam((prevState) => ({
                                                                ...prevState,
                                                                currency: value,
                                                            }));
                                                        }}
                                                    >
                                                        <Select.Option value="KRW">한국 [원]</Select.Option>
                                                        <Select.Option value="USD">미국 [달러]</Select.Option>
                                                        <Select.Option value="EUR">유럽 [유로]</Select.Option>
                                                        <Select.Option value="JPY">일본 [엔]</Select.Option>
                                                        <Select.Option value="CNY">중국 [위안]</Select.Option>
                                                        <Select.Option value="GBP">영국 [파운드]</Select.Option>
                                                    </Select>
                                                </Space.Compact>
                                            </Form.Item>
                                        </Col>


                                        {(quotationParam.currency !== '한국 [원]' && quotationParam.currency !== 'KRW') && (
                                            <Col span={6}>
                                                <Form.Item  style={{ marginBottom: 0 }} >
                                                    <Input
                                                        addonBefore="환율"
                                                        value={quotationParam.exchangeRate}
                                                        onClick={() => handleInputClick('exchangeRate')}
                                                        onFocus={(e) => e.target.blur()}
                                                    />
                                                </Form.Item>
                                            </Col>
                                        )}


                                        <Col span={12}>
                                            <Form.Item name="remarks">
                                                <Input addonBefore="비고" />
                                            </Form.Item>
                                        </Col>

                                    </Row>

                                    {/* 견적 상세 항목 */}
                                    <Divider orientation={'left'} orientationMargin="0" style={{ marginTop: '0px', fontWeight: 600 }}>견적 상세 항목</Divider>
                                    <Table
                                        dataSource={quotationParam?.quotationDetails || []}
                                        columns={[
                                            {
                                                title: '품목',
                                                key: 'product',
                                                align: 'center',
                                                render: (text, record, index) => {
                                                    const productCode = record?.productCode || ''; // 품목 코드
                                                    const productName = record?.productName || ''; // 품목명
                                                    return (
                                                        <Input
                                                            value={`[${productCode}] ${productName}`} // 두 필드를 결합한 형태
                                                            onClick={() => handleInputClick('product', index)} // 클릭 시 동작
                                                            onFocus={(e) => e.target.blur()} // 포커스 제거
                                                            className="small-text"
                                                            suffix={<DownSquareOutlined />}
                                                        />
                                                    );
                                                },
                                                width: '20%'
                                            },
                                            {
                                                title: '수량',
                                                dataIndex: 'quantity',
                                                key: 'quantity',
                                                align: 'center',
                                                render: (text, record, index) => (

                                                    <Input
                                                        value={text}
                                                        onChange={(e) => handleFieldChange(e.target.value, index, 'quantity')}
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
                                                render: (text) => <div className="small-text" style={{ textAlign: 'right' }}>{formatNumberWithComma(text)}</div>,

                                            },
                                            {
                                                title: '공급가액',
                                                dataIndex: 'supplyPrice',
                                                key: 'supplyPrice',
                                                align: 'center',
                                                render: (text) => <div className="small-text" style={{ textAlign: 'right' }}>{formatNumberWithComma(text)}</div>,

                                            },
                                            {
                                                title: '부가세',
                                                dataIndex: 'vat',
                                                key: 'vat',
                                                align: 'center',
                                                render: (text) => <div className="small-text" style={{ textAlign: 'right' }}>{formatNumberWithComma(text)}</div>,

                                            },
                                            {
                                                title: '비고',
                                                dataIndex: 'remarks',
                                                key: 'remarks',
                                                align: 'center',
                                                render: (text, record, index) => (
                                                    <Input
                                                        value={text}
                                                        onChange={(e) => handleFieldChange(e.target.value, index, 'remarks')}
                                                        className="small-text"
                                                    />
                                                ),

                                            },
                                        ]}
                                        rowKey={(record, index) => index}
                                        pagination={false}
                                        rowSelection={{
                                            type: 'radio', // 행을 선택할 때 체크박스 사용

                                            onChange: handleRowSelectionChange,
                                        }}
                                        onRow={(record) => ({
                                            // onClick: () => setEditingRow(record.id),  // 행 클릭 시 해당 행의 id를 상태로 저장
                                        })}

                                    />

                                    <Divider style={{ marginBottom: '10px'}} />
                                    <Box sx={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '20px' }}>
                                        <Button type="default" onClick={handleAddRow} style={{ marginRight: '10px' }}>
                                            <PlusOutlined /> 항목 추가
                                        </Button>

                                        <Button type="danger" onClick={() => handleDeleteRow(selectedDetailRowKeys)} style={{ marginRight: '10px'}} >
                                            삭제
                                        </Button>

                                        <Button type="primary" htmlType="submit">
                                            저장
                                        </Button>
                                    </Box>
                                </Form>


                            </Grid>
                        </Paper>
                    </Grow>
                </Grid>
            )}

        </Box>
    );
};

export default QuotationPage;