// MUI 아이콘 모듈에서 필요한 아이콘들을 임포트
import FeaturedPlayListIcon from "@mui/icons-material/FeaturedPlayList";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import PrecisionManufacturingIcon from "@mui/icons-material/PrecisionManufacturing";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import GroupsIcon from "@mui/icons-material/Groups";
import { FINANCIAL_API, PRODUCTION_API } from "./apiConstants.jsx";
import AccountSubjectPage from "../modules/financial/pages/AccountSubjectPage.jsx";
import MainContentPage from "../modules/integration/pages/MainContentPage.jsx";
import EquipmentDataPage from "../modules/production/pages/EquipmentDataPage.jsx";
import MaintenanceHistoryPage from "../modules/production/pages/MaintenanceHistoryPage.jsx";

// 메인 메뉴 아이템 배열을 정의, 각 메뉴는 텍스트와 아이콘으로 구성
export const menuItems = [
  { text: "그룹웨어", icon: <FeaturedPlayListIcon /> },
  { text: "재무회계", icon: <AttachMoneyIcon /> },
  { text: "인사관리", icon: <GroupsIcon /> },
  { text: "물류관리", icon: <LocalShippingIcon /> },
  { text: "생산관리", icon: <PrecisionManufacturingIcon /> },
];

// 서브 메뉴 아이템 객체를 정의, 메인 메뉴별로 다양한 서브 메뉴 항목들을 배열로 관리
export const subMenuItems = {
  그룹웨어: [
    {
      text: "기초정보관리",
      items: [{ text: "회사정보수정", component: null, apiPath: null }],
    },
  ],
  재무회계: [
    {
      text: "기초정보관리",
      items: [
        { text: "거래처등록", component: null, apiPath: null },
        {
          text: "계정과목및적요등록",
          component: AccountSubjectPage,
          apiPath: FINANCIAL_API.ACCOUNT_SUBJECTS_API,
        },
        { text: "환경등록", component: null, apiPath: null },
        { text: "업무용승용차등록", component: null, apiPath: null },
      ],
    },
    {
      text: "전표입력",
      items: [
        { text: "일반전표입력", component: null, apiPath: null },
        { text: "매입매출전표입력", component: null, apiPath: null },
        { text: "전자세금계산서발행", component: null, apiPath: null },
      ],
    },
    {
      text: "장부관리",
      items: [
        { text: "거래처원장", component: null, apiPath: null },
        { text: "거래처별계정과목별원장", component: null, apiPath: null },
        { text: "계정별원장", component: null, apiPath: null },
        { text: "현금출납장", component: null, apiPath: null },
        { text: "일계표(월계표)", component: null, apiPath: null },
        { text: "분개장", component: null, apiPath: null },
        { text: "총계정원장", component: null, apiPath: null },
        { text: "매입매출장", component: null, apiPath: null },
        { text: "세금계산서(계산서)현황", component: null, apiPath: null },
        { text: "전표출력", component: null, apiPath: null },
      ],
    },
    {
      text: "결산/재무제표",
      items: [
        { text: "결산자료입력", component: null, apiPath: null },
        { text: "합계잔액시산표", component: null, apiPath: null },
        { text: "재무상태표", component: null, apiPath: null },
        { text: "손익계산서", component: null, apiPath: null },
        { text: "제조원가명세서", component: null, apiPath: null },
        { text: "이익잉여금처분계산서", component: null, apiPath: null },
        { text: "현금흐름표", component: null, apiPath: null },
        { text: "자본변동표", component: null, apiPath: null },
        { text: "결산부속명세서", component: null, apiPath: null },
      ],
    },
    {
      text: "전기분재무제표",
      items: [
        { text: "전기분재무상태표", component: null, apiPath: null },
        { text: "전기분손익계산서", component: null, apiPath: null },
        { text: "전기분원가명세서", component: null, apiPath: null },
        { text: "전기분잉여금처분계산서", component: null, apiPath: null },
        { text: "거래처별초기이월", component: null, apiPath: null },
        { text: "마감후이월", component: null, apiPath: null },
      ],
    },
    {
      text: "고정자산및감가상각",
      items: [
        { text: "고정자산등록", component: null, apiPath: null },
        { text: "미상각분감가상각비", component: null, apiPath: null },
        { text: "양도자산감가상각비", component: null, apiPath: null },
        { text: "고정자산관리대장", component: null, apiPath: null },
      ],
    },
    {
      text: "자금관리",
      items: [
        { text: "받을어음현황", component: null, apiPath: null },
        { text: "지급어음현황", component: null, apiPath: null },
        { text: "일일자금명세(경리일보)", component: null, apiPath: null },
        { text: "예적금현황", component: null, apiPath: null },
      ],
    },
  ],
  인사관리: [
    {
      text: "기초 정보 관리",
      items: [
        { text: "민성이", component: null, apiPath: null },
        { text: "사원", component: null, apiPath: null },
        { text: "사용자 관리", component: null, apiPath: null },
        { text: "부서 관리", component: null, apiPath: null },
        { text: "발령 관리", component: null, apiPath: null },
        { text: "성과 평가 관리", component: null, apiPath: null },
        { text: "퇴사자 관리", component: null, apiPath: null },
      ],
    },
    {
      text: "출결 관리",
      items: [
        { text: "근태 관리", component: null, apiPath: null },
        { text: "휴가 관리", component: null, apiPath: null },
      ],
    },
    {
      text: "채용 관리",
      items: [
        { text: "채용 공고 관리", component: null, apiPath: null },
        { text: "지원자 관리", component: null, apiPath: null },
        { text: "지원서 관리", component: null, apiPath: null },
        { text: "인터뷰 관리", component: null, apiPath: null },
        { text: "채용 제안 관리", component: null, apiPath: null },
      ],
    },
  ],
  물류관리: [
    {
      text: "기초정보관리",
      items: [
        { text: "품목 관리", component: null, apiPath: null },
        { text: "품목 그룹 관리", component: null, apiPath: null },
        { text: "창고등록", component: null, apiPath: null },
      ],
    },
    {
      text: "영업 관리",
      items: [
        { text: "견적서", component: null, apiPath: null },
        { text: "주문서", component: null, apiPath: null },
        { text: "판매", component: null, apiPath: null },
        { text: "출하지시서", component: null, apiPath: null },
        { text: "출하", component: null, apiPath: null },
      ],
    },
    {
      text: "구매 관리",
      items: [
        { text: "발주 요청", component: null, apiPath: null },
        { text: "발주 계획", component: null, apiPath: null },
        { text: "단가 요청", component: null, apiPath: null },
        { text: "발주서", component: null, apiPath: null },
        { text: "구매", component: null, apiPath: null },
        { text: "입고지시서", component: null, apiPath: null },
      ],
    },
    {
      text: "반품 관리",
      items: [
        { text: "반품 접수", component: null, apiPath: null },
        { text: "반품 현황", component: null, apiPath: null },
      ],
    },
    {
      text: "출하지시서",
      items: [
        { text: "출하지시서조회", component: null, apiPath: null },
        { text: "출하지시서입력", component: null, apiPath: null },
      ],
    },
    {
      text: "출하",
      items: [
        { text: "출하조회", component: null, apiPath: null },
        { text: "출하입력", component: null, apiPath: null },
        { text: "출하현황", component: null, apiPath: null },
      ],
    },
    {
      text: "입고관리",
      items: [
        { text: "입고예정", component: null, apiPath: null },
        { text: "입고처리", component: null, apiPath: null },
      ],
    },
    {
      text: "출고관리",
      items: [
        { text: "출고예정", component: null, apiPath: null },
        { text: "출고예정현황", component: null, apiPath: null },
        { text: "출고처리", component: null, apiPath: null },
      ],
    },
    {
      text: "재고조정",
      items: [
        { text: "재고조정진행단계", component: null, apiPath: null },
        { text: "재고실사조회", component: null, apiPath: null },
        { text: "재고실사현황", component: null, apiPath: null },
        { text: "재고조정현황", component: null, apiPath: null },
      ],
    },
  ],
  생산관리: [
    {
      text: "기초정보관리",
      items: [
        { text: "작업장 관리", component: null, apiPath: null },
        { text: "LOT 관리", component: null, apiPath: null },
        { text: "Serial No 관리", component: null, apiPath: null },
      ],
    },
    {
      text: "자원관리",
      items: [
        { text: "작업자 관리", component: null, apiPath: null },
        { text: "자재 정보 관리", component: null, apiPath: null },
        {
          text: "설비 정보 관리",
          component: EquipmentDataPage,
          apiPath: PRODUCTION_API.EQUIPMENT_DATA_API,
        },
        {
          text: "유지보수 이력 관리",
          component: MaintenanceHistoryPage,
          apiPath: PRODUCTION_API.MAINTENANCE_HISTORY_API,
        },
      ],
    },
    {
      text: "공정 경로 관리",
      items: [
        { text: "공정 세부정보 관리", component: null, apiPath: null },
        { text: "Routing 관리", component: null, apiPath: null },
      ],
    },
    {
      text: "자재 소요 관리",
      items: [
        { text: "BOM 관리", component: null, apiPath: null },
        { text: "자재소요량 계획 관리", component: null, apiPath: null },
        { text: "실자재 투입 현황 관리", component: null, apiPath: null },
      ],
    },
    {
      text: "생산 계획 관리",
      items: [
        { text: "생산 의뢰 관리", component: null, apiPath: null },
        { text: "주문 생산 계획 관리", component: null, apiPath: null },
        { text: "재고 생산 계획 관리", component: null, apiPath: null },
        { text: "작업 지시 관리", component: null, apiPath: null },
      ],
    },
    {
      text: "생산 실적 관리",
      items: [
        { text: "작업 실적 관리", component: null, apiPath: null },
        { text: "불량군 관리", component: null, apiPath: null },
        { text: "불량 유형 관리", component: null, apiPath: null },
        { text: "품질 검사 관리", component: null, apiPath: null },
        { text: "생산품 입고 처리", component: null, apiPath: null },
        { text: "생산 일/월보 처리", component: null, apiPath: null },
      ],
    },
    {
      text: "외주/계약 관리",
      items: [
        { text: "외주 단가 관리", component: null, apiPath: null },
        { text: "외주 발주 관리", component: null, apiPath: null },
        { text: "외주 검사 관리", component: null, apiPath: null },
        { text: "외주 실적 관리", component: null, apiPath: null },
      ],
    },
  ],
};
