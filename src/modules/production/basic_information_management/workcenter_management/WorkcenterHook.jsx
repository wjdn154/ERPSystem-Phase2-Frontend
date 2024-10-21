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
    const [isWorkcenterModalVisible, setIsWorkcenterModalVisible] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [activeRate, setActiveRate] = useState(null);
    const [equipmentMapping, setEquipmentMapping] = useState({});
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
            // try {
            //     const workcenters = await fetchWorkcenters();
            //     const transformedData = await Promise.all(
            //         workcenters.map(async (wc) => ({
            //             ...wc,
            //             equipmentInfo: await fetchEquipmentDetailsByIds(wc.equipmentIds),
            //         }))
            //     );
            //     setData(transformedData);
            // } catch (error) {
            //     console.error('작업장 목록 로드 중 오류 발생:', error);
            // }
            const loadWorkcenters = async () => {
                try {
                    const workcenters = await fetchWorkcenters();
                    setData(workcenters);
                } catch (error) {
                    console.error('작업장 목록을 불러오는 중 오류 발생:', error);
                }
            };
            loadWorkcenters();

        };

        loadWorkcenters();
    }, []); // 빈 배열로 두어 컴포넌트가 마운트될 때 항상 데이터를 불러오도록 함

    const fetchEquipmentDetails = async (id) => {
        try {
            const response = await apiClient.post(PRODUCTION_API.EQUIPMENT_DATA_DETAIL_API(id));
            return response.data;
        } catch (error) {
            console.error(`설비 ID ${id}의 정보를 가져오는 중 오류 발생:`, error);
            return null;
        }
    };

    // // 설비 ID로 설비 세부 정보를 가져오는 함수
    // const fetchEquipmentDetailsByIds = async (equipmentIds) => {
    //     try {
    //         const response = await apiClient.post(PRODUCTION_API.EQUIPMENT_LIST_BY_IDS, { ids: equipmentIds });
    //         return response.data.map((equipment) => ({
    //             equipmentNum: equipment.equipmentNum,
    //             equipmentName: equipment.equipmentName,
    //         }));
    //     } catch (error) {
    //         console.error('설비 정보 조회 실패:', error);
    //         return [];
    //     }
    // };

    const fetchEquipmentByWorkcenterCode = async (workcenterCode) => {
        try {
            const response = await apiClient.post(
                `${PRODUCTION_API.EQUIPMENT_LIST_BY_WORKCENTER}/${workcenterCode}`
            );
            return response.data;
        } catch (error) {
            console.error('설비 목록 조회 실패:', error);
            return [];
        }
    };

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
    // const handleRowSelection = {
    //     type: 'radio',
    //     onSelect: async (record) => {
    //         try {
    //             const detail = await fetchWorkcenter(record.code);
    //             setWorkcenter(detail);
    //             setIsWorkcenterModalVisible(true);
    //             notify('success')
    //         } catch (error) {
    //             console.error('작업장 상세 정보 조회 실패:', error);
    //         }
    //     },
    // };

    // 행 선택 시 상세정보 설정
    const handleSelectedRow = async (selectedRow) => {
        setSelectedRow(selectedRow);
        setIsEditing(false);

        try {
            const detail = await fetchWorkcenter(selectedRow.code);

            const equipmentDetails = await Promise.all(
                detail.equipmentIds.map((id) => fetchEquipmentDetails(id))
            );

            // [설비고유번호] 설비명 형식으로 변환
            const formattedEquipments = equipmentDetails
                .filter((equipment) => equipment) // 유효한 데이터만 남김
                .map((equipment) => `[${equipment.equipmentNum}] ${equipment.equipmentName}`)
                .join(', ');

            setWorkcenter({ ...detail, formattedEquipments });
            // setIsWorkcenterModalVisible(true); // 모달 열기
        } catch (error) {
            console.error("API에서 데이터를 가져오는 중 오류 발생:", error);
        } finally {
            setIsLoading(false);
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

            // 새로운 작업장 추가 시, 기존 상태에 추가
            if (isEditing) {
                setData(prevData => [...prevData, workcenter]);
                notify('success', '저장 성공', '작업장 데이터 저장 성공.', 'bottomRight')
            } else {
                // 업데이트 시, 기존 데이터에서 수정된 데이터 반영
                setData(prevData =>
                    prevData.map(item => (item.code === workcenter.code ? workcenter : item))
                );
            }

            // handleClose(); // 모달 닫기
        } catch (error) {
            console.error("작업장 저장 중 오류 발생:", error);
            notify('error', '조회 오류', '작업장 저장 중 오류 발생', 'top');
        }
    };

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
        handleSave,
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
