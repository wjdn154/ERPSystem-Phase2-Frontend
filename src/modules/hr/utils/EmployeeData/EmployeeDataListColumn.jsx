export const employeeDataListColumn = [
    {
        title: <span>입사일자</span>, // 컬럼 제목
        dataIndex: 'hireDate', // 데이터 인덱스: 이 필드는 데이터 객체의 'hireDate' 속성과 연결됩니다.
        width: '10%', // 입사일자: 보통 날짜는 짧기 때문에 너비를 줄입니다.
    },
    {
        title: <span>사원번호</span>, // 컬럼 제목
        dataIndex: 'employeeNumber', // 데이터 인덱스: 이 필드는 데이터 객체의 'employeeNumber' 속성과 연결됩니다.
        width: '10%', // 사원번호: 보통 숫자는 짧으므로 너비를 줄입니다.
    },
    {
        title: <span>성</span>, // 컬럼 제목
        dataIndex: 'firstName', // 데이터 인덱스: 이 필드는 데이터 객체의 'firstName' 속성과 연결됩니다.
        width: '5%', // 성: 이름은 보통 짧기 때문에 너비를 줄입니다.
    },
    {
        title: <span>이름</span>, // 컬럼 제목
        dataIndex: 'lastName', // 데이터 인덱스: 이 필드는 데이터 객체의 'lastName' 속성과 연결됩니다.
        width: '5%', // 이름: 이름은 보통 짧기 때문에 너비를 줄입니다.
    },
    {
        title: <span>부서명</span>, // 컬럼 제목
        dataIndex: 'departmentName', // 데이터 인덱스: 이 필드는 데이터 객체의 'departmentName' 속성과 연결됩니다.
        width: '10%', // 부서명: 부서명은 중간 길이이므로 적절한 너비를 줍니다.
    },
    {
        title: <span>고용 상태</span>, // 컬럼 제목
        dataIndex: 'employmentStatus', // 데이터 인덱스: 이 필드는 데이터 객체의 'employmentStatus' 속성과 연결됩니다.
        width: '10%', // 고용 상태: 고용 상태는 짧기 때문에 적당한 너비로 설정합니다.
    },
    {
        title: <span>고용 유형</span>, // 컬럼 제목
        dataIndex: 'employmentType', // 데이터 인덱스: 이 필드는 데이터 객체의 'employmentType' 속성과 연결됩니다.
        width: '10%', // 고용 유형: 고용 유형은 짧기 때문에 적당한 너비로 설정합니다.
    },
    {
        title: <span>직위</span>, // 컬럼 제목
        dataIndex: 'positionName', // 데이터 인덱스: 이 필드는 데이터 객체의 'positionName' 속성과 연결됩니다.
        width: '10%', // 직위: 직위는 짧기 때문에 적당한 너비로 설정합니다.
    },
    {
        title: <span>직책</span>, // 컬럼 제목
        dataIndex: 'jobTitleName', // 데이터 인덱스: 이 필드는 데이터 객체의 'email' 속성과 연결됩니다.
        width: '15%', // 이메일: 이메일 주소는 길 수 있으므로 더 넓은 너비를 설정합니다.
    },
    {
        title: <span>이메일</span>, // 컬럼 제목
        dataIndex: 'email', // 데이터 인덱스: 이 필드는 데이터 객체의 'email' 속성과 연결됩니다.
        width: '15%', // 이메일: 이메일 주소는 길 수 있으므로 더 넓은 너비를 설정합니다.
    }
];