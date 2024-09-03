export const warehouseColumn = [
    {
        title: <span>창고코드</span>,
        dataIndex: 'code',
        width: '20%',
        align: 'center',
    },
    {
        title: <span>창고명</span>,
        dataIndex: 'name',
        width: '30%',
        align: 'center',
    },
    {
        title: <span>구분</span>,
        dataIndex: 'warehouseType',
        width: '20%',
        align: 'center',
        render: (text) => text,
    },
    {
        title: <span>생산공정명</span>,
        dataIndex: 'productionProcess',
        width: '20%',
        align: 'center',
    },
    {
        title: <span>사용</span>,
        dataIndex: 'isActive',
        width: '10%',
        align: 'center',
        render: (text) => (text ? 'Yes' : 'No'),
    },
];