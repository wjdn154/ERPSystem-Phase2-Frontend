import HomeIcon from '@mui/icons-material/Home';
import InboxIcon from '@mui/icons-material/Inbox';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import PrecisionManufacturingIcon from '@mui/icons-material/PrecisionManufacturing';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import GroupsIcon from '@mui/icons-material/Groups';

export const menuItems = [
    { text: '마이페이지', icon: <HomeIcon /> },
    { text: '재무/회계', icon: <AttachMoneyIcon /> },
    { text: '인사관리', icon: <GroupsIcon /> },
    { text: '물류관리', icon: <LocalShippingIcon /> },
    { text: '생산관리', icon: <PrecisionManufacturingIcon /> },
];

export const subMenuItems = {
    '마이페이지': [
        {
            text: '기초정보관리',
            items: ['회사정보수정']
        }
    ],
    '재무/회계': [
        {
            text: '전표입력',
            items: ['일반전표입력', '매입매출전표입력', '전자세금계산서발행']
        },
        {
            text: '기초정보관리',
            items: ['회사등록', '거래처등록', '계정과목및적요등록', '환경등록', '업무용승용차등록']
        },
        {
            text: '장부관리',
            items: ['거래처원장', '거래처별계정과목별원장', '계정별원장', '현금출납장', '일계표(월계표)',
                '분개장', '총계정원장', '매입매출장', '세금계산서(계산서)현황', '전표출력']
        },
        {
            text: '결산/재무제표',
            items: ['결산자료입력', '합계잔액시산표', '재무상태표', '손익계산서', '제조원가명세서', '이익잉여금처분계산서',
                '현금흐름표', '자본변동표', '결산부속명세서']
        },
        {
            text: '전기분재무제표',
            items: ['전기분재무상태표', '전기분손익계산서', '전기분우너가명세서', '전기분잉여금처분계산서', '거래처별초기이월', '마감후이월']
        },
        {
            text: '고정자산및감가상각',
            items: ['고정자산등록', '미상각분감가상각비', '양도자산감가상각비', '고정자산관리대장']
        },
        {
            text: '자금관리',
            items: ['받을어음현황', '지급어음현황', '일일자금명세(경리일보)', '예적금현황']
        },
    ],
    '인사관리': [
        {
            text: '제목',
            items: ['내용 A', '내용 B']
        }
    ],
    '물류관리': [
        {
            text: '제목',
            items: ['내용 A', '내용 B']
        }
    ],
    '생산관리': [
        {
            text: '기초정보관리',
            items: ['작업장 관리', 'LOT 관리', 'Serial No 관리']
        },
        {
            text: '자원관리',
            items: ['작업자 관리', '자재 정보 관리', '설비 정보 관리', '유지보수 이력 관리']
        },
        {
            text: '공정 경로 관리',
            items: ['공정 세부정보 관리', 'Routing 관리']
        },
        {
            text: '자재 소요 관리',
            items: ['BOM 관리', '자재소요량 계획 관리', '실자재 투입 현황 관리']
        },
        {
            text: '생산 계획 관리',
            items: ['생산 의뢰 관리', '주문 생산 계획 관리', '재고 생산 계획 관리', '작업 지시 관리']
        },
        {
            text: '생산 실적 관리',
            items: ['작업 실적 관리', '불량군 관리', '불량 유형 관리', '품질 검사 관리', '생산품 입고 처리', '생산 일/월보 처리']
        },
        {
            text: '외주/계약 관리',
            items: ['외주 단가 관리', '외주 발주 관리', '외주 검사 관리', '외주 실적 관리']
        },
    ],
};