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
} from '@mui/material';
import {Button, Col, Form, Row, Input, Table as AntTable, Switch, Select} from "antd";
const { Option } = Select;
import {cashMemoColumn} from "../../utils/AccountSubject/CashMemoColumn.jsx";
import {transferMemosColumn} from "../../utils/AccountSubject/TransferMemosColumn.jsx";
import {FinancialStatementColumn} from "../../utils/AccountSubject/FinancialStatementColumn.jsx";
import {RelationCodeColumn} from "../../utils/AccountSubject/RelationCodeColumn.jsx";
import {fixedMemoColumn} from "../../utils/AccountSubject/FixedMemoColumn.jsx";


const SelectedAccountSubjectDetailSection = ({
    data,
    accountSubjectDetail,
    handlePopupClick,
    isFinancialStatementModalVisible,
    isRelationCodeModalVisible,
    handleClose,
    selectFinancialStatement,
    handleInputChange,
    handleInputChange2,
    handleDeleteMemo,
    handleAddNewMemo,
    setAccountSubjectDetail,
    selectRelationCode,
    handleSave
}) => (
    <Paper elevation={3} sx={{ p: 2 }}>
        <Typography variant="h6" marginBottom={'20px'}>계정과목 상세 내용</Typography>
        <Box sx={{ padding: '20px' }}>
            <Form layout="vertical">
                <Row gutter={16}>
                    <Col span={12}>
                        <Form.Item
                            label="계정과목코드(명)"
                            onClick={accountSubjectDetail.modificationType ? () => handlePopupClick('계정과목코드') : undefined}
                            style={{ marginBottom: '4px' }}
                        >
                            <div style={{ display: 'flex', alignItems: 'center' }}>
                                <Input value={accountSubjectDetail.code} style={{ marginRight: '10px', flex: 1, backgroundColor: '#f6a6a6 !important' }} readOnly />
                                <Input value={accountSubjectDetail.name} style={{ flex: 1 }} onChange={(e) => handleInputChange(e, 'name')} readOnly={!accountSubjectDetail.modificationType} />
                            </div>
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item
                            label="성격"
                            onClick={accountSubjectDetail.modificationType ? () => handlePopupClick('성격') : undefined}
                            style={{ marginBottom: '4px' }}
                        >
                            <div style={{ display: 'flex', alignItems: 'center' }}>
                                <Input value={accountSubjectDetail.natureCode} style={{ marginRight: '10px', flex: 1 }} readOnly={!accountSubjectDetail.modificationType}/>
                                <Input value={accountSubjectDetail.natureName} style={{ flex: 1 }} readOnly={!accountSubjectDetail.modificationType}/>
                            </div>
                        </Form.Item>
                    </Col>
                </Row>
                <Row gutter={16}>
                    <Col span={12}>
                        <Form.Item
                            label="관계코드(명)"
                            onClick={accountSubjectDetail.modificationType ? () => handlePopupClick('관계코드') : undefined}
                            style={{ marginBottom: '4px' }}
                        >
                            <div style={{ display: 'flex', alignItems: 'center' }}>
                                <Input value={accountSubjectDetail.parentCode || '없음'} style={{ marginRight: '10px', flex: 1 }} readOnly={!accountSubjectDetail.modificationType} />
                                <Input value={accountSubjectDetail.parentName || '없음'} style={{ flex: 1 }} readOnly={!accountSubjectDetail.modificationType} />
                            </div>
                        </Form.Item>
                    </Col>
                    <Modal
                        open={isRelationCodeModalVisible || false}
                        onClose={() => handleClose()}
                        aria-labelledby="select-relation-code-modal"
                        aria-describedby="select-a-relation-code-from-list"
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                        }}
                    >
                        <Box sx={{ minWidth: '60vw', minHeight: '60vh', bgcolor: 'background.paper', boxShadow: 24, p: 4, borderRadius: 2, overflow: 'auto' }}>
                            <Typography id="modal-modal-title" variant="h6" component="h2">
                                관계 코드 선택
                            </Typography>

                            {/* antd Table 사용 */}
                            <AntTable
                                columns={RelationCodeColumn()}
                                dataSource={data.accountSubjects}
                                rowKey="code"
                                size={'small'}
                                pagination={{ pageSize: 10, position: ['bottomCenter'], showSizeChanger: false }}
                                onRow={(record) => ({
                                    style: { cursor: 'pointer' },
                                    onClick: () => {
                                        selectRelationCode(record);
                                        handleClose();
                                    },
                                })}
                                style={{ marginTop: 16 }}
                            />

                            <Box sx={{ mt: 2, display: 'flex', justifyContent: 'flex-end' }}>
                                <Button onClick={handleClose} variant="contained" color="primary" sx={{ mr: 1 }}>
                                    닫기
                                </Button>
                            </Box>
                        </Box>
                    </Modal>
                    <Col span={12}>
                        <Form.Item label="영문명" style={{ marginBottom: '4px' }}>
                            <Input value={accountSubjectDetail.englishName || ''} onChange={(e) => handleInputChange(e, 'englishName')} readOnly={!accountSubjectDetail.modificationType} />
                        </Form.Item>
                    </Col>
                </Row>
                <Row gutter={16}>
                    <Col span={12}>
                        <Form.Item
                            label="계정사용여부"
                            onClick={accountSubjectDetail.modificationType ? () => handlePopupClick('계정사용여부') : undefined}
                            style={{ marginBottom: '4px' }}
                        >
                            <div style={{ display: 'flex', alignItems: 'center' }}>
                                {/* 현재 상태를 확인할 수 있는 Input */}
                                {!accountSubjectDetail.modificationType && (
                                    <Input
                                        value={accountSubjectDetail.isActive ? '여' : '부'}
                                        style={{ flex: 1, marginRight: '10px' }}
                                        readOnly
                                    />
                                )}
                                {/* 수정 가능한 Select */}
                                {accountSubjectDetail.modificationType && (
                                    <Select
                                        value={accountSubjectDetail.isActive}
                                        onChange={(value) => handleInputChange({ target: { value } }, 'isActive')}
                                        style={{ flex: 1 }}
                                    >
                                        <Option value={true}>여</Option>
                                        <Option value={false}>부</Option>
                                    </Select>
                                )}
                            </div>
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item
                            label="계정수정구분"
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
                            onClick={accountSubjectDetail.modificationType ? () => handlePopupClick('표준재무제표') : undefined}
                            style={{ marginBottom: '4px' }}
                        >
                            <div style={{ display: 'flex', alignItems: 'center' }}>
                                <Input
                                    value={accountSubjectDetail.standardFinancialStatementCode}
                                    style={{ marginRight: '10px', flex: 1 }}
                                    readOnly={!accountSubjectDetail.modificationType}
                                />
                                <Input
                                    value={accountSubjectDetail.standardFinancialStatementName}
                                    style={{ marginRight: '10px', flex: 1 }}
                                    readOnly
                                />
                            </div>
                        </Form.Item>
                    </Col>
                    <Modal
                        open={isFinancialStatementModalVisible}
                        onClose={() => handleClose()}
                        aria-labelledby="select-financial-statement-modal"
                        aria-describedby="select-a-financial-statement-from-list"
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                        }}
                    >
                        <Box sx={{ minWidth: '60vw', minHeight: '60vh', bgcolor: 'background.paper', boxShadow: 24, p: 4, borderRadius: 2, overflow: 'auto' }}>
                            <Typography id="modal-modal-title" variant="h6" component="h2">
                                표준재무제표 선택
                            </Typography>

                            {/* antd Table 사용 */}
                            <AntTable
                                columns={FinancialStatementColumn()}
                                dataSource={accountSubjectDetail.standardFinancialStatement}
                                rowKey="code"
                                size={'small'}
                                pagination={{ pageSize: 10, position: ['bottomCenter'], showSizeChanger: false }}
                                onRow={(record) => ({
                                    style: { cursor: 'pointer' },
                                    onClick: () => {
                                        selectFinancialStatement(record);
                                        handleClose();
                                    },
                                })}
                                style={{ marginTop: 16 }}
                            />

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
                            onClick={accountSubjectDetail.modificationType ? () => handlePopupClick('외화사용여부') : undefined}
                            style={{ marginBottom: '4px' }}
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
                            label="업무용차여부"
                            onClick={accountSubjectDetail.modificationType ? () => handlePopupClick('업무용차여부') : undefined}
                            style={{ marginBottom: '4px' }}
                        >
                            <div style={{ display: 'flex', alignItems: 'center' }}>
                                <Input value={accountSubjectDetail.isBusinessCar ? '여' : '부'} style={{ flex: 1 }} readOnly />
                            </div>
                        </Form.Item>
                    </Col>
                </Row>
            </Form>

            {/* 현금적요 테이블 */}
            <Box sx={{ mt: 1 }}>
                <Typography variant="h7" style={{ fontWeight: '600' }}>현금적요</Typography>
                <AntTable
                    rowKey="code"
                    pagination={false}
                    bordered={true}
                    size="small"
                    columns={cashMemoColumn(handleInputChange2, handleDeleteMemo, handleAddNewMemo, setAccountSubjectDetail, accountSubjectDetail).map(col => ({
                        ...col,
                        onCell: () => ({
                            style: { padding: '4px 8px' }  // 셀의 padding을 줄임
                        })
                    }))}
                    dataSource={
                        accountSubjectDetail.cashMemos
                    }
                    locale={{
                        emptyText: '데이터가 없습니다.',
                    }}
                />
            </Box>

            {/* 대체적요 테이블 */}
            <Box sx={{ mt: 1 }}>
                <Typography variant="h7" style={{ fontWeight: '600' }}>대체적요</Typography>
                <AntTable
                    rowKey="code"
                    pagination={false}
                    bordered={true}
                    size="small"
                    columns={transferMemosColumn(handleInputChange2, handleDeleteMemo, handleAddNewMemo, setAccountSubjectDetail, accountSubjectDetail).map(col => ({
                        ...col,
                        onCell: () => ({
                            style: { padding: '4px 8px' }  // 셀의 padding을 줄임
                        })
                    }))}
                    dataSource={
                        accountSubjectDetail.transferMemos
                    }
                    locale={{
                        emptyText: '데이터가 없습니다.',
                    }}
                />
            </Box>

            {/* 고정적요 테이블 */}
            <Box sx={{ mt: 1 }}>
                <Typography variant="h7" style={{ fontWeight: '600' }}>고정적요</Typography>
                <AntTable
                    rowKey="code"
                    pagination={false}
                    bordered={true}
                    size="small"
                    columns={fixedMemoColumn.map(col => ({
                        ...col,
                        onCell: () => ({
                            style: { padding: '4px 8px' }  // 셀의 padding을 줄임
                        })
                    }))}
                    dataSource={
                        accountSubjectDetail.fixedMemos
                    }
                    locale={{
                        emptyText: '데이터가 없습니다.',
                    }}
                />
            </Box>
        </Box>
        <Box sx={{display: 'flex', justifyContent: 'flex-end', marginRight: '30px'}}>
            <Button onClick={handleSave} type="primary" >
                저장
            </Button>
        </Box>
    </Paper>
);

export default SelectedAccountSubjectDetailSection;