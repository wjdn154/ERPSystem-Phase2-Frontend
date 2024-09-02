export const processDetailsColumn = [
    {
        title: <span>공정 ID</span>,
        dataIndex: ['processDetailsDTO', 'processId'],  // processDetailsDTO 내부의 processId에 접근
        width: '15%',
    },
    {
        title: <span>공정명</span>,
        dataIndex: ['processDetailsDTO', 'name'],  // processDetailsDTO 내부의 name에 접근
        width: '30%',
    },
    {
        title: <span>순서</span>,
        dataIndex: 'stepOrder',  // RoutingStepDTO의 최상위 속성에 접근
        width: '10%',
    },
    {
        title: <span>라우팅 ID</span>,
        dataIndex: ['productionRoutingDTO', 'routingId'],  // productionRoutingDTO 내부의 routingId에 접근
        width: '15%',
    },
    {
        title: <span>라우팅 이름</span>,
        dataIndex: ['productionRoutingDTO', 'name'],  // productionRoutingDTO 내부의 name에 접근
        width: '30%',
    },
];
