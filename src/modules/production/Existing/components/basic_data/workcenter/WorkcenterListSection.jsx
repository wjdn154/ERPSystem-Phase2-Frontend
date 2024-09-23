import React from 'react';
import { Table } from 'antd';

const WorkcenterListSection = ({ columns, data, handleRowSelection, handleSelectedRow, rowClassName }) => {
  if (!data) {
    return null;
  }

  return (
      <div style={{ padding: '20px' }}>
        <Table
            columns={columns}
            dataSource={data}
            pagination={{ pageSize: 15, position: ['bottomCenter'], showSizeChanger: false }}
            rowSelection={handleRowSelection} // checkbox or radio btn 활성화
            size="small"
            rowKey="code" // Workcenter에서 고유 CODE 필드를 사용
            onRow={(record) => ({
              onClick: () => handleSelectedRow(record), // 행 클릭 시 해당 작업장 선택
              style: { cursor: 'pointer' },
            })}
            rowClassName={rowClassName}
        />
      </div>
  );
};

export default WorkcenterListSection;
