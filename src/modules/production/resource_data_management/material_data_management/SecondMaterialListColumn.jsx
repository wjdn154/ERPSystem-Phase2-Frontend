import React from "react";

const HazardLevel = {
    "HIGH":"높음",
    "MEDIUM":"보통",
    "LOW":"낮음"
};


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


export const
    materialHazardousListColumn = [
        {
            title: <span>유해물질 코드</span>,  // 컬럼 제목
            dataIndex: 'hazardousMaterialCode',  // 데이터 인덱스: 이 필드는 데이터 객체의 'hazardousMaterialCode' 속성과 연결됩니다.
            key:'hazardousMaterialCode',
            width: '30%',  // 컬럼 너비 설정
        },
        {
            title: <span>유해물질 명</span>,
            dataIndex: 'hazardousMaterialName',
            key: 'hazardousMaterialName',
            width: '40%',
        },
        {
            title: <span>위험등급</span>,
            dataIndex: 'hazardLevel',
            key:'hazardLevel',
            width: '30%',
            render: (text) => {
                return HazardLevel[text] || text;  // 한글로 변환 후 표시
            }
        },
    ];

export const
    materialProductListColumn = [
        {
            title: <span>품목 코드</span>,  // 컬럼 제목
            dataIndex: 'productCode',  // 데이터 인덱스: 이 필드는 데이터 객체의 'productCode' 속성과 연결됩니다.
            key:'productCode',
            width: '30%',  // 컬럼 너비 설정
        },
        {
            title: <span>품목 명</span>,
            dataIndex: 'productName',
            key: 'productName',
            width: '40%',
        },
        {
            title: <span>그룹 명</span>,
            dataIndex: 'productGroupName',
            key: 'productGroupName',
            width: '30%',
        },
    ];
export const productCodeColumn = [

    {
        title: <span>품목 코드</span>,  // 컬럼 제목
        dataIndex: 'productCode',  // 데이터 인덱스: 이 필드는 데이터 객체의 'productCode' 속성과 연결됩니다.
        key:'productCode',
        width: '30%',  // 컬럼 너비 설정
    },
    {
        title: <span>품목 명</span>,
        dataIndex: 'productName',
        key: 'productName',
        width: '40%',
    }

]