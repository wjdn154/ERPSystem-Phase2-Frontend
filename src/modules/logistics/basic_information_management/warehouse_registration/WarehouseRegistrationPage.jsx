import React, {useState, useEffect, useCallback} from 'react';
import {Box, Grid, Card, Paper, Typography, Divider, Grow} from '@mui/material';
import {Table, Tag, Input, Form, Space, Button, Modal, Tree, Select, Row, Col, Checkbox, Spin} from 'antd';
import {LOGISTICS_API, PRODUCTION_API} from '../../../../config/apiConstants';
import apiClient from '../../../../config/apiClient';
import {useNotificationContext} from '../../../../config/NotificationContext';
import {tabItems} from "./WarehouseUtil.jsx";
import WelcomeSection from "../../../../components/WelcomeSection.jsx";
import dayjs from "dayjs";
import {DownSquareOutlined, SearchOutlined} from "@ant-design/icons";
import TemporarySection from "../../../../components/TemporarySection.jsx";
import {id} from "date-fns/locale";

const WarehouseRegistrationPage = ({initialData}) => {
    const notify = useNotificationContext(); // 알림 메시지 컨텍스트 사용
    const [isLoading, setIsLoading] = useState(false);
    const [warehouseList, setWarehouseList] = useState(initialData); // 창고 목록
    const [warehouseDetail, setWarehouseDetail] = useState(false);
    const [editWarehouse, setEditWarehouse] = useState(false);
    const [form] = Form.useForm(); // 폼 인스턴스 생성
    const [registrationForm] = Form.useForm(); // 폼 인스턴스 생성
    const [warehouseParam, setWarehouseParam] = useState(false);
    const [displayValues, setDisplayValues] = useState({});
    const [currentField, setCurrentField] = useState('');
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [modalData, setModalData] = useState(null);
    const [initialModalData, setInitialModalData] = useState(null);
    const [initialModalRequests, setInitialModalRequests] = useState([]);
    const [selectedRowKeys, setSelectedRowKeys] = useState([]); // 선택된 행 키 상태
    const [activeTabKey, setActiveTabKey] = useState('1'); // 활성화된 탭 키

    const handleFormSubmit = async (values) => {

    }

    const handleTabChange = (key) => {
        setActiveTabKey(key); // 선택된 탭으로 변경
    };

    const handleInputClick = (fieldName) => {
        setCurrentField(fieldName);
        setModalData(null);
        setInitialModalData(null);
        fetchModalData(fieldName);
        setIsModalVisible(true);
    }

    const handleModalCancel = () => {
        setIsModalVisible(false);
    };

    const fetchModalData = async (fieldName) => {
        setIsLoading(true);
        let apiPath;
        if (fieldName === 'productionProcess') apiPath = PRODUCTION_API.PROCESS_LIST_API;
        if (fieldName === 'hierarchyGroupName') apiPath = LOGISTICS_API.HIERARCHY_GROUP_LIST_API;

        try {
            const response = await apiClient.post(apiPath);
            console.log(response.data);

            let data = response.data;
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
    }

    const handleModalSelect = (record) => {
        switch (currentField) {
            case 'productionProcess':
                setWarehouseParam((prevParams) => ({
                    ...prevParams,
                    productionProcess: {
                        id: record.id,
                        code: record.code,
                        name: record.name,
                    },
                }));
                setDisplayValues((prevValues) => ({
                    ...prevValues,
                    productionProcess : `[${record.code}] ${record.name}`,
                }));
                form.setFieldsValue({
                    productionProcess: `[${record.code}] ${record.name}`,
                });
                break;

            case 'hierarchyGroupName':
                break
        }
        setIsModalVisible(false);
    }

    useEffect(() => {
        if (!warehouseDetail) return;

        form.setFieldsValue({
            ...warehouseDetail,
            productionProcess: warehouseDetail.productionProcess
                ? `[${warehouseDetail.productionProcess.code}] ${warehouseDetail.productionProcess.name}`
                : '',
            hierarchyGroups: warehouseDetail.hierarchyGroups.map(group => ({
                id: group.id,
                code: group.code,
                name: group.name,
            })),
        });

        // displayValues 설정
        setDisplayValues({
            productionProcessDisplay: warehouseDetail.productionProcess
                ? `[${warehouseDetail.productionProcess.code}] ${warehouseDetail.productionProcess.name}`
                : '',
            hierarchyGroups: warehouseDetail.hierarchyGroups,
        });
    }, [warehouseDetail, form]);


    return (
        <Box sx={{margin: '20px'}} className="warehouse-registration-page">
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <WelcomeSection
                        title="창고 등록"
                        description={(
                            <Typography className="welcome-section-description">
                                창고 등록 페이지는 <span>회사의 창고 정보를 관리</span>하는 페이지로, 창고를 <span>추가, 수정, 삭제</span>할 수 있음.
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
                                <Typography variant="h6" sx={{padding: '20px'}}>창고 조회</Typography>
                                <Grid sx={{padding: '0px 20px 0px 20px'}}>
                                    <Table
                                        dataSource={warehouseList}
                                        columns={[
                                            {
                                                title: <div className="title-text">창고 코드</div>,
                                                dataIndex: 'code',
                                                key: 'code',
                                                align: 'center'
                                            },
                                            {
                                                title: <div className="title-text">창고 이름</div>,
                                                dataIndex: 'name',
                                                key: 'name',
                                                align: 'center'
                                            },
                                            {
                                                title: <div className="title-text">창고 유형</div>,
                                                dataIndex: 'warehouseType',
                                                key: 'warehouseType',
                                                align: 'center',
                                                render: (type) => (
                                                    <Tag color={type === 'WAREHOUSE' ? 'green' : 'blue'}>
                                                        {type === 'WAREHOUSE' ? '창고' : '공장'}
                                                    </Tag>
                                                ),
                                            },
                                            {
                                                title: <div className="title-text">생산공정명</div>,
                                                dataIndex: 'productionProcess',
                                                key: 'productionProcess',
                                                align: 'center'
                                            },
                                            {
                                                title: <div className="title-text">활성화 여부</div>,
                                                dataIndex: 'isActive',
                                                key: 'isActive',
                                                align: 'center',
                                                render: (isActive) => (
                                                    <Tag color={isActive ? 'green' : 'red'}>
                                                        {isActive ? '사용중' : '사용중단'}
                                                    </Tag>
                                                ),
                                            },
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
                                                    const response = await apiClient.post(LOGISTICS_API.WAREHOUSE_DETAIL_API(id));
                                                    console.log(response.data);
                                                    setWarehouseDetail(response.data);
                                                    setEditWarehouse(true);
                                                    notify('success', '품목 조회', '품목 정보 조회 성공.', 'bottomRight')
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
                    {editWarehouse && (
                        <Grid item xs={12} md={12} sx={{minWidth: '1000px !important', maxWidth: '1500px !important'}}>
                            <Grow in={true} timeout={200}>
                                <Paper elevation={3} sx={{height: '100%'}}>
                                    <Typography variant="h6" sx={{padding: '20px'}}>창고 상세 정보</Typography>
                                    <Grid sx={{padding: '0px 20px 0px 20px'}}>
                                        <Form
                                            initialValues={warehouseDetail}
                                            form={form}
                                            onFinish={(values) => {
                                                handleFormSubmit(values);
                                            }}
                                        >
                                            <Form.Item name="code">
                                                <Input placeholder="창고 코드" addonBefore="창고 코드"/>
                                            </Form.Item>
                                            <Form.Item name="name">
                                                <Input placeholder="창고 이름" addonBefore="창고 이름"/>
                                            </Form.Item>
                                            <Form.Item name="warehouseType">
                                                <Space.Compact>
                                                    <Input style={{
                                                        width: '30%',
                                                        backgroundColor: '#FAFAFA',
                                                        color: '#000',
                                                        textAlign: 'center'
                                                    }} defaultValue="창고유형"/>
                                                    <Select
                                                        style={{width: '60%'}}
                                                        value={warehouseDetail.warehouseType}
                                                        onChange={(value) => {
                                                            setWarehouseParam((prevState) => ({
                                                                ...prevState,
                                                                warehouseType: value
                                                            }))
                                                        }}
                                                    >
                                                        <Select.Option value="WAREHOUSE">창고</Select.Option>
                                                        <Select.Option value="FACTORY">공장</Select.Option>
                                                        <Select.Option value="OUTSOURCING_FACTORY">외주 공장</Select.Option>
                                                    </Select>
                                                </Space.Compact>
                                            </Form.Item>
                                            <Form.Item name="productionProcess">
                                                <Input
                                                    addonBefore="생산공정"
                                                    value={displayValues.productionProcessDisplay || ''}
                                                    onClick={() => handleInputClick('productionProcess')}
                                                    onFocus={(e) => e.target.blur()}
                                                    suffix={<DownSquareOutlined/>}
                                                />
                                            </Form.Item>
                                            <Form.Item name="hierarchyGroupName">
                                                <Input
                                                    addonBefore="계층그룹"
                                                    onClick={() => handleInputClick('hierarchyGroupName')} // 클릭 시 모달 표시
                                                    prefix={
                                                        displayValues.hierarchyGroups && displayValues.hierarchyGroups.map(group => (
                                                            <Tag key={group.id} color="blue" closable={false}>
                                                                [{group.code}] {group.name}
                                                            </Tag>
                                                        ))
                                                    }
                                                    onFocus={(e) => e.target.blur()}
                                                    suffix={<DownSquareOutlined/>}
                                                />
                                            </Form.Item>
                                            <Form.Item name="isActive" valuePropName="checked">
                                                <Checkbox>활성화 여부</Checkbox>
                                            </Form.Item>
                                            <Box sx={{
                                                display: 'flex',
                                                justifyContent: 'flex-end',
                                                marginBottom: '20px'
                                            }}>
                                                <Button type="primary" htmlType="submit">
                                                    저장
                                                </Button>
                                            </Box>
                                            <Modal
                                                open={isModalVisible}
                                                onCancel={handleModalCancel}
                                                width="40vw"
                                                footer={null}
                                            >
                                                {isLoading ? (
                                                    <Spin/>
                                                ) : (
                                                    <>
                                                        {currentField === 'productionProcess' && (
                                                            <>
                                                                <Typography id="modal-modal-title" variant="h6"
                                                                            component="h2" sx={{marginBottom: '20px'}}>
                                                                    생산공정 선택
                                                                </Typography>
                                                                <Input
                                                                    placeholder="검색"
                                                                    prefix={<SearchOutlined/>}
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
                                                                    style={{marginBottom: 16}}
                                                                />
                                                                {modalData && (
                                                                    <>
                                                                        <Table
                                                                            columns={[
                                                                                {
                                                                                    title: '코드',
                                                                                    dataIndex: 'code',
                                                                                    key: 'code',
                                                                                    align: 'center'
                                                                                },
                                                                                {
                                                                                    title: '이름',
                                                                                    dataIndex: 'name',
                                                                                    key: 'name',
                                                                                    align: 'center'
                                                                                }
                                                                            ]}
                                                                            dataSource={modalData}
                                                                            rowKey="id"
                                                                            size="small"
                                                                            pagination={{
                                                                                pageSize: 15,
                                                                                position: ['bottomCenter'],
                                                                                showSizeChanger: false
                                                                            }}
                                                                            onRow={(record) => ({
                                                                                style: {cursor: 'pointer'},
                                                                                onClick: () => handleModalSelect(record) // 선택 시 처리
                                                                            })}
                                                                        />
                                                                    </>
                                                                )}
                                                            </>
                                                        )}
                                                        {currentField === 'hierarchyGroupName' && (
                                                            <>
                                                                <Typography id="modal-modal-title" variant="h6"
                                                                            component="h2" sx={{marginBottom: '20px'}}>
                                                                    계층그룹 선택
                                                                </Typography>
                                                                <Input
                                                                    placeholder="검색"
                                                                    prefix={<SearchOutlined/>}
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
                                                                    style={{marginBottom: 16}}
                                                                />
                                                                {modalData && (
                                                                    <>

                                                                    </>
                                                                )}
                                                            </>
                                                        )}
                                                        <Box sx={{
                                                            mt: 2,
                                                            display: 'flex',
                                                            justifyContent: 'flex-end',
                                                            gap: 1
                                                        }}>
                                                            <Button onClick={handleModalCancel} variant="contained"
                                                                    type="danger" sx={{mr: 1}}>
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
;

export default WarehouseRegistrationPage;