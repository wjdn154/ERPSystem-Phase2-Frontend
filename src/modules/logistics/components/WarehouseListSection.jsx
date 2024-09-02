import React from 'react';
import { Table, Typography, Card } from 'antd';
import { warehouseColumn } from '../utils/WarehouseColum.jsx';

const WarehouseListSection = ({ data }) => {
    if (!data) return null;

    return (
        <Card style={{ marginBottom: 20 }}>
            <Typography.Title level={4} style={{ marginBottom: '20px' }}>
                창고 등록 리스트
            </Typography.Title>
            <Table
                columns={warehouseColumn}
                dataSource={data}
                rowKey="id"
                pagination={{ pageSize: 10 }}
                bordered
            />
        </Card>
    );
};

export default WarehouseListSection;
