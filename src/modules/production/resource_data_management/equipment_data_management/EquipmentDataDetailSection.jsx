import React, {useState} from 'react';
import {Grid,Paper,Typography, Box}  from "@mui/material";
const { Option } = Select;
import {Form, Row, Col, Input, Button, Select, Modal, DatePicker, Divider, Space, Upload, Spin, Table} from 'antd';
import moment from 'moment';
import defaultImage from "../../../../assets/img/uploads/defaultImage.png";
import {SearchOutlined} from "@ant-design/icons";
import apiClient from "../../../../config/apiClient.jsx";
import {LOGISTICS_API, PRODUCTION_API} from "../../../../config/apiConstants.jsx";
import {useNotificationContext} from "../../../../config/NotificationContext.jsx";
import CloudUploadIcon from "@mui/icons-material/CloudUpload.js";

const EquipmentDataDetailSection = ({
                                        data,
                                        equipmentDataDetail,
                                        setEquipmentDataDetail,
                                        handleRowSelection,
                                        handleSelectedRow,
                                        handleInputChange,
                                        handleDelete,
                                        showModal,
                                        handleUpdateOk,
                                        handleUpdateCancel,
                                        isUpdateModalVisible,
                                        handleCostInput,
                                        handleUpdate
                                    }) => {
    const [selectedFile, setSelectedFile] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [currentField, setCurrentField] = useState('');
    const [modalData, setModalData] = useState(null);
    const [initialModalData, setInitialModalData] = useState(null);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [displayValues, setDisplayValues] = useState({});
    const notify = useNotificationContext(); // 알림 컨텍스트 사용

    const handleInputClick = (fieldName) => {
        setCurrentField(fieldName);
        setModalData(null);
        setInitialModalData(null);
        fetchModalData(fieldName);
        setIsModalVisible(true);
    };

    const handleModalCancel = () => {
        setIsModalVisible(false);
    };

    const fetchModalData = async (fieldName) => {
        setIsLoading(true);
        let apiPath;

        if(fieldName === 'workcenter') apiPath = PRODUCTION_API.WORKCENTER_LIST_API;
        if(fieldName === 'factory') apiPath = LOGISTICS_API.WAREHOUSE_LIST_API;

        try {
            const response = await apiClient.post(apiPath);
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
    };

    const handleModalSelect = (record) => {
        console.log('selected recod' , record);
        switch (currentField) {
            case 'workcenter':
                setEquipmentDataDetail((prevState) => ({
                    ...prevState,
                    workcenterCode: record.code,
                    workcenterName: record.name,
                }));
                setDisplayValues((prevValues) => ({
                    ...prevValues,
                    workcenter: `[${record.code}] ${record.name}`,
                }));
                break;
            case 'factory':
                setEquipmentDataDetail((prevState) => ({
                    ...prevState,
                    factoryCode: record.code,
                    factoryName: record.name,
                }));
                setDisplayValues((prevValues) => ({
                    ...prevValues,
                    factory: `[${record.code}] ${record.name}`,
                }));
                break;
        }
        setIsModalVisible(false);
    };

    return(
    <Paper elevation={3} sx={{p: 2}}>
        <Typography variant="h6" marginBottom={'20px'}>설비 상세 정보</Typography>
        <Box sx={{padding: '20px'}}>
            <Form layout="vertical">
                <Divider orientation={'left'} orientationMargin="0" style={{ marginTop: '0px', fontWeight: 600 }}>설비 정보</Divider>
                <Row gutter={16}>
                    <Col span={8}>
                        <Form.Item>
                            <Input
                                addonBefore="설비 번호"
                                value={equipmentDataDetail.equipmentNum}
                                onChange={(e) => handleInputChange(e, 'equipmentNum')}
                                readOnly
                            />
                        </Form.Item>
                    </Col>
                    <Col span={8}>
                        <Form.Item>
                            <Input
                                addonBefore="설비 명"
                                value={equipmentDataDetail.equipmentName}
                                onChange={(e) => handleInputChange(e, 'equipmentName')}
                            />
                        </Form.Item>
                    </Col>
                    <Col span={8}>
                        <Form.Item>
                            <Input
                                addonBefore="모델 명"
                                value={equipmentDataDetail.modelName}
                                onChange={(e) => handleInputChange(e, 'modelName')}
                            />
                        </Form.Item>
                    </Col>
                </Row>
                <Row gutter={16}>
                    <Col span={8}>
                        <Form.Item>
                            <Input
                                addonBefore="제조사"
                                value={equipmentDataDetail.manufacturer}
                                onChange={(e) => handleInputChange(e, 'equipmentName')}
                            />
                        </Form.Item>
                    </Col>
                    <Col span={8}>
                        <Form.Item>
                            <Input
                                addonBefore="구매 비용"
                                value={`${equipmentDataDetail.cost}원` || ''}
                                onChange={(e) => handleInputChange(e, 'cost')}
                            />
                        </Form.Item>
                    </Col>
                    <Col span={8}>
                        <Form.Item>
                            <Space.Compact>
                                <Input style={{ width: '30%', backgroundColor: '#FAFAFA', color: '#000', textAlign: 'center' }} defaultValue="유형" disabled />
                                <Select
                                    style={{ width: '70%' }}
                                    value={equipmentDataDetail.equipmentType}
                                    onChange={(value) =>
                                        handleInputChange({ target: { value: value } }, 'equipmentType')
                                    }
                                >
                                    <Option value={"ASSEMBLY"}>조립 설비</Option>
                                    <Option value={"MACHINING"}>가공 설비</Option>
                                    <Option value={"INSPECTION"}>검사 설비</Option>
                                    <Option value={"PACKAGING"}>포장 설비</Option>
                                </Select>
                            </Space.Compact>
                        </Form.Item>
                    </Col>
                </Row>
                <Row gutter={16}>
                    <Col span={8}>
                        <Form.Item>
                            <Input.Group compact>
                                <Input
                                    style={{ width: '30%' }}
                                    value="구매 날짜"
                                    readOnly
                                />
                                <DatePicker
                                    disabledDate={(current) => current && current.year() !== 2024}
                                    value={equipmentDataDetail.purchaseDate ? moment(equipmentDataDetail.purchaseDate, 'YYYY-MM-DD') : null}
                                    onChange={(date, dateString) => handleInputChange({ target: { value: dateString } }, 'purchaseDate')}
                                    format="YYYY-MM-DD"
                                    style={{ width: '70%' }}
                                />
                            </Input.Group>
                        </Form.Item>
                    </Col>
                    <Col span={8}>
                        <Input.Group compact>
                            <Input
                                style={{ width: '30%' }}
                                value="설치 날짜"
                                readOnly
                            />
                            <DatePicker
                                disabledDate={(current) => current && current.year() !== 2024}
                                value={equipmentDataDetail.installDate ? moment(equipmentDataDetail.installDate, 'YYYY-MM-DD') : null}
                                onChange={(date, dateString) => handleInputChange({ target: { value: dateString } }, 'installDate')}
                                format="YYYY-MM-DD"
                                style={{ width: '70%' }}
                            />
                        </Input.Group>
                    </Col>
                    <Col span={8}>
                        <Space.Compact>
                            <Input style={{ width: '35%', backgroundColor: '#FAFAFA', color: '#000', textAlign: 'center' }} defaultValue="가동 상태" disabled />
                            <Select
                                style={{ width: '65%' }}
                                value={equipmentDataDetail.operationStatus}
                                onChange={(value) =>
                                    handleInputChange({ target: { value: value } }, 'operationStatus')
                                }
                            >
                                <Option value={"BEFORE_OPERATION"}>가동 전</Option>
                                <Option value={"OPERATING"}>가동 중</Option>
                                <Option value={"MAINTENANCE"}>유지보수 중</Option>
                                <Option value={"FAILURE"}>고장</Option>
                                <Option value={"REPAIRING"}>수리 중</Option>
                            </Select>
                        </Space.Compact>
                    </Col>
                </Row>
                <Divider orientation={'left'} orientationMargin="0" style={{ marginTop: '0px', fontWeight: 600 }}>추가 정보</Divider>
                <Row gutter={16}>
                    <Col span={8}>
                        <Form.Item>
                            <Input
                                addonBefore="설치된 작업장"
                                value={equipmentDataDetail.workcenterName}
                                onClick={() => handleInputClick('workcenter')}
                            />
                        </Form.Item>
                    </Col>
                    <Col span={8}>
                        <Form.Item>
                            <Input
                                addonBefore="설치된 공장"
                                value={equipmentDataDetail.factoryName}
                                onClick={() => handleInputClick('factory')}
                            />
                        </Form.Item>
                    </Col>
                </Row>
                <Divider orientation={'left'} orientationMargin="0" style={{ marginTop: '0px', fontWeight: 600 }}>
                    이미지 업로드
                </Divider>
                <Row gutter={16}>
                    <Col span={12}>
                        <Form.Item label="설비 이미지">
                            {/* 이미지 미리보기 */}
                            <div style={{ marginBottom: '20px' }}>
                                <img
                                    src={selectedFile ? URL.createObjectURL(selectedFile) : defaultImage}
                                    alt="프로필 사진"
                                    style={{ width: '100px', height: '100px', objectFit: 'cover' }}
                                />
                            </div>
                            <Upload
                                beforeUpload={() => false} // 실제 업로드를 막기 위해 false 반환
                                onChange={(info) => {
                                    const file = info.fileList[info.fileList.length - 1]?.originFileObj; // fileList의 마지막 파일 객체 사용
                                    setSelectedFile(file); // 선택된 파일을 상태로 설정
                                }}
                                fileList={
                                    selectedFile
                                        ? [{ uid: '-1', name: selectedFile.name, status: 'done', url: selectedFile.url }]
                                        : []
                                } // 파일 리스트 설정
                            >
                                <Button icon={<CloudUploadIcon />}>파일 선택</Button>
                            </Upload>
                        </Form.Item>
                    </Col>
                </Row>

            </Form>
        </Box>
        <div style={{display: 'flex', justifyContent: 'flex-end', marginRight:'20px'}}>
            <Button onClick={handleUpdate} type="primary" style={{marginRight:'10px'}}>수정</Button>
            <Button onClick={handleDelete} type="danger">삭제</Button>
        </div>
        <Modal
            open={isModalVisible}
            onCancel={handleModalCancel}
            width="40vw"
            footer={null}
        >
            {isLoading ? (
                <Spin />  // 로딩 스피너
            ) : (
                <>
                    {/* 작업장 선택 모달 */}
                    {currentField === 'workcenter' && (
                        <>
                            <Typography id="modal-modal-title" variant="h6" component="h2" sx={{ marginBottom: '20px' }}>
                                작업장 선택
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
                                                (item.code && item.name.toString().toLowerCase().includes(value)) ||
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
                                        { title: '작업장 명', dataIndex: 'name', key: 'name', align: 'center' }
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
                                        onClick: () => handleModalSelect(record)
                                    })}
                                />
                            )}
                        </>
                    )}
                </>
            )}
            {/* 공장 선택 모달 */}
            {currentField === 'factory' && (
                <>
                    <Typography id="modal-modal-title" variant="h6" component="h2" sx={{ marginBottom: '20px' }}>
                        공장 선택
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
                                        (item.code && item.name.toString().toLowerCase().includes(value)) ||
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
                                { title: '이름', dataIndex: 'name', key: 'name', align: 'center' }
                            ]}
                            dataSource={modalData}
                            rowKey="id"
                            size="small"
                            pagination={{ pageSize: 15, position: ['bottomCenter'], showSizeChanger: false }}
                            onRow={(record) => ({
                                style: { cursor: 'pointer' },
                                onClick: () => handleModalSelect(record) // 선택 시 처리
                            })}
                        />
                    )}
                </>
            )}

        </Modal>
    </Paper>
)};


export default EquipmentDataDetailSection;