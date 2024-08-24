import React from 'react';
import { Button, Input } from 'antd';

// transferMemosColumn 함수는 대체적요 데이터를 표시하고 관리하는 컬럼 정의를 반환합니다.
// 이 함수는 다양한 핸들러를 인자로 받아, 사용자 상호작용에 응답합니다.
export const transferMemosColumn = (
    handleInputChange2, // 대체적요 입력 필드 변경을 처리하는 함수
    handleDeleteMemo,   // 대체적요 항목을 삭제하는 함수
    handleAddNewMemo,   // 새 대체적요 항목을 추가하는 함수
    setAccountSubjectDetail, // 계정 상세 정보를 업데이트하는 함수
    accountSubjectDetail // 현재 계정 상세 정보 상태
) => [
    {
        title: <span>적요번호</span>, // '적요번호' 컬럼 제목
        dataIndex: 'id', // 데이터의 'id' 필드와 매핑, 각 행의 고유 식별자를 표시
        align: 'center', // 셀 내용을 가운데 정렬
        width: '20%', // 컬럼의 너비 설정
    },
    {
        title: <span>대체적요</span>, // '대체적요' 컬럼 제목
        dataIndex: 'content', // 데이터의 'content' 필드와 매핑, 대체적요 내용을 표시
        align: 'center', // 셀 내용을 가운데 정렬
        width: '80%', // 컬럼의 너비 설정
        render: (text, record, index) => (
            <Input
                value={text}
                onChange={(e) => handleInputChange2(e, 'transferMemos', index)} // 입력 필드 값 변경 시 처리 로직
            />
        ),
    },
    {
        title:
            <Button type="primary" onClick={() => handleAddNewMemo('transferMemos')}>
                생성
            </Button>, // '생성' 버튼 컬럼
        dataIndex: 'action', // 'action' 필드를 위한 데이터 인덱싱 (실제 데이터와는 무관)
        align: 'center', // 셀 내용을 가운데 정렬
        width: '20%', // 컬럼의 너비 설정
        render: (_, record) => (
            <Button
                type="danger"
                onClick={() => handleDeleteMemo('transferMemos', record.id, setAccountSubjectDetail, accountSubjectDetail)} // '삭제' 버튼 클릭 시 처리 로직
            >
                삭제
            </Button>
        ),
    },
];