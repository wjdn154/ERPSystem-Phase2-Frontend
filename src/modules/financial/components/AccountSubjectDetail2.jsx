import React, {useEffect, useState} from 'react';
import { Divider, Radio, Table } from 'antd';
import { Box } from '@mui/material';
import '../../../styles/App.css';

const structuresColumns = [
    {
        title: <span style={{ fontSize: '0.7rem' }}>체계명</span>,
        dataIndex: 'name',
        align: 'center',
        render: text => <span style={{ fontSize: '0.7rem', color: 'blue' }}>{text}</span>,
        sorter: (a, b) => a.name.localeCompare(b.name),
    },
    {
        title: <span style={{ fontSize: '0.7rem' }}>체계범위</span>,
        dataIndex: 'range',
        align: 'center',
        render: (_, value) => (
            <span style={{ fontSize: '0.7rem' }}>{`${value.min} - ${value.max}`}</span>
        ),
    },
];

const accountSubjectsColumns = [
    {
        title: <span style={{ fontSize: '0.7rem' }}>코드번호</span>,
        dataIndex: 'code',
        align: 'center',
        width: '20%',
        render: text => <span style={{ fontSize: '0.7rem', color: 'blue' }}>{text}</span>,
        sorter: (a, b) => a.code.localeCompare(b.code),
    },
    {
        title: <span style={{ fontSize: '0.7rem' }}>계정과목명</span>,
        dataIndex: 'name',
        align: 'center',
        width: '40%',
        render: text => <span style={{ fontSize: '0.7rem' }}>{text}</span>,
        sorter: (a, b) => a.name.localeCompare(b.name),
    },
    {
        title: <span style={{ fontSize: '0.7rem' }}>성격</span>,
        dataIndex: 'natureCode',
        align: 'center',
        width: '20%',
        render: text => <span style={{ fontSize: '0.7rem' }}>{text}</span>,
        sorter: (a, b) => a.natureCode.localeCompare(b.natureCode),
    },
    {
        title: <span style={{ fontSize: '0.7rem' }}>관계</span>,
        dataIndex: 'parentCode',
        align: 'center',
        width: '20%',
        render: text => <span style={{ fontSize: '0.7rem' }}>{text}</span>,
        sorter: (a, b) => a.parentCode.localeCompare(b.parentCode),
    },
];

const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
        console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
    },
    getCheckboxProps: (record) => ({
        disabled: record.name === 'Disabled User',
        name: record.name,
    }),
};

function AccountSubjectDetail2({ data }) {
    console.log(data);
    if (!data) return null;
    const [selectionType, setSelectionType] = useState('checkbox');

    return (
        <div style={{ padding: '30px'}}>
            <Radio.Group
                onChange={({ target: { value } }) => {
                    setSelectionType(value);
                }}
                value={selectionType}
            >
                <Radio value="checkbox">Checkbox</Radio>
                <Radio value="radio">Radio</Radio>
            </Radio.Group>

            <Divider />

            <Box sx={{ display: 'flex' , height: '70vh', justifyContent: 'space-between'}}>
                <Table
                    rowKey="id"
                    bordered={true}
                    style={{ minWidth: '220px', height: '100vh', width: '10vw', overflow: 'hidden' }}
                    pagination={false}
                    size="small"
                    columns={structuresColumns}
                    dataSource={data.structures}
                    scroll={{ y: 500 }}
                />

                <Table
                    rowKey="id"
                    style={{ minWidth: '300px', width: '20vw', height: '100%' }}
                    pagination={{ pageSize: 15, position: ['bottomCenter'] }}
                    bordered={true}
                    size="small"
                    rowSelection={{
                        type: selectionType,
                        ...rowSelection,
                    }}
                    columns={accountSubjectsColumns}
                    dataSource={data.accountSubjects}
                />

                <Table
                    rowKey="id"
                    style={{ minWidth: '300px', width: '20vw' }}
                    pagination={{ pageSize: 10, position: ['bottomCenter'] }}
                    bordered={true}
                    size="small"
                    rowSelection={{
                        type: selectionType,
                        ...rowSelection,
                    }}
                    columns={accountSubjectsColumns}
                    dataSource={data.accountSubjects}
                />
            </Box>
        </div>
    );
}

export default AccountSubjectDetail2;