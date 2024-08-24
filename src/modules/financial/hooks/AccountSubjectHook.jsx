import {useEffect, useState} from 'react';
import { fetchAccountSubjectDetail } from '../services/AccountSubjectApi.jsx';

// 계정과목 관련 커스텀 훅
export const accountSubjectHook = () => {
    // 선택된 행과 계정과목 상세 정보를 관리하는 상태
    const [selectedRow, setSelectedRow] = useState(null);
    const [accountSubjectDetail, setAccountSubjectDetail] = useState(null);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [selectedFinancialStatement, setSelectedFinancialStatement] = useState({});

    // 행 선택 핸들러 설정
    const handleRowSelection = {
        type: 'radio',
        selectedRowKeys: selectedRow ? [selectedRow.id] : [],
        onChange: (selectedRowKeys, selectedRows) => {
            if (selectedRows.length > 0) {
                handleSelectedRow(selectedRows[0]);
            }
        },
    };

    // 행 선택 시 계정과목 상세 정보를 가져오는 로직
    const handleSelectedRow = async (selectedRow) => {
        setSelectedRow(selectedRow);
        try {
            const detail = await fetchAccountSubjectDetail(selectedRow.code);
            setAccountSubjectDetail(detail);
        } catch (error) {
            console.error("API에서 데이터를 가져오는 중 오류 발생:", error);
        }
    };

    // 필드의 값이 변경될 때 호출되는 함수
    const handleInputChange = (e, key) => {
        const value = e.target.value;

        // 영어만 입력가능하도록 정규식 검사.
        if (key === 'englishName' && /[^a-zA-Z\s]/.test(value)) {
            alert('영어만 입력 가능합니다.')
            return;
        }

        setAccountSubjectDetail(prevState => ({
            ...prevState,
            [key]: value,
        }));
    };

    // 특정 적요 필드의 내용을 수정하는 함수
    const handleInputChange2 = (e, field, index) => {
        const currentField = accountSubjectDetail[field] || []; // 필드가 없을 경우 빈 배열로 초기화

        if (currentField[index]) {
            currentField[index].content = e.target.value; // 특정 인덱스의 항목 내용 수정
        }

        setAccountSubjectDetail({
            ...accountSubjectDetail,
            [field]: currentField, // 업데이트된 필드를 상태에 반영
        });
    };

    // 새로운 항목 추가와 항목 삭제를 처리하는 로직
    const handleAddNewMemo = (field) => {
        setAccountSubjectDetail(prevState => {
            const currentField = prevState[field] || [];
            // 현재 필드에 아무것도 없는 경우 3개의 적요 추가.
            if (currentField.length === 0) {
                const newMemos = [
                    { id: 1, content: '' },
                    { id: 2, content: '' },
                    { id: 3, content: '' }
                ];
                return {
                    ...prevState,
                    [field]: newMemos
                };
            } else {
                // 기존에 적요가 있을 경우 한 개만 추가.
                const newId = currentField[currentField.length - 1].id + 1;
                const newMemo = { id: newId, content: '' };
                return {
                    ...prevState,
                    [field]: [...currentField, newMemo]
                };
            }
        });
    };

    const handleDeleteMemo = (field, id) => {
        setAccountSubjectDetail(prevState => {
            const updatedMemos = prevState[field].filter(memo => memo.id !== id);

            // ID 재정렬 로직: 삭제 후 남은 항목의 ID를 1부터 연속적으로 할당
            const reindexedMemos = updatedMemos.map((memo, index) => ({
                ...memo,
                id: index + 1  // ID를 1부터 시작하도록 재설정
            }));

            return {
                ...prevState,
                [field]: reindexedMemos
            };
        });
    };

    const showModal = () => setIsModalVisible(true);

    const handleClose = () => setIsModalVisible(false);

    const selectFinancialStatement = (item) => {
        setSelectedFinancialStatement(item);
    };

// 팝업 클릭 시 실행되는 함수
    const handlePopupClick = (field) => {
        if (field === "표준재무제표") {
            console.log(`${field} 팝업 실행`);
            showModal();
        }
    };


    return {
        selectedRow,
        setSelectedRow,
        accountSubjectDetail,
        setAccountSubjectDetail,
        handleRowSelection,
        handleInputChange,
        handleInputChange2,
        handleAddNewMemo,
        handleDeleteMemo,
        handleSelectedRow,
        handlePopupClick,
        isModalVisible,
        selectedFinancialStatement,
        showModal,
        handleClose,
        selectFinancialStatement
    };
};