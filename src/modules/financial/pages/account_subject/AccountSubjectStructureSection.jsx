import React from 'react';
import {Box, Grid, Paper, Typography} from '@mui/material';
import { Table as AntTable} from 'antd';

const AccountSubjectStructureSection = ({ data }) => {
    if (!data) {
        return null;
    }

    // 컬럼 정의
    const columns = [
        {
            title: '체계명',
            dataIndex: 'name',
            key: 'name',
            render: (text) => <span style={{ fontSize: '0.8rem' }}>{text}</span>,
        },
        {
            title: '체계범위',
            dataIndex: 'range',
            key: 'range',
            render: (text) => <span style={{ fontSize: '0.8rem' }}>{text}</span>,
        },
    ];

    // 데이터 가공
    const tableData = data.structures.map((item, index) => ({
        key: index, // unique key
        name: item.name,
        range: `${item.min} - ${item.max}`,
    }));

    return (
        <Paper elevation={3}>
            <Typography variant="h6" sx={{ padding: '20px' }} >계정과목 체계</Typography>
            <AntTable
                style={{ padding: '20px' }}
                columns={columns}
                dataSource={tableData}
                pagination={{ pageSize: 15, position: ['bottomCenter'], showSizeChanger: false }}
                size="small"
                bordered // 테이블에 경계선 추가
            />
        </Paper>
    );
};

export default AccountSubjectStructureSection;