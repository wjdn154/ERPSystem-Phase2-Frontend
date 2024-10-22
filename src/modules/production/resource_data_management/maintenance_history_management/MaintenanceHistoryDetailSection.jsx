import React from 'react';
import {Grid,Paper,Typography, Box}  from "@mui/material";
const { Option } = Select;
import {Form, Row, Col, Input, Button, Select, Modal, DatePicker, Divider, Space} from 'antd';
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
                                        handleUpdate
                                    }) => (
    <Paper elevation={3} sx={{p: 2}}>
        <Typography variant="h6" marginBottom={'20px'}>설비 유지보수 상세 정보</Typography>
        <Box sx={{padding: '20px'}}>
            <Form layout="vertical">
                <Divider orientation={'left'} orientationMargin="0" style={{ marginTop: '0px', fontWeight: 600 }}>설비 정보</Divider>
                <Row gutter={16}>
                    <Col span={6}>
                        <Form.Item>
                            <Input
                                addonBefore="설비 번호"
                                value={maintenanceDataDetail.equipmentNum}
                                onChange={(e) => handleInputChange(e, 'equipmentNum')}
                                readOnly
                            />
                        </Form.Item>
                    </Col>
                    <Col span={6}>
                        <Form.Item>
                            <Input
                                addonBefore="설비 명"
                                value={maintenanceDataDetail.equipmentName}
                                onChange={(e) => handleInputChange(e, 'equipmentName')}
                                readOnly
                            />
                        </Form.Item>
                    </Col>
                </Row>
                <Divider orientation={'left'} orientationMargin="0" style={{ marginTop: '0px', fontWeight: 600 }}>유지보수 정보</Divider>
                <Row gutter={16}>
                    <Col span={6}>
                        <Form.Item>
                            <Input
                                addonBefore="관리 담당자"
                                value={maintenanceDataDetail.maintenanceManager}
                                onChange={(e) => handleInputChange(e, 'maintenanceManager')}
                            />
                        </Form.Item>
                    </Col>
                    <Col span={6}>
                        <Form.Item>
                            <Input
                                addonBefore="유지보수 비용"
                                value={maintenanceDataDetail.maintenanceCost}
                                onChange={(e) => handleInputChange(e, 'maintenanceCost')}
                            />
                        </Form.Item>
                    </Col>
                    <Col span={6}>
                        <Space.Compact>
                            <Input style={{ width: '20%', backgroundColor: '#FAFAFA', color: '#000', textAlign: 'center' }} defaultValue="유형" disabled />
                            <Select
                                style={{ width: '80%' }}
                                value={maintenanceDataDetail.maintenanceType}
                                onChange={(value) =>
                                    handleInputChange({ target: { value: value } }, 'maintenanceType')
                                }
                            >
                                <Option value={"EMERGENCY_REPAIR"}>긴급 수리</Option>
                                <Option value={"REGULAR_INSPECTION"}>정기점검</Option>
                                <Option value={"FAILURE_REPAIR"}>고장 수리</Option>
                            </Select>
                        </Space.Compact>
                    </Col>
                    <Col span={6}>
                        <Space.Compact>
                            <Input style={{ width: '50%', backgroundColor: '#FAFAFA', color: '#000', textAlign: 'center' }} defaultValue="진행 상태" disabled />
                            <Select
                                style={{ width: '50%' }}
                                value={maintenanceDataDetail.maintenanceStatus}
                                onChange={(value) =>
                                    handleInputChange({ target: { value: value } }, 'maintenanceStatus')
                                }
                            >
                                <Option value={true}>완료</Option>
                                <Option value={false}>작업 중</Option>
                            </Select>
                        </Space.Compact>
                    </Col>
                </Row>
                <Row gutter={16}>
                    <Col span={6}>
                        <Form.Item>
                            <Input.Group compact>
                                <Input
                                    style={{ width: '40%' }}
                                    value="유지보수 일자"
                                    readOnly
                                />
                                <DatePicker
                                    disabledDate={(current) => current && current.year() !== 2024}
                                    value={maintenanceDataDetail?.maintenanceDate ? moment(maintenanceDataDetail.maintenanceDate, 'YYYY-MM-DD') : null}
                                    onChange={(date, dateString) => handleInputChange({ target: { value: dateString } }, 'maintenanceDate')}
                                    format="YYYY-MM-DD"
                                    style={{ width: '60%' }}
                                />
                            </Input.Group>
                        </Form.Item>
                    </Col>
                    <Col span={6}>
                        <Input.Group compact>
                            <Input
                                style={{ width: '55%' }}
                                value="다음 유지보수 예정일"
                                readOnly
                            />
                            <DatePicker
                                disabledDate={(current) => current && current.year() !== 2024}
                                value={maintenanceDataDetail?.nextScheduleDate ? moment(maintenanceDataDetail.nextScheduleDate, 'YYYY-MM-DD') : null}
                                onChange={(date, dateString) => handleInputChange({ target: { value: dateString } }, 'nextScheduleDate')}
                                format="YYYY-MM-DD"
                                style={{ width: '45%' }}
                            />
                        </Input.Group>
                    </Col>
                </Row>
                <Row gutter={16}>
                    <Col span={6}>
                        <Form.Item>
                            <Input
                                addonBefore="제목"
                                value={maintenanceDataDetail.title}
                                onChange={(e) => handleInputChange(e, 'title')}
                            />
                        </Form.Item>
                    </Col>
                    <Col span={18}>
                        <Form.Item>
                            <Input
                                addonBefore="상세 내용"
                                value={maintenanceDataDetail.maintenanceDetail}
                                onChange={(e) => handleInputChange(e, 'maintenanceDetail')}
                            />
                        </Form.Item>
                    </Col>
                </Row>
                <Divider orientation={'left'} orientationMargin="0" style={{ marginTop: '0px', fontWeight: 600 }}>추가 정보</Divider>
                <Row gutter={16}>
                    <Col span={6}>
                        <Form.Item>
                            <Input
                                addonBefore="설치된 작업장"
                                value={maintenanceDataDetail.workcenterName}
                                onChange={(e) => handleInputChange(e, 'workcenterName')}
                            />
                        </Form.Item>
                    </Col>
                    <Col span={6}>
                        <Form.Item>
                            <Input
                                addonBefore="설치된 공장"
                                value={maintenanceDataDetail.factoryName}
                                onChange={(e) => handleInputChange(e, 'factoryName')}
                            />
                        </Form.Item>
                    </Col>
                </Row>

            </Form>
        </Box>
        <div style={{display: 'flex', justifyContent: 'flex-end', marginRight: '20px'}}>
            <Button onClick={handleUpdate} type="primary" style={{marginRight: '10px'}}>수정</Button>
            <Button onClick={handleDelete} type="danger">삭제</Button>
        </div>
    </Paper>
);


export default MaintenanceHistoryDetailSection ;