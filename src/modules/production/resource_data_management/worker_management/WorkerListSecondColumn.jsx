import React from "react";
import {Tag} from "antd";



export const
    workerListSecondColumn = [
        {
            title: <span>사원 번호</span>,  // 컬럼 제목
            dataIndex: 'employeeNumber',  // 데이터 인덱스: 이 필드는 데이터 객체의 'employeeNumber' 속성과 연결됩니다.
            key:'employeeNumber',
            width: '35%',  // 컬럼 너비 설정
            align: 'center',
        },
        {
            title: <span>성명</span>, // 컬럼 제목
            dataIndex: 'fullName', // 데이터 인덱스는 생략 가능
            key: 'fullName',
            width: '30%', // 컬럼 너비 설정
            align: 'center',
            render: (text, record) => `${record.employeeLastName}${record.employeeFirstName}`, // 성과 이름을 합침
        },
        {
            title: <span>직책</span>,  // 컬럼 제목
            dataIndex: 'jobTitleName',  // 데이터 인덱스: 이 필드는 데이터 객체의 'jobTitleName' 속성과 연결됩니다.
            key:'jobTitleName',
            width: '35%',  // 컬럼 너비 설정
            align: 'center',
        },

    ];
