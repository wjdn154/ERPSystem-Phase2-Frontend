import React, { useMemo, useState } from 'react';
import { Box, Grid, Typography, TextField, MenuItem, FormControl, InputLabel, Select, Button } from '@mui/material';
import { notification, DatePicker } from 'antd';
import WelcomeSection from '../../../../common/components/WelcomeSection.jsx';
import { tabItems } from "./PendingVoucherInputUtil.jsx";

const PendingVoucherInputPage = ({ }) => {
    // initialData: 계정과목 및 거래처 데이터
    const initialData = {
        accounts: [
            { code: '1001', name: '현금' },
            { code: '1002', name: '은행 예금' },
            { code: '2001', name: '매출채권' },
        ],
        clients: [
            { code: 'C001', name: '거래처1' },
            { code: 'C002', name: '거래처2' },
        ]
    };

    // 상태 관리
    const [date, setDate] = useState(null); // 1. 년, 월, 일 선택
    const [rows, setRows] = useState([{ type: '', accountSubject: '', client: '', description: '', debitAmount: '', creditAmount: '' }]); // 행 데이터
    const [totalCash, setTotalCash] = useState(1000000); // 총 현금 잔액 (임의로 설정)
    const [difference, setDifference] = useState(0); // 대차 차액
    const [activeTabKey, setActiveTabKey] = useState('1');

    const handleTabChange = (key) => {
        setActiveTabKey(key);
    };


    // 행 추가
    const addRow = () => {
        setRows([...rows, { type: '', accountSubject: '', client: '', description: '', debitAmount: '', creditAmount: '' }]);
    };

    // 행 데이터 업데이트
    const handleRowChange = (index, field, value) => {
        const updatedRows = [...rows];
        updatedRows[index][field] = value;

        // 계산 로직
        let totalDebit = 0;
        let totalCredit = 0;
        updatedRows.forEach(row => {
            totalDebit += parseFloat(row.debitAmount || 0);
            totalCredit += parseFloat(row.creditAmount || 0);
        });

        // 대차 차액 계산
        setDifference(totalDebit - totalCredit);

        // 상태 업데이트
        setRows(updatedRows);
    };

    // 저장 버튼 클릭 시 실행
    const handleSave = () => {
        if (difference !== 0) {
            notification.error({
                message: '대차 차액 오류',
                description: '차변과 대변의 합계가 0원이 되어야 합니다.',
                placement: 'bottomLeft',
            });
            return;
        }

        notification.success({
            message: '저장 성공',
            description: '미결전표가 성공적으로 저장되었습니다.',
            placement: 'bottomLeft',
        });
    };

    return (
        <Box sx={{ margin: '20px' }}>
            {/* 1. WelcomeSection 추가 */}
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <WelcomeSection
                        title="미결전표 입력"
                        description={(
                            <Typography>
                                이 페이지는 <span>미결 전표</span>를 입력하여 <span>재무</span> 관리를 하는 기능을 제공합니다.
                                <br />
                                <span>거래 내역</span>을 입력하면 현금 잔액과 대차 차액이 자동으로 계산됩니다.
                            </Typography>
                        )}
                        tabItems={tabItems()}
                        activeTabKey={activeTabKey}
                        handleTabChange={handleTabChange}
                    />
                </Grid>
            </Grid>

            {/* 2. 미결전표 입력 양식 */}
            {activeTabKey === '1' && (
                <Grid container spacing={3}>
                    {/* 1. 년, 월, 일 선택 */}
                    <Grid item xs={12} sm={6}>
                        <DatePicker
                            label="날짜 선택"
                            value={date}
                            onChange={(newDate) => setDate(newDate)}
                            renderInput={(params) => <TextField {...params} fullWidth />}
                        />
                    </Grid>

                    {/* 2. 입력 필드 (동적 행 추가) */}
                    {rows.map((row, index) => (
                        <Grid container spacing={3} key={index} sx={{ marginBottom: '10px' }}>
                            <Grid item xs={12} sm={2}>
                                <FormControl fullWidth>
                                    <InputLabel>구분</InputLabel>
                                    <Select value={row.type} onChange={(e) => handleRowChange(index, 'type', e.target.value)}>
                                        <MenuItem value="출금">출금</MenuItem>
                                        <MenuItem value="입금">입금</MenuItem>
                                        <MenuItem value="차변">차변</MenuItem>
                                        <MenuItem value="대변">대변</MenuItem>
                                    </Select>
                                </FormControl>
                            </Grid>
                            <Grid item xs={12} sm={2}>
                                <FormControl fullWidth>
                                    <InputLabel>계정과목</InputLabel>
                                    <Select value={row.accountSubject} onChange={(e) => handleRowChange(index, 'accountSubject', e.target.value)}>
                                        {initialData.accounts.map((account) => (
                                            <MenuItem key={account.code} value={account.code}>
                                                {account.name}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                            </Grid>
                            <Grid item xs={12} sm={2}>
                                <FormControl fullWidth>
                                    <InputLabel>거래처</InputLabel>
                                    <Select value={row.client} onChange={(e) => handleRowChange(index, 'client', e.target.value)}>
                                        {initialData.clients.map((client) => (
                                            <MenuItem key={client.code} value={client.code}>
                                                {client.name}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                            </Grid>
                            <Grid item xs={12} sm={2}>
                                <TextField
                                    label="적요"
                                    value={row.description}
                                    onChange={(e) => handleRowChange(index, 'description', e.target.value)}
                                    fullWidth
                                />
                            </Grid>
                            <Grid item xs={12} sm={2}>
                                <TextField
                                    label="차변"
                                    value={row.debitAmount}
                                    onChange={(e) => handleRowChange(index, 'debitAmount', e.target.value)}
                                    fullWidth
                                />
                            </Grid>
                            <Grid item xs={12} sm={2}>
                                <TextField
                                    label="대변"
                                    value={row.creditAmount}
                                    onChange={(e) => handleRowChange(index, 'creditAmount', e.target.value)}
                                    fullWidth
                                />
                            </Grid>
                        </Grid>
                    ))}

                    {/* 행 추가 버튼 */}
                    <Grid item xs={12}>
                        <Button onClick={addRow}>행 추가</Button>
                    </Grid>

                    {/* 현금 잔액 및 대차 차액 표시 */}
                    <Grid item xs={12}>
                        <Typography variant="h6">총 현금 잔액: {totalCash}원</Typography>
                        <Typography variant="h6" color={difference === 0 ? 'green' : 'red'}>
                            대차 차액: {difference}원
                        </Typography>
                    </Grid>

                    {/* 저장 버튼 */}
                    <Grid item xs={12}>
                        <Button type="primary" onClick={handleSave}>
                            저장
                        </Button>
                    </Grid>
                </Grid>
            )}
        </Box>
    );
};

export default PendingVoucherInputPage;