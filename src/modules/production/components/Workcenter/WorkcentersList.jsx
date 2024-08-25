import React, { useState, useEffect } from "react";
import { Box, Typography } from "@mui/material";
import { Table as AntTable } from "antd";
import { fetchWorkcenters } from '../../services/Workcenter/WorkcenterApi'; // API 호출 함수 임포트

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
        const data = await fetchWorkcenters(); // API 호출 함수 사용
        setWorkcenterList(data); // 응답 데이터를 상태에 저장
      } catch (error) {
        console.error("작업장 목록을 가져오는 중 오류 발생:", error);
      }
    };

    loadWorkcenters(); // 컴포넌트가 마운트될 때 작업장 목록을 로드
  }, []);

  return (
    <Box sx={{ mt: 2 }}>
      <Typography variant="h6">작업장 전체 리스트</Typography>
      <AntTable
        rowKey="id"
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
