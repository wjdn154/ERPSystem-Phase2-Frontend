import {useEffect, useMemo, useState} from 'react';
import {
    fetchAccountSubject,
    fetchAccountSubjectDetail,
    updateAccountSubjectDetail
} from '../services/AccountSubjectApi.jsx';
import {RelationCodeColumn} from "../utils/AccountSubject/RelationCodeColumn.jsx";
import {FinancialStatementColumn} from "../utils/AccountSubject/FinancialStatementColumn.jsx";

// 계정과목 관련 커스텀 훅
export const accountSubjectHook = (initialData) => {
    // 선택된 행과 계정과목 상세 정보를 관리하는 상태
    const [data, setData] = useState(initialData);
    const [selectedRow, setSelectedRow] = useState(null);
    const [accountSubjectDetail, setAccountSubjectDetail] = useState(null);
    const [isFinancialStatementModalVisible, setIsFinancialStatementModalVisible] = useState(false);
    const [isRelationCodeModalVisible, setIsRelationCodeModalVisible] = useState(false);

    const memoizedData = useMemo(() => data, [data]);

    useEffect(() => {
    }, [accountSubjectDetail]);

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
        if (key === 'englishName' && /[^a-zA-Z\s\-\'\.\,]/.test(value)) {
            alert('영어, 공백, 하이픈(-), 작은따옴표(\'), 점(.) 및 쉼표(,)만 입력 가능합니다.');
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
                    { code: 1, content: '' },
                    { code: 2, content: '' },
                    { code: 3, content: '' }
                ];
                return {
                    ...prevState,
                    [field]: newMemos
                };
            } else {
                // 기존 필드에서 가장 큰 code 값을 찾음
                const maxCode = Math.max(...currentField.map(memo => memo.code));
                const newCode = maxCode + 1;  // 가장 큰 code 값에 1을 더함

                const newMemo = { code: newCode, content: '' };
                return {
                    ...prevState,
                    [field]: [...currentField, newMemo]
                };
            }
        });
    };

    // 특정 적요 삭제 로직
    const handleDeleteMemo = (field, code) => {
        setAccountSubjectDetail((prevState) => {
            const updatedMemos = prevState[field].filter((memo) => memo.code !== code);

            // ID 재정렬 로직: 삭제 후 남은 항목의 ID를 1부터 연속적으로 할당
            const reindexedMemos = updatedMemos.map((memo, index) => ({
                ...memo,
                code: index + 1, // code를 1부터 시작하도록 재설정
            }));

            return {
                ...prevState,
                [field]: reindexedMemos,
            };
        });
    };


// 팝업 클릭 시 실행되는 함수
    const handlePopupClick = (field) => {
        if (field === "표준재무제표") showModal(field);
        if (field === "관계코드") showModal(field);
    };

    const showModal = (field) => {
        if (field === "표준재무제표") setIsFinancialStatementModalVisible(true);
        if (field === "관계코드") setIsRelationCodeModalVisible(true);
    }

    const handleClose = (e) => {
        setIsFinancialStatementModalVisible(false);
        setIsRelationCodeModalVisible(false);
    };

    const selectFinancialStatement = (item) => {
        setAccountSubjectDetail(prevState => {
            return {
                ...prevState,
                standardFinancialStatementCode: item.code,
                standardFinancialStatementName: item.name
            };
        });
    };

    // 관계코드 선택 시 실행되는 함수
    const selectRelationCode = (item) => {
        setAccountSubjectDetail(prevState => {
            return {
                ...prevState,
                parentCode: item.code,
                parentName: item.name
            };
        });
    };

    // 저장 버튼 클릭 시 실행되는 함수
    const handleSave = async () => {
        try {
            const confirmSave = window.confirm("정말로 저장하시겠습니까?");
            console.log(accountSubjectDetail);

            if (!confirmSave) return;

            await updateAccountSubjectDetail(accountSubjectDetail.code, accountSubjectDetail);
            const updatedData = await fetchAccountSubject();
            setData(updatedData);
            console.log(accountSubjectDetail);
        } catch (error) {
            console.error("API에서 데이터를 가져오는 중 오류 발생:", error);
        }
    }

    return {
        data,
        accountSubjectDetail,
        setAccountSubjectDetail,
        handleRowSelection,
        handleInputChange,
        handleInputChange2,
        handleAddNewMemo,
        handleDeleteMemo,
        handleSelectedRow,
        handlePopupClick,
        isFinancialStatementModalVisible,
        isRelationCodeModalVisible,
        showModal,
        handleClose,
        selectFinancialStatement,
        selectRelationCode,
        handleSave,
    };
};