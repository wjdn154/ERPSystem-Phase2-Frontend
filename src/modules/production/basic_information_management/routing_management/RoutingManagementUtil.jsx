import {Input, Tag, Typography} from "antd";
import React from "react";

export const processRoutingColumns = (activeColumn, searchText, setActiveColumn, handleFilter) => [
    {
        title: activeColumn === 'code' ? (
            <Input
                autoFocus
                placeholder="검색"
                value={searchText}
                onChange={(e) => handleFilter(e.target.value, 'code')}
                onBlur={() => setActiveColumn(null)} // 포커스를 잃으면 다시 원래 컬럼명으로
                onPressEnter={() => setActiveColumn(null)} // 엔터키 입력 시 검색 종료
            />
        ) : (
            <span onClick={() => setActiveColumn('code')} style={{ cursor: 'pointer' }}>
                    경로 코드
                </span>
        ),
        dataIndex: 'code',
        key: 'code',
        width: '20%',
    },
    {
        title: activeColumn === 'name' ? (
            <Input
                autoFocus
                placeholder="검색"
                value={searchText}
                onChange={(e) => handleFilter(e.target.value, 'name')}
                onBlur={() => setActiveColumn(null)}
                onPressEnter={() => setActiveColumn(null)}
            />
        ) : (
            <span onClick={() => setActiveColumn('name')} style={{ cursor: 'pointer' }}>
                    경로 이름
                </span>
        ),
        dataIndex: 'name',
        key: 'name',
        width: '20%',
    },
    {
        title: activeColumn === 'description' ? (
            <Input
                autoFocus
                placeholder="검색"
                value={searchText}
                onChange={(e) => handleFilter(e.target.value, 'description')}
                onBlur={() => setActiveColumn(null)}
                onPressEnter={() => setActiveColumn(null)}
            />
        ) : (
            <span onClick={() => setActiveColumn('description')} style={{ cursor: 'pointer' }}>
                    경로 설명
                </span>
        ),
        dataIndex: 'description',
        key: 'description',
        width: '30%',
    },
    {
        title: '표준 여부',
        dataIndex: 'isStandard',
        key: 'isStandard',
        render: (text) => (text ? '예' : '아니요'),
        width: '10%',
    },
    {
        title: '사용 여부',
        dataIndex: 'isActive',
        key: 'isActive',
        render: (text) => {
            let color;
            switch (text) {
                case 'true':
                    color = 'red';
                    break;
                case 'false':
                    color = 'blue';
                    break;
                default:
                    color = 'gray'; // 기본 색상
            }
            return <Tag style={{marginLeft: '5px'}} color={color}>{text}</Tag>;
        },
        width: '10%',
    },
];


export const tabItems = () => {
    return [
        {
            key: '1',
            label: 'Routing 목록',
            children: (
                <Typography>
                    현재 설정된 Routing 경로를 조회하고 수정할 수 있음.
                </Typography>
            ),
        },
        {
            key: '2',
            label: 'Routing 등록',
            children: (
                <Typography>
                    새로운 제품의 공정 경로를 설정하고, 순서와 공정 간 의존성을 관리할 수 있음.
                </Typography>
            ),
        },
    ];
}