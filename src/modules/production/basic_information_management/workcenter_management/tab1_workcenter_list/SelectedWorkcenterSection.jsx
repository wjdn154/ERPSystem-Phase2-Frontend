import React, {useState} from 'react';
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
const SelectedWorkcenterSection = ({
                                     workcenter,
                                     handleInputChange,
                                     handleSave,
                                     handleDeleteWorkcenter,
                                       handleWorkcenterTypeChange,
                                       fetchWorkerAssignments,
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
        equipment: ''
    });
    const [isLoading, setIsLoading] = useState(false); // 로딩 상태
    const [fetchWorkcenterData, setFetchWorkcenterData] = useState(false); // 거래처 조회한 정보 상태
    const [workcenterParam, setWorkcenterParam] = useState(false); // 수정 할 거래처 정보 상태
    const [selectedRowKeys, setSelectedRowKeys] = useState([]); // 선택된 행 키 상태

    // 모달창 선택 핸들러
    const handleModalSelect = (record) => {

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
                break;
        }
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
        // if (fieldName === 'factory') apiPath = LOGISTICS_API.WAREHOUSE_LIST_API;
        if(fieldName === 'process') apiPath = PRODUCTION_API.SEARCH_FACTORIES_API;
        if(fieldName === 'process') apiPath = PRODUCTION_API.PROCESS_LIST_API;
        if(fieldName === 'equipment') apiPath = PRODUCTION_API.EQUIPMENT_DATA_API;

        try {
            const response = await apiClient.post(apiPath);
            setModalData(response.data);
            setInitialModalData(response.data);
            console.log('response.data', response.data);
        } catch (error) {
            notify('error', '조회 오류', '데이터 조회 중 오류가 발생했습니다.', 'top');
        } finally {
            setIsLoading(false);
        }
    };

    // 작업장 유형을 한국어로 매핑하는 함수
    const typeToKorean = {
        Press: '프레스',
        Welding: '용접',
        Paint: '도장',
        Machining: '정밀 가공',
        Assembly: '조립',
        'Quality Inspection': '품질 검사',
        Casting: '주조',
        Forging: '단조',
        'Heat Treatment': '열처리',
        'Plastic Molding': '플라스틱 성형'
    };

    // 작업장 유형을 영어로 매핑하는 함수 (드롭다운 선택 후 원래 값으로 되돌릴 때 사용)
    const koreanToType = {
        '프레스': 'Press',
        '용접': 'Welding',
        '도장': 'Paint',
        '정밀 가공': 'Machining',
        '조립': 'Assembly',
        '품질 검사': 'Quality Inspection',
        '주조': 'Casting',
        '단조': 'Forging',
        '열처리': 'Heat Treatment',
        '플라스틱 성형': 'Plastic Molding'
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
                        onClick={(values) => { handleFormSubmit(values, 'update') }}
                    >
                        <Row gutter={16}>
                            <Col span={5}>
                                <Form.Item name="code" rules={[{ required: true, message: '작업장 코드를 입력하세요.' }]}>
                                    <Input addonBefore="작업장 코드" />
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
                                            style={{ width: '60%' }}
                                            value={workcenterParam.workcenterType}
                                            onChange={(value) => {
                                                setWorkcenterParam((prevState) => ({
                                                    ...prevState,
                                                    workcenterType: value,
                                                }));
                                            }}
                                        >
                                            <Option value="Press">프레스</Option>
                                            <Option value="Welding">용접</Option>
                                            <Option value="Paint">도장</Option>
                                            <Option value="Machining">정밀 가공</Option>
                                            <Option value="Assembly">조립</Option>
                                            <Option value="Quality Inspection">품질 검사</Option>
                                            <Option value="Casting">주조</Option>
                                            <Option value="Forging">단조</Option>
                                            <Option value="Heat Treatment">열처리</Option>
                                            <Option value="Plastic Molding">플라스틱 성형</Option>
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
                                <Form.Item>
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
                                <Form.Item>
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
                                <Form.Item>
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
                                        dataSource={fetchWorkerAssignments.workers}
                                        columns={[
                                            {
                                                title: <div className="title-text">작업지시</div>,
                                                dataIndex: 'productionOrderName',
                                                key: 'productionOrderName',
                                                width: '25%',
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
                                    ]}></Table>
                                </Form.Item>
                            </Col>
                        </Row>
                        <Box sx={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '20px' }}>
                            <Button type="primary" htmlType="submit">
                            저장
                            </Button>
                            <Button onClick={handleDelete} style={{ marginLeft: '10px' }} danger>
                            삭제
                            </Button>
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
                                                            (item.factory && item.factoryCode.toLowerCase().includes(value)) ||
                                                            (item.factory && item.factoryName.toLowerCase().includes(value))
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
