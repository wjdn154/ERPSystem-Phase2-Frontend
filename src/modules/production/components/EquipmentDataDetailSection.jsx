import React from 'react';
import {Grid,Paper,Typography, Box, Modal}  from "@mui/material";
import {Button, Col, Form, Row, Input, Table as AntTable, Select} from "antd";
const { Option } = Select;

const EquipmentDataDetailSection = ({
    columns,
    data,
    handleRowSelection,
    handleSelectedRow,
    handleSave,
    handleInputChange
}) => (
        <Paper elevation={3} sx={{ p: 2 }}>
            <Typography variant="h6" marginBottom={'20px'}>설비정보 목록</Typography>
            <Box sx={{padding: '20px'}}>
                <Row gutter={16}>
                    <Col span={12}>
                        <Form.Item>
                            <div style={{display:'flex' , alignItems: 'center'}}>
                                <Input value="배치된 작업장" style={{marginRight:'10px', flex:1, backgroundColor:'#f6a6a6'}}readOnly />
                                <Input value={equipmentDataDetail.workcenterName} style={{flex:1}} onChange={(e) => handleInputChange(e, 'workcenterName')}/>
                            </div>
                        </Form.Item>
                    </Col>
                </Row>
            </Box>
            <Button onClick={handleSave} type="primary">저장</Button>
        </Paper>

    );


export default EquipmentDataDetailSection;