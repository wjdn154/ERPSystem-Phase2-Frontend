import React, { useEffect, useState } from "react";
import { Card, Typography, Row, Col } from "antd";
import { fetchWorkcenters } from "../../services/Workcenter/WorkcenterApi";

const WorkcenterDashboard = () => {
  const [workcenters, setWorkcenters] = useState([]);
  const [activeRate, setActiveRate] = useState(0);

  useEffect(() => {
    console.log("WorkcenterDashboard 컴포넌트 시작");

    const loadWorkcenters = async () => {
      try {
        const data = await fetchWorkcenters();
        setWorkcenters(data);

        // 활성화된 작업장의 수 계산
        const activeCount = data.filter((wc) => wc.isActive).length;
        const totalCount = data.length;

        // 활성화율 계산 (백분율)
        const calculatedActiveRate = totalCount > 0 ? (activeCount / totalCount) * 100 : 0;
        console.log("계산된 활성화율:", calculatedActiveRate);
        setActiveRate(calculatedActiveRate);
      } catch (error) {
        console.error("작업장 데이터를 불러오는 중 오류 발생:", error);
      }
    };

    loadWorkcenters();
  }, []);

  return (
      <div style={{ marginBottom: '16px' }}>
        <Typography.Title level={4} style={{ marginBottom: '16px' }}>
          작업장 대시보드
        </Typography.Title>
        <Row gutter={16}>
          <Col xs={24} sm={12} md={6}>
            <Card>
              <Typography.Title level={5}>전체 작업장 수</Typography.Title>
              <Typography.Title level={2} style={{ color: '#1890ff' }}>
                {workcenters.length}
              </Typography.Title>
            </Card>
          </Col>
          <Col xs={24} sm={12} md={6}>
            <Card>
              <Typography.Title level={5}>활성화율</Typography.Title>
              <Typography.Title level={2} style={{ color: '#1890ff' }}>
                {activeRate.toFixed(2)}%
              </Typography.Title>
            </Card>
          </Col>
          {/*
        필요한 경우, 추가 작업장 정보를 여기에 더 표시할 수 있습니다.
        <Col xs={24} sm={12} md={6}>
          <Card>
            <Typography.Title level={5}>작업장 이름</Typography.Title>
            <Typography.Text>추가 정보</Typography.Text>
          </Card>
        </Col>
        */}
        </Row>
      </div>
  );
};

export default WorkcenterDashboard;
