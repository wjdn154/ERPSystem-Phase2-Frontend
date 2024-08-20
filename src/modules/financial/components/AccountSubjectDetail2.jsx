import React, { useState } from 'react';
import { Divider, Radio, Table } from 'antd';
import {Box} from "@mui/material";

const structuresColumns = [
    {
        title: <span style={{ fontSize: '0.7rem' }}>체계명</span>,
        dataIndex: 'name',
        render: text => <span style={{ fontSize: '0.7rem', color: 'blue' }}>{text}</span>,
    },
    {
        title: <span style={{ fontSize: '0.7rem' }}>시작코드</span>,
        dataIndex: 'min',
        render: text => <span style={{ fontSize: '0.7rem' }}>{text}</span>,
    },
    {
        title: <span style={{ fontSize: '0.7rem' }}>마지막코드</span>,
        dataIndex: 'max',
        render: text => <span style={{ fontSize: '0.7rem' }}>{text}</span>,
    },
];

const accountSubjectsColumns = [
    {
        title: <span style={{ fontSize: '0.7rem' }}>코드번호</span>,
        dataIndex: 'code',
        render: text => <span style={{ fontSize: '0.7rem', color: 'blue' }}>{text}</span>,
        sorter: (a, b) => a.name.length - b.name.length,
    },
    {
        title: <span style={{ fontSize: '0.7rem' }}>계정과목명</span>,
        dataIndex: 'name',
        render: text => <span style={{ fontSize: '0.7rem' }}>{text}</span>,
        sorter: (a, b) => a.name.length - b.name.length,
    },
    {
        title: <span style={{ fontSize: '0.7rem' }}>성격</span>,
        dataIndex: 'natureCode',
        render: text => <span style={{ fontSize: '0.7rem' }}>{text}</span>,
        sorter: (a, b) => a.name.length - b.name.length,
    },
    {
        title: <span style={{ fontSize: '0.7rem' }}>관계</span>,
        dataIndex: 'parentCode',
        render: text => <span style={{ fontSize: '0.7rem' }}>{text}</span>,
        sorter: (a, b) => a.name.length - b.name.length,
    },
];

// rowSelection object indicates the need for row selection
const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
        console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
    },
    getCheckboxProps: (record) => ({
        disabled: record.name === 'Disabled User',
        // Column configuration not to be checked
        name: record.name,
    }),
};

function AccountSubjectDetail2({ data }) {
    console.log(data);
    if (!data) return null;
    const [selectionType, setSelectionType] = useState('checkbox');
    return (
        <div>
            <Radio.Group
                onChange={({ target: { value } }) => {
                    setSelectionType(value);
                }}
                value={selectionType}
            >
                <Radio value="checkbox">Checkbox</Radio>
                <Radio value="radio">radio</Radio>
            </Radio.Group>

            <Divider />

            <Box sx={{ display: 'flex'}}>
                <Table style={{ width: '15vw' }}
                    scroll={{ y: '60vh' }}
                    sortDirections={['descend']}
                    pagination={false}
                    size={'small'}
                    columns={structuresColumns}
                    dataSource={data.structures}
                />

                <Table style={{ marginLeft: '10px', width: '25vw' }}
                    scroll={{ y: '60vh' }}
                    pagination={{ pageSize: 20, position: ['bottomCenter'] }}
                    bordered={true}
                    size={'large'}
                    rowSelection={{
                        type: selectionType,
                        ...rowSelection,
                    }}
                    columns={accountSubjectsColumns}
                    dataSource={data.accountSubjects}
                />

                <Table style={{ marginLeft: '10px', width: '30vw' }}
                    scroll={{ y: '60vh' }}
                    pagination={{ pageSize: 20, position: ['bottomCenter'] }}
                    bordered={true}
                    size={'large'}
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