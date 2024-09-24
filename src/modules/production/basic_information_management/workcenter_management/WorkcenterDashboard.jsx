import React, { useEffect, useState } from "react";
import { Card, Typography, Row, Col } from "antd";
import { fetchWorkcenters } from "./WorkcenterApi.jsx";
import {Cell, Pie, PieChart, ResponsiveContainer} from "recharts";
import {Grid} from "@mui/material";

const WorkcenterDashboard = () => {
  const [workcenters, setWorkcenters] = useState([]);
  const [activeRate, setActiveRate] = useState(0);

  useEffect(() => {

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

  const COLORS = ['#cacaca', '#fff']; // 노란 연두 계열 '#eedb99', '#9ce578'

  const data = [
    { name: '활성화된 작업장', value: activeRate },
    { name: '비활성화된 작업장', value: 90 - activeRate },
  ];

  return (
      <div style={{ marginBottom: '16px' }}>
        <Row gutter={12}>
          <Col xs={12} sm={6}>
            <Card className={'purple-card'} style={{height: 150}} >
              <Typography style={{ fontSize:'25px', fontWeight: 700 }}>전체 작업장 수</Typography>
              <Typography.Title level={2} style={{ color: '#1890ff' }}>
                {workcenters.length}
              </Typography.Title>
            </Card>
          </Col>
          <Col xs={12} sm={6}>
            <Card className={'blue-card'} style={{height: 150}} >
              <Row gutter={12}>
                <Col xs={12} sm={12}>
                  <Typography style={{ fontSize:'25px', fontWeight: 700 }}>활성화율</Typography>
                  <Typography.Title level={2} style={{ color: '#1890ff' }}>
                    {activeRate.toFixed(2)}%
                  </Typography.Title>
                </Col>
                <Col xs={12} sm={12} style={{paddingRight: '50px', height: 160}}>
                  {/*<ResponsiveContainer>*/}
                  {/*  <PieChart>*/}
                  {/*    <Pie*/}
                  {/*        data={data}*/}
                  {/*        dataKey="value"*/}
                  {/*        nameKey="name"*/}
                  {/*        cx="50%"*/}
                  {/*        cy="50%"*/}
                  {/*        outerRadius={50}*/}
                  {/*        fill="#8884d8"*/}
                  {/*        label*/}
                  {/*    >*/}
                  {/*      {data.map((entry, index) => (*/}
                  {/*          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />*/}
                  {/*      ))}*/}
                  {/*    </Pie>*/}
                  {/*  </PieChart>*/}
                  {/*</ResponsiveContainer>*/}
                </Col>
              </Row>
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
