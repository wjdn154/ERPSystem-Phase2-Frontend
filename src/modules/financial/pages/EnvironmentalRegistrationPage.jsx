import * as React from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';


const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
    },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
        border: 0,
    },
}));

const EnvironmentalRegistrationPage = ({ initialData }) => {
    return (
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 700 }} aria-label="customized table">
                <TableHead>
                    <TableRow>
                        <StyledTableCell>2. 분개 유형 설정</StyledTableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {initialData.map((data) => (
                        <StyledTableRow key={data.journalEntryTypeName}>
                            <StyledTableCell component="th" scope="row">
                                {data.journalEntryTypeName}
                            </StyledTableCell>
                            <StyledTableCell align="right">{data.accountSubjectCode}</StyledTableCell>
                            <StyledTableCell align="right">{data.accountSubjectName}</StyledTableCell>
                        </StyledTableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}

export default EnvironmentalRegistrationPage;