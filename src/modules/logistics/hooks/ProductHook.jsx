import {useEffect, useMemo, useState} from 'react';
import { fetchProductDetail, updateProductDetail} from '../services/ProductApi.jsx';

// 계정과목 관련 커스텀 훅
export const productHook = (initialData) => {
    // 선택된 행과 품목의 상세 정보를 관리하는 상태
    const [data, setData] = useState(initialData);
    const [showDetail, setShowDetail] = useState(false);
    const [selectedRow, setSelectedRow] = useState(null);
    const [productDetail, setProductDetail] = useState(null);
    const [isSaving, setIsSaving] = useState(false);

    // useEffect로 상태 변경 확인
    useEffect(() => {
        setShowDetail(!!productDetail);
    }, [productDetail]);


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

    // 행 선택 시 품 상세 정보를 가져오는 로직
    const handleSelectedRow = async (selectedRow) => {
        setSelectedRow(selectedRow);
        try {
            const detail = await fetchProductDetail(selectedRow.id);
            setProductDetail(detail || {});
        } catch (error) {
            console.error("Error fetching product detail:", error);
        }
    };

    // 품목 상세 정보에서 수정하는 로직
    const updateProduct = async (updatedProductDetail) => {
        setIsSaving(true);  // 저장 중 상태로 설정
        try {
            // 실제 저장 로직을 여기에 추가 (예: API 호출)
            console.log('Updated Product Detail ID:', updatedProductDetail.id);
            const response = await updateProductDetail(updatedProductDetail.id, updatedProductDetail);
            console.log("저장된 데이터:", updatedProductDetail);
            if (response) {
                setProductDetail(updatedProductDetail);  // 저장 후 상태 업데이트
                console.log("저장 성공:", response);
            }
        } catch (error) {
            console.error("Error saving product detail:", error);
        } finally {
            setIsSaving(false);  // 저장 완료 후 상태 리셋
        }
    };


    return {
        data,
        productDetail,
        setProductDetail,
        handleRowSelection,
        handleSelectedRow,
        updateProductDetail,
        isSaving,
        showDetail
    };
};