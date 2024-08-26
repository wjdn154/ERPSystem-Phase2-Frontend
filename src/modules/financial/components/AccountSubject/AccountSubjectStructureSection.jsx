import React from 'react';
import { Grid, Paper, Typography, Table as MuiTable, TableBody, TableRow, TableCell } from '@mui/material';

const AccountSubjectStructureSection = ({ data }) => {
    if (!data) {
        return null;
    }
    return(
        <Grid item xs={4}>
            <Paper elevation={3} sx={{ height: '100%', p: 2 }}>
                <Typography variant="h6" marginBottom={'20px'}>계정 체계</Typography>
                <MuiTable size="small" sx={{ borderCollapse: 'collapse' }}>
                    <TableBody>
                        {data.structures.map((structure) => (
                            <TableRow key={structure.code} sx={{ height: 'auto' }}>
                                <TableCell sx={{ padding: '2px', textAlign: 'center', fontSize: '0.85rem' }}>{structure.name}</TableCell>
                                <TableCell sx={{ padding: '2px', textAlign: 'center', fontSize: '0.85rem' }}>{`${structure.min} - ${structure.max}`}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </MuiTable>
            </Paper>
        </Grid>
    )
}

export default AccountSubjectStructureSection;