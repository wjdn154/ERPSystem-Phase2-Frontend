import React from "react";

const hazardLevelMap = {
    "LOW" : "낮음",
    "MEDIUM" : "보통",
    "HIGH" : "높음"
};


export const
    hazardousMaterialColumn = [
        {
            title: <span>코드</span>,  // 컬럼 제목
            dataIndex: 'hazardousMaterialCode',  // 데이터 인덱스: 이 필드는 데이터 객체의 'hazardousMaterialCode' 속성과 연결됩니다.
            key:'hazardousMaterialCode',
            width: '30%',  // 컬럼 너비 설정
            align: 'center',
        },
        {
            title: <span>유해물질 명</span>, // 컬럼 제목
            dataIndex: 'hazardousMaterialName', // 데이터 인덱스는 생략 가능
            key: 'hazardousMaterialName',
            width: '40%', // 컬럼 너비 설정
            align: 'center',
        },
        {
            title: <span>위험등급</span>,  // 컬럼 제목
            dataIndex: 'hazardLevel',  // 데이터 인덱스: 이 필드는 데이터 객체의 'departmentName' 속성과 연결됩니다.
            key:'hazardLevel',
            width: '30%',  // 컬럼 너비 설정
            align: 'center',
            render: (text) => {
                return hazardLevelMap[text] || text;  // 한글로 변환 후 표시
            }
        }
    ];
