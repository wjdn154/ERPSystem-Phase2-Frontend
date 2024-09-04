import React from 'react';
import {
    Box,
    Paper,
    Typography,
    Modal,
    TableContainer,
    Table as MuiTable,
    TableBody,
    TableRow,
    TableCell,
    Grid
    }  from "@mui/material";

import {Button, Col, Form, Row, Input,Table as AntTable, Switch, Select} from "antd";
const { Option } = Select;
import {employeeDataDetailColumn} from "../../utils/EmployeeData/EmployeeDataDetailColumn.jsx";
const EmployeeDataDetailSection = ({
      data,
      employeeDataDetail,
      handlePopupClick,
      isFinancialStatementModalVisible,
      isRelationCodeModalVisible,
      handleClose,
      selectHrStatement,
      handleInputChange,
      handleInputChange2,
      handleDeleteMemo,
      handleAddNewMemo,
      setEmployeeDataDetail,
      selectRelationCode,
      handleSave,
      deleteRelationCode
}) => {
    // <Paper elevation={3} sx={{ p: 2 }}>
    //     <Typography variant="h6" marginBottom={'20px'}>사원 상세 내용</Typography>
    //     <Box sx={{ padding: '20px' }}>
    //         <Form layout="vertical">
    //             <Row gutter={16}>
    //                 <Col span={12}>
    //                     <Form.Item
    //                         label="성"
    //                         onClick={employeeDataDetail.modificationType ? () => handlePopupClick('성') : undefined}
    //                         style={{ marginBottom: '4px' }}
    //                     >
    //                         <div style={{ display: 'flex', alignItems: 'center' }}>
    //                             <Input value={employeeDataDetail.code} style={{ marginRight: '10px', flex: 1, backgroundColor: '#f6a6a6 !important' }} readOnly />
    //                             <Input value={employeeDataDetail.name} style={{ flex: 1 }} onChange={(e) => handleInputChange(e, 'name')} readOnly={!employeeDataDetail.modificationType} />
    //                         </div>
    //                     </Form.Item>
    //                 </Col>
    //         </Form>
}
export default EmployeeDataDetailSection;