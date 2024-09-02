import React from 'react';
import {
    Box, Paper, Typography, Modal, Input, Row, Col, Select, Button
} from '@mui/material';
import { Form, Table as AntTable } from 'antd';
const { Option } = Select;

const SelectedProcessDetailsSection = ({
                                           data,
                                           processDetail,
                                           handlePopupClick,
                                           isProcessModalVisible,
                                           handleClose,
                                           handleInputChange,
                                           handleSave,
                                           deleteProcessDetail,
                                           handleAddNewDetail,
                                           handleInputChange2
                                       }) => (
    <Paper elevation={3} sx={{ p: 2 }}>
        <Typography variant="h6" marginBottom={'20px'}>프로세스 상세 내용</Typography>
        <Box sx={{ padding: '20px' }}>
            <Form layout="vertical">
                <Row gutter={16}>
                    <Col span={12}>
                        <Form.Item label="프로세스 코드" style={{ marginBottom: '4px' }}>
                            <Input value={processDetail.code} readOnly />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item label="프로세스 명" style={{ marginBottom: '4px' }}>
                            <Input
                                value={processDetail.name}
                                onChange={(e) => handleInputChange(e, 'name')}
                            />
                        </Form.Item>
                    </Col>
                </Row>
                {/* 여기에 추가 필드와 테이블을 추가 */}
                <Row gutter={16}>
                    <Col span={12}>
                        <Form.Item label="상태" style={{ marginBottom: '4px' }}>
                            <Select
                                value={processDetail.status}
                                onChange={(value) => handleInputChange({ target: { value } }, 'status')}
                            >
                                <Option value="active">활성</Option>
                                <Option value="inactive">비활성</Option>
                            </Select>
                        </Form.Item>
                    </Col>
                </Row>
                {/* 예시로 다른 테이블이 있다면 */}
                <Box sx={{ mt: 1 }}>
                    <Typography variant="h7" style={{ fontWeight: '600' }}>상세 정보</Typography>
                    <AntTable
                        rowKey="code"
                        pagination={false}
                        bordered={true}
                        size="small"
                        columns={[] /* 여기에 상세정보 테이블의 컬럼을 추가 */}
                        dataSource={processDetail.details}
                        locale={{ emptyText: '데이터가 없습니다.' }}
                    />
                </Box>
            </Form>

            <Box sx={{display: 'flex', justifyContent: 'flex-end', marginRight: '20px'}}>
                <Button onClick={handleSave} type="primary">
                    저장
                </Button>
            </Box>
        </Box>
    </Paper>
);

export default SelectedProcessDetailsSection;
