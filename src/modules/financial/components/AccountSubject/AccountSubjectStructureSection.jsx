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
    Box
} from '@mui/material';

const AccountSubjectStructureSection = ({ data }) => {
    if (!data) {
        return null;
    }
    return (
        <Grid item xs={12}>
            <Paper elevation={3} sx={{ minWidth: '30vw', padding: '20px', height: '100%' }}>
                <Typography variant="h6" sx={{ marginBottom: '20px' }}>계정과목 체계</Typography>
                <MuiTable size="small" sx={{ borderCollapse: 'collapse' }}>
                    <TableHead>
                        <TableRow>
                            <TableCell
                                sx={{
                                    padding: '2px',
                                    borderBottom: '1px solid #1A2D3B',
                                }}
                            >
                                체계명
                            </TableCell>
                            <TableCell
                                sx={{
                                    padding: '2px',
                                    borderBottom: '1px solid #1A2D3B',
                                }}
                            >
                                체계범위
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {data.structures.map((item, index) => (
                            <TableRow key={index}>
                                {/* 체계명 셀 */}
                                <TableCell
                                    sx={{
                                        padding: '2px',
                                        fontSize: '0.8rem',
                                        borderBottom: '1px solid #1A2D3B',
                                    }}
                                >
                                    {item.name}
                                </TableCell>
                                {/* 체계범위 셀 */}
                                <TableCell
                                    sx={{
                                        padding: '2px',
                                        fontSize: '0.8rem',
                                        borderBottom: '1px solid #1A2D3B',
                                    }}
                                >
                                    {`${item.min} - ${item.max}`}
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </MuiTable>
            </Paper>
        </Grid>
    );
};

export default AccountSubjectStructureSection;