// import { useState, useEffect } from 'react';
// import{
//     Box,
//     Paper,
//     Typography,
//     Modal,
//     TableContainer,
//     Table as MuiTable,
//     TableBody,
//     TableRow,
//     TableCell,
//     Button,
// } from "@mui/material";
// import { Col, Form, Row, Input, Table as AntTable } from "antd";
//
// const EmployeeListSection = ({
//                                  employeeDetail,
//                                  handlePopupClick,
//                                  isModalVisible,
//                                  handleClose,
//                                  selectEmployee,
//                                  handleInputChange,
//                                  handleDeleteMemo,
//                                  handleAddNewMemo,
//                                  setEmployeeDetail,
//                              }) => (
//     <Box sx={{mt: 2 }}>
//         <Box sx={{ mt: 2 }}>
//             <Paper elevation={3} sx={{ p: 2 }}>
//                 <Typography variant="h6" marginBottom={"20px"}>
//                     사원 상세 정보
//                 </Typography>
//                 <Box sx={( padding:"30px")}>
//                     <Form layout="vertical">
//                         <Row gutter={16}>
//                             <Col span={12}>
//                                 <Form.Item
//                                     label="사원 번호"
//                                     onClick={() => handlePopupClick("사원 번호")}
//                                 >
//                                     <Input
//                                         value={employeeDetail.employeeNumber}
//                                         style={{ marginRight: "10px", flex: 1 }}
//                                         readOnly
//                                     />
//                                 </Form.Item>
//                             </Col>
//
//                 </Box>
//                 )