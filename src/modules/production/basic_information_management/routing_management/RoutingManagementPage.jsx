import React, {useEffect, useMemo, useState} from 'react';
import { Paper, Box, Grid, Grow } from '@mui/material';
import WelcomeSection from '../../../../components/WelcomeSection.jsx';
import { processRoutingColumns, tabItems} from './RoutingManagementUtil.jsx';
import {Typography} from '@mui/material';
import { Space, Tag, Form, Table, Button, Col, Input, Row, Checkbox, Modal, DatePicker, Spin, Select, notification } from 'antd';
import TemporarySection from "../../../../components/TemporarySection.jsx";
import apiClient from "../../../../config/apiClient.jsx";
import {FINANCIAL_API, LOGISTICS_API, PRODUCTION_API} from "../../../../config/apiConstants.jsx";
import {useNotificationContext} from "../../../../config/NotificationContext.jsx";
import dayjs from 'dayjs';
import { Divider } from 'antd';
const { Option } = Select;
const { confirm } = Modal;

const RoutingManagementPage = () => {
    const [activeTabKey, setActiveTabKey] = useState('1');
    const [data, setData] = useState([]); // 원본데이터
    const [selectedRouting, setSelectedRouting] = useState(null);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [newRouting, setNewRouting] = useState({});
    const [isEditing, setIsEditing] = useState(false);
    const [processOptions, setProcessOptions] = useState([]);
    const [productOptions, setProductOptions] = useState([]); // 제품 옵션 상태


    const [filteredData, setFilteredData] = useState([]); // 필터링된 데이터
    const [searchText, setSearchText] = useState(''); // 검색어 상태
    const [activeColumn, setActiveColumn] = useState(null); // 검색 중인 컬럼 상태

    const notify = useNotificationContext(); // 알림 컨텍스트 사용
    const [form] = Form.useForm(); // 폼 인스턴스 생성
    const [registrationForm] = Form.useForm(); // 폼 인스턴스 생성
    const [selectedRowKeys, setSelectedRowKeys] = useState([]); // 선택된 행 키 상태
    const [editRouting, setEditRouting] = useState(false); // 거래처 등록 수정 탭 활성화 여부 상태
    const [fetchRoutingData, setFetchRoutingData] = useState(false); // 거래처 조회한 정보 상태
    const [isLoading, setIsLoading] = useState(false); // 로딩 상태
    const [currentField, setCurrentField] = useState(''); // 모달 분기 할 필드 상태
    const [modalData, setModalData] = useState(null); // 모달 데이터 상태
    const [displayValues, setDisplayValues] = useState({});

    // (공유) 검색 필터링 로직
    const handleFilter = (value, dataIndex) => {
        const filtered = data.filter((item) =>
            item[dataIndex] ? item[dataIndex].toString().toLowerCase().includes(value.toLowerCase()) : false
        );
        setFilteredData(filtered);
        setSearchText(value);
    };

    // 금액 포맷 함수
    const formatNumberWithComma = (value) => {
        if (!value) return '';
        const cleanValue = value.toString().replace(/[^\d]/g, ''); // 숫자 외의 모든 문자 제거
        return cleanValue.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    };

    // 콤마 제거 함수
    const removeComma = (value) => {
        return value ? value.toString().replace(/,/g, '') : value;
    };

    // 모달창 열기 핸들러
    const handleInputClick = (fieldName) => {
        setCurrentField(fieldName);
        setModalData(null); // 모달 열기 전에 데이터를 초기화
        fetchModalData(fieldName);  // 모달 데이터 가져오기 호출
        setIsModalVisible(true);  // 모달창 열기
    };

    // 모달창 닫기 핸들러
    const handleModalCancel = () => setIsModalVisible(false);

    // 공정 모달창 데이터 가져오기 함수
    const fetchModalData = async (fieldName) => {
        // 해당 필드에 맞는 데이터를 비동기적으로 가져오는 로직 추가
        if (fieldName === 'processDetails') {
            try {
                const response = await apiClient.get(PRODUCTION_API.PROCESS_DETAILS_API);
                setModalData(response.data);
            } catch (error) {
                console.error('Error fetching modal data:', error);
                notify('error', '조회 오류', '모달 데이터 조회 중 오류가 발생했습니다.', 'top');
            }
        }
    };

    // 모달창 선택 핸들러

    const handleRowClick = async (record) => {
        setSelectedRowKeys([record.id]);
        setEditRouting(true);
        setRoutingParam(record);
        form.setFieldsValue(record);
        notify('success', '경로 조회', '공정 경로 정보 조회에 성공했습니다.', 'bottomRight');
    };

    // 폼 제출 핸들러
    const handleFormSubmit = async (values, type) => {
        confirm({
            title: '저장 확인',
            content: '정말로 저장하시겠습니까?',
            okText: '확인',
            cancelText: '취소',
            onOk: async () => {
                values.id = routingParam.id;

                // try {
                //     const API_PATH : type === 'update' ? PRODUCTION_API.ROUTING_UPDATE_API : PRODUCTION_API.ROUTING_CREATE_API;
                //     const response = await apiClient.post(API_PATH, values);
                //     const updatedData = response.data;
                //     setRoutingList(prevRoutingList => [...prevRoutingList, ...prevRoutingList]);
                //
                // } catch (error) {
                //     notify('error', '저장 실패', '데이터 저장 중 오류가 발생했습니다.', 'top');
                // }
            },
            onCancel() {
                notification.warning({
                    message: '저장 취소',
                    description: '저장이 취소되었습니다.',
                    placement: 'bottomLeft',
                });
            },

        })
    }


    // 1. ProcessRouting 전체 조회
    useEffect(() => {
        const fetchProcessRoutings = async () => {
            setIsLoading(true);
            try {
                const response = await apiClient.post(PRODUCTION_API.ROUTING_LIST_API);
                const rawData = response.data;

                console.log('processOptions:', processOptions);
                console.log('productOptions:', productOptions);

                if (!Array.isArray(rawData)) {
                    throw new Error('API 응답이 배열이 아닙니다.');
                }

                const formattedData = rawData.map(routing => ({
                    id: routing.id,
                    code: routing.code,
                    name: routing.name,
                    description: routing.description,
                    isStandard: routing.isStandard,
                    isActive: routing.isActive,
                    routingSteps: routing.routingStepDTOList.map(step => {
                        const process = processOptions.find(p => p.id === step.id.processId);
                        return {
                            stepOrder: step.stepOrder, // 공정순서
                            processId: step.id.processId, // 공정ID
                            processName: process ? process.name : '알 수 없는 공정',
                        };
                    }),
                    products: routing.products.map(product => {
                        const prod = productOptions.find(p => p.id === product.id);
                        return {
                            productId: product.id, // 품목ID
                            productName: prod ? prod.name : '알 수 없는 품목',
                        };
                    }),
                }));
                setData(formattedData);
            } catch (error) {
                console.error('Error fetching process routings:', error);
                notify('error', '조회 오류', '경로 목록을 불러오는 중 오류가 발생했습니다.', 'top');
            } finally {
                setIsLoading(false);
            }
        };

        // // processOptions와 productOptions가 모두 로드된 후에 fetchProcessRoutings를 호출
        // if (processOptions.length > 0 && productOptions.length > 0) {
        //     fetchProcessRoutings();
        // }
    }, [notify, processOptions, productOptions]);

    // 공정 목록 가져오기
    useEffect(() => {
        const fetchProcesses = async () => {
            try {
                const response = await apiClient.get(PRODUCTION_API.PROCESS_LIST_API); // 공정 목록 API 엔드포인트
                setProcessOptions(response.data);
            } catch (error) {
                console.error('Error fetching processes:', error);
                notify('error', '조회 오류', '공정 목록을 불러오는 중 오류가 발생했습니다.', 'top');
            }
        };

        fetchProcesses();
    }, [notify]);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await apiClient.get(LOGISTICS_API.PRODUCT_LIST_API); // 제품 목록 API 엔드포인트
                setProductOptions(response.data); // [{ id: 1, name: '제품 A' }, { id: 2, name: '제품 B' }, ...]
            } catch (error) {
                console.error('Error fetching products:', error);
                notify('error', '조회 오류', '제품 목록을 불러오는 중 오류가 발생했습니다.', 'top');
            }
        };

        fetchProducts();
    }, [notify]);

    // 2. ProcessRouting 생성
    const handleAddProcessRouting = async () => {
        try {
            await apiClient.post(PRODUCTION_API.ROUTING_CREATE_API, newRouting);
            notify('success', '조회 성공', '새 공정 경로가 성공적으로 추가되었습니다.', 'bottomLeft');
            setIsModalVisible(false);
            // 데이터 새로고침
            const response = await apiClient.post(PRODUCTION_API.ROUTING_LIST_API);
            setData(response.data);
        } catch (error) {
            console.error('Error adding process routing:', error);
            notify('error', '등록 실패', '새 공정 경로 추가 중 오류가 발생했습니다.', 'top');
        }
    };

    // 3. ProcessRouting 수정
    const handleEditProcessRouting = async () => {
        try {
            await apiClient.post(PRODUCTION_API.ROUTING_UPDATE_API(selectedRouting.id), newRouting);
            message.success('공정 경로가 성공적으로 수정되었습니다.');
            setIsModalVisible(false);
            // 데이터 새로고침
            const response = await apiClient.post(PRODUCTION_API.ROUTING_LIST_API);
            setData(response.data);
        } catch (error) {
            console.error('Error updating process routing:', error);
            message.error('공정 경로 수정 중 오류가 발생했습니다.');
        }
    };

    // 4. ProcessRouting 삭제
    // 삭제 핸들러
    const handleDelete = (id) => {
        confirm({
            title: '삭제 확인',
            content: '정말로 삭제하시겠습니까?',
            okText: '확인',
            cancelText: '취소',
            onOk: async () => {
                setIsLoading(true);
                try {
                    await apiClient.post(PRODUCTION_API.ROUTING_DELETE_API(id));
                    notify('success', '삭제 성공', '공정 경로가 성공적으로 삭제되었습니다.', 'bottomLeft');
                    refreshProcessRoutings();
                } catch (error) {
                    console.error('Error deleting process routing:', error);
                    notify('error', '삭제 실패', '공정 경로 삭제 중 오류가 발생했습니다.', 'top');
                } finally {
                    setIsLoading(false);
                }
            },
        });
    };

    // 5. 공정검색 기능
    const handleSearchProcessDetails = async (keyword) => {
        try {
            const response = await apiClient.post(PRODUCTION_API.ROUTING_SEARCH_PROCESS_DETAILS_API, { keyword });
            setData(response.data);
            notify('success', '조회 성공', '공정이 성공적으로 조회되었습니다.', 'bottomLeft');

        } catch (error) {
            console.error('Error searching process details:', error);
            notify('error', '조회 실패', '검색 중 오류가 발생했습니다.');
        }
    };

    // 6. Modal 열기/닫기
    const handleOpenModal = (record) => {
        setSelectedRouting(record);
        setIsEditing(!!record); // 기록이 있으면 수정 모드, 아니면 생성 모드
        setNewRouting(record || {}); // 수정 시 기존 값 사용, 생성 시 빈 값
        setIsModalVisible(true);
    };
    const handleCloseModal = () => setIsModalVisible(false);

    // 7. Input 값 변경 처리
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        console.log("Input Change - Name:", name, "Value:", value); // 로그로 입력 값 확인
        setNewRouting({ ...newRouting, [name]: value });
    };

    // 데이터 새로고침 함수
    const refreshProcessRoutings = async () => {
        setIsLoading(true);
        try {
            const response = await apiClient.post(PRODUCTION_API.ROUTING_LIST_API);
            const rawData = response.data;

            if (!Array.isArray(rawData)) {
                throw new Error('API 응답이 배열이 아닙니다.');
            }

            const formattedData = rawData.map(routing => ({
                id: routing.id,
                code: routing.code,
                name: routing.name,
                description: routing.description,
                isStandard: routing.isStandard,
                isActive: routing.isActive,
                routingSteps: routing.routingSteps.map(step => ({
                    stepOrder: step.stepOrder,
                    processRoutingId: step.processRoutingId,
                    processId: step.processId,
                    processName: step.processName, // 공정 이름 추가
                }))
            }));
            setData(formattedData);
        } catch (error) {
            console.error('Error refreshing process routings:', error);
            notify('error', '새로고침 오류', '데이터 새로고침 중 오류가 발생했습니다.', 'top');
        } finally {
            setIsLoading(false);
        }
    };

    const handleTabChange = (key) => {
        setActiveTabKey(key);
        // 탭 변경 시 값 초기화
    };

    return (
        <Box sx={{ margin: '20px' }}>
            <Grid container spacing={3}>
                <Grid item xs={12} md={12}>
                    <WelcomeSection
                        title="Routing 관리"
                        description={(
                            <Typography>
                                Routing 관리 페이지는 <span>제품 생산에 필요한 공정 흐름을 관리</span>하는 곳임. 각 제품의 생산 과정을 <span>효율적으로 연결</span>하고, <span>공정 순서</span>를 최적화하여 생산 속도를 높일 수 있음. <br/>
                                이 페이지에서는 <span>Routing 경로를 설정, 수정, 삭제</span>할 수 있으며, <span>각 공정의 순서와 의존성</span>을 관리할 수 있음.
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
                            <Paper elevation={3} sx={{ height: '100%' }}>
                                <Typography variant="h6" sx={{ padding: '20px' }} >Routing 목록</Typography>
                                <Grid sx={{ padding: '0px 20px 0px 20px' }}>
                                    {/* ProcessRouting 목록 */}
                                    <Table
                                        dataSource={Array.isArray(filteredData) && filteredData.length > 0 ? filteredData : data} // 검색 필터링 된 데이터 사용
                                        columns={processRoutingColumns(activeColumn, searchText, setActiveColumn, handleFilter)} // 검색 필터링 상태와 함수 전달
                                        rowKey="id"
                                        pagination={{ pageSize: 15, position: ['bottomCenter'], showSizeChanger: false }}
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
                                                    const response = await apiClient.post(PRODUCTION_API.ROUTING_DETAIL_API(id));
                                                    setFetchRoutingData(response.data);
                                                    setEditRouting(true);

                                                    notify('success', '경로 조회', '경로 정보 조회 성공.', 'bottomRight')
                                                } catch (error) {
                                                    notify('error', '조회 오류', '경로 조회 중 오류가 발생했습니다.', 'top');
                                                }
                                            },
                                        })}
                                        expandable={{
                                            expandedRowRender: (record) => (
                                                <div>
                                                    <Typography variant="subtitle1">라우팅 단계별 공정</Typography>
                                                    <Table
                                                        dataSource={record.routingSteps}
                                                        columns={[
                                                            { title: '순서', dataIndex: 'stepOrder', key: 'stepOrder' },
                                                            { title: '공정 이름', dataIndex: 'processName', key: 'processName' },
                                                        ]}
                                                        pagination={false}
                                                        rowKey={(item) => item.stepOrder}
                                                        size="small"
                                                    />
                                                    <Typography variant="subtitle1" style={{ marginTop: '20px' }}>연결된 제품</Typography>
                                                    <Table
                                                        dataSource={record.products}
                                                        columns={[
                                                            { title: '제품 ID', dataIndex: 'productId', key: 'productId' },
                                                            { title: '제품 이름', dataIndex: 'productName', key: 'productName' }, // 제품 이름 추가
                                                        ]}
                                                        pagination={false}
                                                        rowKey={(item) => item.productId}
                                                        size="small"
                                                    />
                                                </div>
                                            ),
                                            rowExpandable: record => record.routingSteps.length > 0 || record.products.length > 0,
                                        }}
                                    />
                                </Grid>
                            </Paper>
                        </Grow>
                    </Grid>
                </Grid>
            )}

            {activeTabKey === '2' && (
                <Grid sx={{ padding: '0px 20px 0px 20px' }} container spacing={3}>
                    <Grid item xs={12} md={5} sx={{ minWidth: '500px !important', maxWidth: '1500px !important' }}>
                        <Grow in={true} timeout={200}>
                            <Paper elevation={3} sx={{ height: '100%' }}>
                                <Typography variant="h6" sx={{ padding: '20px' }}>Routing 등록</Typography>
                                    <Grid sx={{ padding: '0px 20px 0px 20px' }}>
                                        <Form
                                            layout="vertical"
                                            onFinish={(values) => { handleFormSubmit(values, 'register') }}
                                            form={registrationForm}
                                        >
                                            <Row gutter={16}>
                                                <Col span={6}>
                                                    <Form.Item name="code" rules={[{ required: true, message: 'Routing 코드를 입력하세요.' }]}>
                                                        <Input addonBefore="코드" />
                                                    </Form.Item>
                                                </Col>
                                                <Col span={6}>
                                                    <Form.Item name="name" rules={[{ required: true, message: 'Routing 이름을 입력하세요.' }]}>
                                                        <Input addonBefore="이름" maxLength={12} onChange={(e) => registrationForm.setFieldValue('name')} />
                                                    </Form.Item>
                                                </Col>
                                                <Col span={12}>
                                                    <Form.Item name="description" rules={[{ required: false }]}>
                                                        <Input addonBefore="설명" maxLength={14} onChange={(e) => registrationForm.setFieldValue('description')} />
                                                    </Form.Item>
                                                </Col>
                                                <Col span={6}>
                                                    <Form.Item name="isStandard" rules={[{ required: true, message: '표준 여부를 선택하세요.' }]}>
                                                        <Checkbox>표준 여부</Checkbox>
                                                    </Form.Item>
                                                </Col>
                                                <Col span={6}>
                                                    <Form.Item name="isActive" rules={[{ required: true, message: '사용 여부를 선택하세요.' }]}>
                                                        <Checkbox>사용 여부</Checkbox>
                                                    </Form.Item>
                                                </Col>

                                                {/*    공정별 단계 등록 */}
                                                {/* 공정 단계 추가 */}
                                                <Form.List name="routingSteps">
                                                    {(fields, { add, remove }) => (
                                                        <>
                                                            <Typography variant="h6" gutterBottom>
                                                                공정 단계
                                                            </Typography>
                                                            {fields.map(({ key, name, fieldKey, ...restField }) => (
                                                                <Row gutter={16} key={key} align="middle">
                                                                    <Col span={6}>
                                                                        <Form.Item
                                                                            {...restField}
                                                                            name={[name, 'stepOrder']}
                                                                            fieldKey={[fieldKey, 'stepOrder']}
                                                                            label="순서"
                                                                            rules={[{ required: true, message: '순서를 입력하세요.' }]}
                                                                        >
                                                                            <Input type="number" min={1} />
                                                                        </Form.Item>
                                                                    </Col>
                                                                    <Col span={12}>
                                                                        <Form.Item
                                                                            {...restField}
                                                                            name={[name, 'processId']}
                                                                            fieldKey={[fieldKey, 'processId']}
                                                                            label="공정"
                                                                            rules={[{ required: true, message: '공정을 선택하세요.' }]}
                                                                        >
                                                                            <Select placeholder="공정을 선택하세요">
                                                                                {processOptions.map((process) => (
                                                                                    <Option key={process.id} value={process.id}>
                                                                                        {process.name}
                                                                                    </Option>
                                                                                ))}
                                                                            </Select>
                                                                        </Form.Item>
                                                                    </Col>
                                                                    <Col span={6}>
                                                                        <Button
                                                                            type="danger"
                                                                            onClick={() => remove(name)}
                                                                            style={{ marginTop: '40px' }}
                                                                        >
                                                                            삭제
                                                                        </Button>
                                                                    </Col>
                                                                </Row>
                                                            ))}
                                                            <Form.Item>
                                                                <Button type="dashed" onClick={() => add()} block>
                                                                    공정 단계 추가
                                                                </Button>
                                                            </Form.Item>
                                                        </>
                                                    )}
                                                </Form.List>

                                            </Row>
                                            {/* 저장 버튼 */}
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
                                            >{isLoading ? (
                                                <Spin />
                                            ) : (
                                                <>
                                                    {currentField === 'processDetails' && (
                                                      <>
                                                          <Typography>
                                                              공정 선택
                                                          </Typography>
                                                          {modalData && (
                                                              <Table
                                                                  columns={[
                                                                      { title: '코드', dataIndex: 'code', key: 'code', align:'center' },
                                                                      { title: '이름', dataIndex: 'name', key: 'name', align:'center' },
                                                                  ]}
                                                                  dataSource={modalData}
                                                                  rowKey={"code"}
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
                                                    {currentField === 'processDetails' && (
                                                        <>
                                                            <Typography id="modal-modal-title" variant="h6" component="h2" sx={{ marginBottom: '20px' }}>
                                                                단계 선택
                                                            </Typography>
                                                        </>
                                                    )}
                                                    {currentField === 'processDetails' && (
                                                        <>
                                                            <Typography id="modal-modal-title" variant="h6" component="h2" sx={{ marginBottom: '20px' }}>
                                                                관련품목 선택
                                                            </Typography>

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
                </Grid>
            )}

        </Box>
    );
};

export default RoutingManagementPage;