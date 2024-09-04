import React, { useState, useEffect } from "react";
import { Box, Typography } from "@mui/material";
import { Table as AntTable } from "antd";
import { fetchWorkcenters } from '../../services/Workcenter/WorkcenterApi.jsx';

const allWorkcenterColumns = [
  { title: "작업장 코드", dataIndex: "code", key: "code" },
  { title: "작업장 명", dataIndex: "name", key: "name" },
  { title: "유형", dataIndex: "workcenterType", key: "workcenterType" },
  { title: "공장", dataIndex: ["factory", "name"], key: "factoryName" },
  {
    title: "상태",
    dataIndex: "isActive",
    key: "isActive",
    render: (text) => (text ? "활성화" : "비활성화"),
  },
];

const WorkcenterListSection = () => {
  const [workcenterList, setWorkcenterList] = useState([]);

  useEffect(() => {
    const loadWorkcenters = async () => {
      try {
        const data = await fetchWorkcenters();
        console.log("API 호출 후 받아온 데이터:", data);
        setWorkcenterList(data); // 상태 업데이트
        console.log("업데이트된 작업장 목록 상태:", workcenterList);
      } catch (error) {
        console.error("작업장 목록을 가져오는 중 오류 발생:", error);
      }
    };

    loadWorkcenters();
  }, []);

  return (
    <Box sx={{ mt: 2 }}>
      <Typography variant="h6">작업장 전체 리스트</Typography>
      <AntTable
        rowKey="code"
        pagination={true}
        bordered={true}
        size="small"
        columns={allWorkcenterColumns}
        dataSource={workcenterList}
      />
    </Box>
  );
};

export default WorkcenterListSection;
