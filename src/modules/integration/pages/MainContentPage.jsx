import React from "react";
import { Typography, Box, Skeleton } from "@mui/material";
import AccountSubjectPage from "../../financial/pages/AccountSubjectPage.jsx";
import WorkcenterManagementPage from "../../production/pages/Workcenter/WorkcenterManagementPage.jsx"; // 작업장 관리 페이지 임포트
import MainContentHook from "../hooks/MainContentHook.jsx";
import AntdSkeleton from "../components/MainContent/AntdSkeleton.jsx";

// MainContentPage 컴포넌트는 선택된 서브메뉴에 따라 관련 계정과목 데이터를 표시.
function MainContentPage({ selectedSubSubMenu }) {
  // MainContentHook 훅을 사용하여 데이터, 로딩 상태 및 오류 관리.
  const { initialData, error, loading } = MainContentHook(selectedSubSubMenu);

  // renderContent 함수는 데이터 로딩 상태에 따라 적절한 UI를 렌더링.
  const renderContent = () => {
    // 데이터 로딩 중인 경우 스켈레톤 로딩 컴포넌트를 표시
    if (loading) {
      return <AntdSkeleton variant="rectangular" style={{ height: "90vh" }} />;
    }
    // 데이터 로딩 중 오류가 발생한 경우 오류 메시지를 표시
    if (error) {
      return <Typography color="error">{error}</Typography>;
    }
    // 데이터 로딩이 성공적으로 완료되면 AccountSubjectPage 컴포넌트에 데이터를 전달하여 렌더링
  };

  return <AccountSubjectPage initialData={initialData} />;
}

// 최종적으로 콘텐츠를 Box 컴포넌트 안에 렌더링
return <Box>{renderContent()}</Box>;

export default MainContentPage;
