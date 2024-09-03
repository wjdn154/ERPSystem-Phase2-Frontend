import React from "react";
import { Typography, Box, Skeleton } from "@mui/material";
import AccountSubjectPage from "../../financial/pages/AccountSubjectPage.jsx";
import WorkcenterManagementPage from "../../production/pages/Workcenter/WorkcenterManagementPage.jsx"; // 작업장 관리 페이지 임포트
import MainContentHook from "../hooks/MainContentHook.jsx";
import AntdSkeleton from "../components/MainContent/AntdSkeleton.jsx";
import { subMenuItems } from "../../../config/menuItems.jsx";

// MainContentPage 컴포넌트는 선택된 서브메뉴에 따라 관련 계정과목 데이터를 표시
function MainContentPage({ selectedSubSubMenu }) {
  // MainContentHook 훅을 사용하여 데이터, 로딩 상태 및 오류 관리
  const { initialData, error, loading } = MainContentHook(selectedSubSubMenu);

  // renderContent 함수는 데이터 로딩 상태에 따라 적절한 UI를 렌더링
  const renderContent = () => {
    const ComponentToRender = selectedSubSubMenu.component;
    if (!ComponentToRender)
      return (
        <Typography color="error">컴포넌트를 찾을 수 없습니다.</Typography>
      );
    if (loading)
      return <AntdSkeleton variant="rectangular" style={{ height: "90vh" }} />;
    if (error) return <Typography color="error">{error}</Typography>;
    return <ComponentToRender initialData={initialData} />;
  };

  return <Box>{renderContent()}</Box>;
}

export default MainContentPage;
