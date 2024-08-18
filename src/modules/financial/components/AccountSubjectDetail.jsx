import React from 'react';
import { Grid, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography } from '@mui/material'; // 필요한 Material-UI 컴포넌트들 가져옴

function AccountSubjectDetail({ data }) {
    // 데이터가 없을 경우 아무것도 렌더링하지 않음
    if (!data) return null;

    return (
        <>
            {/* Grid 컨테이너: 각 표를 3등분하여 배치 */}
            <Grid container spacing={2}>

                {/* 표1: 계정 체계 */}
                {data.structures && (
                    <Grid item xs={4}>
                        <TableContainer component={Paper} sx={{ marginBottom: '20px' }}>
                            <Typography variant="h6" sx={{ padding: '10px' }}>계정 체계</Typography>
                            <Table>
                                <TableHead>
                                    <TableRow>
                                        <TableCell>코드</TableCell>
                                        <TableCell>체계명</TableCell>
                                        <TableCell>체계범위</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {data.structures.map((item) => (
                                        <TableRow key={item.code}>
                                            <TableCell>{item.code}</TableCell>
                                            <TableCell>{item.name}</TableCell>
                                            <TableCell>{item.min + '-' + item.max}</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Grid>
                )}

                {/* 표2: 계정 과목 */}
                {data.accountSubjects && (
                    <Grid item xs={4}>
                        <TableContainer component={Paper} sx={{ marginBottom: '20px' }}>
                            <Typography variant="h6" sx={{ padding: '10px' }}>계정 과목</Typography>
                            <Table>
                                <TableHead>
                                    <TableRow>
                                        <TableCell>코드</TableCell>
                                        <TableCell>계정과목명</TableCell>
                                        <TableCell>성격코드</TableCell>
                                        <TableCell>관계</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {data.accountSubjects.map((item) => (
                                        <TableRow key={item.code}>
                                            <TableCell>{item.code}</TableCell>
                                            <TableCell>{item.name}</TableCell>
                                            <TableCell>{item.natureCode}</TableCell>
                                            <TableCell>{item.parentCode}</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Grid>
                )}

                {/* 표3: 계정 체계 (표1과 동일한 내용) */}
                {data.structures && (
                    <Grid item xs={4}>
                        <TableContainer component={Paper} sx={{ marginBottom: '20px' }}>
                            <Typography variant="h6" sx={{ padding: '10px' }}>계정 체계</Typography>
                            <Table>
                                <TableHead>
                                    <TableRow>
                                        <TableCell>체계번호</TableCell>
                                        <TableCell>체계명</TableCell>
                                        <TableCell>체계범위</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {data.structures.map((item) => (
                                        <TableRow key={item.code}>
                                            <TableCell>{item.code}</TableCell>
                                            <TableCell>{item.name}</TableCell>
                                            <TableCell>{item.min + '-' + item.max}</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Grid>
                )}
            </Grid>
        </>
    );
}

export default AccountSubjectDetail;