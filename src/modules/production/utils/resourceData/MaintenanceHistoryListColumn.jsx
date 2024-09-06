
const maintenanceStatusMap =  {

    "EMERGENCY_REPAIR" : "긴급수리",
    "REGULAR_INSPECTION" : "정기점검",
    "FAILURE_REPAIR" : "고장수리"
};

export const
    MaintenanceHistoryListColumn = [
        {
            title: <span>설비 명</span>,  // 컬럼 제목
            dataIndex: 'equipmentDataName',  // 데이터 인덱스: 이 필드는 데이터 객체의 'equipmentNum' 속성과 연결됩니다.
            key:'equipmentDataName',
            width: '20%',  // 컬럼 너비 설정
        },
        {
            title: <span>관리 담당자</span>,  // 컬럼 제목
            dataIndex: 'maintenanceManager',  // 데이터 인덱스: 이 필드는 데이터 객체의 'equipmentName' 속성과 연결됩니다.
            key:'maintenanceManager',
            width: '15%',  // 컬럼 너비 설정
        },
        {
            title: <span>유지보수 유형</span>,  // 컬럼 제목
            dataIndex: 'maintenanceType',  // 데이터 인덱스: 이 필드는 데이터 객체의 'modelName' 속성과 연결됩니다.
            key:'maintenanceType',
            width: '15%',  // 컬럼 너비 설정
        },
        {
            title: <span>유지보수 진행 상태</span>,  // 컬럼 제목
            dataIndex: 'maintenanceStatus',  // 데이터 인덱스: 이 필드는 데이터 객체의 'equipmentType' 속성과 연결됩니다.
            key:'maintenanceStatus',
            width: '13%',  // 컬럼 너비 설정
        },
        {
            title: <span>유지보수 일자</span>,  // 컬럼 제목
            dataIndex: 'maintenanceDate',  // 데이터 인덱스: 이 필드는 데이터 객체의 'operationStatus' 속성과 연결됩니다.
            key:'maintenanceDate',
            width: '15%',  // 컬럼 너비 설정
        },
        {
            title: <span>설치된 공장</span>,  // 컬럼 제목
            dataIndex: 'factoryName',  // 데이터 인덱스: 이 필드는 데이터 객체의 'factoryName' 속성과 연결됩니다.
            key:'factoryName',
            width: '10%',  // 컬럼 너비 설정
        },
        {
            title: <span>설치된 작업장</span>,  // 컬럼 제목
            dataIndex: 'workcenterName',  // 데이터 인덱스: 이 필드는 데이터 객체의 'workcenterName' 속성과 연결됩니다.
            key:'workcenterName',
            width: '12%',  // 컬럼 너비 설정
        },
    ];