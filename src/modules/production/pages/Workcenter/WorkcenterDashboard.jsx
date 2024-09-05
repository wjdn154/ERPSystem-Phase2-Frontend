import React, { useEffect, useState } from "react";
import { Card, Typography, Row, Col } from "antd";
import { fetchWorkcenters } from "../../services/Workcenter/WorkcenterApi";
import {Cell, Pie, PieChart, ResponsiveContainer} from "recharts";

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

  const COLORS = ['#0088FE', '#FF8042'];

  const data = [
    { name: '활성화된 작업장', value: activeRate },
    { name: '비활성화된 작업장', value: 90 - activeRate },
  ];

  return (
      <div style={{ marginBottom: '16px' }}>
        <Row gutter={16}>
          <Col xs={12} sm={6}>
            <Card className={'purple-card'}>
              <Typography.Title level={5}>전체 작업장 수</Typography.Title>
              <Typography.Title level={2} style={{ color: '#1890ff' }}>
                {workcenters.length}
              </Typography.Title>
            </Card>
          </Col>
          <Col xs={12} sm={6}>
            <Card className={'blue-card'}>
              <Typography.Title level={5}>활성화율</Typography.Title>
              <ResponsiveContainer width="100%" height={200}>
                <PieChart>
                  <Pie
                      data={data}
                      dataKey="value"
                      nameKey="name"
                      cx="50%"
                      cy="50%"
                      outerRadius={60}
                      fill="#8884d8"
                      label
                  >
                    {data.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
              <Typography.Title level={2} style={{ color: '#1890ff', textAlign: 'center' }}>
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
