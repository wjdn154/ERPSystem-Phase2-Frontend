import React from "react";
import { Cell, Column, Table2 } from "@blueprintjs/table";
import { Box } from "@mui/material";

function AccountSubjectDetail3({ data }) {
    if (!data) return null;

    const { structures, accountSubjects, accountSubjectDetail } = data;

    const renderStructureCell = (rowIndex, columnIndex) => {
        const columnKeys = ["code", "name", "min", "max"];
        return <Cell>{structures[rowIndex][columnKeys[columnIndex]]}</Cell>;
    };

    const renderAccountSubjectCell = (rowIndex, columnIndex) => {
        const columnKeys = ["code", "name", "natureCode", "parentCode"];
        return <Cell>{accountSubjects[rowIndex][columnKeys[columnIndex]]}</Cell>;
    };

    const renderAccountSubjectDetailCell = (rowIndex, columnIndex) => {
        const columnKeys = ["code", "name", "parentCode", "parentName", "englishName", "isActive",
            "modificationType", "structureCode", "isForeignCurrency", "isBusinessCar"];
        return <Cell>{accountSubjectDetail[columnKeys[columnIndex]]?.toString() || ''}</Cell>;
    };

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <h3>Structures</h3>
            <Box sx={{ maxHeight: '80vh', overflowY: 'auto', width: '50vw' }}>
                <Table2 numRows={structures.length} enableRowHeader={true} columnWidths={[100, 200, 100, 100]} enableColumnResizing={false}>
                    <Column name="Code" cellRenderer={renderStructureCell} />
                    <Column name="Name" cellRenderer={renderStructureCell} />
                    <Column name="Min" cellRenderer={renderStructureCell} />
                    <Column name="Max" cellRenderer={renderStructureCell} />
                </Table2>
            </Box>

            <h3>Account Subjects</h3>
            <Box sx={{ maxHeight: '80vh', overflowY: 'auto', width: '50vw' }}>
                <Table2
                    numRows={accountSubjects.length}
                    // scrollToRow={accountSubjects.length - 1} // 이 줄을 주석 처리하거나 제거합니다.
                    enableRowHeader={false}  // Row Header 문제일 수 있으므로 비활성화합니다.
                    columnWidths={[100, 200, 150, 150]}
                    enableColumnResizing={false}
                    forceRenderGrid={true}  // 강제 렌더링을 위해 추가합니다.
                    useInteractionBar={false}  // 렌더링 문제를 해결하기 위해 이 속성도 추가할 수 있습니다.
                >
                    <Column name="Code" cellRenderer={renderAccountSubjectCell} />
                    <Column name="Name" cellRenderer={renderAccountSubjectCell} />
                    <Column name="Nature Code" cellRenderer={renderAccountSubjectCell} />
                    <Column name="Parent Code" cellRenderer={renderAccountSubjectCell} />
                </Table2>
            </Box>

            <Box sx={{ width: '50vw' }}>
                <h3>Account Subject Detail</h3>
                <Table2 numRows={1}>
                    <Column name="Code" cellRenderer={renderAccountSubjectDetailCell} />
                    <Column name="Name" cellRenderer={renderAccountSubjectDetailCell} />
                    <Column name="Parent Code" cellRenderer={renderAccountSubjectDetailCell} />
                    <Column name="Parent Name" cellRenderer={renderAccountSubjectDetailCell} />
                    <Column name="English Name" cellRenderer={renderAccountSubjectDetailCell} />
                    <Column name="Is Active" cellRenderer={renderAccountSubjectDetailCell} />
                    <Column name="Modification Type" cellRenderer={renderAccountSubjectDetailCell} />
                    <Column name="Structure Code" cellRenderer={renderAccountSubjectDetailCell} />
                    <Column name="Is Foreign Currency" cellRenderer={renderAccountSubjectDetailCell} />
                    <Column name="Is Business Car" cellRenderer={renderAccountSubjectDetailCell} />
                </Table2>
            </Box>

            <h3>Standard Financial Statements</h3>
            <Box sx={{ maxHeight: '80vh', overflowY: 'auto', width: '50vw' }}>
                <Table2 numRows={accountSubjectDetail.standardFinancialStatement.length} enableRowHeader={true}>
                    <Column name="Code" cellRenderer={(rowIndex) => (
                        <Cell>{accountSubjectDetail.standardFinancialStatement[rowIndex].code}</Cell>
                    )} />
                    <Column name="Name" cellRenderer={(rowIndex) => (
                        <Cell>{accountSubjectDetail.standardFinancialStatement[rowIndex].name}</Cell>
                    )} />
                </Table2>
            </Box>

            <h3>Cash Memos</h3>
            <Box sx={{ maxHeight: '80vh', overflowY: 'auto', width: '50vw' }}>
                <Table2 numRows={accountSubjectDetail.cashMemos.length} enableRowHeader={true}>
                    <Column name="ID" cellRenderer={(rowIndex) => (
                        <Cell>{accountSubjectDetail.cashMemos[rowIndex].id}</Cell>
                    )} />
                    <Column name="Content" cellRenderer={(rowIndex) => (
                        <Cell>{accountSubjectDetail.cashMemos[rowIndex].content}</Cell>
                    )} />
                </Table2>
            </Box>

            <h3>Transfer Memos</h3>
            <Box sx={{ maxHeight: '80vh', overflowY: 'auto', width: '50vw' }}>
                <Table2 numRows={accountSubjectDetail.transferMemos.length} enableRowHeader={true}>
                    <Column name="ID" cellRenderer={(rowIndex) => (
                        <Cell>{accountSubjectDetail.transferMemos[rowIndex].id}</Cell>
                    )} />
                    <Column name="Content" cellRenderer={(rowIndex) => (
                        <Cell>{accountSubjectDetail.transferMemos[rowIndex].content}</Cell>
                    )} />
                </Table2>
            </Box>

            <h3>Fixed Memos</h3>
            <Box sx={{ maxHeight: '80vh', overflowY: 'auto', width: '50vw' }}>
                <Table2 numRows={accountSubjectDetail.fixedMemos.length} enableRowHeader={true}>
                    <Column name="ID" cellRenderer={(rowIndex) => (
                        <Cell>{accountSubjectDetail.fixedMemos[rowIndex].id}</Cell>
                    )} />
                    <Column name="Content" cellRenderer={(rowIndex) => (
                        <Cell>{accountSubjectDetail.fixedMemos[rowIndex].content}</Cell>
                    )} />
                    <Column name="Category" cellRenderer={(rowIndex) => (
                        <Cell>{accountSubjectDetail.fixedMemos[rowIndex].category}</Cell>
                    )} />
                </Table2>
            </Box>
        </Box>
    );
}

export default AccountSubjectDetail3;