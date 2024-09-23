import React, { useEffect, useState } from 'react';
import { Box, Grid, Typography, Grow, Paper } from '@mui/material';
import { Form, Input, Select, DatePicker, Button, Table, Popconfirm } from 'antd';
import moment from 'moment';
import WelcomeSection from "../../../../components/WelcomeSection.jsx";
import {tabItems} from "../../basic_information_management/account_subject/AccountSubjectUtil.jsx";

const PendingVoucherInputPage = () => {
    const [form] = Form.useForm();

    // 상태 관리
    const [selectedDate, setSelectedDate] = useState(null); // 1. 날짜 선택
    const [accountSubjects, setAccountSubjects] = useState([]); // 2. 계정과목 데이터
    const [clients, setClients] = useState([]); // 3. 거래처 데이터
    const [dataSource, setDataSource] = useState([]); // 테이블 데이터
    const [count, setCount] = useState(0); // 행을 추가할 때마다 ID 증가
    const [activeTabKey, setActiveTabKey] = useState('1');

    const handleTabChange = (key) => {
        setActiveTabKey(key);
    };

    // 임시 데이터 (DB에서 조회하는 부분 대신)
    useEffect(() => {
        setAccountSubjects([
            { value: '1001', label: '현금' },
            { value: '1002', label: '은행 예금' },
            { value: '2001', label: '매출채권' }
        ]);

        setClients([
            { value: 'C001', label: '거래처1' },
            { value: 'C002', label: '거래처2' }
        ]);

        // 값이 없으면 빈 행 하나 추가
        if (dataSource.length === 0) {
            handleAdd();
        }
    }, []);

    // 테이블 컬럼 설정
    const columns = [
        {
            title: '구분',
            dataIndex: 'type',
            key: 'type',
            render: (text, record) => (
                <Select
                    value={record.type}
                    onChange={(value) => handleFieldChange(value, 'type', record.key)}
                    placeholder="구분 선택"
                    style={{ width: '100%' }}
                >
                    <Select.Option value="출금">출금</Select.Option>
                    <Select.Option value="입금">입금</Select.Option>
                    <Select.Option value="차변">차변</Select.Option>
                    <Select.Option value="대변">대변</Select.Option>
                    <Select.Option value="결산차변">결산차변</Select.Option>
                    <Select.Option value="결산대변">결산대변</Select.Option>
                </Select>
            ),
            width: 150,
        },
        {
            title: '계정과목',
            dataIndex: 'accountSubject',
            key: 'accountSubject',
            render: (text, record) => (
                <Select
                    showSearch
                    placeholder="계정과목 선택"
                    options={accountSubjects}
                    value={record.accountSubject}
                    onChange={(value) => handleFieldChange(value, 'accountSubject', record.key)}
                    style={{ width: '100%' }}
                />
            ),
            width: 150,
        },
        {
            title: '거래처',
            dataIndex: 'client',
            key: 'client',
            render: (text, record) => (
                <Select
                    showSearch
                    placeholder="거래처 선택"
                    options={clients}
                    value={record.client}
                    onChange={(value) => handleFieldChange(value, 'client', record.key)}
                    style={{ width: '100%' }}
                />
            ),
            width: 150,
        },
        {
            title: '적요',
            dataIndex: 'description',
            key: 'description',
            render: (text, record) => (
                <Input
                    value={record.description}
                    onChange={(e) => handleFieldChange(e.target.value, 'description', record.key)}
                    placeholder="적요 입력"
                />
            ),
            width: 200,
        },
        {
            title: '차변',
            dataIndex: 'debitAmount',
            key: 'debitAmount',
            render: (text, record) => (
                <Input
                    type="number"
                    value={record.debitAmount}
                    onChange={(e) => handleFieldChange(e.target.value, 'debitAmount', record.key)}
                    placeholder="차변 입력"
                    disabled={record.type === '대변' || record.type === '결산대변'}
                />
            ),
            width: 150,
        },
        {
            title: '대변',
            dataIndex: 'creditAmount',
            key: 'creditAmount',
            render: (text, record) => (
                <Input
                    type="number"
                    value={record.creditAmount}
                    onChange={(e) => handleFieldChange(e.target.value, 'creditAmount', record.key)}
                    placeholder="대변 입력"
                    disabled={record.type === '차변' || record.type === '결산차변'}
                />
            ),
            width: 150,
        },
        {
            title: '삭제',
            key: 'action',
            render: (_, record) =>
                dataSource.length >= 1 ? (
                    <Popconfirm title="삭제하시겠습니까?" onConfirm={() => handleDelete(record.key)}>
                        <Button>삭제</Button>
                    </Popconfirm>
                ) : null,
            width: 100,
        },
    ];

    // 필드 변경 처리
    const handleFieldChange = (value, field, key) => {
        const newData = [...dataSource];
        const index = newData.findIndex((item) => key === item.key);
        if (index > -1) {
            const item = newData[index];
            newData.splice(index, 1, { ...item, [field]: value });
            setDataSource(newData);
        }
    };

    // 행 추가
    const handleAdd = () => {
        const newData = {
            key: count,
            type: '',
            accountSubject: '',
            client: '',
            description: '',
            debitAmount: '',
            creditAmount: '',
        };
        setDataSource([...dataSource, newData]);
        setCount(count + 1);
    };

    // 행 삭제
    const handleDelete = (key) => {
        const newData = dataSource.filter((item) => item.key !== key);
        setDataSource(newData);
    };

    // 저장 로직
    const handleSave = () => {
        console.log('저장된 데이터:', dataSource);
    };

    return (
        <Box sx={{ margin: '20px' }}>
            {/* 1. 날짜 선택은 표 밖에 배치 */}
            <Grid container spacing={3}>
                <Grid item xs={12} md={12}>
                    <WelcomeSection
                        title="계정과목 및 적요등록"
                        description={(
                            <Typography>
                                계정과목 및 적요 등록 페이지는 재무 관리 시스템에서{' '}
                                <span>계정과목과 적요</span>
                                (거래의 내역이나 설명)를 <span>관리하고 등록</span>하는 중요한 기능을 제공하는 페이지임.
                                <br/>
                                이 페이지는 기업의 재무 데이터를 정확하게 기록하고 관리하는 데 필수적인 역할을 함.
                            </Typography>
                        )}
                        tabItems={tabItems()}
                        activeTabKey={activeTabKey}
                        handleTabChange={handleTabChange}
                    />
                </Grid>
            </Grid>

            <Grid container spacing={3}>
                <Grid item xs={12} md={3}>
                    <Form.Item label="날짜 선택">
                        <DatePicker
                            format="YYYY-MM-DD"
                            value={selectedDate ? moment(selectedDate) : null}
                            onChange={(date) => setSelectedDate(date)}
                            placeholder="날짜 선택"
                            style={{ width: '100%' }}
                        />
                    </Form.Item>
                </Grid>
            </Grid>

            {/* 전표 입력 테이블 */}
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <Grow in={true} timeout={200}>
                        <div>
                            <Paper elevation={3} sx={{ padding: '20px', height: '100%' }}>
                                <Typography variant="h6" sx={{ marginBottom: '20px' }}>전표 입력</Typography>

                                {/* 테이블 영역 */}
                                <Table
                                    dataSource={dataSource}
                                    columns={columns}
                                    pagination={false}
                                    bordered
                                    scroll={{ x: 'max-content' }} // 화면 크기에 맞게 테이블 스크롤
                                />

                                <div style={{ marginTop: 16 }}>
                                    <Button
                                        onClick={handleAdd}
                                        type="primary"
                                        style={{
                                            marginRight: 16,
                                        }}
                                    >
                                        행 추가
                                    </Button>

                                    <Button type="primary" onClick={handleSave}>
                                        저장
                                    </Button>
                                </div>
                            </Paper>
                        </div>
                    </Grow>
                </Grid>
            </Grid>
        </Box>
    );
};

export default PendingVoucherInputPage;