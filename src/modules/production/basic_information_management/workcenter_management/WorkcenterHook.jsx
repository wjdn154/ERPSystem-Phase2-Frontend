import { useState, useEffect } from 'react';
import {
    fetchWorkcenters,
    fetchWorkcenter,
    updateWorkcenter,
    deleteWorkcenter,
    createWorkcenter,
} from './WorkcenterApi.jsx';
import { useSearch } from '../../common/useSearch.jsx';

import { Modal } from "antd";

export const useWorkcenter = (initialData) => {
    const [activeTabKey, setActiveTabKey] = useState('1');
    const [data, setData] = useState(initialData || []);
    const [workcenter, setWorkcenter] = useState(null);
    const [selectedRow, setSelectedRow] = useState(null);
    const [isWorkcenterModalVisible, setIsWorkcenterModalVisible] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [activeRate, setActiveRate] = useState(null);

    const handleTabChange = (key) => {
        setActiveTabKey(key);
    };


    // useSearch 훅을 사용하여 검색 상태 관리
    const searchFields = ['code', 'name', 'description']; // Workcenter에서 검색할 필드 지정
    const {
        searchData,
        isSearchActive,
        handleSearch,
        setIsSearchActive,
        setSearchData,
    } = useSearch(data, searchFields);

    // 초기 데이터 로딩
    useEffect(() => {
        const loadWorkcenters = async () => {
            try {
                const fetchedData = await fetchWorkcenters();
                setData(fetchedData); // 데이터를 state로 설정
            } catch (error) {
                console.error("데이터 로드 중 오류 발생:", error);
            }
        };

        loadWorkcenters();
    }, []); // 빈 배열로 두어 컴포넌트가 마운트될 때 항상 데이터를 불러오도록 함


    // 특정 작업장 삭제 로직
    const handleDeleteWorkcenter = async (code) => {
        try {
            await deleteWorkcenter(code);

            Modal.success({
                content: '삭제가 완료되었습니다.',
            });

            // 선택된 작업장이 삭제된 경우, 상세 보기 초기화
            if (workcenter && workcenter.code === code) {
                setWorkcenter(null);
            }

            // 리스트 새로고침
            const updatedWorkcenters = await fetchWorkcenters();
            setData(updatedWorkcenters);

        } catch (error) {
            Modal.error({
                content: error.message.includes('사용 중이므로 삭제할 수 없습니다')
                    ? '해당 작업장은 현재 사용 중이므로 삭제할 수 없습니다.'
                    : '삭제 중 오류가 발생했습니다. 다시 시도해주세요.',
            });
        }
    };

    // 행 선택 핸들러 설정
    const handleRowSelection = {
        type: 'radio',
        onSelect: (record) => {
            handleSelectedRow(record); // 선택된 행의 데이터를 설정하는 함수 호출
        },
    };

    // 행 선택 시 상세정보 설정
    const handleSelectedRow = async (selectedRow) => {
        setSelectedRow(selectedRow);
        setIsEditing(false);

        try {
            const detail = await fetchWorkcenter(selectedRow.code);
            setWorkcenter(detail);
            setIsWorkcenterModalVisible(true); // 모달 표시
        } catch (error) {
            console.error("API에서 데이터를 가져오는 중 오류 발생:", error);
        }
    };

    // 작업장 유형 변경 핸들러
    const handleWorkcenterTypeChange = (value) => {
        setWorkcenter({
            ...workcenter,
            workcenterType: value,  // 한국어 값에서 변환된 영어 값을 그대로 저장
        });
    };

    // Input 수정
    const handleInputChange = (value, key) => {
        let newValue = value; // 기본적으로 Select에서 바로 전달된 value를 사용

        if (key === 'isActive') {
            newValue = value === '사용중';  // '사용중'이면 true, 아니면 false로 변환
        }

        setWorkcenter({
            ...workcenter,
            [key]: newValue,
        });
    };


    // handleSave
    const handleSave = async () => {
        try {
            const confirmSave = window.confirm("저장하시겠습니까?");
            if (!confirmSave) return;

            if (isEditing) {
                await createWorkcenter(workcenter);
            } else {
                await updateWorkcenter(workcenter.code, workcenter);
            }

            // 데이터 저장 후 리스트 새로고침
            const updatedData = await fetchWorkcenters();
            setData(updatedData);


            // 리스트 새로고침 후 활성화율 재계산
            const activeCount = updatedData.filter((wc) => wc.isActive).length;
            const totalCount = updatedData.length;
            const activeRate = totalCount > 0 ? (activeCount / totalCount) * 100 : 0;
            const newActiveRate = totalCount > 0 ? (activeCount / totalCount) * 100 : 0;
            if (newActiveRate !== activeRate) {
                setActiveRate(newActiveRate);
            }
            console.log("사용률 새로고침:", newActiveRate); // 로그 추가

            handleClose();
        } catch (error) {
            console.error("작업장 저장 중 오류 발생:", error); // TODO 에러페이지 반환
        }
    };

    // handleClose
    const handleClose = () => {
        setIsWorkcenterModalVisible(false);
    };

    // 새 작업장 추가 핸들러
    const handleAddWorkcenter = () => {
        setWorkcenter({
            id: '',
            code: '',
            name: '',
            workcenterType: '',
            description: '',
            isActive: 'false',
            factoryCode: '',
            processCode: '',
            equipmentList: [],
            workerAssignments: []
        });
        setIsEditing(true);
        setIsWorkcenterModalVisible(true);
    };

    return {
        data,
        workcenter,
        setWorkcenter,
        isWorkcenterModalVisible,
        handleDeleteWorkcenter,
        handleSelectedRow,
        handleInputChange,
        handleSave,
        handleClose,
        handleAddWorkcenter,
        handleSearch, // useSearch 훅에서 반환된 handleSearch
        searchData,
        isSearchActive,
        setIsSearchActive,
        setSearchData,
        setActiveRate,
        handleTabChange,
        activeTabKey,
        handleWorkcenterTypeChange
    };
};
