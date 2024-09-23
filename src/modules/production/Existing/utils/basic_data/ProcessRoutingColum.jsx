export const processRoutingColumns = [
    {
        title: '경로 코드',
        dataIndex: 'code',  // DTO의 code 필드에 매핑
        key: 'code',
        width: '20%',
    },
    {
        title: '경로 이름',
        dataIndex: 'name',  // DTO의 name 필드에 매핑
        key: 'name',
        width: '20%',
    },
    {
        title: '경로 설명',
        dataIndex: 'description',  // DTO의 description 필드에 매핑
        key: 'description',
        width: '30%',
    },
    {
        title: '표준 여부',
        dataIndex: 'isStandard',  // DTO의 isStandard 필드에 매핑
        key: 'isStandard',
        render: (text) => (text ? '예' : '아니요'), // 표준 여부를 예/아니요로 표시
        width: '10%',
    },
    {
        title: '사용 여부',
        dataIndex: 'isActive',  // DTO의 isActive 필드에 매핑
        key: 'isActive',
        render: (text) => (text ? '사용 중' : '미사용'), // 사용 여부를 사용 중/미사용으로 표시
        width: '10%',
    },
    // {
    //     title: '동작',
    //     key: 'action',
    //     render: (text, record) => (
    //         <span>
    //             <a onClick={() => record.onEdit(record)}>수정</a>
    //             <a style={{ marginLeft: 8 }} onClick={() => record.onDelete(record.id)}>삭제</a>
    //         </span>
    //     ),  // 수정 및 삭제 버튼 추가
    //     width: '20%',
    // },
];
