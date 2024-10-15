import React, { useState } from 'react';
import { Table, Pagination, Radio, Space } from 'antd';
import { warehouseColumn } from './warehouseColumn'; // 컬럼 정의 import

const WarehouseListSection = ({ warehouseList, onSelect, selectedWarehouseId }) => {
    const [currentPage, setCurrentPage] = useState(1); // 현재 페이지 관리
    const pageSize = 10; // 페이지당 항목 수

    const handlePageChange = (page) => {
        setCurrentPage(page);
        onSelect(null); // 페이지 변경 시 선택 초기화
    };

    const paginatedData = warehouseList.slice(
        (currentPage - 1) * pageSize,
        currentPage * pageSize
    );

    const columns = [
        {
            dataIndex: 'id',
            key: 'select',
            width: '10%',
            align: 'center',
            render: (id) => (
                <Radio
                    checked={selectedWarehouseId === id}
                    onChange={() => onSelect(id)}
                />
            ),
        },
        ...warehouseColumn, // 기존 컬럼 유지
    ];

    return (
        <>
            <Table
                columns={columns}
                dataSource={paginatedData}
                rowKey="id"
                pagination={false}
                bordered
                locale={{ emptyText: '창고 목록이 없습니다.' }}
                onRow={(record) => ({
                    onClick: () => onSelect(record.id), // 행 클릭 시 선택
                })}
                rowClassName={(record) =>
                    record.id === selectedWarehouseId ? 'selected-row' : ''
                }
            />
            {warehouseList.length > pageSize && (
                <Pagination
                    current={currentPage}
                    total={warehouseList.length}
                    pageSize={pageSize}
                    onChange={handlePageChange}
                    style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}
                />
            )}
        </>
    );
};

export default WarehouseListSection;
