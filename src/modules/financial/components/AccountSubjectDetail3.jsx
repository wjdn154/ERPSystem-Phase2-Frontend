import React, { useState } from "react";
import { Table as AntTable, Form, Row, Col, Input, Table, Button} from 'antd';
import { Typography, Grid, Box, Paper, Table as MuiTable, TableRow, TableBody, TableCell } from '@mui/material';
import axios from 'axios';
import { FINANCIAL_API } from '../../../config/apiConstants.jsx';

function AccountSubjectDetail3({ data }) {
    if (!data) return null;
    const [selectedRow, setSelectedRow] = useState(null);
    const [accountSubjectDetail, setAccountSubjectDetail] = useState(null);

    // 팝업 클릭 시 실행되는 함수
    const handlePopupClick = (field) => {
        // 팝업 로직
        console.log(`${field} 팝업 실행`);
    };
    // 계정과목 상세 정보를 가져오는 함수
    const fetchAccountSubjectDetail = async (code) => {
        try {
            const response = await axios.post(FINANCIAL_API.ACCOUNT_SUBJECT_DETAIL_API(code));
            setAccountSubjectDetail(response.data);
            console.log("계정과목 상세 정보:", accountSubjectDetail);
        } catch (error) {
            console.error("계정과목 상세 정보를 가져오는 중 오류 발생:", error);
        }
    };
    // Input 값이 변경될 때 실행되는 함수
    const handleInputChange = (e) => {
        setAccountSubjectDetail({
            ...accountSubjectDetail,
            englishName: e.target.value,
        });
    };
    // 수정 불가능한 계정과목은 빨간색으로 표시
    const getRowClassName = (record) => {
        return record.modificationType === false ? 'red-text' : '';
    };


    // 계정과목 목록 컬럼
    const accountSubjectsColumns = [
        {
            title: <span>코드번호</span>,
            dataIndex: 'code',
            align: 'center',
            width: '20%',
        },
        {
            title: <span>계정과목명</span>,
            dataIndex: 'name',
            align: 'center',
            width: '40%',
        },
        {
            title: <span>성격</span>,
            dataIndex: 'natureCode',
            align: 'center',
            width: '20%',
        },
        {
            title: <span>관계</span>,
            dataIndex: 'parentCode',
            align: 'center',
            width: '20%',
        },
    ];
    // 현금적요 컬럼
    const cashMemosColumns = [
        {
            title: <span>적요번호</span>,
            dataIndex: 'id',
            align: 'center',
            width: '20%',
        },
        {
            title: <span>현금적요</span>,
            dataIndex: 'content',
            align: 'center',
            width: '80%',
            render: (text, record) => <Input value={text} />,
        },
    ];
    // 대체적요 컬럼
    const transferMemosColumns = [
        {
            title: <span>적요번호</span>,
            dataIndex: 'id',
            align: 'center',
            width: '20%',
        },
        {
            title: <span>대체적요</span>,
            dataIndex: 'content',
            align: 'center',
            width: '80%',
            render: (text, record) => <Input value={text} />,
        },
    ];
    // 고정적요 컬럼
    const fixedMemos = [
        {
            title: <span>적요번호</span>,
            dataIndex: 'id',
            align: 'center',
            width: '20%',
        },
        {
            title: <span>구분</span>,
            dataIndex: 'category',
            align: 'center',
            width: '20%',
        },
        {
            title: <span>고정적요</span>,
            dataIndex: 'content',
            align: 'center',
            width: '60%',
        },
    ];
    // 계정과목 목록 테이블의 rowSelection
    const rowSelection = {
        type: 'radio',
        selectedRowKeys: selectedRow ? [selectedRow.id] : [],
        onChange: async (selectedRowKeys, selectedRows) => {
            setSelectedRow(selectedRows[0]);
            await fetchAccountSubjectDetail(selectedRows[0].code); // 선택된 코드로 계정과목 상세 정보를 가져옴
        },
    };

    return (
        <Box sx={{ flexGrow: 1, p: 3 }}>
            <Grid container spacing={2}>
                {/* 계정 체계 섹션 */}
                <Grid item xs={3}>
                    <Paper elevation={3} sx={{ height: '100%', p: 2 }}>
                        <Typography variant="h6" marginBottom={'20px'}>계정 체계</Typography>
                        <MuiTable size="small">
                            <TableBody>
                                {data.structures.map((structure) => (
                                    <TableRow key={structure.code}>
                                        <TableCell>{structure.name}</TableCell>
                                        <TableCell>{`${structure.min} - ${structure.max}`}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </MuiTable>
                    </Paper>
                </Grid>

                {/* 계정과목 목록 섹션 */}
                <Grid item xs={9}>
                    <Paper elevation={3} sx={{ height: '100%', p: 2 }}>
                        <Typography variant="h6" marginBottom={'20px'}>계정과목 목록</Typography>
                        <AntTable
                            columns={accountSubjectsColumns}
                            dataSource={data.accountSubjects}
                            pagination={{ pageSize: 15, position: ['bottomCenter'], showSizeChanger: false }}
                            rowSelection={rowSelection}
                            rowKey="id"
                            onRow={(record) => ({
                                onClick: () => {
                                    setSelectedRow(record);
                                    fetchAccountSubjectDetail(record.code);
                                },
                                style: { cursor: 'pointer' },
                            })}
                            rowClassName={getRowClassName}
                        />
                    </Paper>
                </Grid>
            </Grid>

            {/* 선택된 계정과목의 상세 내용 섹션 */}
            {accountSubjectDetail && (
                <Box sx={{ mt: 2 }}>
                    <Paper elevation={3} sx={{ p: 2 }}>
                        <Typography variant="h6" marginBottom={'20px'}>계정과목 상세 내용</Typography>
                        <Box sx={{ backgroundColor: '#fff', padding: '20px', borderRadius: '10px', boxShadow: 1, mt: 2 }}>
                            <Form layout="vertical">
                                <Row gutter={16}>
                                    <Col span={12}>
                                        <Form.Item
                                            label="계정과목코드(명)"
                                            onClick={() => handlePopupClick('계정과목코드')}
                                        >
                                            <div style={{ display: 'flex', alignItems: 'center' }}>
                                                <Input value={`${accountSubjectDetail.code}`} style={{ marginRight: '10px', flex: 1, backgroundColor: '#f6a6a6 !important' }} readOnly />
                                                <Input value={`${accountSubjectDetail.name}`} style={{ flex: 1 }} readOnly />
                                            </div>
                                        </Form.Item>
                                    </Col>
                                    <Col span={12}>
                                        <Form.Item
                                            label="성격"
                                            onClick={() => handlePopupClick('성격')}
                                        >
                                            <div style={{ display: 'flex', alignItems: 'center' }}>
                                                <Input value={`성격코드`} style={{ marginRight: '10px', flex: 1 }} readOnly />
                                                <Input value={`성격명`} style={{ flex: 1 }} readOnly />
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
                                                <Input value={`${accountSubjectDetail.parentCode || '없음'}`} style={{ marginRight: '10px', flex: 1 }} />
                                                <Input value={`${accountSubjectDetail.parentCode || '없음'}`} style={{ flex: 1 }} readOnly />
                                            </div>
                                        </Form.Item>
                                    </Col>
                                    <Col span={12}>
                                        <Form.Item label="영문명" >
                                            <Input value={accountSubjectDetail.englishName || ''}
                                                   onChange={handleInputChange}   />
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
                                                <Input value="표준재무제표 코드" style={{ marginRight: '10px', flex: 1 }} readOnly />
                                                <Input value="표준재무제표명" style={{ marginRight: '10px', flex: 1 }} readOnly />
                                            </div>
                                        </Form.Item>
                                    </Col>
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
                                <Table
                                    rowKey="id"
                                    pagination={false}
                                    bordered={true}
                                    size="small"
                                    columns={cashMemosColumns}
                                    dataSource={accountSubjectDetail.cashMemos}
                                />
                            </Box>

                            {/* 대체적요 테이블 */}
                            <Box sx={{ mt: 2 }}>
                                <Typography variant="h6">대체적요</Typography>
                                <Table
                                    rowKey="id"
                                    pagination={false}
                                    bordered={true}
                                    size="small"
                                    columns={transferMemosColumns}
                                    dataSource={accountSubjectDetail.transferMemos}
                                />
                            </Box>

                            {/* 고정적요 테이블 */}
                            <Box sx={{ mt: 2 }}>
                                <Typography variant="h6">고정적요</Typography>
                                <Table
                                    rowKey="id"
                                    pagination={false}
                                    bordered={true}
                                    size="small"
                                    columns={fixedMemos}
                                    dataSource={accountSubjectDetail.fixedMemos}
                                />
                            </Box>
                        </Box>
                    </Paper>
                </Box>
            )}
        </Box>
    );
}

export default AccountSubjectDetail3;