import React from "react";

const hazardLevelMap = {
    "LOW" : "낮음",
    "MEDIUM" : "보통",
    "HIGH" : "높음"
};


export const
    hazardousMaterialColumn = [
        {
            title: <div className="title-text">코드</div>,
            dataIndex: 'hazardousMaterialCode',  // 데이터 인덱스: 이 필드는 데이터 객체의 'hazardousMaterialCode' 속성과 연결됩니다.
            key:'hazardousMaterialCode',
            width: '30%',  // 컬럼 너비 설정
            align: 'center',
        },
        {
            title: <div className="title-text">유해물질명</div>,
            dataIndex: 'hazardousMaterialName', // 데이터 인덱스는 생략 가능
            key: 'hazardousMaterialName',
            width: '40%', // 컬럼 너비 설정
            align: 'center',
        },
        {
            title: <div className="title-text">위험등급</div>,
            dataIndex: 'hazardLevel',  // 데이터 인덱스: 이 필드는 데이터 객체의 'departmentName' 속성과 연결됩니다.
            key:'hazardLevel',
            width: '30%',  // 컬럼 너비 설정
            align: 'center',
            render: (text) => {
                return hazardLevelMap[text] || text;  // 한글로 변환 후 표시
            }
        }
    ];
