import {Select, Tag} from 'antd';
import React from "react";

// 전체 조회 컬럼 (기존 컬럼 유지)
export const workcenterColumns = [
    {
        title: <span>코드</span>,
        dataIndex: 'code',  // DTO의 code 필드에 접근
        key: 'code',
        width: '5%',
    },
    {
        title: <span>이름</span>,
        dataIndex: 'name',  // DTO의 name 필드에 접근
        key: 'name',
        width: '15%',
    },
    {
        title: <span>유형</span>,
        dataIndex: 'workcenterType',  // DTO의 workcenterType 필드에 접근
        key: 'workcenterType',
        width: '10%',
        render: (workcenterType) => {
            const typeToKorean = {
                "Press": "프레스",
                "Welding": "용접",
                "Paint": "도장",
                "Machining": "정밀 가공",
                "Assembly": "조립",
                "Quality Inspection": "품질 검사",
                "Casting": "주조",
                "Forging": "단조",
                "Heat Treatment": "열처리",
                "Plastic Molding": "플라스틱 성형"
            };

            const typeToColor = {
                "Press": "blue",
                "Welding": "green",
                "Paint": "orange",
                "Machining": "volcano",
                "Assembly": "purple",
                "Quality Inspection": "geekblue",
                "Casting": "red",
                "Forging": "gold",
                "Heat Treatment": "cyan",
                "Plastic Molding": "lime"
            };

            // workcenterType 값이 typeToKorean에 없으면 기본 '-'
            const label = typeToKorean[workcenterType] || '기타';
            const color = typeToColor[workcenterType] || 'gray';

            return (
                <Tag color={color}>
                    {label}
                </Tag>
            );
        }
    },
    {
        title: <span>설명</span>,
        dataIndex: 'description',  // DTO의 description 필드에 접근
        key: 'description',
        width: '25%',
    },
    {
        title: <span>공장코드</span>,
        dataIndex: ['factoryCode', 'code'],  // DTO의 factoryCode의 code 필드에 접근
        key: 'factoryCode',
        width: '10%',
        render: (text) => text || '-', // null 또는 undefined일 경우 대체 문자열
    },
    {
        title: <span>생산공정</span>,
        dataIndex: ['processCode', 'code'],  // DTO의 processCode의 code 필드에 접근
        key: 'processCode',
        width: '10%',
        render: (text) => text || '-', // null 또는 undefined일 경우 대체 문자열
    },
    {
        title: <span>작업자</span>,
        dataIndex: 'workerAssignments',  // DTO의 workerAssignments 필드에 접근
        key: 'workerAssignments',
        width: '10%',
        render: (workerAssignments) => workerAssignments ? workerAssignments.length : '-', // 작업자 할당 리스트의 길이 표시
    },
    {
        title: <span>설비</span>,
        dataIndex: 'equipmentList',  // DTO의 equipmentList 필드에 접근
        key: 'equipmentList',
        width: '10%',
        render: (equipmentList) => equipmentList ? equipmentList.length : '-', // 장비 리스트의 길이 표시
    },
    {
        title: <span>사용</span>,
        dataIndex: 'isActive',  // DTO의 isActive 필드에 접근
        key: 'isActive',
        width: '5%',
        render: (isActive) => {
            return (
                <Tag color={isActive ? 'green' : 'red'}>
                    {isActive ? '사용중' : '미사용'}
                </Tag>
            );
        }
    },
];

export const workcenterDetailColumns = [
    {
        title: <span>코드</span>,
        dataIndex: 'code',
        key: 'code',
        width: '5%',
        editable: true, // 수정 가능
    },
    {
        title: <span>이름</span>,
        dataIndex: 'name',
        key: 'name',
        width: '15%',
        editable: true, // 수정 가능
    },
    {
        title: <span>유형</span>,
        dataIndex: 'workcenterType',
        key: 'workcenterType',
        width: '10%',
        render: (workcenterType) => {
            const typeToKorean = {
                Press: "프레스",
                Welding: "용접",
                Paint: "도장",
                Machining: "정밀 가공",
                Assembly: "조립",
                'Quality Inspection': "품질 검사",
                Casting: "주조",
                Forging: "단조",
                'Heat Treatment': "열처리",
                'Plastic Molding': "플라스틱 성형"
            };
            return typeToKorean[workcenterType] || '-';
        },
        editable: true, // 드롭다운으로 선택 가능
    },
    {
        title: <span>설명</span>,
        dataIndex: 'description',
        key: 'description',
        width: '25%',
        editable: true, // 수정 가능
    },
    {
        title: <span>공장명</span>,
        dataIndex: 'factoryName',
        key: 'factoryName',
        width: '10%',
        editable: true,
        render: (text) => text || '-',
    },
    {
        title: <span>생산공정명</span>,
        dataIndex: 'processName',
        key: 'processName',
        width: '10%',
        editable: true, // 수정 불가
        render: (text) => text || '-',
    },
    {
        title: <span>작업자</span>,
        dataIndex: 'workerAssignments',
        key: 'workerAssignments',
        width: '10%',
        editable: true, // 수정 불가
        render: (workerAssignments) => workerAssignments ? workerAssignments.length : '-',
    },
    {
        title: <span>설비</span>,
        dataIndex: 'equipmentList',
        key: 'equipmentList',
        width: '10%',
        editable: true, // 수정 불가
        render: (equipmentList) => equipmentList ? equipmentList.length : '-',
    },
    {
        title: <span>사용</span>,
        dataIndex: 'isActive',
        key: 'isActive',
        width: '5%',
        render: (_, record) => (
            <Select
                value={record.isActive ? '사용중' : '미사용'} // 드롭다운의 현재 값
                onChange={(value) => {
                    // 선택된 값에 따라 isActive를 true 또는 false로 설정
                    const isActive = value === '사용중';
                    // 값이 변경되었을 때 상태 업데이트
                    record.isActive = isActive;
                    // 업데이트한 레코드를 setWorkcenter로 저장
                    setWorkcenter({
                        ...record,
                        isActive: isActive
                    });
                }}
            >
                <Option value="사용중">사용중</Option>
                <Option value="미사용">미사용</Option>
            </Select>
        ),
        editable: true
    },
];

