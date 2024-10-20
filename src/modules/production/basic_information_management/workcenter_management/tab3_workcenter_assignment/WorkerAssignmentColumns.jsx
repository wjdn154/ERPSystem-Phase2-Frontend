export const workerAssignmentColumns = [
    {
        title: <div>작업장</div>,
        dataIndex: 'workcenterName',
        key: 'workcenterName',
        width: '20%',
        render: (text, record) => (
            <div>[{record.workcenterCode}] {text}</div>
        ),
    },
    {
        title: <div>작업자</div>,
        dataIndex: 'workerName',
        key: 'workerName',
        width: '25%',
        render: (text, record) => (
            <div>{text} ({record.employeeNumber})</div>
        ),
    },
    {
        title: <div>배정일자</div>,
        dataIndex: 'assignmentDate',
        key: 'assignmentDate',
        width: '15%',
        render: (text) => (
            <div>{text ? new Date(text).toLocaleDateString() : '-'}</div>
        ),
    },
    {
        title: <div>교대유형</div>,
        dataIndex: 'shiftTypeName',
        key: 'shiftTypeName',
        width: '15%',
        render: (text) => <div>{text}</div>,
    },
    {
        title: <div>작업지시</div>,
        dataIndex: 'productionOrderName',
        key: 'productionOrderName',
        width: '25%',
        render: (text) => <div>{text}</div>,
    },
];
