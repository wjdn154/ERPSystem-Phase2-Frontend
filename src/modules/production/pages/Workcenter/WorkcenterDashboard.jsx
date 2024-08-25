import React, { useEffect, useState } from "react";
import { Card, CardContent, Typography, Grid } from "@mui/material";
import { fetchWorkcenters } from "../../services/Workcenter/WorkcenterApi";

function WorkcenterDashboard() {
  const [workcenters, setWorkcenters] = useState([]);

  useEffect(() => {
    const loadWorkcenters = async () => {
      try {
        const data = await fetchWorkcenters();
        setWorkcenters(data);
      } catch (error) {
        console.error("작업장 데이터를 불러오는 중 오류 발생:", error);
      }
    };

    loadWorkcenters();
  }, []);

  return (
    <div>
      <Typography variant="h4" gutterBottom>
        작업장 대시보드
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Typography variant="h6" component="div">
                전체 작업장 수
              </Typography>
              <Typography variant="h4" color="primary">
                {workcenters.length}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        {workcenters.map((wc) => (
          <Grid item xs={12} sm={6} md={3} key={wc.id}>
            <Card>
              <CardContent>
                <Typography variant="h6" component="div">
                  {wc.name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  가동률: {wc.uptime || 75}%
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </div>
  );
}

export default WorkcenterDashboard;
