export const workcenterColumns = [
    {
        title: <span>코드</span>,
        dataIndex: 'code',  // DTO의 code 필드에 접근
        key: 'code',
        width: '5%',
    },
    {
        title: <span>이름</span>,
        dataIndex: 'name',  // DTO의 name 필드에 접근
        key: 'name',
        width: '15%',
    },
    {
        title: <span>유형</span>,
        dataIndex: 'workcenterType',  // DTO의 workcenterType 필드에 접근
        key: 'workcenterType',
        width: '10%',
        render: (workcenterType) => {
            const typeToKorean = {
                PRESS: "프레스",
                WELDING: "용접",
                PAINT: "도장",
                MACHINING: "정밀 가공",
                ASSEMBLY: "조립",
                QUALITY_INSPECTION: "품질 검사",
                CASTING: "주조",
                FORGING: "단조",
                HEAT_TREATMENT: "열처리",
                PLASTIC_MOLDING: "플라스틱 성형"
            };
            return typeToKorean[workcenterType] || '-'; // 대응되는 한국어가 없을 경우 '-' 표시
        }
    },
    {
        title: <span>설명</span>,
        dataIndex: 'description',  // DTO의 description 필드에 접근
        key: 'description',
        width: '25%',
    },
    {
        title: <span>공장코드</span>,
        dataIndex: ['factoryCode', 'code'],  // DTO의 factoryCode의 code 필드에 접근
        key: 'factoryCode',
        width: '10%',
        render: (text) => text || '-', // null 또는 undefined일 경우 대체 문자열
    },
    {
        title: <span>생산공정</span>,
        dataIndex: ['processCode', 'code'],  // DTO의 processCode의 code 필드에 접근
        key: 'processCode',
        width: '10%',
        render: (text) => text || '-', // null 또는 undefined일 경우 대체 문자열
    },
    {
        title: <span>작업자</span>,
        dataIndex: 'workerAssignments',  // DTO의 workerAssignments 필드에 접근
        key: 'workerAssignments',
        width: '10%',
        render: (workerAssignments) => workerAssignments ? workerAssignments.length : '-', // 작업자 할당 리스트의 길이 표시
    },
    {
        title: <span>장비</span>,
        dataIndex: 'equipmentList',  // DTO의 equipmentList 필드에 접근
        key: 'equipmentList',
        width: '10%',
        render: (equipmentList) => equipmentList ? equipmentList.length : '-', // 장비 리스트의 길이 표시
    },
    {
        title: <span>사용</span>,
        dataIndex: 'isActive',  // DTO의 isActive 필드에 접근
        key: 'isActive',
        width: '5%',
        render: (text) => text ? 'Y' : 'N', // Boolean 값을 'Y' 또는 'N'으로 표시
    },
];
