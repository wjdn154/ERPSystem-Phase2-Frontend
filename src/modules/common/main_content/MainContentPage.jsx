import React, { Component } from 'react';
import {Result, Button, Typography} from 'antd';
import { Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import MainContentHook from './MainContentHook.jsx';
import AntdSkeleton from "./AntdSkeleton.jsx";
import AccountSubjectPage from "../../financial/basic_information_management/account_subject/AccountSubjectPage.jsx";
import EquipmentDataPage from "../../production/Existing/pages/resource_data/EquipmentDataPage.jsx";
import MaintenanceHistoryPage from "../../production/Existing/pages/resource_data/MaintenanceHistoryPage.jsx";
import ClientRegistrationPage
    from "../../financial/basic_information_management/client_registration/ClientRegistrationPage.jsx";
import UserPermissionPage
    from "../../integration/pages/basic_information_management/UserPermission/UserPermissionPage.jsx";
import PendingVoucherApprovalPage
    from "../../financial/voucher_entry/pending_voucher_approval/PendingVoucherApprovalPage.jsx";
import CompanyInfoEditPage
    from "../../integration/pages/basic_information_management/company_info_edit/CompanyInfoEditPage.jsx";
import AccountLedgerPage from "../../financial/ledger/account_ledger/AccountLedgerPage.jsx";
import ClientLedgerPage from "../../financial/ledger/client_ledger/ClientLedgerPage.jsx";
import ClosingDataEntryPage
    from "../../financial/closing_financial_statements/closing_data_entry/ClosingDataEntryPage.jsx";
import ProfitDistributionStatementPage
    from "../../financial/closing_financial_statements/profit_distribution_statement/ProfitDistributionStatementPage.jsx";
import BillsPayableStatusPage from "../../financial/fund_management/bills_payable_status/BillsPayableStatusPage.jsx";
import UserManagementPage from "../../hr/basic_information_management/user_management/UserManagementPage.jsx";
import PerformanceEvaluationPage
    from "../../hr/basic_information_management/performance_evaluation/PerformanceEvaluationPage.jsx";
import AttendanceManagementPage
    from "../../hr/attendance_management/attendance_management/AttendanceManagementPage.jsx";
import OvertimeManagementPage from "../../hr/attendance_management/overtime_management/OvertimeManagementPage.jsx";
import JobOfferManagementPage from "../../hr/recruitment_management/job_offer_management/JobOfferManagementPage.jsx";
import SocialInsurancePage from "../../hr/payroll_management/social_insurance/SocialInsurancePage.jsx";
import GeneralLedgerPage from "../../financial/ledger/general_ledger/GeneralLedgerPage.jsx";
import ElectronicTaxInvoicePage
    from "../../financial/voucher_entry/electronic_taxInvoice/ElectronicTaxInvoicePage.jsx";
import LogisticsDashboardPage from "../../logistics/Existing/pages/LogisticsDashboardPage.jsx";
import PendingVoucherInputPage
    from "../../financial/voucher_entry/pending_voucher_input/PendingVoucherInputPage.jsx";
import ApplicationManagementPage
    from "../../hr/recruitment_management/application_management/ApplicationManagementPage.jsx";
import PayStatementPage from "../../hr/payroll_management/pay_statement/PayStatementPage.jsx";
import BusinessIncomeManagementPage
    from "../../hr/tax_management/business_income_management/BusinessIncomeManagementPage.jsx";
import DailyMonthlyReportPage from "../../financial/ledger/daily_monthly_report/DailyMonthlyReportPage.jsx";
import VoucherListPage from "../../financial/voucher_entry/voucher_list/VoucherListPage.jsx";
import DepartmentManagementPage
    from "../../hr/basic_information_management/department_management/DepartmentManagementPage.jsx";
import PaymentItemManagementPage
    from "../../hr/payroll_management/payment_item_management/PaymentItemManagementPage.jsx";
import ApplicantManagementPage
    from "../../hr/recruitment_management/applicant_management/ApplicantManagementPage.jsx";
import JournalPage from "../../financial/ledger/journal/JournalPage.jsx";
import AssignmentManagementPage
    from "../../hr/basic_information_management/assignment_management/AssignmentManagementPage.jsx";
import AssetRegisterPage from "../../financial/fixed_assets_and_depreciation/asset_register/AssetRegisterPage.jsx";
import ProductionDashboardPage from "../../production/Existing/pages/ProductionDashboardPage.jsx";
import OtherIncomeManagementPage
    from "../../hr/tax_management/other_income_management/OtherIncomeManagementPage.jsx";
import ClientAccountLedgerPage from "../../financial/ledger/client_account_ledger/ClientAccountLedgerPage.jsx";
import TaxInvoiceStatusPage from "../../financial/ledger/tax_invoice_status/TaxInvoiceStatusPage.jsx";
import RetirementManagementPage
    from "../../hr/basic_information_management/retirement_management/RetirementManagementPage.jsx";
import LocalIncomeTaxDeclarationPage
    from "../../hr/tax_management/local_income_tax_declaration/LocalIncomeTaxDeclarationPage.jsx";
import RetirementBenefitEstimationPage
    from "../../hr/retirement_management/retirement_benefit_estimation/RetirementBenefitEstimationPage.jsx";
import PreviousIncomeStatementPage
    from "../../financial/previous_financial_statement/previous_income_statement/PreviousIncomeStatementPage.jsx";
import IntegrationDashboardPage from "../../integration/pages/DashBoard/DashboardPage.jsx";
import WorkerPage from "../../production/Existing/pages/resource_data/WorkerPage.jsx";
import HRDashboardPage from "../../hr/dash_board/HRDashboardPage.jsx";
import PreviousCostStatementPage
    from "../../financial/previous_financial_statement/previous_cost_statement/PreviousCostStatementPage.jsx";
import DepositsStatusPage from "../../financial/fund_management/deposits_status/DepositsStatusPage.jsx";
import VoucherPrintPage from "../../financial/ledger/voucher_print/VoucherPrintPage.jsx";
import FinanceDashboardPage from "../../financial/dash_board/FinanceDashboardPage.jsx";
import SBomPage from "../../production/Existing/pages/basic_data/SBomPage.jsx";
import SystemEnvironmentSettingsPage
    from "../../financial/basic_information_management/system_environment_settings/SystemEnvironmentSettingsPage.jsx";
import WorkcenterPage from "../../production/Existing/pages/basic_data/Workcenter/WorkcenterPage.jsx";
import SalesPurchaseVoucherEntryPage
    from "../../financial/voucher_entry/sales_purchase_voucher_entry/SalesPurchaseVoucherEntryPage.jsx";
import CashBookPage from "../../financial/ledger/cash_book/CashBookPage.jsx";
import TrialBalancePage from "../../financial/closing_financial_statements/trial_balance/TrialBalancePage.jsx";
import FinancialPositionPage
    from "../../financial/closing_financial_statements/financial_position/FinancialPositionPage.jsx";
import SalesPurchaseLedgerPage from "../../financial/ledger/sales_purchase_ledger/SalesPurchaseLedgerPage.jsx";
import IncomeStatementPage
    from "../../financial/closing_financial_statements/income_statement/IncomeStatementPage.jsx";
import CostStatementPage from "../../financial/closing_financial_statements/cost_statement/CostStatementPage.jsx";
import CashFlowStatementPage
    from "../../financial/closing_financial_statements/cash_flow_statement/CashFlowStatementPage.jsx";
import EquityChangesStatementPage
    from "../../financial/closing_financial_statements/equity_changes_statement/EquityChangesStatementPage.jsx";
import ClosingAnnexStatementPage
    from "../../financial/closing_financial_statements/closing_annex_statement/ClosingAnnexStatementPage.jsx";
import PreviousFinancialPositionPage
    from "../../financial/previous_financial_statement/previous_financial_statement/PreviousFinancialPositionPage.jsx";
import PreviousProfitDistributionPage
    from "../../financial/previous_financial_statement/previous_profit_distribution/PreviousProfitDistributionPage.jsx";
import ClosingCarryoverPage
    from "../../financial/previous_financial_statement/closing_carryover/ClosingCarryoverPage.jsx";
import FixedAssetRegistrationPage
    from "../../financial/fixed_assets_and_depreciation/fixed_asset_registration/FixedAssetRegistrationPage.jsx";
import TransferredAssetAmortizationPage
    from "../../financial/fixed_assets_and_depreciation/transferred_asset_amortization/TransferredAssetAmortizationPage.jsx";
import BillsReceivableStatusPage
    from "../../financial/fund_management/bills_receivable_status/BillsReceivableStatusPage.jsx";
import DailyFundsStatementPage
    from "../../financial/fund_management/daily_funds_statemen/DailyFundsStatementPage.jsx";
import EmployeeManagementPage
    from "../../hr/basic_information_management/employee_management/EmployeeManagementPage.jsx";
import LeaveManagementPage from "../../hr/attendance_management/leave_management/LeaveManagementPage.jsx";
import InterviewManagementPage
    from "../../hr/recruitment_management/interview_management/InterviewManagementPage.jsx";
import SalarySettlementPage from "../../hr/payroll_management/salary_settlement/SalarySettlementPage.jsx";
import DeductionManagementPage from "../../hr/payroll_management/deduction_management/DeductionManagementPage.jsx";
import RetirementSettlementPage
    from "../../hr/retirement_management/retirement_settlement/RetirementSettlementPage.jsx";
import WithholdingTaxDeclarationPage
    from "../../hr/tax_management/withholding_tax_declaration/WithholdingTaxDeclarationPage.jsx";
import PaymentStatementIssuancePage
    from "../../hr/tax_management/payment_statement_issuance/PaymentStatementIssuancePage.jsx";
import UndepreciatedAmortizationPage
    from "../../financial/fixed_assets_and_depreciation/undepreciated_amortization/UndepreciatedAmortizationPage.jsx";
import ClientInitialCarryoverPage
    from "../../financial/previous_financial_statement/client_initial_carryover/ClientInitialCarryoverPage.jsx";
import JobPostingManagementPage
    from "../../hr/recruitment_management/job_posting_management/JobPostingManagementPage.jsx";
import PensionManagementPage from "../../hr/retirement_management/pension_management/PensionManagementPage.jsx";
import CustomErrorPage from "../custom_error/CustomErrorPage.jsx";
import ItemManagementPage from "../../logistics/basic_information_management/item_management/ItemManagementPage.jsx";
import ItemGroupManagementPage
    from "../../logistics/basic_information_management/item_group_management/ItemGroupManagementPage.jsx";
import WarehouseRegistrationPage from "../../logistics/basic_information_management/warehouse_registration/WarehouseRegistrationPage.jsx";
import QuotationPage from "../../logistics/sales_management/quotation/QuotationPage.jsx";
import OrderFormPage from "../../logistics/sales_management/order_form/OrderFormPage.jsx";
import SalesPage from "../../logistics/sales_management/sales/SalesPage.jsx";
import ShipmentInstructionPage from "../../logistics/sales_management/sales_management/ShipmentInstructionPage.jsx";
import ShipmentPage from "../../logistics/sales_management/shipment/ShipmentPage.jsx";
import PurchaseRequestPage from "../../logistics/purchase_management/purchase_request/PurchaseRequestPage.jsx";
import PurchasePlanPage from "../../logistics/purchase_management/purchase_plan/PurchasePlanPage.jsx";
import PriceRequestPage from "../../logistics/purchase_management/price_request/PriceRequestPage.jsx";
import PurchaseOrderPage from "../../logistics/purchase_management/purchase_order/PurchaseOrderPage.jsx";
import PurchasePage from "../../logistics/purchase_management/purchase/PurchasePage.jsx";
import ReceivingInstructionPage
    from "../../logistics/purchase_management/receiving_instruction/ReceivingInstructionPage.jsx";
import ReturnRequestPage from "../../logistics/return_management/return_request/ReturnRequestPage.jsx";
import ReturnStatusPage from "../../logistics/return_management/return_status/ReturnStatusPage.jsx";
import ShipmentInstructionInquiryPage
    from "../../logistics/shipment_instruction_inquiry/shipment_instruction/ShipmentInstructionInquiryPage.jsx";
import ShipmentInstructionEntryPage
    from "../../logistics/shipment_instruction_inquiry/shipment_instruction_entry/ShipmentInstructionEntryPage.jsx";
import ShipmentInquiryPage from "../../logistics/shipment/shipment_inquiry/ShipmentInquiryPage.jsx";
import ShipmentEntryPage from "../../logistics/shipment/shipment_entry/ShipmentEntryPage.jsx";
import ShipmentStatusPage from "../../logistics/shipment/shipment_status/ShipmentStatusPage.jsx";
import IncomingSchedulePage from "../../logistics/incoming_management/incoming_schedule/IncomingSchedulePage.jsx";
import IncomingProcessingPage from "../../logistics/incoming_management/incoming_processing/IncomingProcessingPage.jsx";
import OutgoingSchedulePage from "../../logistics/outgoing_management/outgoing_schedule/OutgoingSchedulePage.jsx";
import OutgoingStatusPage from "../../logistics/outgoing_management/outgoing_status/OutgoingStatusPage.jsx";
import OutgoingProcessingPage from "../../logistics/outgoing_management/outgoing_processing/OutgoingProcessingPage.jsx";
import AdjustmentProgressPage
    from "../../logistics/inventory_adjustment/adjustment_progress/AdjustmentProgressPage.jsx";
import InspectionInquiryPage from "../../logistics/inventory_adjustment/inventory_inspection/InspectionInquiryPage.jsx";
import InspectionStatusPage from "../../logistics/inventory_adjustment/inspection_status/InspectionStatusPage.jsx";
import AdjustmentStatusPage from "../../logistics/inventory_adjustment/adjustment_status/AdjustmentStatusPage.jsx";
import WorkshopManagementPage
    from "../../production/basic_information_management/workshop_management/WorkshopManagementPage.jsx";
import ProcessDetailsPage
    from "../../production/basic_information_management/process_details_management/ProcessDetailsPage.jsx";
import RoutingManagementPage
    from "../../production/basic_information_management/routing_management/RoutingManagementPage.jsx";

// 필요한 페이지 컴포넌트들

// 컴포넌트 매핑 객체 생성
const componentsMap = { AccountSubjectPage, EquipmentDataPage, MaintenanceHistoryPage, ClientRegistrationPage, WorkcenterPage,
    WorkerPage, IntegrationDashboardPage,FinanceDashboardPage, ProductionDashboardPage, HRDashboardPage, LogisticsDashboardPage, PendingVoucherInputPage,
    UserPermissionPage, SystemEnvironmentSettingsPage, PendingVoucherApprovalPage, SBomPage, CompanyInfoEditPage, VoucherListPage,
    SalesPurchaseVoucherEntryPage, ElectronicTaxInvoicePage, ClientLedgerPage, ClientAccountLedgerPage, AccountLedgerPage, CashBookPage, DailyMonthlyReportPage,
    JournalPage, GeneralLedgerPage, SalesPurchaseLedgerPage, TaxInvoiceStatusPage, VoucherPrintPage, ClosingDataEntryPage, TrialBalancePage, FinancialPositionPage, IncomeStatementPage, CostStatementPage, ProfitDistributionStatementPage,
    CashFlowStatementPage, EquityChangesStatementPage, ClosingAnnexStatementPage, PreviousFinancialPositionPage, PreviousIncomeStatementPage,
    PreviousCostStatementPage, PreviousProfitDistributionPage, ClientInitialCarryoverPage, ClosingCarryoverPage, FixedAssetRegistrationPage,
    UndepreciatedAmortizationPage, TransferredAssetAmortizationPage, AssetRegisterPage, BillsReceivableStatusPage, BillsPayableStatusPage,
    DailyFundsStatementPage, DepositsStatusPage, EmployeeManagementPage, UserManagementPage, DepartmentManagementPage, AssignmentManagementPage,
    PerformanceEvaluationPage, RetirementManagementPage, AttendanceManagementPage, LeaveManagementPage, OvertimeManagementPage, JobPostingManagementPage,
    ApplicantManagementPage, ApplicationManagementPage, InterviewManagementPage, JobOfferManagementPage, SalarySettlementPage, DeductionManagementPage,
    PaymentItemManagementPage, SocialInsurancePage, PayStatementPage, RetirementBenefitEstimationPage, RetirementSettlementPage, PensionManagementPage,
    WithholdingTaxDeclarationPage, LocalIncomeTaxDeclarationPage, PaymentStatementIssuancePage, BusinessIncomeManagementPage, OtherIncomeManagementPage,
    ItemManagementPage, ItemGroupManagementPage, WarehouseRegistrationPage, QuotationPage, OrderFormPage, SalesPage, ShipmentInstructionPage, ShipmentPage,
    PurchaseRequestPage, PurchasePlanPage, PriceRequestPage, PurchaseOrderPage, PurchasePage, ReceivingInstructionPage, ReturnRequestPage, ReturnStatusPage,
    ShipmentInstructionInquiryPage, ShipmentInstructionEntryPage, ShipmentInquiryPage, ShipmentEntryPage, ShipmentStatusPage, IncomingSchedulePage,
    IncomingProcessingPage, OutgoingSchedulePage, OutgoingStatusPage, OutgoingProcessingPage, AdjustmentProgressPage, InspectionInquiryPage, InspectionStatusPage,
    AdjustmentStatusPage, WorkshopManagementPage, ProcessDetailsPage, RoutingManagementPage

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