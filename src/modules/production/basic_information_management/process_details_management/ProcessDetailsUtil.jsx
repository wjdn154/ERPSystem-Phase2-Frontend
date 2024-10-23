import {Tag, Typography} from "antd";
import React from "react";

export const tabItems = () => {
    return [
        {
            key: '1',
            label: '공정 목록',
            children: (
                <Typography>
                    등록된 공정의 세부 정보를 조회하고, 필요한 경우 수정할 수 있음.

                </Typography>
            ),
        },
        {
            key: '2',
            label: '공정 등록',
            children: (
                <Typography>
                    새로운 공정을 등록하여 공정 단계, 소요 시간 등을 입력할 수 있음.
                </Typography>
            ),
        },
    ];
}

// getRowClassName 함수 정의
export const getRowClassName = (record) => {
    return record.isActive ? 'active-row' : 'inactive-row';
};

// 공정명 검색어로 목록 필터링
export const filterProcessDetails = (details, searchTerm) => {
    return details.filter(detail => detail.name.includes(searchTerm));
};

export const processDetailsColumn = [
    {
        title: <div className="title-text">코드</div>,
        dataIndex: 'code',  // DTO의 code 필드에 접근
        key: 'code',
        width: '10%',
        align: 'center',
    },
    {
        title: <div className="title-text">공정명</div>,
        dataIndex: 'name',  // DTO의 name 필드에 접근
        key: 'name',
        width: '20%',
        align: 'center',
    },
    {
        title: <div className="title-text">생산구분</div>,
        dataIndex: 'isOutsourced',  // DTO의 isOutsourced 필드에 접근
        key: 'isOutsourced',
        width: '10%',
        align: 'center',
        render: (isOutsourced) => {
            return (
                <Tag color={isOutsourced ? 'yellow' : 'blue'}>
                    {isOutsourced ? '외주' : '생산'}
                </Tag>
            );
        }        },
    {
        title: <div className="title-text">소요 시간</div>,
        dataIndex: 'duration',  // DTO의 duration 필드에 접근
        key: 'duration',
        width: '10%',
        align: 'center',
    },
    {
        title: <div className="title-text">공정 비용(천원)</div>,
        dataIndex: 'cost',  // DTO의 cost 필드에 접근
        key: 'cost',
        width: '15%',
        align: 'center',
    },
    {
        title: <div className="title-text">불량률(%)</div>,
        dataIndex: 'defectRate',  // DTO의 defectRate 필드에 접근
        key: 'defectRate',
        width: '10%',
        align: 'center',
    },
    {
        title: <div className="title-text">사용여부</div>,
        dataIndex: 'isUsed',  // DTO의 isUsed 필드에 접근
        key: 'isUsed',
        width: '5%',
        align: 'center',
        render: (isActive) => {
            return (
                <Tag color={isActive ? 'green' : 'red'}>
                    {isActive ? '사용중' : '미사용'}
                </Tag>
            );
        }
    },
];
