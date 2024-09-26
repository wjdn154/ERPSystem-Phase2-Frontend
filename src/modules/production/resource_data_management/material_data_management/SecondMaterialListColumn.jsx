import React from "react";



export const
    secondMaterialListColumn = [
        {
            title: <span>코드</span>,  // 컬럼 제목
            dataIndex: 'materialCode',  // 데이터 인덱스: 이 필드는 데이터 객체의 'materialCode' 속성과 연결됩니다.
            key:'materialCode',
            width: '40%',  // 컬럼 너비 설정
        },
        {
            title: <span>자재 명</span>,
            dataIndex: 'materialName',
            key: 'materialName',
            width: '60%',
        }

    ];
