import React from 'react';
import { Typography, Box } from '@mui/material';
import MainContentHook from '../hooks/MainContentHook.jsx';
import AntdSkeleton from "../components/MainContent/AntdSkeleton.jsx";

// 필요한 컴포넌트를 모두 임포트하여 객체로 묶음
import AccountSubjectPage from "../../financial/pages/AccountSubjectPage.jsx";
import EquipmentDataPage from "../../production/pages/EquipmentDataPage.jsx";
import MaintenanceHistoryPage from "../../production/pages/MaintenanceHistoryPage.jsx";

// 컴포넌트 매핑 객체 생성
const componentsMap = {
    AccountSubjectPage,
    EquipmentDataPage,
    MaintenanceHistoryPage,
    // 필요한 경우 다른 컴포넌트도 여기에 추가
};

// MainContentPage 컴포넌트는 선택된 서브메뉴에 따라 관련 데이터를 표시
function MainContentPage({ selectedSubSubMenu }) {
    // MainContentHook 훅을 사용하여 데이터, 로딩 상태 및 오류 관리
    const { initialData, error, loading } = MainContentHook(selectedSubSubMenu);

    // renderContent 함수는 데이터 로딩 상태에 따라 적절한 UI를 렌더링
    const renderContent = () => {
        if (!selectedSubSubMenu || !selectedSubSubMenu.component) {
            return <Typography color="error">선택된 서브메뉴가 없거나, 컴포넌트를 찾을 수 없습니다.</Typography>;
        }

        // 컴포넌트 이름을 통해 실제 컴포넌트를 가져옴
        const ComponentToRender = componentsMap[selectedSubSubMenu.component];

        if (loading) return <AntdSkeleton variant="rectangular" style={{ height: '90vh' }} />;
        // return <AntdSkeleton variant="rectangular" style={{ height: '90vh' }} />;
        if (error) return <Typography color="error">{error}</Typography>;

        return ComponentToRender ? <ComponentToRender initialData={initialData} /> : <Typography color="error">컴포넌트를 찾을 수 없습니다.</Typography>;
    };

    return <Box>{renderContent()}</Box>;
}

export default MainContentPage;