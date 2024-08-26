import React from 'react';
import {
    Grid,
    Paper,
    Typography,
    Table as MuiTable,
    TableBody,
    TableRow,
    TableCell,
    TableHead,
    Divider, Box
} from '@mui/material';

const AccountSubjectStructureSection = ({ data }) => {
    if (!data) {
        return null;
    }
    return(
        <Grid item xs={12}>
            <Paper elevation={3} sx={{ height: '100%' }}>
                <Typography variant="h6" marginBottom={'20px'} className="paper-header">계정 체계</Typography>
                <Box sx={{ padding: 2 }}>
                    <MuiTable size="small" sx={{ borderCollapse: 'collapse' }}>
                        <TableHead>
                            <TableRow>
                                {[...Array(6)].map((_, index) => (
                                    <React.Fragment key={index}>
                                        <TableCell sx={{ padding: '2px', textAlign: 'center', fontSize: '0.8rem' }}>체계명</TableCell>
                                        <TableCell
                                            sx={{
                                                padding: '2px',
                                                textAlign: 'center',
                                                fontSize: '0.8rem',
                                                borderRight: index < 5 ? '1px solid #e0e0e0' : 'none', // 마지막 컬럼 제외
                                            }}
                                        >
                                            체계범위
                                        </TableCell>
                                    </React.Fragment>
                                ))}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {Array.from({ length: 4 }).map((_, rowIndex) => (
                                <TableRow key={rowIndex} sx={{ height: 'auto', borderBottom: 'none' }}>
                                    {Array.from({ length: 6 }).map((_, colIndex) => {
                                        const dataIndex = rowIndex + colIndex * 4;
                                        return dataIndex < data.structures.length ? (
                                            <React.Fragment key={dataIndex}>
                                                <TableCell
                                                    sx={{ padding: '2px', textAlign: 'center', fontSize: '0.7rem', borderBottom: 'none' }}
                                                >
                                                    {data.structures[dataIndex].name}
                                                </TableCell>
                                                <TableCell
                                                    sx={{
                                                        padding: '2px',
                                                        textAlign: 'center',
                                                        fontSize: '0.7rem',
                                                        borderBottom: 'none',
                                                        borderRight: colIndex < 5 ? '1px solid #e0e0e0' : 'none',
                                                    }}
                                                >
                                                    {`${data.structures[dataIndex].min} - ${data.structures[dataIndex].max}`}
                                                </TableCell>
                                            </React.Fragment>
                                        ) : (
                                            <React.Fragment key={`empty-${dataIndex}`}>
                                                <TableCell
                                                    sx={{ padding: '2px', textAlign: 'center', fontSize: '0.7rem', borderBottom: 'none' }}
                                                />
                                                <TableCell
                                                    sx={{
                                                        padding: '2px',
                                                        textAlign: 'center',
                                                        fontSize: '0.8rem',
                                                        borderBottom: 'none',
                                                        borderRight: colIndex < 5 ? '1px solid #e0e0e0' : 'none',
                                                    }}
                                                />
                                            </React.Fragment>
                                        );
                                    })}
                                </TableRow>
                            ))}
                        </TableBody>
                    </MuiTable>
                </Box>
            </Paper>
        </Grid>
    )
}

export default AccountSubjectStructureSection;