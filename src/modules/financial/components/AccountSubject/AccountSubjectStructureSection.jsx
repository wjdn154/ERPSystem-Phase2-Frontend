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
    Divider
} from '@mui/material';

const AccountSubjectStructureSection = ({ data }) => {
    if (!data) {
        return null;
    }
    return(
        <Grid item xs={12}>
            <Paper elevation={3} sx={{ height: '100%', p: 2 }}>
                <Typography variant="h6" marginBottom={'20px'}>계정 체계</Typography>
                <MuiTable size="small" sx={{ borderCollapse: 'collapse' }}>
                    <TableHead>
                        <TableRow>
                            {[...Array(5)].map((_, index) => (
                                <React.Fragment key={index}>
                                    <TableCell sx={{ padding: '2px', textAlign: 'center', fontSize: '0.85rem' }}>체계명</TableCell>
                                    <TableCell
                                        sx={{
                                            padding: '2px',
                                            textAlign: 'center',
                                            fontSize: '0.85rem',
                                            borderRight: index < 4 ? '1px solid #e0e0e0' : 'none', // 마지막 컬럼 제외
                                        }}
                                    >
                                        체계범위
                                    </TableCell>
                                </React.Fragment>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {Array.from({ length: 5 }).map((_, rowIndex) => (
                            <TableRow key={rowIndex} sx={{ height: 'auto', borderBottom: 'none' }}>
                                {Array.from({ length: 5 }).map((_, colIndex) => {
                                    const dataIndex = rowIndex + colIndex * 5;
                                    return dataIndex < data.structures.length ? (
                                        <React.Fragment key={dataIndex}>
                                            <TableCell
                                                sx={{ padding: '2px', textAlign: 'center', fontSize: '0.85rem', borderBottom: 'none' }}
                                            >
                                                {data.structures[dataIndex].name}
                                            </TableCell>
                                            <TableCell
                                                sx={{
                                                    padding: '2px',
                                                    textAlign: 'center',
                                                    fontSize: '0.85rem',
                                                    borderBottom: 'none',
                                                    borderRight: colIndex < 4 ? '1px solid #e0e0e0' : 'none',
                                                }}
                                            >
                                                {`${data.structures[dataIndex].min} - ${data.structures[dataIndex].max}`}
                                            </TableCell>
                                        </React.Fragment>
                                    ) : (
                                        <React.Fragment key={`empty-${dataIndex}`}>
                                            <TableCell
                                                sx={{ padding: '2px', textAlign: 'center', fontSize: '0.85rem', borderBottom: 'none' }}
                                            />
                                            <TableCell
                                                sx={{
                                                    padding: '2px',
                                                    textAlign: 'center',
                                                    fontSize: '0.85rem',
                                                    borderBottom: 'none',
                                                    borderRight: colIndex < 4 ? '1px solid #e0e0e0' : 'none',
                                                }}
                                            />
                                        </React.Fragment>
                                    );
                                })}
                            </TableRow>
                        ))}
                    </TableBody>
                </MuiTable>
            </Paper>
        </Grid>
    )
}

export default AccountSubjectStructureSection;