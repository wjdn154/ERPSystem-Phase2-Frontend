import React from 'react';
import { Table, Button } from 'antd';

const UserListSection = ({ data, onShowPermissions }) => {
    const columns = [
        {
            title: '사용자 아이디',
            dataIndex: 'userId',
            key: 'userId',
        },
        {
            title: '사용자 이름',
            dataIndex: 'userName',
            key: 'userName',
        },
        {
            title: '사원 번호',
            dataIndex: 'employeeNumber',
            key: 'employeeNumber',
        },
        {
            title: '사원 이름',
            dataIndex: 'employeeName',
            key: 'employeeName',
        },
        {
            title: '권한',
            key: 'permissions',
            render: (text, record) => (
                <Button onClick={() => onShowPermissions(record)}>
                    권한 내역
                </Button>
            ),
        },
    ];

    return (
        <Table
            columns={columns}
            dataSource={data}
            rowKey="userId"
        />
    );
};

export default UserListSection;
