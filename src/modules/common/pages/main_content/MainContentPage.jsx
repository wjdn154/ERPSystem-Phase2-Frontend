import React, { Component } from 'react';
import {Result, Button, Typography} from 'antd';
import { Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import MainContentHook from './MainContentHook.jsx';
import AntdSkeleton from "./AntdSkeleton.jsx";

// 필요한 페이지 컴포넌트들
import AccountSubjectPage from "../../../financial/pages/basic_information_management/account_subject/AccountSubjectPage.jsx";
import EquipmentDataPage from "../../../production/pages/resource_data/EquipmentDataPage.jsx";
import MaintenanceHistoryPage from "../../../production/pages/resource_data/MaintenanceHistoryPage.jsx";
import ClientRegistrationPage from "../../../financial/pages/basic_information_management/client_registration/ClientRegistrationPage.jsx";
import EmployeeDataPage from "../../../hr/pages/EmployeeDataPage.jsx";
import UsersDataPage from "../../../hr/pages/UsersDataPage.jsx";
import DepartmentDataPage from "../../../hr/pages/DepartmentDataPage.jsx";
import WorkcenterPage from "../../../production/pages/basic_data/Workcenter/WorkcenterPage.jsx";
import ProcessDetailsPage from "../../../production/pages/basic_data/ProcessDetails/ProcessDetailsPage.jsx";
import WorkerPage from "../../../production/pages/resource_data/WorkerPage.jsx";
import CustomErrorPage from "../custom_error/CustomErrorPage.jsx";
import DashboardPage from "../../../integration/pages/DashBoard/DashboardPage.jsx";
import FinanceDashboardPage from "../../../financial/pages/dash_board/dash_board/FinanceDashboardPage.jsx";
import ProductionDashboardPage from "../../../production/pages/ProductionDashboardPage.jsx";
import HRDashboardPage from "../../../hr/pages/HRDashboardPage.jsx";
import LogisticsDashboardPage from "../../../logistics/pages/LogisticsDashboardPage.jsx";
import PendingVoucherInputPage from "../../../financial/pages/voucher_entry/pending_voucher_input/PendingVoucherInputPage.jsx";
import UserPermissionPage from "../../../integration/pages/basic_information_management/UserPermission/UserPermissionPage.jsx";
import {jwtDecode} from "jwt-decode";
import Cookies from "js-cookie";
import SystemEnvironmentSettingsPage
    from "../../../financial/pages/basic_information_management/system_environment_settings/SystemEnvironmentSettingsPage.jsx";
import PendingVoucherApprovalPage
    from "../../../financial/pages/voucher_entry/pending_voucher_approval/PendingVoucherApprovalPage.jsx";

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
    ProcessDetailsPage,
    WorkerPage,
    IntegrationDashboardPage: DashboardPage,
    FinanceDashboardPage,
    ProductionDashboardPage,
    HRDashboardPage,
    LogisticsDashboardPage,
    PendingVoucherInputPage,
    UserPermissionPage,
    SystemEnvironmentSettingsPage,
    PendingVoucherApprovalPage,
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
        if (selectedSubSubMenu.apiPath === null) {
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