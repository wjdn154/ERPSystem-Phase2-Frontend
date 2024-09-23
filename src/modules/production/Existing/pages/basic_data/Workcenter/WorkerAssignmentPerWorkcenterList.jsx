import React from 'react';
import { Box, TextField, Typography, Grid, Paper, Link, Dialog, DialogTitle, DialogContent, DialogActions, CircularProgress } from "@mui/material";
import { Table, Button, Alert, notification} from "antd";

const WorkerAssignmentPerWorkcenterList = ({ columns, data, handleRowSelection, handleSelectedRow, rowClassName }) => {
    if (!data) {
        return <Typography>금일 배정된 작업자 명단을 찾을 수 없습니다.</Typography>;
    }

    return (
        <div style={{ padding: '20px' }}>
            <Table
                columns={columns}
                dataSource={data}
                pagination={{ pageSize: 15, position: ['bottomCenter'], showSizeChanger: false }}
                size="small"
                rowKey="id" // WorkerAssignment에서 id 필드를 사용
                onRow={(record) => ({
                    onClick: () => handleSelectedRow(record), // 행 클릭 시 해당 배정이력 선택
                    style: { cursor: 'pointer' },
                })}
                rowClassName={rowClassName}
            />
        </div>
    )
}

export default WorkerAssignmentPerWorkcenterList;