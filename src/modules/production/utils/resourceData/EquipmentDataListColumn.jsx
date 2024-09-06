
const equipmentTypeMap = {
    "ASSEMBLY" : "조립 설비",
    "MACHINING" : "가공 설비",
    "INSPECTION" : "검사 설비",
    "PACKAGING" : "포장 설비"
};

const operationStatusMap = {
    "BEFORE_OPERATION" : "가동 전",
    "OPERATING" : "가동 중",
    "MAINTENANCE" : "유지보수 중",
    "FAILURE" : "고장",
    "REPAIRING" : "수리 중"
};

export const
    equipmentDataListColumn = [
    {
        title: <span>설비번호</span>,  // 컬럼 제목
        dataIndex: 'equipmentNum',  // 데이터 인덱스: 이 필드는 데이터 객체의 'equipmentNum' 속성과 연결됩니다.
        key:'equipmentNum',
        width: '20%',  // 컬럼 너비 설정
    },
    {
        title: <span>설비 명</span>,  // 컬럼 제목
        dataIndex: 'equipmentName',  // 데이터 인덱스: 이 필드는 데이터 객체의 'equipmentName' 속성과 연결됩니다.
        key:'equipmentName',
        width: '15%',  // 컬럼 너비 설정
    },
    {
        title: <span>모델 명</span>,  // 컬럼 제목
        dataIndex: 'modelName',  // 데이터 인덱스: 이 필드는 데이터 객체의 'modelName' 속성과 연결됩니다.
        key:'modelName',
        width: '15%',  // 컬럼 너비 설정
    },
    {
        title: <span>설비 유형</span>,  // 컬럼 제목
        dataIndex: 'equipmentType',  // 데이터 인덱스: 이 필드는 데이터 객체의 'equipmentType' 속성과 연결됩니다.
        key:'equipmentType',
        width: '13%',  // 컬럼 너비 설정
        render: (text) => {               //text 에 ASSEMBLY 같은 값이 들어옴
            return equipmentTypeMap[text] || text;  // 한글로 변환 후 표시
        }
    },
    {
        title: <span>가동 상태</span>,  // 컬럼 제목
        dataIndex: 'operationStatus',  // 데이터 인덱스: 이 필드는 데이터 객체의 'operationStatus' 속성과 연결됩니다.
        key:'operationStatus',
        width: '15%',  // 컬럼 너비 설정
        render: (text) => {
            return operationStatusMap[text] || text;  // 한글로 변환 후 표시
        }
    },
    {
        title: <span>공장 이름</span>,  // 컬럼 제목
        dataIndex: 'factoryName',  // 데이터 인덱스: 이 필드는 데이터 객체의 'factoryName' 속성과 연결됩니다.
        key:'factoryName',
        width: '10%',  // 컬럼 너비 설정
    },
    {
        title: <span>작업장 이름</span>,  // 컬럼 제목
        dataIndex: 'workcenterName',  // 데이터 인덱스: 이 필드는 데이터 객체의 'workcenterName' 속성과 연결됩니다.
        key:'workcenterName',
        width: '12%',  // 컬럼 너비 설정
    },
];
