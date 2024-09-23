import React from 'react';
import { Table, Button, Space, Modal } from 'antd';

const { confirm } = Modal;

const ProcessDetailsListSection = ({ columns, data, handleRowSelection, handleSelectedRow, rowClassName }) => {

    if (!data) {
        return null;
    }

    return (
        <div style={{ padding: '20px' }}>
            <Table
                columns={columns}
                dataSource={data}
                pagination={{ pageSize: 15, position: ['bottomCenter'], showSizeChanger: false }}
                rowSelection={handleSelectedRow} // checkbox or radio btn active
                size="small"
                rowKey="code"
                onRow={(record) => ({
                    onClick: () => handleSelectedRow(record), // 행 클릭 시 해당 공정 선택
                    style: { cursor: 'pointer' },
                })}
                rowClassName={rowClassName}
            />
        </div>

    );
};

export default ProcessDetailsListSection;
