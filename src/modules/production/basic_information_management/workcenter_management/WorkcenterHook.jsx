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
import apiClient from "../../../../config/apiClient.jsx";
import {PRODUCTION_API} from "../../../../config/apiConstants.jsx";
import {useNotificationContext} from "../../../../config/NotificationContext.jsx";

export const useWorkcenter = (initialData) => {
    const [activeTabKey, setActiveTabKey] = useState('1');
    const [data, setData] = useState(initialData || []);
    const [workcenter, setWorkcenter] = useState(null);
    const [selectedRow, setSelectedRow] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [activeRate, setActiveRate] = useState(null);
    const notify = useNotificationContext(); // 알림 컨텍스트 사용
    const [isLoading, setIsLoading] = useState(false); // 로딩 상태

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
                const workcenters = await fetchWorkcenters();  // 작업장 목록 API 호출
                setData(workcenters);  // 상태에 데이터 저장
            } catch (error) {
                console.error('작업장 목록을 불러오는 중 오류 발생:', error);
            }
        };

        loadWorkcenters();  // 함수 호출
    }, []);  // 빈 배열로 두어 컴포넌트가 마운트될 때 항상 데이터를 불러오도록 함


    const fetchEquipmentDetails = async (id) => {
        try {
            const response = await apiClient.post(PRODUCTION_API.EQUIPMENT_DATA_DETAIL_API(id));
            return response.data;
        } catch (error) {
            console.error(`설비 ID ${id}의 정보를 가져오는 중 오류 발생:`, error);
            return null;
        }
    };

// 여러 설비 ID에 대해 설비 정보를 가져오는 함수
    const fetchEquipmentDetailsByEachId = async (equipmentIds) => {
        try {
            const equipmentDetails = await Promise.all(
                equipmentIds.map(async (id) => {
                    const equipment = await fetchEquipmentDetails(id);
                    return equipment
                        ? { equipmentNum: equipment.equipmentNum, equipmentName: equipment.equipmentName }
                        : { equipmentNum: '알 수 없음', equipmentName: '알 수 없는 설비' };
                })
            );
            return equipmentDetails;
        } catch (error) {
            console.error('설비 정보를 가져오는 중 오류 발생:', error);
            return [];
        }
    };


    // const fetchEquipmentByWorkcenterCode = async (workcenterCode) => {
    //     try {
    //         const response = await apiClient.post(
    //             `${PRODUCTION_API.EQUIPMENT_LIST_BY_WORKCENTER}/${workcenterCode}`
    //         );
    //         return response.data;
    //     } catch (error) {
    //         console.error('설비 목록 조회 실패:', error);
    //         return [];
    //     }
    // };

    // 특정 작업장 삭제 로직
    const handleDeleteWorkcenter = async (code) => {
        try {
            await deleteWorkcenter(code);

            // notify('success', '삭제 완료', '작업장이 성공적으로 삭제되었습니다.', 'bottomRight');


            Modal.success({
                content: '삭제가 완료되었습니다.',
            });

            // 삭제된 작업장을 목록에서 제거
            const updatedWorkcenters = data.filter((wc) => wc.code !== code);
            setData(updatedWorkcenters)

            // 선택된 작업장이 삭제된 경우, 상세 보기 초기화
            if (workcenter && workcenter.code === code) {
                setWorkcenter(null);
            }

        } catch (error) {
            // notify('error', '삭제 실패', '작업장 데이터 삭제 실패.', 'top');

            Modal.error({
                content: error.message.includes('사용 중이므로 삭제할 수 없습니다')
                    ? '해당 작업장은 현재 사용 중이므로 삭제할 수 없습니다.'
                    : '삭제 중 오류가 발생했습니다. 다시 시도해주세요.',
            });
        }
    };

    // 행 선택 시 상세정보 설정
    const handleSelectedRow = async (selectedRow) => {
        setSelectedRow(selectedRow);  // 선택된 행 상태 업데이트
        setIsLoading(true);  // 로딩 상태 활성화

        try {
            // API 호출로 작업장 세부 정보 가져오기
            const detail = await fetchWorkcenter(selectedRow.code);
            console.log('handleSelectedRow:', detail);  // 데이터 확인용 로그

            // 작업장 정보와 형식화된 설비 정보를 함께 설정
            setWorkcenter({ ...detail });
        } catch (error) {
            console.error("handleSelectedRow fetchWorkcenter(selectedRow.code) 데이터를 가져오는 중 오류 발생:", error);  // 오류 로그
        } finally {
            setIsLoading(false);  // 로딩 상태 종료
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


    // // handleSave
    // const handleSave = async () => {
    //     try {
    //         const confirmSave = window.confirm("저장하시겠습니까?");
    //         if (!confirmSave) return;
    //
    //         if (isEditing) {
    //             await createWorkcenter(workcenter);
    //         } else {
    //             await updateWorkcenter(workcenter.code, workcenter);
    //         }
    //
    //         // 새로운 작업장 추가 시, 기존 상태에 추가
    //         if (isEditing) {
    //             setData(prevData => [...prevData, workcenter]);
    //             notify('success', '저장 성공', '작업장 데이터 저장 성공.', 'bottomRight')
    //         } else {
    //             // 업데이트 시, 기존 데이터에서 수정된 데이터 반영
    //             setData(prevData =>
    //                 prevData.map(item => (item.code === workcenter.code ? workcenter : item))
    //             );
    //         }
    //
    //         // handleClose(); // 모달 닫기
    //     } catch (error) {
    //         console.error("작업장 저장 중 오류 발생:", error);
    //         notify('error', '조회 오류', '작업장 저장 중 오류 발생', 'top');
    //     }
    // };

    // // handleClose
    // const handleClose = () => {
    //     setIsWorkcenterModalVisible(false);
    // };

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
        // setIsWorkcenterModalVisible(true);
    };

    return {
        data,
        workcenter,
        setWorkcenter,
        // isWorkcenterModalVisible,
        handleDeleteWorkcenter,
        handleSelectedRow,
        handleInputChange,
        // handleSave,
        // handleClose,
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
