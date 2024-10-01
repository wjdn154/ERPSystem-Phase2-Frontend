import React from 'react';
import {Grid,Paper,Typography, Box}  from "@mui/material";
const { Option } = Select;
import {Form, Row, Col, Input, Button, Select, Modal, DatePicker} from 'antd';
import moment from 'moment';

const MaintenanceHistoryDetailSection = ({
                                        data,
                                        maintenanceDataDetail,
                                        handleInputChange,
                                        handleDelete,
                                        showModal,
                                        handleUpdateOk,
                                        handleUpdateCancel,
                                        isUpdateModalVisible,
                                    }) => (
    <Paper elevation={3} sx={{p: 2}}>
        <Typography variant="h6" marginBottom={'20px'}>설비 유지보수 상세 정보</Typography>
        <Box sx={{padding: '20px'}}>
            <Form layout="vertical">
                <Row gutter={16}>
                    <Col span={24}>
                        <Form.Item>
                            <div style={{display: 'flex', alignItems: 'center'}}>
                                <Input value={"설치된 작업장"}
                                       style={{marginRight: '10px', flex: 1, backgroundColor: '#f6a6a6'}} readOnly/>
                                <Input value={maintenanceDataDetail.workcenterName} style={{marginRight: '50px', flex: 1}}
                                       onChange={(e) => handleInputChange(e.target.value, 'workcenterName')} readOnly/>
                                <Input value={"설치된 공장"}
                                       style={{marginRight: '10px', flex: 1, backgroundColor: '#f6a6a6'}} readOnly/>
                                <Input value={maintenanceDataDetail.factoryName} style={{flex: 1}}
                                       onChange={(e) => handleInputChange(e, 'factoryName')} readOnly/>
                            </div>
                            <div style={{display: 'flex', alignItems: 'center'}}>
                                <Input value={"설비 번호"}
                                       style={{marginRight: '10px', marginTop: '20px', flex: 1, backgroundColor: '#f6a6a6'}} readOnly/>
                                <Input value={maintenanceDataDetail.equipmentNum}
                                       style={{marginRight:'50px', marginTop: '20px', flex: 1, backgroundColor: '#F5F5F5'}}
                                       onChange={(e) => handleInputChange(e, 'equipmentNum')} readOnly/>
                                <Input value={"설비 명"} style={{marginRight: '10px', marginTop: '20px', flex: 1, backgroundColor: '#f6a6a6'}} readOnly/>
                                <Input value={maintenanceDataDetail.equipmentName} style={{ marginTop: '20px', flex: 1}}
                                       onChange={(e) => handleInputChange(e, 'equipmentName')} readOnly/>
                            </div>
                            <div style={{display: 'flex', alignItems: 'center'}}>
                                <Input value={"유형"}
                                       style={{marginRight: '10px', marginTop: '20px', flex: 1, backgroundColor: '#f6a6a6'}} readOnly/>
                                <Input value={maintenanceDataDetail.maintenanceType} style={{marginRight: '50px',marginTop: '20px', flex: 1}}
                                       onChange={(e) => handleInputChange(e, 'maintenanceType')} readOnly/>
                                <Input value={"관리 담당자"}
                                       style={{marginRight: '10px', marginTop: '20px', flex: 1, backgroundColor: '#f6a6a6'}} readOnly/>
                                <Input value={maintenanceDataDetail.maintenanceManager}
                                       style={{marginTop: '20px', flex: 1}}
                                       onChange={(e) => handleInputChange(e, 'maintenanceManager')} readOnly/>
                            </div>
                            <div style={{display: 'flex', alignItems: 'center'}}>
                                <Input value={"진행 상태"}
                                       style={{marginRight: '10px', marginTop: '20px', flex: 1, backgroundColor: '#f6a6a6'}} readOnly/>
                                <Input value={maintenanceDataDetail.maintenanceStatus}
                                       style={{marginRight:'50px', marginTop: '20px', flex: 1}}
                                       onChange={(e) => handleInputChange(e, 'maintenanceStatus')} readOnly/>
                                <Input value={"유지보수 비용"}
                                       style={{marginRight: '10px', marginTop: '20px', flex: 1, backgroundColor: '#f6a6a6'}} readOnly/>
                                <Input value={maintenanceDataDetail.maintenanceCost}
                                       style={{marginTop: '20px', flex: 1}}
                                       onChange={(e) => handleInputChange(e, 'maintenanceCost')} readOnly/>
                            </div>
                            <div style={{display: 'flex', alignItems: 'center'}}>
                                <Input value={"유지보수 일자"}
                                       style={{marginRight: '10px', marginTop: '20px', flex: 1, backgroundColor: '#f6a6a6'}} readOnly/>
                                <Input value={maintenanceDataDetail.maintenanceDate}
                                       style={{marginRight:'50px', marginTop: '20px', flex: 1}}
                                       onChange={(e) => handleInputChange(e, 'maintenanceDate')} readOnly/>
                                <Input value={"다음 유지보수 예정일"}
                                       style={{marginRight: '10px', marginTop: '20px', flex: 1, backgroundColor: '#f6a6a6'}} readOnly/>
                                <Input value={maintenanceDataDetail.nextScheduleDate}
                                       style={{marginTop: '20px', flex: 1}}
                                       onChange={(e) => handleInputChange(e, 'nextScheduleDate')} readOnly/>
                            </div>
                            <div style={{display: 'flex', alignItems: 'center'}}>
                                <Input value={"제목"}
                                       style={{marginRight: '10px', marginTop: '20px', flex: 0.29, backgroundColor: '#f6a6a6'}} readOnly/>
                                <Input value={maintenanceDataDetail.title} style={{marginTop: '20px', flex: 1}}
                                       onChange={(e) => handleInputChange(e, 'title')} readOnly/>
                            </div>
                            <div style={{display: 'flex', alignItems: 'center'}}>
                                <Input value={"내용"}
                                       style={{marginRight: '10px', marginTop: '20px', flex: 0.29, backgroundColor: '#f6a6a6'}} readOnly/>
                                <Input value={maintenanceDataDetail.maintenanceDetail}
                                       style={{marginTop: '20px', flex: 1}}
                                       onChange={(e) => handleInputChange(e, 'maintenanceDetail')} readOnly/>
                            </div>
                        </Form.Item>
                    </Col>
                </Row>
            </Form>
        </Box>
        <div style={{display: 'flex', justifyContent: 'flex-end', marginRight: '20px'}}>
            <Button onClick={showModal} type="primary" style={{marginRight: '10px'}}>수정</Button>
            <Button onClick={handleDelete} type="danger">삭제</Button>
        </div>


        <Modal
            title="해당 설비의 유지보수 정보 수정"
            open={isUpdateModalVisible}
            onOk={handleUpdateOk}
            onCancel={handleUpdateCancel}
            width={800} // 너비를 800px로 설정
        >

            <div style={{display: 'flex', alignItems: 'center'}}>
                <Input value={"설치된 작업장 코드"} style={{marginRight: '10px', flex: 1, backgroundColor: '#f6a6a6'}}
                       readOnly/>
                <Input value={maintenanceDataDetail?.workcenterCode} style={{marginRight: '30px', flex: 1}}
                       onChange={(e) => handleInputChange(e, 'workcenterCode')} readOnly/>
                <Input value={"설치된 공장 코드"} style={{marginRight: '10px', flex: 1, backgroundColor: '#f6a6a6'}}
                       readOnly/>
                <Input value={maintenanceDataDetail?.factoryCode || ''} style={{flex: 1}}
                       onChange={(e) => handleInputChange(e, 'factoryCode')} readOnlyn/>

            </div>
            <div style={{display: 'flex', alignItems: 'center'}}>
                <Input value={"설비 번호"}
                       style={{marginRight: '10px', marginTop: '20px', flex: 0.28, backgroundColor: '#f6a6a6'}}
                       readOnly/>
                <Input value={maintenanceDataDetail?.equipmentNum} style={{marginTop: '20px', flex: 1}}
                       onChange={(e) => handleInputChange(e, 'equipmentNum')} readOnly/>
            </div>
            <div style={{display: 'flex', alignItems: 'center'}}>
                <Input value={"유형"}
                       style={{marginRight: '10px', marginTop: '20px', flex: 1, backgroundColor: '#f6a6a6'}}
                       readOnly/>
                <Select
                    value={maintenanceDataDetail?.maintenanceType}
                    onChange={(value) => handleInputChange({target: {value}}, 'maintenanceType')}
                    style={{marginRight: '30px', marginTop: '20px', flex: 1.2}}
                >
                    <Option value={"EMERGENCY_REPAIR"}>긴급 수리</Option>
                    <Option value={"REGULAR_INSPECTION"}>정기점검</Option>
                    <Option value={"FAILURE_REPAIR"}>고장 수리</Option>
                </Select>
                <Input value={"관리 담당자"}
                       style={{marginRight: '10px', marginTop: '20px', flex: 1, backgroundColor: '#f6a6a6'}}
                       readOnly/>
                <Input value={maintenanceDataDetail?.maintenanceManager} style={{marginTop: '20px', flex: 1}}
                       onChange={(e) => handleInputChange(e, 'maintenanceManager')}/>
            </div>
            <div style={{display: 'flex', alignItems: 'center'}}>
                <Input value={"진행 상태"}
                       style={{marginRight: '10px', marginTop: '20px', flex: 1, backgroundColor: '#f6a6a6'}}
                       readOnly/>
                <Select
                    value={maintenanceDataDetail?.maintenanceStatus}
                    onChange={(value) => handleInputChange({target: {value:value}}, 'maintenanceStatus')}
                    style={{marginRight: '30px', marginTop: '20px', flex: 1.2}}
                >
                    <Option value={true}>완료</Option>
                    <Option value={false}>작업 중</Option>
                </Select>
                <Input value={"유지보수 비용"}
                       style={{marginRight: '10px', marginTop: '20px', flex: 1, backgroundColor: '#f6a6a6'}}
                       readOnly/>
                <Input value={maintenanceDataDetail?.maintenanceCost} style={{marginTop: '20px', flex: 1}}
                       onChange={(e) => handleInputChange(e, 'maintenanceCost')}/>
            </div>
            <div style={{display: 'flex', alignItems: 'center'}}>
                <Input value={"유지보수 일자"}
                       style={{marginRight: '10px', marginTop: '20px', flex: 1, backgroundColor: '#f6a6a6'}}
                       readOnly/>
                <DatePicker
                    value={maintenanceDataDetail?.maintenanceDate ? moment(maintenanceDataDetail.maintenanceDate, 'YYYY-MM-DD') : null}
                    style={{marginRight: '30px', marginTop: '20px', flex: 1}}
                    onChange={(date, dateString) => handleInputChange({target: {value: dateString}}, 'maintenanceDate')}
                />
                <Input value={"다음 유지보수 예정일"}
                       style={{marginRight: '10px', marginTop: '20px', flex: 1, backgroundColor: '#f6a6a6'}}
                       readOnly/>
                <DatePicker
                    value={maintenanceDataDetail?.nextScheduleDate ? moment(maintenanceDataDetail.nextScheduleDate, 'YYYY-MM-DD') : null}
                    onChange={(date, dateString) => handleInputChange({target: {value: dateString}}, 'nextScheduleDate')}
                    style={{width: '100%', marginTop: '20px', flex: 1}}
                />
            </div>
            <div style={{display: 'flex', alignItems: 'center'}}>
                <Input value={"제목"}
                       style={{marginRight: '10px', marginTop: '20px', flex: 0.28, backgroundColor: '#f6a6a6'}}
                       readOnly/>
                <Input value={maintenanceDataDetail?.title} style={{marginTop: '20px', flex: 1}}
                       onChange={(e) => handleInputChange(e, 'title')}/>
            </div>
            <div style={{display: 'flex', alignItems: 'center'}}>
                <Input value={"내용"}
                       style={{marginRight: '10px', marginTop: '20px', flex: 0.28, backgroundColor: '#f6a6a6'}}
                       readOnly/>
                <Input value={maintenanceDataDetail?.maintenanceDetail}
                       style={{marginTop: '20px', flex: 1}}
                       onChange={(e) => handleInputChange(e, 'maintenanceDetail')}/>
            </div>
        </Modal>
    </Paper>
);


export default MaintenanceHistoryDetailSection ;