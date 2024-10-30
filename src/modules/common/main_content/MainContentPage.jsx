import React, { Component } from 'react';
import {Result, Button, Typography} from 'antd';
import { Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import MainContentHook from './MainContentHook.jsx';
import AntdSkeleton from "./AntdSkeleton.jsx";
import AccountSubjectPage from "../../financial/basic_information_management/account_subject/AccountSubjectPage.jsx";
import EquipmentDataPage from "../../production/resource_data_management/equipment_data_management/EquipmentDataPage.jsx";
import MaintenanceHistoryPage from "../../production/resource_data_management/maintenance_history_management/MaintenanceHistoryPage.jsx";
import ClientRegistrationPage
    from "../../financial/basic_information_management/client_registration/ClientRegistrationPage.jsx";
import UserPermissionPage
    from "../../integration/pages/basic_information_management/UserPermission/UserPermissionPage.jsx";
import PendingVoucherApprovalPage
    from "../../financial/voucher_entry/pending_voucher_approval/PendingVoucherApprovalPage.jsx";
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
import ProductionDashboardPage from "../../production/dash_board/ProductionDashboardPage.jsx";
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
import WorkerPage from "../../production/resource_data_management/worker_management/WorkerPage.jsx";
import HRDashboardPage from "../../hr/dash_board/HRDashboardPage.jsx";
import PreviousCostStatementPage
    from "../../financial/previous_financial_statement/previous_cost_statement/PreviousCostStatementPage.jsx";
import DepositsStatusPage from "../../financial/fund_management/deposits_status/DepositsStatusPage.jsx";
import VoucherPrintPage from "../../financial/ledger/voucher_print/VoucherPrintPage.jsx";
import FinanceDashboardPage from "../../financial/dash_board/FinanceDashboardPage.jsx";
import BomPage from "../../production/basic_information_management/bom_management/BomPage.jsx";
import SystemEnvironmentSettingsPage
    from "../../financial/basic_information_management/system_environment_settings/SystemEnvironmentSettingsPage.jsx";
import PendingSalesPurchaseVoucherInputPage from "../../financial/voucher_entry/pending_sales_purchase_voucher_input/PendingSalesPurchaseVoucherInputPage.jsx";
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
import ProductManagementPage from "../../logistics/basic_information_management/product_management/ProductManagementPage.jsx";
import ItemGroupManagementPage
    from "../../logistics/basic_information_management/item_group_management/ItemGroupManagementPage.jsx";
import WarehouseRegistrationPage from "../../logistics/basic_information_management/warehouse_registration/WarehouseRegistrationPage.jsx";
import QuotationPage from "../../logistics/sales_management/quotation/QuotationPage.jsx";
import OrderFormPage from "../../logistics/sales_management/order_form/OrderFormPage.jsx";
import SalesPage from "../../logistics/sales_management/sales/SalesPage.jsx";
import ShipmentInstructionPage from "../../logistics/sales_management/sales_management/ShipmentInstructionPage.jsx";
import ShippingOrderPage from "../../logistics/sales_management/shipping_order/ShippingOrderPage.jsx";
import PurchaseRequestPage from "../../logistics/purchase_management/purchase_request/PurchaseRequestPage.jsx";
import PurchasePlanPage from "../../logistics/purchase_management/purchase_plan/PurchasePlanPage.jsx";
import PriceRequestPage from "../../logistics/purchase_management/price_request/PriceRequestPage.jsx";
import PurchaseOrderPage from "../../logistics/purchase_management/purchase_order/PurchaseOrderPage.jsx";
import PurchasePage from "../../logistics/purchase_management/purchase/PurchasePage.jsx";
import ReceivingOrderPage
    from "../../logistics/purchase_management/receiving_order/ReceivingOrderPage.jsx";
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
import WorkcenterManagementPage
    from "../../production/basic_information_management/workcenter_management/WorkcenterManagementPage.jsx";
import ProcessDetailsPage
    from "../../production/basic_information_management/process_details_management/ProcessDetailsPage.jsx";
import RoutingManagementPage
    from "../../production/basic_information_management/routing_management/RoutingManagementPage.jsx";
import MaterialDataPage from "../../production/resource_data_management/material_data_management/MaterialDataPage.jsx";
import WasteManagementPage from "../../production/resource_data_management/waste_management/WasteManagementPage.jsx";
import ProductionRequestPage
    from "../../production/production_schedule_management/production_request/ProductionRequestPage.jsx";
import MasterProductionPage
    from "../../production/production_schedule_management/master_production_schedule/MasterProductionPage.jsx";
import MaterialInputStatusPage
    from "../../production/production_schedule_management/material_input_status_management/MaterialInputStatusPage.jsx";
import MrpPage from "../../production/production_schedule_management/material_requirements_planning/MrpPage.jsx";
import MakeToOrderPlanPage
    from "../../production/production_schedule_management/make_to_order_plan/MakeToOrderPlanPage.jsx";
import MakeToStockPlanPage
    from "../../production/production_schedule_management/make_to_stock_plan/MakeToStockPlanPage.jsx";
import ProductionOrderConfirmationPage from "../../production/work_order_management/production_order_confirmation/ProductionOrderConfirmationPage.jsx";
import ProductionOrderRegistrationPage
    from "../../production/work_order_management/production_order_registration/ProductionOrderRegistrationPage.jsx";
import AssignmentHistoryPage
    from "../../production/work_order_management/assignment_history_management/AssignmentHistoryPage.jsx";
import WorkPerformancePage
    from "../../production/production_performance_management/work_performance_management/WorkPerformancePage.jsx";
import MonthlyWorkReportPage
    from "../../production/production_performance_management/monthly_work_report/MonthlyWorkReportPage.jsx";
import DailyWorkReportPage
    from "../../production/production_performance_management/daily_work_report/DailyWorkReportPage.jsx";
import DefectTypeManagementPage
    from "../../production/quality_management/defect_type_management/DefectTypeManagementPage.jsx";
import QualityInspectionPage
    from "../../production/quality_management/quality_inspection_management/QualityInspectionPage.jsx";
import LotManagementPage from "../../production/quality_management/lot_management/LotManagementPage.jsx";
import SerialNumberPage from "../../production/quality_management/serial_number_management/SerialNumberPage.jsx";
import GoodsReceiptPage from "../../production/quality_management/goods_receipt_management/GoodsReceiptPage.jsx";
import OutsourcingOrderPage
    from "../../production/outsourcing_management/outsourcing_order_management/OutsourcingOrderPage.jsx";
import OutsourcingInspectionPage
    from "../../production/outsourcing_management/outsourcing_inspection_management/OutsourcingInspectionPage.jsx";
import PendingSalesPurchaseVoucherApprovalPage
    from "../../financial/voucher_entry/pending_sales_purchase_voucher_approval/PendingSalesPurchaseVoucherApprovalPage.jsx";
import SalaryEnvironmentSettingsPage
    from "../../hr/basic_information_management/salary_environment_setting/SalaryEnvironmentSettingsPage.jsx";
import SalaryRegistrationPage from "../../hr/payroll_management/salary_registration/SalaryRegistrationPage.jsx";
import ProductionOrderClosingPage
    from "../../production/work_order_management/production_order_closing/ProductionOrderClosingPage.jsx";

import SalePlanPage from "../../logistics/sales_management/sales_plan/SalePlanPage.jsx";

import SalaryRegistrationPage from "../../hr/payroll_management/salary_registration/SalaryRegistrationPage.jsx";
import ProductionOrderClosingPage
    from "../../production/work_order_management/production_order_closing/ProductionOrderClosingPage.jsx";


// 필요한 페이지 컴포넌트들

// 컴포넌트 매핑 객체 생성
const componentsMap = { AccountSubjectPage, EquipmentDataPage, MaintenanceHistoryPage, ClientRegistrationPage,
    WorkerPage, IntegrationDashboardPage,FinanceDashboardPage, ProductionDashboardPage, HRDashboardPage, LogisticsDashboardPage, PendingVoucherInputPage,
    UserPermissionPage, SystemEnvironmentSettingsPage, PendingVoucherApprovalPage, BomPage, VoucherListPage,
    PendingSalesPurchaseVoucherInputPage, PendingSalesPurchaseVoucherApprovalPage, ElectronicTaxInvoicePage, ClientLedgerPage, ClientAccountLedgerPage, AccountLedgerPage, CashBookPage, DailyMonthlyReportPage,
    JournalPage, GeneralLedgerPage, SalesPurchaseLedgerPage, TaxInvoiceStatusPage, VoucherPrintPage, ClosingDataEntryPage, TrialBalancePage, FinancialPositionPage, IncomeStatementPage, CostStatementPage, ProfitDistributionStatementPage,
    CashFlowStatementPage, EquityChangesStatementPage, ClosingAnnexStatementPage, PreviousFinancialPositionPage, PreviousIncomeStatementPage,
    PreviousCostStatementPage, PreviousProfitDistributionPage, ClientInitialCarryoverPage, ClosingCarryoverPage, FixedAssetRegistrationPage,
    UndepreciatedAmortizationPage, TransferredAssetAmortizationPage, AssetRegisterPage, BillsReceivableStatusPage, BillsPayableStatusPage,
    DailyFundsStatementPage, DepositsStatusPage, EmployeeManagementPage, UserManagementPage, DepartmentManagementPage, AssignmentManagementPage,
    PerformanceEvaluationPage, RetirementManagementPage, AttendanceManagementPage, LeaveManagementPage, OvertimeManagementPage, JobPostingManagementPage,
    ApplicantManagementPage, ApplicationManagementPage, InterviewManagementPage, JobOfferManagementPage, SalarySettlementPage, DeductionManagementPage,
    PaymentItemManagementPage, SocialInsurancePage, PayStatementPage, RetirementBenefitEstimationPage, RetirementSettlementPage, PensionManagementPage,
    WithholdingTaxDeclarationPage, LocalIncomeTaxDeclarationPage, PaymentStatementIssuancePage, BusinessIncomeManagementPage, OtherIncomeManagementPage,
    ProductManagementPage, ItemGroupManagementPage, WarehouseRegistrationPage, QuotationPage, OrderFormPage, SalesPage, SalePlanPage ,ShipmentInstructionPage, ShippingOrderPage,
    PurchaseRequestPage, PurchasePlanPage, PriceRequestPage, PurchaseOrderPage, PurchasePage, ReceivingOrderPage: ReceivingOrderPage, ReturnRequestPage, ReturnStatusPage,
    ShipmentInstructionInquiryPage, ShipmentInstructionEntryPage, ShipmentInquiryPage, ShipmentEntryPage, ShipmentStatusPage, IncomingSchedulePage,
    IncomingProcessingPage, OutgoingSchedulePage, OutgoingStatusPage, OutgoingProcessingPage, AdjustmentProgressPage, InspectionInquiryPage, InspectionStatusPage,
    AdjustmentStatusPage, WorkcenterManagementPage, ProcessDetailsPage, RoutingManagementPage, MaterialDataPage, WasteManagementPage, ProductionRequestPage,
    MasterProductionPage, MaterialInputStatusPage, MrpPage, MakeToOrderPlanPage, MakeToStockPlanPage, ProductionOrderConfirmationPage, ProductionOrderRegistrationPage, AssignmentHistoryPage,
    WorkPerformancePage, MonthlyWorkReportPage, DailyWorkReportPage, DefectTypeManagementPage, QualityInspectionPage, LotManagementPage, SerialNumberPage, GoodsReceiptPage,
    OutsourcingOrderPage, OutsourcingInspectionPage, SalaryEnvironmentSettingsPage, SalaryRegistrationPage, ProductionOrderClosingPage
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