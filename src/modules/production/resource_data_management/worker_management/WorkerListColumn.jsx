import React from "react";
import {Tag} from "antd";

const employmentStatusMap = {
    "ACTIVE" : "재직 중",
    "ON_LEAVE" : "휴직 중",
    "RESIGNED" : "퇴직",
    "PACKAGING" : "포장 설비"
};

const employmentTypeMap = {
    "FULL_TIME" : "정규직",
    "CONTRACT" : "계약직",
    "PART_TIME" : "파트타임",
    "TEMPORARY" : "임시직",
    "INTERN" : "인턴",
    "CASUAL" : "일용직",
    "FREELANCE" : "프리랜서"
};

export const
    workerListColumn = [
    {
        title: <span>사원 번호</span>,  // 컬럼 제목
        dataIndex: 'employeeNumber',  // 데이터 인덱스: 이 필드는 데이터 객체의 'employeeNumber' 속성과 연결됩니다.
        key:'employeeNumber',
        width: '15%',  // 컬럼 너비 설정
        align: 'center',
    },
        {
            title: <span>성명</span>, // 컬럼 제목
            dataIndex: 'fullName', // 데이터 인덱스는 생략 가능
            key: 'fullName',
            width: '11%', // 컬럼 너비 설정
            align: 'center',
            render: (text, record) => `${record.employeeLastName}${record.employeeFirstName}`, // 성과 이름을 합침
        },
    {
        title: <span>부서 명</span>,  // 컬럼 제목
        dataIndex: 'departmentName',  // 데이터 인덱스: 이 필드는 데이터 객체의 'departmentName' 속성과 연결됩니다.
        key:'departmentName',
        width: '11%',  // 컬럼 너비 설정
        align: 'center',
    },
    {
        title: <span>직위</span>,  // 컬럼 제목
        dataIndex: 'positionName',  // 데이터 인덱스: 이 필드는 데이터 객체의 'positionName' 속성과 연결됩니다.
        key:'positionName',
        width: '11%',  // 컬럼 너비 설정
        align: 'center',
    },
    {
        title: <span>직책</span>,  // 컬럼 제목
        dataIndex: 'jobTitleName',  // 데이터 인덱스: 이 필드는 데이터 객체의 'jobTitleName' 속성과 연결됩니다.
        key:'jobTitleName',
        width: '15%',  // 컬럼 너비 설정
        align: 'center',
    },
    {
        title: <span>고용상태</span>,  // 컬럼 제목
        dataIndex: 'employmentStatus',  // 데이터 인덱스: 이 필드는 데이터 객체의 'employmentStatus' 속성과 연결됩니다.
        key:'employmentStatus',
        width: '11%',  // 컬럼 너비 설정
        align: 'center',
        render: (text) => {
            return employmentStatusMap[text] || text;  // 한글로 변환 후 표시
        }
    },
    {
        title: <span>고용유형</span>,  // 컬럼 제목
        dataIndex: 'employmentType',  // 데이터 인덱스: 이 필드는 데이터 객체의 'employmentType' 속성과 연결됩니다.
        key:'employmentType',
        width: '11%',  // 컬럼 너비 설정
        align: 'center',
        render: (text) => {
            return employmentTypeMap[text] || text;  // 한글로 변환 후 표시
        }
    },
    {
        title: <span>안전교육 이수 여부</span>,  // 컬럼 제목
        dataIndex: 'trainingStatus',  // 데이터 인덱스: 이 필드는 데이터 객체의 'trainingStatus' 속성과 연결됩니다.
        key:'trainingStatus',
        width: '15%',  // 컬럼 너비 설정
        align: 'center',
        render: (text) => {
            return (
                <span style={{ color: text === 'true' ? 'blue' : 'red' }}>
                {text === 'true' ? '이수' : '미 이수'}
            </span>
            );
        }

    },
    ];
