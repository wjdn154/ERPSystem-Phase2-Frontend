import React, {useEffect, useState} from 'react';
import { ActionButtons, showDeleteConfirm } from '../../../common/commonActions.jsx';  // 공통 버튼 및 다이얼로그
import {Box, Grid, Grow, Paper} from '@mui/material';
import { Typography } from '@mui/material';
import {
    Space,
    Tag,
    Form,
    Table,
    Button,
    Col,
    Input,
    Row,
    Checkbox,
    Modal,
    DatePicker,
    Spin,
    Select,
    notification,
    Divider
} from 'antd';
import {useNotificationContext} from "../../../../../config/NotificationContext.jsx";
import { LOGISTICS_API, PRODUCTION_API } from "../../../../../config/apiConstants.jsx";
import apiClient from "../../../../../config/apiClient.jsx";
import {DownSquareOutlined, SearchOutlined} from "@ant-design/icons";
import {fetchWorkcenter} from "../WorkcenterApi.jsx";
const SelectedWorkcenterSection = ({
                                     workcenter,
                                     handleInputChange,
                                     handleSave,
                                     handleDeleteWorkcenter,
                                       handleWorkcenterTypeChange,
                                   }) => {

    const notify = useNotificationContext(); // 알림 컨텍스트 사용
    const [form] = Form.useForm(); // 폼 인스턴스 생성
    const [registrationForm] = Form.useForm(); // 폼 인스턴스 생성
    const [currentField, setCurrentField] = useState(''); // 모달 분기 할 필드 상태
    const [modalData, setModalData] = useState(null); // 모달 데이터 상태
    const [initialModalData, setInitialModalData] = useState(null);
    const [isModalVisible, setIsModalVisible] = useState(false); // 모달 활성화 여부 상태
    const [displayValues, setDisplayValues] = useState({
        factory: '',
        process: '',
        equipment: '',
    });
    const [isLoading, setIsLoading] = useState(false); // 로딩 상태
    const [fetchWorkcenterData, setFetchWorkcenterData] = useState(false); // 거래처 조회한 정보 상태
    const [workcenterParam, setWorkcenterParam] = useState(false); // 수정 할 거래처 정보 상태
    const [workerAssignments, setWorkerAssignments] = useState([]); // 초기값 빈 배열


    // selected 로
    useEffect(() => {
        const fetchWorkcenterData = async () => {
            if (!workcenter) return;

            try {
                const fetchedWorkcenter = await fetchWorkcenter(workcenter.code); // API 호출 후 데이터 가져오기
                console.log('가져온 작업장 데이터:', fetchedWorkcenter);

                // 폼 필드에 값 설정
                form.setFieldsValue(fetchedWorkcenter);

                // 선택된 작업장 정보를 상태에 저장
                setWorkcenterParam(fetchedWorkcenter);

                // 표시할 값 설정
                setDisplayValues({
                    workcenterType: fetchedWorkcenter.workcenterType || '미등록',  // 작업장 유형

                    factory: fetchedWorkcenter.factoryCode && fetchedWorkcenter.factoryName
                        ? `[${String(fetchedWorkcenter.factoryCode).padStart(5, '0')}] ${fetchedWorkcenter.factoryName}`
                        : '미등록',  // 공정 정보
                    process: fetchedWorkcenter.processCode && fetchedWorkcenter.processName
                        ? `[${String(fetchedWorkcenter.processCode).padStart(5, '0')}] ${fetchedWorkcenter.processName}`
                        : '미등록',  // 공정 정보

                    // 설비 정보가 여러 개일 경우 쉼표로 구분해서 표시
                    equipment: fetchedWorkcenter.equipmentNames && fetchedWorkcenter.equipmentNames.length > 0
                        ? fetchedWorkcenter.equipmentNames.join(', ')
                        : '미등록',

                    // 모델명도 여러 개일 경우 쉼표로 구분해서 표시
                    models: fetchedWorkcenter.modelNames && fetchedWorkcenter.modelNames.length > 0
                        ? fetchedWorkcenter.modelNames.join(', ')
                        : '미등록',

                    // 오늘 작업자 수와 작업자 이름들을 처리
                    todayWorkerCount: fetchedWorkcenter.todayWorkerCount || '0명',
                    todayWorkers: fetchedWorkcenter.todayWorkers && fetchedWorkcenter.todayWorkers.length > 0
                        ? fetchedWorkcenter.todayWorkers.join(', ')
                        : '배정된 작업자 없음',
                });
            } catch (error) {
                console.error('작업장 데이터 가져오기 실패:', error);
            }
        };

        fetchWorkcenterData(); // 비동기 데이터 호출 함수 실행
    }, [workcenter, form]);

    const fetchWorkerAssignments = async (workcenterCode) => {
        try {
            const response = await apiClient.post(PRODUCTION_API.WORKER_ASSIGNMENT_WORKCENTER_DETAIL_API(workcenterCode));

            if (response.status === 200) {
                setWorkerAssignments(response.data);
            } else {
                console.warn('fetchWorkerAssignments API 응답 오류: ', response.data);
                setWorkerAssignments([]); // 비정상 응답 시 빈 배열 설정
            }

        } catch (error) {
            console.error('작업장별 작업자 배정 조회 오류:', error);
            notify('error', '조회 오류', '데이터 조회 중 오류가 발생했습니다.', 'top');
            setWorkerAssignments([]); // 오류 발생 시 빈 배열 설정

        }
    }

    // 작업장 코드가 변경될 때마다 작업자 배정 데이터 가져오기
    useEffect(() => {
        if (workcenter && workcenter.code) {
            fetchWorkerAssignments(workcenter.code); // 작업장 코드로 데이터 로드
        }
    }, [workcenter]);

    useEffect(() => {
        console.log('workerAssignments 상태:', workerAssignments);
    }, [workerAssignments]);



    // 모달창 선택 핸들러
    const handleModalSelect = (record) => {
        let updatedDisplayValues = { ...displayValues };

        // 모달 창 마다가 formattedvalue, setclient param 설정 값이 다름
        switch (currentField) {
            case 'factory':
                setWorkcenterParam((prevParams) => ({
                    ...prevParams,
                    factory: {
                        id: record.id,
                        code: record.code,
                        name: record.name,
                    },
                }));
                setDisplayValues((prevValues) => ({
                    ...prevValues,
                    factory: `[${record.code.toString().padStart(5, '0')}] ${record.name}`,
                }));
                form.setFieldsValue({ factoryName: record.name });
                break;
            case 'process':
                setWorkcenterParam((prevParams) => ({
                    ...prevParams,
                    process: {
                        id: record.id,
                        code: record.code,
                        name: record.name,
                    },
                }));
                setDisplayValues((prevValues) => ({
                    ...prevValues,
                    process: `[${record.code.toString().padStart(5, '0')}] ${record.name}`,
                }));
                form.setFieldsValue({ processName: record.name });
                break;
            case 'equipment':
                setWorkcenterParam((prevParams) => ({
                    ...prevParams,
                    equipment: {
                        id: record.id,
                        equipmentNum: record.equipmentNum,
                        equipmentName: record.equipmentName,
                        modelName: record.modelName,
                    },
                }));
                setDisplayValues((prevValues) => ({
                    ...prevValues,
                    equipment: `[${record.equipmentNum.toString().padStart(5, '0')}] ${record.equipmentName}`,
                }));
                form.setFieldsValue({ equipmentName: `[${record.equipmentNum.toString().padStart(5, '0')}] ${record.equipmentName}`,});
                break;
        }
        setDisplayValues(updatedDisplayValues); // 상태 업데이트

        // 모달창 닫기
        setIsModalVisible(false);
    };

    // 모달창 열기 핸들러
    const handleInputClick = (fieldName) => {
        setCurrentField(fieldName);
        setModalData(null);
        setInitialModalData(null);
        fetchModalData(fieldName);  // 모달 데이터 가져오기 호출
        setIsModalVisible(true);  // 모달창 열기
    };

    // 모달창 닫기 핸들러
    const handleModalCancel = () => setIsModalVisible(false);

    // 모달창 데이터 가져오기 함수
    const fetchModalData = async (fieldName) => {
        setIsLoading(true);
        let apiPath;
        if (fieldName === 'factory') apiPath = LOGISTICS_API.WAREHOUSE_LIST_API;
        // if(fieldName === 'process') apiPath = PRODUCTION_API.SEARCH_FACTORIES_API;
        if(fieldName === 'process') apiPath = PRODUCTION_API.PROCESS_LIST_API;
        if(fieldName === 'equipment') apiPath = PRODUCTION_API.EQUIPMENT_DATA_API;

        try {
            const response = await apiClient.post(apiPath);
            console.log('API 응답 데이터:', response.data);  // 응답 데이터 확인

            let resultData;
            // 공장 데이터만 필터링 적용
            if (fieldName === 'factory') {
                resultData = response.data.filter(
                    (item) => item.warehouseType === 'FACTORY' || item.warehouseType === 'OUTSOURCING_FACTORY'
                );
            }

            console.log('최종 데이터:', resultData);  // 최종 데이터 확인


            setModalData(resultData);
            setInitialModalData(resultData);

        } catch (error) {
            notify('error', '조회 오류', '데이터 조회 중 오류가 발생했습니다.', 'top');
            console.error('공장 데이터 조회 실패:', error);

        } finally {
            setIsLoading(false);
        }
    };

    // 삭제 확인 다이얼로그 호출
  const handleDelete = () => {
    showDeleteConfirm(
        '이 작업은 되돌릴 수 없습니다. 정말로 삭제하시겠습니까?',
        () => handleDeleteWorkcenter(workcenter.code)
    );
  };

  return (
      <Grid item xs={12} md={12} sx={{ minWidth: '1000px !important', maxWidth: '1200px !important' }}>
          <Grow in={true} timeout={200}>
              <Paper elevation={3} sx={{ height: '100%' }}>
                  <Typography variant="h6" sx={{ padding: '20px' }} >작업장 등록 및 수정</Typography>
                  <Grid sx={{ padding: '0px 20px 0px 20px' }}>
                    <Form
                        initialValues={workcenter}
                        form={form}
                        // onFinish={(values) => { handleFormSubmit(values, 'update') }}
                        onFinish={(values) => {
                            console.log('Form 제출 값:', values);  // 폼 데이터 확인
                            handleFormSubmit(values, 'update');
                        }}
                    >
                        <Row gutter={16}>
                            <Col span={5}>
                                <Form.Item name="code" rules={[{ required: true, message: '작업장 코드를 입력하세요.' }]}>
                                    <Input addonBefore="작업장 코드"/>
                                </Form.Item>
                            </Col>
                            <Col span={5}>
                                <Form.Item name="name" rules={[{ required: true, message: '작업장 이름을 입력하세요.' }]}>
                                    <Input addonBefore="작업장명" />
                                </Form.Item>
                            </Col>
                            <Col span={5}>
                                <Form.Item name="workcenterType" rules={[{ required: true, message: '작업장 유형을 선택하세요.' }]}>
                                    <Space.Compact>
                                        <Input style={{ width: '40%', backgroundColor: '#FAFAFA', color: '#000', textAlign: 'center' }} defaultValue="작업장유형" disabled />
                                        <Select
                                            name="workcenterType"
                                            style={{ width: '60%' }}
                                            value={workcenterParam.workcenterType}
                                            onChange={(value) => {
                                                setWorkcenterParam((prevState) => ({
                                                    ...prevState,
                                                    workcenterType: value,
                                                }));
                                            }}
                                        >
                                            <Select.Option value="Press">프레스</Select.Option>
                                            <Select.Option value="Welding">용접</Select.Option>
                                            <Select.Option value="Paint">도장</Select.Option>
                                            <Select.Option value="Machining">정밀 가공</Select.Option>
                                            <Select.Option value="Assembly">조립</Select.Option>
                                            <Select.Option value="Quality Inspection">품질 검사</Select.Option>
                                            <Select.Option value="Casting">주조</Select.Option>
                                            <Select.Option value="Forging">단조</Select.Option>
                                            <Select.Option value="Heat Treatment">열처리</Select.Option>
                                            <Select.Option value="Plastic Molding">플라스틱 성형</Select.Option>
                                        </Select>
                                    </Space.Compact>
                                </Form.Item>
                            </Col>
                            <Col span={5}>
                                <Form.Item name="isActive" valuePropName="checked">
                                    <Checkbox>작업장 활성화 여부</Checkbox>
                                </Form.Item>
                            </Col>
                        </Row>
                        {/* 공장, 생산공정, 설비 등록 (모달 선택) */}
                        <Row gutter={16}>
                            <Col span={5}>
                                <Form.Item name="factoryName">
                                    <Input
                                        addonBefore="공장"
                                        placeholder="공장 선택"
                                        onClick={() => handleInputClick('factory')}
                                        value={displayValues.factory}
                                        onFocus={(e) => e.target.blur()}
                                        suffix={<DownSquareOutlined />}
                                    />
                                </Form.Item>
                            </Col>
                            <Col span={5}>
                                <Form.Item
                                    name="processName"
                                >
                                    <Input
                                        addonBefore="생산공정"
                                        placeholder="생산공정 선택"
                                        onClick={() => handleInputClick('process')}
                                        value={displayValues.process}
                                        onFocus={(e) => e.target.blur()}
                                        suffix={<DownSquareOutlined />}
                                    />
                                </Form.Item>
                            </Col>
                            <Col span={5}>
                                <Form.Item
                                    name="equipment" // TODO setFieldValues 랑 통일시키기
                                >
                                    <Input
                                        addonBefore="설비"
                                        placeholder="설비 선택"
                                        onClick={() => handleInputClick('equipment')}
                                        value={displayValues.equipment}
                                        onFocus={(e) => e.target.blur()}
                                        suffix={<DownSquareOutlined />}
                                    />
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row gutter={16}>
                            <Col span={15}>
                                <Form.Item name="description">
                                    <Input addonBefore="설명" />
                                </Form.Item>
                            </Col>
                        </Row>
                        <Divider orientation={'left'} orientationMargin="0" style={{ marginTop: '0px', fontWeight: 600 }}>작업자배정</Divider>
                        <Row gutter={12}>
                            <Col span={15}>
                                <Form.Item>
                                    <Table
                                        dataSource={workerAssignments || []} // 안전하게 빈 배열로 설정
                                        columns={[
                                            {
                                                title: <div className="title-text">작업지시</div>,
                                                dataIndex: 'productionOrderName',
                                                key: 'productionOrderName',
                                                width: '30%',
                                                align: 'center',
                                                render: (text) => <div>{text}</div>,
                                            },
                                            {
                                                title: <div className="title-text">교대유형</div>,
                                                dataIndex: 'shiftTypeName',
                                                key: 'shiftTypeName',
                                                width: '15%',
                                                align: 'center',
                                                render: (text) => <div>{text}</div>,
                                            },
                                            {
                                                title: <div className="title-text">작업자(사번)</div>,
                                                dataIndex: 'workerName',
                                                key: 'workerName',
                                                width: '25%',
                                                align: 'center',
                                                render: (text, record) => (
                                                    <div>{text} ({record.employeeNumber})</div>
                                                ),
                                            },
                                            {
                                                title: <div className="title-text">배정일자</div>,
                                                dataIndex: 'assignmentDate',
                                                key: 'assignmentDate',
                                                width: '15%',
                                                align: 'center',
                                            },
                                    ]}></Table>
                                </Form.Item>
                            </Col>
                        </Row>
                        <Box sx={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '20px' }}>
                            <Button type="primary" htmlType="submit">
                            저장
                            </Button>
                            {/*<Button onClick={handleDelete} style={{ marginLeft: '10px' }} danger>*/}
                            {/*삭제*/}
                            {/*</Button>*/}
                        </Box>
                        {/* 모달창 */}
                        <Modal
                            open={isModalVisible}
                            onCancel={handleModalCancel}
                            width="40vw"
                            footer={null}
                        >{isLoading ? (
                            <Spin />  // 로딩 스피너
                        ) : (
                            <>
                                {currentField === 'process' && (
                                    <>
                                        <Typography id="modal-modal-title" variant="h6" component="h2" sx={{ marginBottom: '20px' }}>
                                            생산공정 선택
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
                                                    {
                                                        title: <div className="title-text">코드</div>,
                                                        dataIndex: 'code',
                                                        key: 'code',
                                                        align: 'center'
                                                    },
                                                    {
                                                        title: <div className="title-text">생산공정명</div>,
                                                        dataIndex: 'name',
                                                        key: 'name',
                                                        align: 'center'
                                                    },
                                                ]}
                                                dataSource={modalData}
                                                rowKey="code"
                                                size={'small'}
                                                pagination={{
                                                    pageSize: 15,
                                                    position: ['bottomCenter'],
                                                    showSizeChanger: false,
                                                    showTotal: (total) => `총 ${total}개`,
                                                }}
                                                onRow={(record) => ({
                                                    style: { cursor: 'pointer' },
                                                    onClick: () => handleModalSelect(record), // 선택 시 처리
                                                })}
                                            />
                                        )}
                                    </>
                                )}
                                {currentField === 'factory' && (
                                    <>
                                        <Typography id="modal-modal-title" variant="h6" component="h2" sx={{ marginBottom: '20px' }}>
                                            공장 선택
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
                                                            // (item.factory && item.factoryCode.toLowerCase().includes(value)) ||
                                                            // (item.factory && item.factoryName.toLowerCase().includes(value))

                                                            (item.factoryCode && item.code.toLowerCase().includes(value)) ||
                                                            (item.factoryName && item.name.toLowerCase().includes(value))
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
                                                    {
                                                        title: <div className="title-text">코드</div>,
                                                        dataIndex: 'factoryCode',
                                                        key: 'factoryCode',
                                                        align: 'center'
                                                    },
                                                    {
                                                        title: <div className="title-text">이름</div>,
                                                        key: 'factoryName',
                                                        align: 'center',
                                                    },
                                                ]}
                                                dataSource={modalData}
                                                rowKey="id"
                                                size={'small'}
                                                pagination={{
                                                    pageSize: 15,
                                                    position: ['bottomCenter'],
                                                    showSizeChanger: false,
                                                    showTotal: (total) => `총 ${total}개`,
                                                }}
                                                onRow={(record) => ({
                                                    style: { cursor: 'pointer' },
                                                    onClick: () => handleModalSelect(record), // 선택 시 처리
                                                })}
                                            />
                                        )}
                                    </>
                                )}
                                {currentField === 'equipment' && (
                                    <>
                                        <Typography id="modal-modal-title" variant="h6" component="h2" sx={{ marginBottom: '20px' }}>
                                            설비 선택
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
                                                            (item.equipmentNum && item.equipmentNum.toLowerCase().includes(value)) ||
                                                            (item.equipmentName && item.equipmentName.toLowerCase().includes(value)) ||
                                                            (item.modelName && item.modelName.toLowerCase().includes(value))
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
                                                    {
                                                        title: <div className="title-text">설비번호</div>,
                                                        dataIndex: 'equipmentNum',
                                                        key: 'equipmentNum',
                                                        align: 'center'
                                                    },
                                                    {
                                                        title: <div className="title-text">설비명</div>,
                                                        dataIndex: 'equipmentName',
                                                        key: 'equipmentName',
                                                        align: 'center'
                                                    },
                                                    {
                                                        title: <div className="title-text">모델명</div>,
                                                        dataIndex: 'modelName',
                                                        key: 'modelName',
                                                        align: 'center'
                                                    },
                                                ]}
                                                dataSource={modalData}
                                                rowKey={(record) => record.equipmentNum || record.id} // 고유 필드를 사용해 rowKey 설정
                                                size={'small'}
                                                pagination={{
                                                    pageSize: 15,
                                                    position: ['bottomCenter'],
                                                    showSizeChanger: false,
                                                    showTotal: (total) => `총 ${total}개`,
                                                }}
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
                    </Form>
                  </Grid>
              </Paper>
          </Grow>
      </Grid>

  );
};

export default SelectedWorkcenterSection;
