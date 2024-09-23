import React, { useState, useEffect } from 'react';
import { Row, Col, Button, Modal, Input, Table, Typography, message } from 'antd';
import apiClient from "../../../../../config/apiClient.jsx";
import { PRODUCTION_API } from '../../../../../config/apiConstants.jsx';
import { processRoutingColumns } from '../../utils/basic_data/ProcessRoutingColum.jsx';
import {Grid} from "@mui/material";
import WelcomeSection from "../../../../../components/WelcomeSection.jsx";
import {tabItems} from "../../../basic_information_management/workcenter_management/WorkcenterUtil.jsx";

const { Text } = Typography;

const ProcessRoutingPage = () => {
    const [data, setData] = useState([]);
    const [selectedRouting, setSelectedRouting] = useState(null);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [newRouting, setNewRouting] = useState({});
    const [isEditing, setIsEditing] = useState(false);

    // 1. ProcessRouting 전체 조회
    useEffect(() => {
        const fetchProcessRoutings = async () => {
            try {
                const response = await apiClient.post(PRODUCTION_API.ROUTING_LIST_API);
                const rawData = response.data;

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



    return (
        <div style={{ padding: '24px' }}>

            <Grid container spacing={3}>
                <Grid item xs={12} md={12}>
                    <WelcomeSection
                        title="Routing 관리"
                        description={(
                            <Typography>
                                Routing 관리 페이지는 Routing 관리 시스템에서{' '}
                                <span style={{ color: '#00C1D8' }}>생산공정경로</span>와{' '}
                                <span style={{ color: '#00C1D8' }}>공정경로 내역</span>을{' '}
                                <span style={{ color: '#00C1D8' }}>관리하고 등록</span>하는 중요한 기능을 제공하는 페이지임.
                                <br />
                                이 페이지는 Routing의 효율적인 운영과 관리를 지원하며, Routing 상태를 실시간으로 모니터링하는 데 필수적인 역할을 함.
                            </Typography>
                        )}
                        // tabItems={tabItems()}
                        // activeTabKey={activeTabKey}
                        // handleTabChange={handleTabChange}
                    />
                </Grid>
            </Grid>

            {/* 검색 바 */}
            <Row gutter={16} style={{ marginBottom: '16px' }}>
                <Col span={8}>
                    <Input.Search
                        placeholder="생산 공정 검색"
                        onSearch={handleSearchProcessDetails}
                        enterButton
                    />
                </Col>
            </Row>

            {/* ProcessRouting 목록 */}
            <Table
                dataSource={Array.isArray(data) ? data : []} // 배열로 변환하여 전달
                columns={processRoutingColumns} // 배열을 직접 전달
                rowKey="id"
            />

            {/* 등록 버튼 */}
            <Button type="primary" onClick={() => handleOpenModal(null)} style={{ marginTop: '16px' }}>
                등록
            </Button>

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
    );
};

export default ProcessRoutingPage;
