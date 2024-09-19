import React from 'react';
import { Table } from 'antd';
import { warehouseColumn } from '../utils/WarehouseColum';  // 테이블 컬럼 설정 import

const WarehouseListSection = ({ initialData, onRowClick }) => {
    // 창고 코드와 창고명에 클릭 이벤트 추가
    const columns = [
        {
            title: '창고코드',
            dataIndex: 'code',
            render: (text, record) => (
                <a onClick={() => onRowClick(record.id)}>{text}</a> // 창고 코드 클릭 시 이벤트 발생
            ),
        },
        {
            title: '창고명',
            dataIndex: 'name',
            render: (text, record) => (
                <a onClick={() => onRowClick(record.id)}>{text}</a> // 창고명 클릭 시 이벤트 발생
            ),
        },
        // 나머지 컬럼들은 기존대로 유지
        ...warehouseColumn.slice(2),
    ];

    return (
        <Table
            dataSource={initialData}
            columns={columns}
            rowKey="id"  // 각 행의 고유 key 값으로 창고 ID 사용
            pagination={false}  // 페이지네이션 비활성화 (필요 시 활성화)
        />
    );
};

export default WarehouseListSection;
