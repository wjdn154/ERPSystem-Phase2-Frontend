import React from 'react';
import {Box, Paper, Typography, Modal, TableContainer, Table as MuiTable, TableBody, TableRow, TableCell, Button } from '@mui/material';
import {Col, Form, Row, Input, Table as AntTable} from "antd";
import {cashMemoColumn} from "../../utils/AccountSubject/CashMemoColumn.jsx";
import {transferMemosColumn} from "../../utils/AccountSubject/TransferMemosColumn.jsx";
import {fixedMemoColumn} from "../../utils/AccountSubject/FixedMemoColumn.jsx";


const SelectedAccountSubjectDetailSection = ({ accountSubjectDetail, handlePopupClick, isModalVisible, handleClose,
    selectFinancialStatement, handleInputChange, handleInputChange2, handleDeleteMemo, handleAddNewMemo, setAccountSubjectDetail }) => (
    <Box sx={{ mt: 2 }}>
        <Paper elevation={3} sx={{ p: 2 }}>
            <Typography variant="h6" marginBottom={'20px'}>계정과목 상세 내용</Typography>
            <Box sx={{ padding: '30px' }}>
                <Form layout="vertical">
                    <Row gutter={16}>
                        <Col span={12}>
                            <Form.Item
                                label="계정과목코드(명)"
                                onClick={() => handlePopupClick('계정과목코드')}
                            >
                                <div style={{ display: 'flex', alignItems: 'center' }}>
                                    <Input value={accountSubjectDetail.code} style={{ marginRight: '10px', flex: 1, backgroundColor: '#f6a6a6 !important' }} readOnly />
                                    <Input value={accountSubjectDetail.name} style={{ flex: 1 }} readOnly />
                                </div>
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item
                                label="성격"
                                onClick={() => handlePopupClick('성격')}
                            >
                                <div style={{ display: 'flex', alignItems: 'center' }}>
                                    <Input value={'성격코드'} style={{ marginRight: '10px', flex: 1 }} readOnly />
                                    <Input value={'성격명'} style={{ flex: 1 }} readOnly />
                                </div>
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={16}>
                        <Col span={12}>
                            <Form.Item
                                label="관계코드(명)"
                                onClick={() => handlePopupClick('관계코드')}
                            >
                                <div style={{ display: 'flex', alignItems: 'center' }}>
                                    <Input value={accountSubjectDetail.parentCode || '없음'} style={{ marginRight: '10px', flex: 1 }} readOnly />
                                    <Input value={accountSubjectDetail.parentCode || '없음'} style={{ flex: 1 }} readOnly />
                                </div>
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item label="영문명" >
                                <Input value={accountSubjectDetail.englishName || ''}
                                       onChange={(e) => handleInputChange(e, 'englishName')} />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={16}>
                        <Col span={12}>
                            <Form.Item
                                label="계정사용여부"
                                onClick={() => handlePopupClick('계정사용여부')}
                            >
                                <div style={{ display: 'flex', alignItems: 'center' }}>
                                    <Input value={accountSubjectDetail.isActive ? '여' : '부'} style={{ flex: 1 }} readOnly />
                                </div>
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item
                                label="계정수정구분"
                                onClick={() => handlePopupClick('계정수정구분')}
                            >
                                <div style={{ display: 'flex', alignItems: 'center' }}>
                                    <Input value={accountSubjectDetail.modificationType ? '수정 가능' : '수정 불가'} style={{ flex: 1 }} readOnly />
                                </div>
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={16}>
                        <Col span={12}>
                            <Form.Item
                                label="표준재무제표코드(명)"
                                onClick={() => handlePopupClick('표준재무제표')}
                            >
                                <div style={{ display: 'flex', alignItems: 'center' }}>
                                    <Input value="표준재무제표 코드" style={{ marginRight: '10px', flex: 1 }} />
                                    <Input value="표준재무제표명" style={{ marginRight: '10px', flex: 1 }} readOnly />
                                </div>
                            </Form.Item>
                        </Col>
                        <Modal
                            open={isModalVisible}
                            onClose={handleClose}
                            aria-labelledby="select-financial-statement-modal"
                            aria-describedby="select-a-financial-statement-from-list"
                            sx={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center'
                            }}
                        >
                            <Box sx={{ width: 'auto', bgcolor: 'background.paper', boxShadow: 24, p: 4, borderRadius: 2, maxWidth: '80vw', maxHeight: '80vh', overflow: 'auto' }}>
                                <Typography id="modal-modal-title" variant="h6" component="h2">
                                    표준재무제표 선택
                                </Typography>
                                <TableContainer component={Paper}>
                                    <MuiTable size="small">
                                        <TableBody>
                                            {accountSubjectDetail.standardFinancialStatement.map((item, index) => (
                                                <TableRow
                                                    hover
                                                    key={index}
                                                    onClick={() => {
                                                        selectFinancialStatement(item);
                                                        handleClose();
                                                    }}
                                                    sx={{ cursor: 'pointer' }}
                                                >
                                                    <TableCell component="th" scope="row" sx={{ fontSize: '0.7rem' }}>{item.code}</TableCell>
                                                    <TableCell sx={{ fontSize: '0.7rem' }} >{item.name}</TableCell>
                                                </TableRow>
                                            ))}
                                        </TableBody>
                                    </MuiTable>
                                </TableContainer>
                                <Box sx={{ mt: 2, display: 'flex', justifyContent: 'flex-end' }}>
                                    <Button onClick={handleClose} variant="contained" color="primary" sx={{ mr: 1 }}>
                                        닫기
                                    </Button>
                                </Box>
                            </Box>
                        </Modal>
                        <Col span={12}>
                            <Form.Item
                                label="외화사용여부"
                                onClick={() => handlePopupClick('외화사용여부')}
                            >
                                <div style={{ display: 'flex', alignItems: 'center' }}>
                                    <Input value={accountSubjectDetail.isForeignCurrency ? '여' : '부'} style={{ flex: 1 }} readOnly />
                                </div>
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={16}>
                        <Col span={12}>
                            <Form.Item
                                label="업무용차 여부"
                                onClick={() => handlePopupClick('업무용차 여부')}
                            >
                                <div style={{ display: 'flex', alignItems: 'center' }}>
                                    <Input value={accountSubjectDetail.isBusinessCar ? '여' : '부'} style={{ flex: 1 }} readOnly />
                                </div>
                            </Form.Item>
                        </Col>
                    </Row>
                </Form>

                {/* 현금적요 테이블 */}
                <Box sx={{ mt: 2 }}>
                    <Typography variant="h6">현금적요</Typography>
                    <AntTable
                        rowKey="id"
                        pagination={false}
                        bordered={true}
                        size="small"
                        columns={cashMemoColumn(handleInputChange2, handleDeleteMemo, handleAddNewMemo, setAccountSubjectDetail, accountSubjectDetail)}
                        dataSource={
                            accountSubjectDetail.cashMemos
                        }
                    />
                </Box>

                {/* 대체적요 테이블 */}
                <Box sx={{ mt: 2 }}>
                    <Typography variant="h6">대체적요</Typography>
                    <AntTable
                        rowKey="id"
                        pagination={false}
                        bordered={true}
                        size="small"
                        columns={transferMemosColumn(handleInputChange2, handleDeleteMemo, handleAddNewMemo, setAccountSubjectDetail, accountSubjectDetail)}
                        dataSource={
                            accountSubjectDetail.transferMemos
                        }
                    />
                </Box>

                {/* 고정적요 테이블 */}
                <Box sx={{ mt: 2 }}>
                    <Typography variant="h6">고정적요</Typography>
                    <AntTable
                        rowKey="id"
                        pagination={false}
                        bordered={true}
                        size="small"
                        columns={fixedMemoColumn}
                        dataSource={
                            accountSubjectDetail.fixedMemos
                        }
                    />
                </Box>
            </Box>
        </Paper>
    </Box>
);

export default SelectedAccountSubjectDetailSection;