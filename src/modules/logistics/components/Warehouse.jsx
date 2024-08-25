import React from 'react';
import { Grid, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography } from '@mui/material';

function Warehouse({ data }) {
    // 데이터가 없을 경우 아무것도 렌더링하지 않음
    if (!data) return null;

    return (
        <>
            {/* Grid 컨테이너: 데이터 테이블 배치 */}
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <TableContainer component={Paper} sx={{ marginBottom: '20px' }}>
                        <Typography variant="h6" sx={{ padding: '10px' }}>창고 등록 리스트</Typography>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>창고코드</TableCell>
                                    <TableCell>창고명</TableCell>
                                    <TableCell>구분</TableCell>
                                    <TableCell>생산공정명</TableCell>
                                    <TableCell>외주거래처명</TableCell>
                                    <TableCell>사용</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {data.map((item) => (
                                    <TableRow key={item.id}>
                                        <TableCell>{item.code}</TableCell>
                                        <TableCell>{item.name}</TableCell>
                                        <TableCell>{item.warehouseType}</TableCell>
                                        <TableCell>{item.productionProcess}</TableCell>
                                        <TableCell>{item.externalPartnerName || '-'}</TableCell>
                                        <TableCell>{item.isActive ? 'Yes' : 'No'}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Grid>
            </Grid>
        </>
    );
}

export default Warehouse;
