import React, { useState } from 'react';
import {Form, Input, Select, Button, Divider, Row, Col, Upload, Space} from 'antd';
import { Typography, Paper, Box, Grid } from '@mui/material';
import defaultImage from "../../../../assets/img/uploads/defaultImage.png";
import {employmentStatusMap, employmentTypeMap} from "./WorkerListColumn.jsx";

const { Option } = Select;

const WorkerDetailSection = ({
                                 workerDetail,
                                 handleUpdate,
                                 handleInputChange,
                             }) => {
    const [selectedFile, setSelectedFile] = useState(null);

    return (
        <Paper elevation={3} sx={{ padding: '20px', height: '100%', display: 'flex', flexDirection: 'column' }}>
            {/* 리스트 아래에 작업자 세부 정보 표시 */}
            {workerDetail && (

                <div style={{ marginTop: '20px' }}>
                    <Typography variant="h6" marginBottom="20px">
                        작업자 정보
                    </Typography>
                    <Grid sx={{ padding: '20px 20px 0px 20px' }}>
                        <Form layout="vertical">
                            <Row gutter={16} >
                                <Col span={7}>
                                    <Form.Item>
                                        <Input addonBefore="사원번호" value={workerDetail?.employeeNumber} readOnly />
                                    </Form.Item>
                                </Col>
                                <Col span={7}>
                                        <Input
                                            addonBefore="성명" value={workerDetail?.employeeLastName + workerDetail?.employeeFirstName}
                                            readOnly
                                        />
                                </Col>
                                <Col span={7}>
                                    <Input addonBefore="부서" value={workerDetail?.departmentName} readOnly />
                                </Col>
                            </Row>

                            <Row gutter={16}>
                                <Col span={7}>
                                    <Form.Item>
                                        <Input addonBefore="직위" value={workerDetail?.positionName} readOnly />
                                    </Form.Item>
                                </Col>
                                <Col span={7}>
                                    <Input addonBefore="직책" value={workerDetail?.jobTitleName} readOnly />
                                </Col>
                            </Row>
                            <Row gutter={16}>
                                <Col span={7}>
                                    <Input addonBefore="고용상태" value={employmentStatusMap[workerDetail?.employmentStatus]} readOnly />
                                </Col>
                                <Col span={7}>
                                    <Form.Item>
                                        <Input addonBefore="고용유형" value={employmentTypeMap[workerDetail?.employmentType]} readOnly />
                                    </Form.Item>
                                </Col>
                                <Col span={7}>
                                    <Input addonBefore="고용일" value={workerDetail?.hireDate} readOnly />
                                </Col>
                            </Row>
                            <Row gutter={16}>
                                <Col span={7}>
                                    <Form.Item>
                                        <Input addonBefore="배치된 작업장" value={workerDetail?.workcenterName || '미 배치'} readOnly />
                                    </Form.Item>
                                </Col>
                                <Col span={8}>
                                        <Space.Compact>
                                            <Input style={{ width: '60%', backgroundColor: '#FAFAFA', color: '#000', textAlign: 'center' }} defaultValue="안전교육 이수 여부" disabled />
                                            <Select
                                                style={{ width: '40%' }}
                                                value={workerDetail?.trainingStatus}
                                                onChange={(value) =>
                                                    handleInputChange({ target: { value: value } }, 'trainingStatus')
                                                }
                                            >
                                                <Option value={true}>이수</Option>
                                                <Option value={false}>미이수</Option>
                                            </Select>
                                        </Space.Compact>
                                </Col>
                            </Row>

                            {/* 이미지 업로드 */}
                            <Divider orientation={'left'} orientationMargin="0" style={{ marginTop: '0px', fontWeight: 600 }}>
                                이미지 업로드
                            </Divider>
                            <Row gutter={16}>
                                <Col span={12}>
                                    <Form.Item label="프로필 사진">
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
                                        </Upload>
                                    </Form.Item>
                                </Col>
                            </Row>
                        </Form>
                    </Grid>
                </div>
            )}
            <Box style={{ display: 'flex', justifyContent: 'flex-end'}}>
                <Button type="primary" onClick={handleUpdate} style={{ marginRight: '8px' }}>
                    수정
                </Button>
            </Box>
        </Paper>
    );
};

export default WorkerDetailSection;
