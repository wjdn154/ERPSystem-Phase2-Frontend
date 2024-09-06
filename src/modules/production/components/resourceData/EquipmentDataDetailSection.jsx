import React from 'react';
import {Grid,Paper,Typography, Box}  from "@mui/material";
const { Option } = Select;
import {Form, Row, Col, Input, Button, Select, Modal, DatePicker} from 'antd';
import moment from 'moment';

const EquipmentDataDetailSection = ({
                                        data,
                                        equipmentDataDetail,
                                        handleRowSelection,
                                        handleSelectedRow,
                                        handleInputChange,
                                        handleDelete,
                                        showModal,
                                        handleUpdateOk,
                                        handleUpdateCancel,
                                        isUpdateModalVisible,
                                        handleCostInput
                                    }) => (
    <Paper elevation={3} sx={{p: 2}}>
        <Typography variant="h6" marginBottom={'20px'}>설비 상세 정보</Typography>
        <Box sx={{padding: '20px'}}>
            <Form layout="vertical">
                <Row gutter={16}>
                    <Col span={24}>
                        <Form.Item>
                            <div style={{display: 'flex', alignItems: 'center'}}>
                                <Input value={"설치된 작업장"} style={{marginRight: '10px', flex: 1, backgroundColor: '#f6a6a6'}} readOnly/>
                                <Input value={equipmentDataDetail.workcenterName} style={{marginRight: '50px', flex: 1}} onChange={(e) => handleInputChange(e.target.value, 'workcenterName')} readOnly/>
                                <Input value={"설치된 공장"} style={{marginRight: '10px', flex: 1, backgroundColor: '#f6a6a6'}} readOnly/>
                                <Input value={equipmentDataDetail.factoryName} style={{flex: 1}} onChange={(e) => handleInputChange(e, 'factoryName')} readOnly/>
                            </div>
                            <div style={{display: 'flex', alignItems: 'center'}}>
                                <Input value={"설비 번호"} style={{marginRight: '10px', marginTop: '20px', flex: 0.29, backgroundColor: '#f6a6a6'}} readOnly/>
                                <Input value={equipmentDataDetail.equipmentNum} style={{marginTop: '20px', flex: 1, backgroundColor:'#F5F5F5'}} onChange={(e) => handleInputChange(e, 'equipmentNum')} readOnly/>
                            </div>
                            <div style={{display: 'flex', alignItems: 'center'}}>
                                <Input value={"설비 명"} style={{marginRight: '10px', marginTop: '20px', flex: 1, backgroundColor: '#f6a6a6'}} readOnly/>
                                <Input value={equipmentDataDetail.equipmentName} style={{marginRight: '50px', marginTop: '20px', flex: 1}} onChange={(e) => handleInputChange(e, 'equipmentName')} readOnly/>
                                <Input value={"모델 명"} style={{marginRight: '10px', marginTop: '20px', flex: 1, backgroundColor: '#f6a6a6'}} readOnly/>
                                <Input value={equipmentDataDetail.modelName} style={{marginTop: '20px', flex: 1}} onChange={(e) => handleInputChange(e, 'modelName')} readOnly/>
                            </div>
                            <div style={{display: 'flex', alignItems: 'center'}}>
                                <Input value={"유형"} style={{marginRight: '10px', marginTop: '20px', flex: 1, backgroundColor: '#f6a6a6'}} readOnly/>
                                <Input value={equipmentDataDetail.equipmentType} style={{marginRight: '50px',marginTop: '20px', flex: 1}} onChange={(e) => handleInputChange(e, 'equipmentType')} readOnly/>
                                <Input value={"제조사"} style={{marginRight: '10px', marginTop: '20px', flex: 1, backgroundColor: '#f6a6a6'}} readOnly/>
                                <Input value={equipmentDataDetail.manufacturer} style={{marginTop: '20px', flex: 1}} onChange={(e) => handleInputChange(e, 'manufacturer')} readOnly/>
                            </div>
                            <div style={{display: 'flex', alignItems: 'center'}}>
                                <Input value={"구매 날짜"} style={{marginRight: '10px', marginTop: '20px', flex: 1, backgroundColor: '#f6a6a6'}} readOnly/>
                                <Input value={equipmentDataDetail.purchaseDate} style={{marginRight: '50px', marginTop: '20px', flex: 1}} onChange={(e) => handleInputChange(e, 'purchaseDate')} readOnly/>
                                <Input value={"설치날짜"} style={{marginRight: '10px', marginTop: '20px', flex: 1, backgroundColor: '#f6a6a6'}} readOnly/>
                                <Input value={equipmentDataDetail.installDate} style={{marginTop: '20px', flex: 1}} onChange={(e) => handleInputChange(e, 'installDate')} readOnly/>
                            </div>
                            <div style={{display: 'flex', alignItems: 'center'}}>
                                <Input value={"가동 상태"} style={{marginRight: '10px', marginTop: '20px', flex: 1, backgroundColor: '#f6a6a6'}} readOnly/>
                                <Input value={equipmentDataDetail.operationStatus} style={{marginRight: '50px',marginTop: '20px', flex: 1}} onChange={(e) => handleInputChange(e, 'operationStatus')} readOnly/>
                                <Input value={"구매 비용"} style={{marginRight: '10px', marginTop: '20px', flex: 1, backgroundColor: '#f6a6a6'}} readOnly/>
                                <Input value={equipmentDataDetail.cost+'원'} style={{marginTop: '20px', flex: 1}} onChange={(e) => handleInputChange(e, 'cost')} readOnly/>
                            </div>
                            <div style={{display: 'flex', alignItems: 'center'}}>
                                <Input value={"설비 이미지"} style={{marginRight: '10px', marginTop: '20px', flex: 0.29, backgroundColor: '#f6a6a6'}} readOnly/>
                                <Input value={equipmentDataDetail.equipmentImg} style={{marginTop: '20px', flex: 1}} onChange={(e) => handleInputChange(e, 'equipmentImg')} readOnly/>
                            </div>
                        </Form.Item>
                    </Col>
                </Row>
            </Form>
        </Box>
        <div style={{display: 'flex', justifyContent: 'flex-end', marginRight:'20px'}}>
            <Button onClick={showModal} type="primary" style={{marginRight:'10px'}}>수정</Button>
            <Button onClick={handleDelete} type="danger">삭제</Button>
        </div>


        <Modal
            title="설비 정보 수정"
            open={isUpdateModalVisible}
            onOk={handleUpdateOk}
            onCancel={handleUpdateCancel}
            width={700} // 너비를 800px로 설정
        >

            <div style={{display: 'flex', alignItems: 'center'}}>
                <Input value={"설치된 작업장 코드"} style={{marginRight: '10px', flex: 1, backgroundColor: '#f6a6a6'}} readOnly/>
                <Input value={equipmentDataDetail.workcenterCode} style={{marginRight: '30px', flex: 1}}
                       onChange={(e) => handleInputChange(e, 'workcenterCode')}/>
                <Input value={"설치된 공장 코드"} style={{marginRight: '10px', flex: 1, backgroundColor: '#f6a6a6'}} readOnly/>
                <Input value={equipmentDataDetail.factoryCode} style={{flex: 1}}
                       onChange={(e) => handleInputChange(e, 'factoryCode')}/>
            </div>
            <div style={{display: 'flex', alignItems: 'center'}}>
                <Input value={"설비 번호"} style={{marginRight: '10px', marginTop: '20px', flex: 0.28, backgroundColor: '#f6a6a6'}} readOnly/>
                <Input value={equipmentDataDetail.equipmentNum} style={{marginTop: '20px', flex: 1}} onChange={(e) => handleInputChange(e, 'equipmentNum')}/>
            </div>
            <div style={{display: 'flex', alignItems: 'center'}}>
                <Input value={"설비 명"}
                       style={{marginRight: '10px', marginTop: '20px', flex: 1, backgroundColor: '#f6a6a6'}} readOnly/>
                <Input value={equipmentDataDetail.equipmentName} style={{marginRight: '30px', marginTop: '20px', flex: 1}} onChange={(e) => handleInputChange(e, 'equipmentName')}/>
                <Input value={"모델 명"}
                       style={{marginRight: '10px', marginTop: '20px', flex: 1, backgroundColor: '#f6a6a6'}} readOnly/>
                <Input value={equipmentDataDetail.modelName} style={{marginTop: '20px', flex: 1}} onChange={(e) => handleInputChange(e, 'modelName')}/>
            </div>
            <div style={{display: 'flex', alignItems: 'center'}}>
                <Input value={"설비 유형"} style={{marginRight: '10px', marginTop: '20px', flex: 1, backgroundColor: '#f6a6a6'}} readOnly/>
                    <Select value={equipmentDataDetail.equipmentType} onChange={(value) => handleInputChange({target: {value}}, 'equipmentType')}
                        style={{marginRight: '30px', marginTop: '20px', flex: 1.2}}
                    >
                        <Option value={"ASSEMBLY"}>조립 설비</Option>
                        <Option value={"MACHINING"}>가공 설비</Option>
                        <Option value={"INSPECTION"}>검사 설비</Option>
                        <Option value={"PACKAGING"}>포장 설비</Option>
                    </Select>
                <Input value={"제조사"} style={{marginRight: '10px', marginTop: '20px', flex: 1, backgroundColor: '#f6a6a6'}} readOnly/>
                <Input value={equipmentDataDetail.manufacturer} style={{marginTop: '20px', flex: 1}} onChange={(e) => handleInputChange(e, 'manufacturer')}/>
            </div>
            <div style={{display: 'flex', alignItems: 'center'}}>
                <Input value={"구매 날짜"} style={{marginRight: '10px', marginTop: '20px', flex: 1, backgroundColor: '#f6a6a6'}} readOnly/>
                <DatePicker
                    value={equipmentDataDetail?.purchaseDate ? moment(equipmentDataDetail.purchaseDate, 'YYYY-MM-DD') : null}
                    style={{ marginRight: '30px', marginTop: '20px', flex: 1 }}
                    onChange={(date, dateString) => handleInputChange({ target: { value: dateString } }, 'purchaseDate')}
                />
                <Input value={"설치날짜"}
                       style={{marginRight: '10px', marginTop: '20px', flex: 1, backgroundColor: '#f6a6a6'}} readOnly/>
                <DatePicker
                    value={equipmentDataDetail?.installDate ? moment(equipmentDataDetail.installDate, 'YYYY-MM-DD') : null}
                    onChange={(date, dateString) => handleInputChange({ target: { value: dateString } }, 'installDate')}
                    style={{ width: '100%',marginTop: '20px', flex: 1}}
                    />
            </div>
            <div style={{display: 'flex', alignItems: 'center'}}>
                <Input value={"가동 상태"}
                       style={{marginRight: '10px', marginTop: '20px', flex: 1, backgroundColor: '#f6a6a6'}} readOnly/>
                    <Select
                        value={equipmentDataDetail.operationStatus}
                        onChange={(value) => handleInputChange({target: {value}}, 'operationStatus')}
                        style={{marginRight: '30px', marginTop: '20px', flex: 1.2}}
                    >
                        <Option value={"BEFORE_OPERATION"}>가동 전</Option>
                        <Option value={"OPERATING"}>가동 중</Option>
                        <Option value={"MAINTENANCE"}>유지보수 중</Option>
                        <Option value={"FAILURE"}>고장</Option>
                        <Option value={"REPAIRING"}>수리 중</Option>
                    </Select>
                <Input value={"구매 비용"}
                       style={{marginRight: '10px', marginTop: '20px', flex: 1, backgroundColor: '#f6a6a6'}} readOnly/>
                <Input value={equipmentDataDetail.cost} style={{marginTop: '20px', flex: 1}}
                       onChange={(e) => handleInputChange(e, 'cost')}
                       onKeyPress={handleCostInput}/>
            </div>
            <div style={{display: 'flex', alignItems: 'center'}}>
                <Input value={"설비 이미지"}
                       style={{marginRight: '10px', marginTop: '20px', flex: 0.27, backgroundColor: '#f6a6a6'}}
                       readOnly/>
                <Input value={equipmentDataDetail.equipmentImg} style={{marginTop: '20px', flex: 1}}
                       onChange={(e) => handleInputChange(e, 'equipmentImg')}/>
            </div>
        </Modal>
    </Paper>
);


export default EquipmentDataDetailSection;