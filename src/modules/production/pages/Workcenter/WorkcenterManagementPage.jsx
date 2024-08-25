import React, { useState } from "react";
import WorkcenterDetailSection from "../../components/Workcenter/WorkcenterDetailSection.jsx";
import WorkcenterListSection from "../../components/Workcenter/WorkcentersList.jsx";
import WorkcenterDashboard from "./WorkcenterDashboard.jsx";
import { Grid } from "@mui/material";

const WorkcenterManagementPage = ({ data }) => {
  const [selectedWorkcenter, setSelectedWorkcenter] = useState(null);

  const handleWorkcenterSelect = (workcenter) => {
    setSelectedWorkcenter(workcenter);
  };

  return (
    <div>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <WorkcenterDashboard /> 
        </Grid>
        <Grid item xs={12}>
          {!selectedWorkcenter ? (
            <WorkcenterListSection
              onSelectWorkcenter={handleWorkcenterSelect}
            />
          ) : (
            <WorkcenterDetailSection workcenterDetail={selectedWorkcenter} />
          )}
        </Grid>
      </Grid>
    </div>
  );
};

export default WorkcenterManagementPage;
