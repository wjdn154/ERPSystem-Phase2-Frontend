export const usersDataListColumn = [
    {
        title: <span>사용자 이름</span>, // 컬럼 제목
        dataIndex: 'userName', // 데이터 인덱스: 이 필드는 데이터 객체의 'employeeNumber' 속성과 연결됩니다.
        width: '40%', // 컬럼 너비 설정
    },
    {
        title: <span>역할명</span>, // 컬럼 제목
        dataIndex: 'role.roleName', // 데이터 인덱스: 이 필드는 데이터 객체의 'employeeNumber' 속성과 연결됩니다.
        width: '30%', // 컬럼 너비 설정
    },
    {
        title: <span>역할타입</span>, // 컬럼 제목
        dataIndex: 'role.roleType', // 데이터 인덱스: 이 필드는 데이터 객체의 'employeeNumber' 속성과 연결됩니다.
        width: '30%', // 컬럼 너비 설정
    },

]