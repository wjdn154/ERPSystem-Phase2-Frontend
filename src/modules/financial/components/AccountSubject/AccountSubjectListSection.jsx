import React from 'react';
import { Grid, Paper, Typography} from '@mui/material';
import {Table as AntTable} from "antd";

const AccountSubjectListSection = ({ columns, data, handleRowSelection, handleSelectedRow, rowClassName }) => {
    if (!data) {
        return null;
    }
    return (
        <Paper elevation={3} sx={{ height: '100%', p: 2 }}>
            <Typography variant="h6" marginBottom={'20px'}>계정과목 목록</Typography>
            <AntTable
                style={{ padding: '20px' }}
                columns={columns}
                dataSource={data.accountSubjects}
                pagination={{ pageSize: 15, position: ['bottomCenter'], showSizeChanger: false }}
                rowSelection={handleRowSelection}
                size="small"
                rowKey="id"
                onRow={(record) => ({
                    onClick: () => handleSelectedRow(record),
                    style: { cursor: 'pointer' },
                })}
                rowClassName={rowClassName}
            />
        </Paper>
    )
}

export default AccountSubjectListSection;