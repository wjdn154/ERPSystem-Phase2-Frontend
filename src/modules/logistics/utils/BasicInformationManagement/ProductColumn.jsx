export const productColumn = [
    {
        title: <span>코드</span>,  // 컬럼 제목
        dataIndex: 'code',  // 데이터 인덱스: 이 필드는 데이터 객체의 'code' 속성과 연결됩니다.
        width: '10%',  // 컬럼 너비 설정
    },
    {
        title: <span>품목명</span>,  // 컬럼 제목
        dataIndex: 'name',  // 데이터 인덱스: 이 필드는 데이터 객체의 'name' 속성과 연결됩니다.
        width: '30%',  // 컬럼 너비 설정
    },
    {
        title: <span>품목 그룹명</span>,  // 컬럼 제목
        dataIndex: 'productGroupName',  // 데이터 인덱스: 이 필드는 데이터 객체의 'natureCode' 속성과 연결됩니다.
        width: '20%',  // 컬럼 너비 설정
    },
    {
        title: <span>규격</span>,  // 컬럼 제목
        dataIndex: 'standard',  // 데이터 인덱스: 이 필드는 데이터 객체의 'parentCode' 속성과 연결됩니다.
        width: '15%',  // 컬럼 너비 설정
    },
    {
        title: <span>입고 단가</span>,  // 컬럼 제목
        dataIndex: 'purchasePrice',  // 데이터 인덱스: 이 필드는 데이터 객체의 'parentCode' 속성과 연결됩니다.
        width: '10%',  // 컬럼 너비 설정
    },
    {
        title: <span>출고 단가</span>,  // 컬럼 제목
        dataIndex: 'salesPrice',  // 데이터 인덱스: 이 필드는 데이터 객체의 'parentCode' 속성과 연결됩니다.
        width: '10%',  // 컬럼 너비 설정
    },
    {
        title: <span>품목 구분</span>,  // 컬럼 제목
        dataIndex: 'productType',  // 데이터 인덱스: 이 필드는 데이터 객체의 'parentCode' 속성과 연결됩니다.
        width: '30%',  // 컬럼 너비 설정
    },
];