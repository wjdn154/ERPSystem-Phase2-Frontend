import React from 'react';
import { Paper, Typography } from '@mui/material';
import { Table as AntTable } from 'antd';

const ProcessDetailsListSection = ({ columns, data, handleRowSelection, handleSelectedRow, rowClassName }) => {
    if (!data) {
        return null;
    }

    return (
        <Paper elevation={3} sx={{ height: '100%' }}>
            <Typography variant="h6" marginBottom={'20px'} className="paper-header">프로세스 상세 목록</Typography>
            <AntTable
                style={{ padding: '20px' }}
                columns={columns}
                dataSource={data.processDetails}
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
    );
};

export default ProcessDetailsListSection;
