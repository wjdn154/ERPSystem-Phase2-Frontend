import React, { Component } from 'react';
import {Result, Button, Typography} from 'antd';
import { Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import MainContentHook from '../components/hooks/MainContentHook.jsx';
import AntdSkeleton from "../components/MainContent/AntdSkeleton.jsx";

// 필요한 페이지 컴포넌트들
import AccountSubjectPage from "../../financial/pages/AccountSubjectPage.jsx";
import EquipmentDataPage from "../../production/pages/resourceData/EquipmentDataPage.jsx";
import MaintenanceHistoryPage from "../../production/pages/resourceData/MaintenanceHistoryPage.jsx";
import ClientRegistrationPage from "../../financial/pages/ClientRegistrationPage.jsx";
import EmployeeDataPage from "../../hr/pages/EmployeeDataPage.jsx";
import UsersDataPage from "../../hr/pages/UsersDataPage.jsx";
import DepartmentDataPage from "../../hr/pages/DepartmentDataPage.jsx";
import WorkcenterPage from "../../production/pages/Workcenter/WorkcenterPage.jsx";
import WorkerPage from "../../production/pages/resourceData/WorkerPage.jsx";
import CustomErrorPage from "../components/CustomErrorPage.jsx";
import GroupwareDashboardPage from "../../Groupware/pages/GroupwareDashboardPage.jsx";
import FinanceDashboardPage from "../../financial/pages/FinanceDashboardPage.jsx";
import ProductionDashboardPage from "../../production/pages/ProductionDashboardPage.jsx";
import HRDashboardPage from "../../hr/pages/HRDashboardPage.jsx";
import LogisticsDashboardPage from "../../logistics/pages/LogisticsDashboardPage.jsx";
import MaterialDataPage from "../../production/pages/resourceData/MaterialDataPage.jsx";

// 컴포넌트 매핑 객체 생성
const componentsMap = {
    AccountSubjectPage,
    EquipmentDataPage,
    MaintenanceHistoryPage,
    ClientRegistrationPage,
    EmployeeDataPage,
    UsersDataPage,
    DepartmentDataPage,
    WorkcenterPage,
    WorkerPage,
    GroupwareDashboardPage,
    FinanceDashboardPage,
    ProductionDashboardPage,
    HRDashboardPage,
    LogisticsDashboardPage,
    MaterialDataPage,
};

// MainContentPage 컴포넌트
function MainContentPage({ selectedSubSubMenu }) {
    const { initialData, error, loading } = MainContentHook(selectedSubSubMenu);

    const renderContent = () => {
        // 서브메뉴가 선택되지 않았거나, 컴포넌트가 없을 경우
        if (!selectedSubSubMenu || !selectedSubSubMenu.component) {
            return (
                <CustomErrorPage
                    errorCode="404"
                    errorMessage="해당 메뉴에 연결된 컴포넌트를 찾을 수 없습니다."
                />
            );
        }

        // 컴포넌트 이름을 통해 실제 컴포넌트를 가져옴
        const ComponentToRender = componentsMap[selectedSubSubMenu.component];

        // API 경로가 없을 경우
        if (!selectedSubSubMenu.apiPath) {
            return (
                <CustomErrorPage
                    errorCode="WARNING"
                    errorMessage="데이터를 가져올 API 경로가 정의되어 있지 않습니다."
                />
            );
        }

        // 로딩 상태일 경우
        if (loading) {
            return <AntdSkeleton variant="rectangular" style={{ height: '90vh' }} />;
        }

        // 오류가 발생했을 경우
        if (error) {
            return (
                <CustomErrorPage
                    errorCode="ERROR"
                    errorMessage="데이터 로딩에 실패했습니다."
                />
            );
        }

        // 컴포넌트가 렌더링 가능한 경우
        return ComponentToRender ? (
            <ComponentToRender initialData={initialData} />
        ) : (
            <CustomErrorPage
                errorCode="500"
                errorMessage="해당 페이지의 컴포넌트를 찾을 수 없습니다."
            />
        );
    };

    return (
        <Box>{renderContent()}</Box>
    );
}

export default MainContentPage;