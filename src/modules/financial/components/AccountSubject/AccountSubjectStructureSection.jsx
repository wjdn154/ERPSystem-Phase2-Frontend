import React from 'react';
import { Grid, Paper, Typography, Table as MuiTable, TableBody, TableRow, TableCell } from '@mui/material';

const AccountSubjectStructureSection = ({ data }) => (
    <Grid item xs={4}>
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
);

export default AccountSubjectStructureSection;