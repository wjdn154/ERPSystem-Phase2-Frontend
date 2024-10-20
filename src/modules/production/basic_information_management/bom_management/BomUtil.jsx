import React from "react";
import {Tag, Typography} from "antd";

export const sbomColumns = [
    {
        title: '버전',
        dataIndex: 'version',
        key: 'version',
        align: 'center',
    },
    {
        title: '생성일자',
        dataIndex: 'createdDate',
        key: 'createdDate',
        align: 'center',
    },
    {
        title: '비고',
        dataIndex: 'remarks',
        key: 'remarks',
        align: 'center',
    },
    {
        title: '손실율(%)',
        dataIndex: 'lossRate',
        key: 'lossRate',
        align: 'center',
    },
    {
        title: '외주 구분',
        dataIndex: 'outsourcingType',
        key: 'outsourcingType',
        align: 'center',
    },
    {
        title: '유효 시작일',
        dataIndex: 'startDate',
        key: 'startDate',
        align: 'center',
    },
    {
        title: '유효 종료일',
        dataIndex: 'expiredDate',
        key: 'expiredDate',
        align: 'center',
    },
    {
        title: '사용 여부',
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
        title: '유해 물질 정보',
        dataIndex: 'hazardousMaterials',
        key: 'hazardousMaterials',
        align: 'center',
        render: (materials) => (
            <span>{materials.join(', ')}</span>
        ),
    },
    {
        title: '재활용 가능 여부',
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
        title: '재사용 가능 여부',
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
        title: '에너지 소비량',
        dataIndex: 'energyConsumption',
        key: 'energyConsumption',
        align: 'center',
    },
    {
        title: '탄소 발자국',
        dataIndex: 'carbonFootprint',
        key: 'carbonFootprint',
        align: 'center',
    },
    {
        title: '친환경 인증 정보',
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