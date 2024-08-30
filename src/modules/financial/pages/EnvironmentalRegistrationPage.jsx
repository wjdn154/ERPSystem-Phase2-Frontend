import * as React from 'react';
import { Divider, Table } from 'antd';
import {useMemo} from "react";
import EnvironmentalRegistrationHook from "../hooks/EnvironmentalRegistrationHook.jsx";

const columns = [
    {
        title: 'Name',
        dataIndex: 'name',
    },
    {
        title: 'Age',
        dataIndex: 'age',
    },
    {
        title: 'Address',
        dataIndex: 'address',
    },
];
const data = [
    {
        key: '1',
        name: 'John Brown',
        age: 32,
        address: 'New York No. 1 Lake Park',
    },
    {
        key: '2',
        name: 'Jim Green',
        age: 42,
        address: 'London No. 1 Lake Park',
    },
    {
        key: '3',
        name: 'Joe Black',
        age: 32,
        address: 'Sydney No. 1 Lake Park',
    },
];
// Define the EnvironmentalRegistrationPage component
const EnvironmentalRegistrationPage = ({ initialData }) => {
    return (
        <>
            <Divider>Middle size table</Divider>
            <Table columns={columns} dataSource={data} size="middle" />
            <Divider>Small size table</Divider>
            <Table columns={columns} dataSource={data} size="small" />
        </>
    );
};

export default EnvironmentalRegistrationPage;