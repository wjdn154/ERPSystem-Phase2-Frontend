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
import EmployeeDataPage from "../../../hr/pages/basic_information_management/employee_management/Existing/EmployeeDataPage.jsx";
import UsersDataPage from "../../../hr/pages/basic_information_management/user_management/Existing/UsersDataPage.jsx";
import DepartmentDataPage from "../../../hr/pages/basic_information_management/department_management/Existing/DepartmentDataPage.jsx";
import WorkcenterPage from "../../../production/pages/basic_data/Workcenter/WorkcenterPage.jsx";
import ProcessDetailsPage from "../../../production/pages/basic_data/ProcessDetails/ProcessDetailsPage.jsx";
import WorkerPage from "../../../production/pages/resource_data/WorkerPage.jsx";
import CustomErrorPage from "../custom_error/CustomErrorPage.jsx";
import DashboardPage from "../../../integration/pages/DashBoard/DashboardPage.jsx";
import FinanceDashboardPage from "../../../financial/pages/dash_board/FinanceDashboardPage.jsx";
import ProductionDashboardPage from "../../../production/pages/ProductionDashboardPage.jsx";
import HRDashboardPage from "../../../hr/pages/dash_board/HRDashboardPage.jsx";
import LogisticsDashboardPage from "../../../logistics/pages/LogisticsDashboardPage.jsx";
import PendingVoucherInputPage from "../../../financial/pages/voucher_entry/pending_voucher_input/PendingVoucherInputPage.jsx";
import UserPermissionPage from "../../../integration/pages/basic_information_management/UserPermission/UserPermissionPage.jsx";
import SystemEnvironmentSettingsPage from "../../../financial/pages/basic_information_management/system_environment_settings/SystemEnvironmentSettingsPage.jsx";
import PendingVoucherApprovalPage from "../../../financial/pages/voucher_entry/pending_voucher_approval/PendingVoucherApprovalPage.jsx";
import ProcessRoutingPage from "../../../production/pages/basic_data/ProcessRoutingPage.jsx";
import SBomPage from "../../../production/pages/basic_data/SBomPage.jsx";
import CompanyInfoEditPage from "../../../integration/pages/basic_information_management/company_info_edit/CompanyInfoEditPage.jsx";
import VoucherListPage from "../../../financial/pages/voucher_entry/voucher_list/VoucherListPage.jsx";
import SalesPurchaseVoucherEntryPage from "../../../financial/pages/voucher_entry/sales_purchase_voucher_entry/SalesPurchaseVoucherEntryPage.jsx";
import ElectronicTaxInvoicePage from "../../../financial/pages/voucher_entry/electronic_taxInvoice/ElectronicTaxInvoicePage.jsx";
import ClientLedgerPage from "../../../financial/pages/ledger/client_ledger/ClientLedgerPage.jsx";
import ClientAccountLedgerPage from "../../../financial/pages/ledger/client_account_ledger/ClientAccountLedgerPage.jsx";
import AccountLedgerPage from "../../../financial/pages/ledger/account_ledger/AccountLedgerPage.jsx";
import CashBookPage from "../../../financial/pages/ledger/cash_book/CashBookPage.jsx";
import DailyMonthlyReportPage from "../../../financial/pages/ledger/daily_monthly_report/DailyMonthlyReportPage.jsx";
import JournalPage from "../../../financial/pages/ledger/journal/JournalPage.jsx";
import GeneralLedgerPage from "../../../financial/pages/ledger/general_ledger/GeneralLedgerPage.jsx";
import SalesPurchaseLedgerPage from "../../../financial/pages/ledger/sales_purchase_ledger/SalesPurchaseLedgerPage.jsx";
import TaxInvoiceStatusPage from "../../../financial/pages/ledger/tax_invoice_status/TaxInvoiceStatusPage.jsx";
import VoucherPrintPage from "../../../financial/pages/ledger/voucher_print/VoucherPrintPage.jsx";
import ClosingDataEntryPage from "../../../financial/pages/closing_financial_statements/closing_data_entry/ClosingDataEntryPage.jsx";
import TrialBalancePage from "../../../financial/pages/closing_financial_statements/trial_balance/TrialBalancePage.jsx";
import FinancialPositionPage from "../../../financial/pages/closing_financial_statements/financial_position/FinancialPositionPage.jsx";
import IncomeStatementPage from "../../../financial/pages/closing_financial_statements/income_statement/IncomeStatementPage.jsx";
import CostStatementPage
    from "../../../financial/pages/closing_financial_statements/cost_statement/CostStatementPage.jsx";
import ProfitDistributionStatementPage
    from "../../../financial/pages/closing_financial_statements/profit_distribution_statement/ProfitDistributionStatementPage.jsx";
import CashFlowStatementPage
    from "../../../financial/pages/closing_financial_statements/cash_flow_statement/CashFlowStatementPage.jsx";
import EquityChangesStatementPage
    from "../../../financial/pages/closing_financial_statements/equity_changes_statement/EquityChangesStatementPage.jsx";
import ClosingAnnexStatementPage
    from "../../../financial/pages/closing_financial_statements/closing_annex_statement/ClosingAnnexStatementPage.jsx";
import PreviousFinancialPositionPage
    from "../../../financial/pages/previous_financial_statement/previous_financial_statement/PreviousFinancialPositionPage.jsx";
import PreviousIncomeStatementPage
    from "../../../financial/pages/previous_financial_statement/previous_income_statement/PreviousIncomeStatementPage.jsx";
import PreviousCostStatementPage
    from "../../../financial/pages/previous_financial_statement/previous_cost_statement/PreviousCostStatementPage.jsx";
import PreviousProfitDistributionPage
    from "../../../financial/pages/previous_financial_statement/previous_profit_distribution/PreviousProfitDistributionPage.jsx";
import ClientInitialCarryoverPage
    from "../../../financial/pages/previous_financial_statement/client_initial_carryover/ClientInitialCarryoverPage.jsx";
import ClosingCarryoverPage
    from "../../../financial/pages/previous_financial_statement/closing_carryover/ClosingCarryoverPage.jsx";
import FixedAssetRegistrationPage
    from "../../../financial/pages/fixed_assets_and_depreciation/fixed_asset_registration/FixedAssetRegistrationPage.jsx";
import UndepreciatedAmortizationPage
    from "../../../financial/pages/fixed_assets_and_depreciation/undepreciated_amortization/UndepreciatedAmortizationPage.jsx";
import TransferredAssetAmortizationPage
    from "../../../financial/pages/fixed_assets_and_depreciation/transferred_asset_amortization/TransferredAssetAmortizationPage.jsx";
import AssetRegisterPage
    from "../../../financial/pages/fixed_assets_and_depreciation/asset_register/AssetRegisterPage.jsx";
import BillsReceivableStatusPage
    from "../../../financial/pages/fund_management/bills_receivable_status/BillsReceivableStatusPage.jsx";
import BillsPayableStatusPage
    from "../../../financial/pages/fund_management/bills_payable_status/BillsPayableStatusPage.jsx";
import DailyFundsStatementPage
    from "../../../financial/pages/fund_management/daily_funds_statemen/DailyFundsStatementPage.jsx";
import DepositsStatusPage from "../../../financial/pages/fund_management/deposits_status/DepositsStatusPage.jsx";
import EmployeeManagementPage
    from "../../../hr/pages/basic_information_management/employee_management/EmployeeManagementPage.jsx";
import UserManagementPage from "../../../hr/pages/basic_information_management/user_management/UserManagementPage.jsx";
import DepartmentManagementPage
    from "../../../hr/pages/basic_information_management/department_management/DepartmentManagementPage.jsx";
import AssignmentManagementPage
    from "../../../hr/pages/basic_information_management/assignment_management/AssignmentManagementPage.jsx";
import PerformanceEvaluationPage
    from "../../../hr/pages/basic_information_management/performance_evaluation/PerformanceEvaluationPage.jsx";
import RetirementManagementPage
    from "../../../hr/pages/basic_information_management/retirement_management/RetirementManagementPage.jsx";
import AttendanceManagementPage
    from "../../../hr/pages/attendance_management/attendance_management/AttendanceManagementPage.jsx";
import LeaveManagementPage from "../../../hr/pages/attendance_management/leave_management/LeaveManagementPage.jsx";
import OvertimeManagementPage
    from "../../../hr/pages/attendance_management/overtime_management/OvertimeManagementPage.jsx";
import JobPostingManagementPage
    from "../../../hr/pages/recruitment_management/job_posting_management/JobPostingManagementPage.jsx";
import ApplicantManagementPage
    from "../../../hr/pages/recruitment_management/applicant_management/ApplicantManagementPage.jsx";
import ApplicationManagementPage
    from "../../../hr/pages/recruitment_management/application_management/ApplicationManagementPage.jsx";
import InterviewManagementPage
    from "../../../hr/pages/recruitment_management/interview_management/InterviewManagementPage.jsx";
import JobOfferManagementPage
    from "../../../hr/pages/recruitment_management/job_offer_management/JobOfferManagementPage.jsx";
import SalarySettlementPage from "../../../hr/pages/payroll_management/salary_settlement/SalarySettlementPage.jsx";
import DeductionManagementPage
    from "../../../hr/pages/payroll_management/deduction_management/DeductionManagementPage.jsx";
import PaymentItemManagementPage
    from "../../../hr/pages/payroll_management/payment_item_management/PaymentItemManagementPage.jsx";
import SocialInsurancePage from "../../../hr/pages/payroll_management/social_insurance/SocialInsurancePage.jsx";
import PayStatementPage from "../../../hr/pages/payroll_management/pay_statement/PayStatementPage.jsx";
import RetirementBenefitEstimationPage
    from "../../../hr/pages/retirement_management/retirement_benefit_estimation/RetirementBenefitEstimationPage.jsx";
import RetirementSettlementPage
    from "../../../hr/pages/retirement_management/retirement_settlement/RetirementSettlementPage.jsx";
import PensionManagementPage
    from "../../../hr/pages/retirement_management/pension_management/PensionManagementPage.jsx";
import WithholdingTaxDeclarationPage
    from "../../../hr/pages/tax_management/withholding_tax_declaration/WithholdingTaxDeclarationPage.jsx";
import LocalIncomeTaxDeclarationPage
    from "../../../hr/pages/tax_management/local_income_tax_declaration/LocalIncomeTaxDeclarationPage.jsx";
import PaymentStatementIssuancePage
    from "../../../hr/pages/tax_management/payment_statement_issuance/PaymentStatementIssuancePage.jsx";
import BusinessIncomeManagementPage
    from "../../../hr/pages/tax_management/business_income_management/BusinessIncomeManagementPage.jsx";
import OtherIncomeManagementPage
    from "../../../hr/pages/tax_management/other_income_management/OtherIncomeManagementPage.jsx";

// 컴포넌트 매핑 객체 생성
const componentsMap = { AccountSubjectPage, EquipmentDataPage, MaintenanceHistoryPage, ClientRegistrationPage, WorkcenterPage,
    ProcessDetailsPage, WorkerPage, IntegrationDashboardPage: DashboardPage,FinanceDashboardPage, ProductionDashboardPage,
    HRDashboardPage, LogisticsDashboardPage, PendingVoucherInputPage, UserPermissionPage, SystemEnvironmentSettingsPage,
    PendingVoucherApprovalPage, ProcessRoutingPage, SBomPage, CompanyInfoEditPage, VoucherListPage, SalesPurchaseVoucherEntryPage,
    ElectronicTaxInvoicePage, ClientLedgerPage, ClientAccountLedgerPage, AccountLedgerPage, CashBookPage, DailyMonthlyReportPage,
    JournalPage, GeneralLedgerPage, SalesPurchaseLedgerPage, TaxInvoiceStatusPage, VoucherPrintPage, ClosingDataEntryPage,
    TrialBalancePage, FinancialPositionPage, IncomeStatementPage, CostStatementPage, ProfitDistributionStatementPage,
    CashFlowStatementPage, EquityChangesStatementPage, ClosingAnnexStatementPage, PreviousFinancialPositionPage, PreviousIncomeStatementPage,
    PreviousCostStatementPage, PreviousProfitDistributionPage, ClientInitialCarryoverPage, ClosingCarryoverPage, FixedAssetRegistrationPage,
    UndepreciatedAmortizationPage, TransferredAssetAmortizationPage, AssetRegisterPage, BillsReceivableStatusPage, BillsPayableStatusPage,
    DailyFundsStatementPage, DepositsStatusPage, EmployeeManagementPage, UserManagementPage, DepartmentManagementPage, AssignmentManagementPage,
    PerformanceEvaluationPage, RetirementManagementPage, AttendanceManagementPage, LeaveManagementPage, OvertimeManagementPage, JobPostingManagementPage,
    ApplicantManagementPage, ApplicationManagementPage, InterviewManagementPage, JobOfferManagementPage, SalarySettlementPage, DeductionManagementPage,
    PaymentItemManagementPage, SocialInsurancePage, PayStatementPage, RetirementBenefitEstimationPage, RetirementSettlementPage, PensionManagementPage,
    WithholdingTaxDeclarationPage, LocalIncomeTaxDeclarationPage, PaymentStatementIssuancePage, BusinessIncomeManagementPage, OtherIncomeManagementPage,



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