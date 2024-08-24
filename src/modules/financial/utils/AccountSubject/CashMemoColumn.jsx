import React from 'react';
import {Button, Input} from 'antd';

export const cashMemoColumn = (
    handleInputChange2, // 현금적요 내용 변경 핸들러
    handleDeleteMemo,   // 적요 삭제 핸들러
    handleAddNewMemo,   // 새 적요 추가 핸들러
    setAccountSubjectDetail, // 계정 상세 정보 업데이트 함수
    accountSubjectDetail // 계정 상세 정보 데이터
) => [
    {
        title: <span>적요번호</span>, // 적요의 고유 번호를 표시하는 컬럼
        dataIndex: 'id', // 각 행에서 'id' 데이터 필드를 참조
        align: 'center', // 텍스트를 가운데 정렬
        width: '20%', // 컬럼 너비를 20%로 설정
    },
    {
        title: <span>현금적요</span>, // 현금 적요 내용을 입력하는 컬럼
        dataIndex: 'content', // 각 행에서 'content' 데이터 필드를 참조
        align: 'center', // 텍스트를 가운데 정렬
        width: '80%', // 컬럼 너비를 80%로 설정
        render: (text, record, index) => ( // 컬럼의 내용을 동적으로 렌더링
            <Input
                value={text}
                onChange={(e) => handleInputChange2(e, 'cashMemos', index)} // 입력 변경 시 핸들러 호출
            />
        ),
    },
    {
        title: // 새 적요 생성 버튼
            <Button type="primary" onClick={() => handleAddNewMemo('cashMemos')}>
                생성
            </Button>,
        dataIndex: 'action', // 각 행에서 'action' 데이터 필드를 참조
        align: 'center', // 텍스트를 가운데 정렬
        width: '20%', // 컬럼 너비를 20%로 설정
        render: (_, record) => ( // 컬럼의 내용을 동적으로 렌더링
            <Button
                type="danger"
                onClick={() => handleDeleteMemo('cashMemos', record.id, setAccountSubjectDetail, accountSubjectDetail)} // 삭제 버튼 클릭 시 핸들러 호출
            >
                삭제
            </Button>
        ),
    },
];