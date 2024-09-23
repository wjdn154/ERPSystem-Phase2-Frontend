import React, { useEffect, useState } from 'react';
import { Box, Grid, Typography, Grow, Paper } from '@mui/material';
import { Form, Input, Select, DatePicker, Button, Table, Popconfirm } from 'antd';
import moment from 'moment';
import WelcomeSection from "../../../../components/WelcomeSection.jsx";
import {tabItems, VoucherColumns} from "./PendingVoucherInputUtil.jsx";
import dayjs from "dayjs";

const PendingVoucherInputPage = () => {
    const [form] = Form.useForm();

    // 상태 관리
    const [selectedDate, setSelectedDate] = useState(null); // 1. 날짜 선택
    const [accountSubjects, setAccountSubjects] = useState([]); // 2. 계정과목 데이터
    const [clients, setClients] = useState([]); // 3. 거래처 데이터
    const [dataSource, setDataSource] = useState([]); // 테이블 데이터
    const [count, setCount] = useState(0); // 행을 추가할 때마다 ID 증가
    const [activeTabKey, setActiveTabKey] = useState('1');
    const [voucherData, setVoucherData] = useState({
        date: null,
        entries: [{
            key: 0,
            type: '',
            accountSubject: '',
            client: '',
            description: '',
            debitAmount: '',
            creditAmount: '',
        }],
    });

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

    // 필드 변경 처리
    const handleFieldChange = (value, field, key) => {
        const newEntries = voucherData.entries.map((entry) =>
            entry.key === key ? { ...entry, [field]: value } : entry
        );
        setVoucherData({ ...voucherData, entries: newEntries });
    };

    // 행 추가
    const handleAdd = () => {
        const newEntry = {
            key: voucherData.entries.length,
            type: '',
            accountSubject: '',
            client: '',
            description: '',
            debitAmount: '',
            creditAmount: '',
        };
        setVoucherData({
            ...voucherData,
            entries: [...voucherData.entries, newEntry]
        });
    };

    // 행 삭제
    const handleDelete = (key) => {
        const newEntries = voucherData.entries.filter((entry) => entry.key !== key);
        setVoucherData({ ...voucherData, entries: newEntries });
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

            {activeTabKey === '1' && (
                <Grid sx={{ padding: '0px 20px 0px 20px' }} container spacing={3}>
                    <Grid item xs={12} md={12}>
                        <Grow in={true} timeout={200}>
                            <div>
                                {/* 전표 입력 테이블 */}
                                <Paper elevation={3} sx={{ padding: '20px', height: '100%' }}>
                                    <Typography variant="h6" sx={{ marginBottom: '20px' }}>전표 입력</Typography>

                                    <Form.Item label="날짜 선택">
                                        <DatePicker
                                            format="YYYY-MM-DD"
                                            value={voucherData.date ? dayjs(voucherData.date) : null}
                                            onChange={(date) => setVoucherData({ ...voucherData, date })}
                                            placeholder="날짜 선택"
                                            style={{ width: '200px' }}
                                        />
                                    </Form.Item>

                                    {/* 테이블 영역 */}
                                    <Table
                                        dataSource={voucherData.entries}
                                        columns={VoucherColumns(handleFieldChange, accountSubjects, clients, voucherData.entries, handleDelete)}
                                        pagination={false}
                                        bordered
                                        size={'small'}
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
            )}

            {activeTabKey === '2' && (
                <Grid>
                    asd
                </Grid>
            )}
        </Box>
    );
};

export default PendingVoucherInputPage;