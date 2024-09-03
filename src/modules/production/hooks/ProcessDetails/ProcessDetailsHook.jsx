import { useState, useEffect, useMemo } from 'react';
import {
    fetchProcessDetails,
    fetchProcessDetail,
    updateProcessDetail
} from '../../services/ProcessDetails/ProcessDetailsApi.jsx';

export const useProcessDetails = (initialData) => {
    const [data, setData] = useState(initialData);
    const [showDetail, setShowDetail] = useState(false);
    const [selectedRow, setSelectedRow] = useState(null);
    const [processDetail, setProcessDetail] = useState(initialData.processDetail);
    const [isProcessModalVisible, setIsProcessModalVisible] = useState(false);

    const memoizedData = useMemo(() => data, [data]);

    useEffect(() => {
        if (processDetail) {
            setShowDetail(false);
            setTimeout(() => {
                setShowDetail(true);
            }, 0);
        }
    }, [processDetail]);

    const handleRowSelection = {
        type: 'radio',
        selectedRowKeys: selectedRow ? [selectedRow.id] : [],
        onChange: (selectedRowKeys, selectedRows) => {
            if (selectedRows.length > 0) {
                handleSelectedRow(selectedRows[0]);
            }
        },
    };

    const handleSelectedRow = async (selectedRow) => {
        setSelectedRow(selectedRow);
        try {
            const detail = await fetchProcessDetail(selectedRow.code);
            if (!detail) {
                throw new Error('선택한 공정의 세부정보 데이터가 없음');
            }
            setProcessDetail(detail);
        } catch (error) {
            console.error("API에서 데이터를 가져오는 중 오류 발생:", error);
        }
    };


    const handleInputChange = (e, key) => {
        const value = e.target.value;
        setProcessDetail(prevState => ({
            ...prevState,
            [key]: value,
        }));
    };

    const handleInputChange2 = (e, field, index) => {
        const currentField = processDetail[field] || [];
        if (currentField[index]) {
            currentField[index].content = e.target.value;
        }
        setProcessDetail({
            ...processDetail,
            [field]: currentField,
        });
    };

    const handleAddNewDetail = (field) => {
        setProcessDetail(prevState => {
            const currentField = prevState[field] || [];
            const maxCode = Math.max(...currentField.map(detail => detail.code)) > 0 ? Math.max(...currentField.map(detail => detail.code)) : 0;
            const newCode = maxCode + 1;

            const newDetail = { code: newCode, content: '' };
            return {
                ...prevState,
                [field]: [...currentField, newDetail]
            };
        });
    };

    const handleDeleteDetail = (field, code) => {
        setProcessDetail((prevState) => {
            const updatedDetails = prevState[field].filter((detail) => detail.code !== code);
            const reindexedDetails = updatedDetails.map((detail, index) => ({
                ...detail,
                code: index + 1,
            }));

            return {
                ...prevState,
                [field]: reindexedDetails,
            };
        });
    };

    const handleSave = async () => {
        try {
            const confirmSave = window.confirm("정말로 저장하시겠습니까?");
            if (!confirmSave) return;

            await updateProcessDetail(processDetail.code, processDetail);
            const updatedData = await fetchProcessDetails();
            setData(updatedData);
        } catch (error) {
            console.error("API에서 데이터를 가져오는 중 오류 발생:", error);
        }
    };

    return {
        data,
        processDetail,
        setProcessDetail,
        handleRowSelection,
        handleInputChange,
        handleInputChange2,
        handleAddNewDetail,
        handleDeleteDetail,
        handleSelectedRow,
        isProcessModalVisible,
        showDetail,
        handleSave,
    };
};
