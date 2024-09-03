import React from 'react';
import {Grid,Paper,Typography, Box, Modal}  from "@mui/material";
const { Option } = Select;
import {Form, Row, Col, Input, Button, Select} from 'antd';

const EquipmentDataDetailSection = ({
    data,
    equipmentDataDetail,
    handleRowSelection,
    handleSelectedRow,
    handleInputChange
}) => (
        <Paper elevation={3} sx={{ p: 2 }}>
            <Typography variant="h6" marginBottom={'20px'}>설비정보 상세 정보</Typography>
            <Box sx={{padding:'20px'}}>
                <Form layout="vertical">
                    <Row gutter={16}>
                        <Col span={12}>
                            <Form.Item>
                                <div style={{display:'flex', alignItems:'center'}}>
                                    <Input value={"설치된 작업장"} style={{marginRight:'10px', flex:1, backgroundColor:'#f6a6a6'}} readOnly/>
                                    <Input value={equipmentDataDetail.workcenterName} style={{flex:1}} onChange={(e) => handleInputChange(e,'workcenterName')}/>
                                </div>
                            </Form.Item>
                        </Col>
                    </Row>
                </Form>
                </Box>
            <Button onClick={handleSave} type="primary">저장</Button>
        </Paper>
    );


export default EquipmentDataDetailSection;