import React from 'react';
import {Box, Grid, Paper, Typography} from '@mui/material';
import {Table as AntTable} from "antd";

const ProductListSection = ({ columns, data, handleRowSelection, handleSelectedRow, rowClassName }) => {
    if (!data) {
        return null;
    }
    console.log(data);
    return (
        <Paper elevation={3} sx={{ height: '100%' }}>
            <Typography variant="h6" marginBottom={'20px'} className="paper-header">품목 목록</Typography>
            <AntTable
                style={{ padding: '20px' }}
                columns={columns}
                dataSource={data}
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

export default ProductListSection;