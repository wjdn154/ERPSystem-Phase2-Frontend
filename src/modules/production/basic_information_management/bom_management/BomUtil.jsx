import React from "react";
import {Tag, Typography} from "antd";

export const sbomColumns = [
    {
        title: <div className="title-text">버전</div>,
        dataIndex: 'version',
        key: 'version',
        align: 'center',
    },
    {
        title: <div className="title-text">생성일자</div>,
        dataIndex: 'createdDate',
        key: 'createdDate',
        align: 'center',
    },
    {
        title: <div className="title-text">비고</div>,
        dataIndex: 'remarks',
        key: 'remarks',
        align: 'center',
    },
    {
        title: <div className="title-text">손실율(%)</div>,
        dataIndex: 'lossRate',
        key: 'lossRate',
        align: 'center',
    },
    {
        title: <div className="title-text">외주 구분</div>,
        dataIndex: 'outsourcingType',
        key: 'outsourcingType',
        align: 'center',
    },
    {
        title: <div className="title-text">유효 시작일</div>,
        dataIndex: 'startDate',
        key: 'startDate',
        align: 'center',
    },
    {
        title: <div className="title-text">유효 종료일</div>,
        dataIndex: 'expiredDate',
        key: 'expiredDate',
        align: 'center',
    },
    {
        title: <div className="title-text">사용 여부</div>,
        dataIndex: 'isActive',
        key: 'isActive',
        align: 'center',
        render: (isActive) => (
            <Tag color={isActive ? 'green' : 'red'}>
                {isActive ? '사용중' : '미사용'}
            </Tag>
        ),
    },
];

export const greenBomColumns = [
    {
        title: <div className="title-text">유해 물질</div>,
        dataIndex: 'hazardousMaterials',
        key: 'hazardousMaterials',
        align: 'center',
        render: (materials) => (
            <span>{materials.join(', ')}</span>
        ),
    },
    {
        title: <div className="title-text">재활용</div>,
        dataIndex: 'recyclable',
        key: 'recyclable',
        align: 'center',
        render: (recyclable) => (
            <Tag color={recyclable ? 'green' : 'red'}>
                {recyclable ? '가능' : '불가'}
            </Tag>
        ),
    },
    {
        title: <div className="title-text">재사용</div>,
        dataIndex: 'reusable',
        key: 'reusable',
        align: 'center',
        render: (reusable) => (
            <Tag color={reusable ? 'green' : 'red'}>
                {reusable ? '가능' : '불가'}
            </Tag>
        ),
    },
    {
        title: <div className="title-text">에너지 소비량</div>,
        dataIndex: 'energyConsumption',
        key: 'energyConsumption',
        align: 'center',
    },
    {
        title: <div className="title-text">탄소발자국</div>,
        dataIndex: 'carbonFootprint',
        key: 'carbonFootprint',
        align: 'center',
    },
    {
        title: <div className="title-text">친환경 인증</div>,
        dataIndex: 'ecoCertification',
        key: 'ecoCertification',
        align: 'center',
    },
];

export const tabItems = () => {
    return [
        {
            key: '1',
            label: 'S-BOM',
            children: (
                <Typography>
                    표준 자재명세서를 조회하고, 필요한 경우 수정 및 삭제할 수 있음.
                </Typography>
            ),
        },
        {
            key: '2',
            label: 'Green BOM',
            children: (
                <Typography>
                    친환경 자재명세서를 조회하고, 필요한 경우 수정 및 삭제할 수 있음.
                </Typography>
            ),
        },
    ];
}