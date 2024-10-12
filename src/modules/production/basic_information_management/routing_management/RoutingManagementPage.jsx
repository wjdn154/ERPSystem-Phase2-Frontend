import React, {useEffect, useMemo, useState} from 'react';
import { Box, Grid, Grow } from '@mui/material';
import WelcomeSection from '../../../../components/WelcomeSection.jsx';
import { processRoutingColumns, tabItems} from './RoutingManagementUtil.jsx';
import {Typography} from '@mui/material';
import {Button, Col, Input, message, Modal, Row, Table} from 'antd';
import TemporarySection from "../../../../components/TemporarySection.jsx";
import apiClient from "../../../../config/apiClient.jsx";
import { PRODUCTION_API } from "../../../../config/apiConstants.jsx";
import {useNotificationContext} from "../../../../config/NotificationContext.jsx";

const RoutingManagementPage = () => {
    const [activeTabKey, setActiveTabKey] = useState('1');
    const [data, setData] = useState([]); // 원본데이터
    const [selectedRouting, setSelectedRouting] = useState(null);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [newRouting, setNewRouting] = useState({});
    const [isEditing, setIsEditing] = useState(false);
    const [filteredData, setFilteredData] = useState([]); // 필터링된 데이터
    const [searchText, setSearchText] = useState(''); // 검색어 상태
    const [activeColumn, setActiveColumn] = useState(null); // 검색 중인 컬럼 상태


    // 검색 필터링 로직
    const handleFilter = (value, dataIndex) => {
        const filtered = data.filter((item) =>
            item[dataIndex] ? item[dataIndex].toString().toLowerCase().includes(value.toLowerCase()) : false
        );
        setFilteredData(filtered);
        setSearchText(value);
    };

    // 1. ProcessRouting 전체 조회
    useEffect(() => {
        const fetchProcessRoutings = async () => {
            try {
                const response = await apiClient.post(PRODUCTION_API.ROUTING_LIST_API);
                const rawData = response.data;

                // rawData가 배열인지 확인
                if (!Array.isArray(rawData)) {
                    throw new Error('API 응답이 배열이 아닙니다.');
                }

                // 각 routing의 step들을 하나의 배열로 플랫하게 변환
                const formattedData = rawData.map(routing => ({
                    id: routing.id,
                    code: routing.code,
                    name: routing.name,
                    description: routing.description,
                    routingSteps: routing.routingSteps.map(step => ({
                        stepOrder: step.stepOrder,
                        processRoutingId: step.id.processRoutingId,
                        processId: step.id.processId
                    })) // routingSteps를 단순화된 구조로 변환
                }));
                setData(formattedData);
            } catch (error) {
                console.error('Error fetching process routings:', error);
                message.error('경로 목록을 불러오는 중 오류가 발생했습니다.');
            }
        };

        fetchProcessRoutings();
    }, []);


    // 2. ProcessRouting 생성
    const handleAddProcessRouting = async () => {
        try {
            await apiClient.post(PRODUCTION_API.ROUTING_CREATE_API, newRouting);
            message.success('새 공정 경로가 성공적으로 추가되었습니다.');
            setIsModalVisible(false);
            // 데이터 새로고침
            const response = await apiClient.post(PRODUCTION_API.ROUTING_LIST_API);
            setData(response.data);
        } catch (error) {
            console.error('Error adding process routing:', error);
            message.error('새 공정 경로 추가 중 오류가 발생했습니다.');
        }
    };

    // 3. ProcessRouting 수정
    const handleEditProcessRouting = async () => {
        try {
            await apiClient.post(PRODUCTION_API.ROUTING_UPDATE_API(selectedRouting.id), newRouting);
            message.success('공정 경로가 성공적으로 수정되었습니다.');
            setIsModalVisible(false);
            // 데이터 새로고침
            const response = await apiClient.post(PRODUCTION_API.ROUTING_LIST_API);
            setData(response.data);
        } catch (error) {
            console.error('Error updating process routing:', error);
            message.error('공정 경로 수정 중 오류가 발생했습니다.');
        }
    };

    // 4. ProcessRouting 삭제
    const handleDeleteProcessRouting = async (id) => {
        try {
            await apiClient.post(PRODUCTION_API.ROUTING_DELETE_API(id));
            message.success('공정 경로가 성공적으로 삭제되었습니다.');
            // 데이터 새로고침
            const response = await apiClient.post(PRODUCTION_API.ROUTING_LIST_API);
            setData(response.data);
        } catch (error) {
            console.error('Error deleting process routing:', error);
            message.error('공정 경로 삭제 중 오류가 발생했습니다.');
        }
    };

    // 5. 검색 기능
    const handleSearchProcessDetails = async (keyword) => {
        try {
            const response = await apiClient.post(PRODUCTION_API.ROUTING_SEARCH_PROCESS_DETAILS_API, { keyword });
            setData(response.data);
        } catch (error) {
            console.error('Error searching process details:', error);
            message.error('검색 중 오류가 발생했습니다.');
        }
    };

    // 6. Modal 열기/닫기
    const handleOpenModal = (record) => {
        setSelectedRouting(record);
        setIsEditing(!!record); // 기록이 있으면 수정 모드, 아니면 생성 모드
        setNewRouting(record || {}); // 수정 시 기존 값 사용, 생성 시 빈 값
        setIsModalVisible(true);
    };
    const handleCloseModal = () => setIsModalVisible(false);

    // 7. Input 값 변경 처리
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        console.log("Input Change - Name:", name, "Value:", value); // 로그로 입력 값 확인
        setNewRouting({ ...newRouting, [name]: value });
    };

    const refreshProcessRoutings = async () => {
        try {
            const response = await apiClient.post(PRODUCTION_API.ROUTING_LIST_API);
            setData(response.data);
        } catch (error) {
            console.error('Error refreshing process routings:', error);
            message.error('데이터 새로고침 중 오류가 발생했습니다.');
        }
    };

    const handleTabChange = (key) => {
        setActiveTabKey(key);
    };

    return (
        <Box sx={{ margin: '20px' }}>
            <Grid container spacing={3}>
                <Grid item xs={12} md={12}>
                    <WelcomeSection
                        title="Routing 관리"
                        description={(
                            <Typography>
                                Routing 관리 페이지는 <span>제품 생산에 필요한 공정 흐름을 관리</span>하는 곳임. 각 제품의 생산 과정을 <span>효율적으로 연결</span>하고, <span>공정 순서</span>를 최적화하여 생산 속도를 높일 수 있음. 이 페이지에서는 <span>Routing 경로를 설정, 수정, 삭제</span>할 수 있으며, <span>각 공정의 순서와 의존성</span>을 관리할 수 있음.
                            </Typography>
                        )}
                        tabItems={tabItems()}
                        activeTabKey={activeTabKey}
                        handleTabChange={handleTabChange}
                    />
                </Grid>
            </Grid>

            {activeTabKey === '1' && (
                <Grid sx={{ padding: '0px 20px 0px 20px' }} container spacing={3}>
                    <Grid item xs={12} md={12}>
                        <Grow in={true} timeout={200}>
                            <div>
                                {/* ProcessRouting 목록 */}
                                <Table
                                    dataSource={Array.isArray(filteredData) && filteredData.length > 0 ? filteredData : data} // 필터링된 데이터 사용
                                    columns={processRoutingColumns(activeColumn, searchText, setActiveColumn, handleFilter)} // 상태와 함수 전달
                                    rowKey="id"
                                />
                                {/* 모달 컴포넌트 */}
                                <Modal
                                    title={isEditing ? '공정 경로 수정' : '새 공정 경로 등록'}
                                    open={isModalVisible}
                                    onOk={isEditing ? handleEditProcessRouting : handleAddProcessRouting}
                                    onCancel={handleCloseModal}
                                >
                                    <Input
                                        name="code"
                                        placeholder="경로 코드"
                                        value={newRouting.code}
                                        onChange={handleInputChange}
                                    />
                                    <Input
                                        name="name"
                                        placeholder="경로 이름"
                                        value={newRouting.name}
                                        onChange={handleInputChange}
                                        style={{ marginTop: '10px' }}
                                    />
                                    <Input
                                        name="description"
                                        placeholder="경로 설명"
                                        value={newRouting.description}
                                        onChange={handleInputChange}
                                        style={{ marginTop: '10px' }}
                                    />
                                </Modal>
                            </div>
                        </Grow>
                    </Grid>
                </Grid>
            )}

            {activeTabKey === '2' && (
                <Grid sx={{ padding: '0px 20px 0px 20px' }} container spacing={3}>
                    <Grid item xs={12} md={5} sx={{ minWidth: '500px !important', maxWidth: '700px !important' }}>
                        <Grow in={true} timeout={200}>
                            <div>
                                <TemporarySection />
                            </div>
                        </Grow>
                    </Grid>
                </Grid>
            )}

        </Box>
    );
};

export default RoutingManagementPage;