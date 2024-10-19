import React from "react";

const MaterialType = {
    "METAL" : "금속",
    "PLASTIC" : "플라스틱",
    "WOOD" : "목재",
    "CHEMICAL" : "화학물질",
    "TEXTILE" : "섬유",
    "ELECTRONIC" : "전자부품",
    "CERAMIC" : "세라믹",
    "GLASS" : "유리",
    "PAPER" : "종이",
    "RUBBER" : "고무",
    "COMPOSITE" : "복합재료",
    "OTHER" : "기타 자재",
};


export const
    materialListColumn = [
        {
            title: <span>코드</span>,  // 컬럼 제목
            dataIndex: 'materialCode',  // 데이터 인덱스: 이 필드는 데이터 객체의 'materialCode' 속성과 연결됩니다.
            key:'materialCode',
            width: '15%',  // 컬럼 너비 설정
            align: 'center',
        },
        {
            title: <span>자재 명</span>,
            dataIndex: 'materialName',
            key: 'materialName',
            width: '20%',
            align: 'center',
        },
        {
            title: <span>유형</span>,
            dataIndex: 'materialType',
            key:'materialType',
            width: '15%',
            align: 'center',
            render: (text) => {
                return MaterialType[text] || text;  // 한글로 변환 후 표시
            }
        },
        {
            title: <span>재고 수량</span>,
            dataIndex: 'stockQuantity',
            key:'stockQuantity',
            width: '10%',
            align: 'center',
        },
        {
            title: <span>구매 가격</span>,
            dataIndex: 'purchasePrice',
            key:'purchasePrice',
            width: '15%',
            align: 'center',
        },
        {
            title: <span>거래처 명</span>,
            dataIndex: 'representativeName',
            key:'representativeName',
            width: '15%',
            align: 'center',
        },
        {
            title: <span>유해물질 개수</span>,
            dataIndex: 'hazardousMaterialQuantity',
            key:'hazardousMaterialQuantity',
            width: '10%',
            align: 'center',
        },
    ];
