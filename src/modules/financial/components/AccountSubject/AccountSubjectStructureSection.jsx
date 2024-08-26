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
                            <TableCell sx={{ padding: '2px', textAlign: 'center', fontSize: '0.85rem' }}>체계명</TableCell>
                            <TableCell sx={{ padding: '2px', textAlign: 'center', fontSize: '0.85rem', borderRight: '1px solid #e0e0e0' }}>체계범위</TableCell>
                            <TableCell sx={{ padding: '2px', textAlign: 'center', fontSize: '0.85rem' }}>체계명</TableCell>
                            <TableCell sx={{ padding: '2px', textAlign: 'center', fontSize: '0.85rem', borderRight: '1px solid #e0e0e0' }}>체계범위</TableCell>
                            <TableCell sx={{ padding: '2px', textAlign: 'center', fontSize: '0.85rem' }}>체계명</TableCell>
                            <TableCell sx={{ padding: '2px', textAlign: 'center', fontSize: '0.85rem', borderRight: '1px solid #e0e0e0' }}>체계범위</TableCell>
                            <TableCell sx={{ padding: '2px', textAlign: 'center', fontSize: '0.85rem' }}>체계명</TableCell>
                            <TableCell sx={{ padding: '2px', textAlign: 'center', fontSize: '0.85rem', borderRight: '1px solid #e0e0e0' }}>체계범위</TableCell>
                            <TableCell sx={{ padding: '2px', textAlign: 'center', fontSize: '0.85rem' }}>체계명</TableCell>
                            <TableCell sx={{ padding: '2px', textAlign: 'center', fontSize: '0.85rem' }}>체계범위</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {data.structures.map((structure, index) => (
                            index % 4 === 0 ? (
                                <TableRow key={structure.code} sx={{ height: 'auto', borderBottom: 'none' }}>
                                    <TableCell sx={{ padding: '2px', textAlign: 'center', fontSize: '0.85rem', borderBottom: 'none' }}>
                                        {structure.name}
                                    </TableCell>
                                    <TableCell sx={{ padding: '2px', textAlign: 'center', fontSize: '0.85rem', borderBottom: 'none', borderRight: '1px solid #e0e0e0' }}>
                                        {`${structure.min} - ${structure.max}`}
                                    </TableCell>
                                    {data.structures[index + 1] && (
                                        <>
                                            <TableCell sx={{ padding: '2px', textAlign: 'center', fontSize: '0.85rem', borderBottom: 'none' }}>
                                                {data.structures[index + 1].name}
                                            </TableCell>
                                            <TableCell sx={{ padding: '2px', textAlign: 'center', fontSize: '0.85rem', borderBottom: 'none', borderRight: '1px solid #e0e0e0' }}>
                                                {`${data.structures[index + 1].min} - ${data.structures[index + 1].max}`}
                                            </TableCell>
                                        </>
                                    )}
                                    {data.structures[index + 2] && (
                                        <>
                                            <TableCell sx={{ padding: '2px', textAlign: 'center', fontSize: '0.85rem', borderBottom: 'none' }}>
                                                {data.structures[index + 2].name}
                                            </TableCell>
                                            <TableCell sx={{ padding: '2px', textAlign: 'center', fontSize: '0.85rem', borderBottom: 'none', borderRight: '1px solid #e0e0e0' }}>
                                                {`${data.structures[index + 2].min} - ${data.structures[index + 2].max}`}
                                            </TableCell>
                                        </>
                                    )}
                                    {data.structures[index + 3] && (
                                        <>
                                            <TableCell sx={{ padding: '2px', textAlign: 'center', fontSize: '0.85rem', borderBottom: 'none' }}>
                                                {data.structures[index + 2].name}
                                            </TableCell>
                                            <TableCell sx={{ padding: '2px', textAlign: 'center', fontSize: '0.85rem', borderBottom: 'none', borderRight: '1px solid #e0e0e0' }}>
                                                {`${data.structures[index + 2].min} - ${data.structures[index + 2].max}`}
                                            </TableCell>
                                        </>
                                    )}
                                    {data.structures[index + 4] && (
                                        <>
                                            <TableCell sx={{ padding: '2px', textAlign: 'center', fontSize: '0.85rem', borderBottom: 'none' }}>
                                                {data.structures[index + 3].name}
                                            </TableCell>
                                            <TableCell sx={{ padding: '2px', textAlign: 'center', fontSize: '0.85rem', borderBottom: 'none' }}>
                                                {`${data.structures[index + 3].min} - ${data.structures[index + 3].max}`}
                                            </TableCell>
                                        </>
                                    )}
                                </TableRow>
                            ) : null
                        ))}
                    </TableBody>
                </MuiTable>
            </Paper>
        </Grid>
    )
}

export default AccountSubjectStructureSection;