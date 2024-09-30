import React from "react";
import {Typography} from "antd";

export const sbomColumns = [
    {
        title: 'BOM 코드',
        dataIndex: 'code',
        key: 'code',
        width: '20%',
    },
    {
        title: 'BOM 이름',
        dataIndex: 'name',
        key: 'name',
        width: '20%',
    },
    {
        title: 'BOM 설명',
        dataIndex: 'description',
        key: 'description',
        width: '30%',
    },
    {
        title: '사용',
        dataIndex: 'isActive',
        key: 'isActive',
        render: (text) => (text ? 'Y' : 'N'),
        width: '10%',
    },
    // {
    //     title: '',
    //     key: 'action',
    //     render: (text, record) => (
    //         <span>
    //                 <a onClick={() => handleOpenModal(record)}>수정</a>
    //                 <a style={{ marginLeft: 8 }} onClick={() => handleDeleteSBom(record.id)}>삭제</a>
    //             </span>
    //     ),
    //     width: '5%',
    // },
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