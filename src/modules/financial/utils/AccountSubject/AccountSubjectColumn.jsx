export const accountSubjectColumn = [
    {
        title: <span>코드</span>,  // 컬럼 제목
        dataIndex: 'code',  // 데이터 인덱스: 이 필드는 데이터 객체의 'code' 속성과 연결됩니다.
        width: '15%',  // 컬럼 너비 설정
    },
    {
        title: <span>계정과목명</span>,  // 컬럼 제목
        dataIndex: 'name',  // 데이터 인덱스: 이 필드는 데이터 객체의 'name' 속성과 연결됩니다.
        width: '35%',  // 컬럼 너비 설정
    },
    {
        title: <span>성격</span>,  // 컬럼 제목
        dataIndex: 'natureName',  // 데이터 인덱스: 이 필드는 데이터 객체의 'natureCode' 속성과 연결됩니다.
        width: '35%',  // 컬럼 너비 설정
    },
    {
        title: <span>관계</span>,  // 컬럼 제목
        dataIndex: 'parentCode',  // 데이터 인덱스: 이 필드는 데이터 객체의 'parentCode' 속성과 연결됩니다.
        width: '15%',  // 컬럼 너비 설정
    },
];