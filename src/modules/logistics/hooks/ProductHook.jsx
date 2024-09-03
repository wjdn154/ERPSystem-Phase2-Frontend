import {useEffect, useMemo, useState} from 'react';
import { fetchProduct, fetchProductDetail } from '../services/ProductApi.jsx';

// 계정과목 관련 커스텀 훅
export const productHook = (initialData) => {
    // 선택된 행과 품목의 상세 정보를 관리하는 상태
    const [data, setData] = useState(initialData);
    const [showDetail, setShowDetail] = useState(false);
    const [selectedRow, setSelectedRow] = useState(null);
    const [productDetail, setProductDetail] = useState(null);

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



    return {
        data,
        productDetail,
        handleRowSelection,
        handleSelectedRow,
        showDetail
    };
};