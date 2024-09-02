import React, { useEffect, useState } from 'react';
import { Table, Divider, Spin, Alert } from 'antd';
import axios from 'axios';

// Define the columns for the Table
const columns = [
    {
        title: 'Journal Entry Type Name',
        dataIndex: 'journalEntryTypeName'
    },
    {
        title: 'Account Subject Name',
        dataIndex: 'accountSubjectName'
    },
    {
        title: 'Account Subject Code',
        dataIndex: 'accountSubjectCode'
    },
];

const EnvironmentalRegistrationPage = ({ initData }) => {
    const [data, setData] = useState([]);


    return (
        <div>
            <Divider>2. 분개 유형 설정</Divider>
            <Table
                columns={columns}
                dataSource={initData}
                size="small"
            />
        </div>
    );
};
export default EnvironmentalRegistrationPage;