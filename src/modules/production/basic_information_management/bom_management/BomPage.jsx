import React, {useEffect, useMemo, useState} from 'react';
import { Box, Grid, Grow } from '@mui/material';
import WelcomeSection from '../../../../components/WelcomeSection.jsx';
import {sbomColumns, tabItems} from './BomUtil.jsx';
import {Typography} from '@mui/material';
import {Button, Col, Input, message, Modal, Row, Table} from 'antd';
import TemporarySection from "../../../../components/TemporarySection.jsx";
import {PRODUCTION_API} from "../../../../config/apiConstants.jsx";
import apiClient from "../../../../config/apiClient.jsx";
import {useNotificationContext} from "../../../../config/NotificationContext.jsx";

export const BomPage = () => {
    const [activeTabKey, setActiveTabKey] = useState('1');
    const [data, setData] = useState([]); // BOM 데이터 목록
    const [selectedSBom, setSelectedSBom] = useState(null); // 선택된 BOM
    const [isModalVisible, setIsModalVisible] = useState(false); // 모달 열림 여부
    const [newSBom, setNewSBom] = useState({}); // 새로 추가하거나 수정할 BOM 데이터
    const [isEditing, setIsEditing] = useState(false); // 수정 모드 여부

    // 1. SBom 전체 조회
    useEffect(() => {
        const fetchSBoms = async () => {
            try {
                const response = await apiClient.post(PRODUCTION_API.S_BOM_LIST_API);
                setData(response.data);
            } catch (error) {
                console.error('Error fetching SBOMs:', error);
                message.error('BOM 목록을 불러오는 중 오류가 발생했습니다.');
            }
        };

        fetchSBoms();
    }, []);

    // 2. SBom 생성
    const handleAddSBom = async () => {
        const notify = useNotificationContext(); // context에서 notify 함수 가져오기
        try {
            await apiClient.post(PRODUCTION_API.S_BOM_CREATE_API, newSBom);
            notify('success', '성공', '새 BOM이 성공적으로 추가되었습니다.', 'top'); // 성공 메시지
            setIsModalVisible(false);
            refreshSBoms();
        } catch (error) {
            console.error('Error adding SBOM:', error);
            notify('error', '오류', '새 BOM 추가 중 오류가 발생했습니다.', 'top'); // 오류 메시지
        }
    };


    // 3. SBom 수정
    const handleEditSBom = async () => {
        try {
            await apiClient.post(PRODUCTION_API.S_BOM_UPDATE_API(selectedSBom.id), newSBom);
            message.success('BOM이 성공적으로 수정되었습니다.');
            setIsModalVisible(false);
            refreshSBoms();
        } catch (error) {
            console.error('Error updating SBOM:', error);
            message.error('BOM 수정 중 오류가 발생했습니다.');
        }
    };

    // 4. SBom 삭제
    const handleDeleteSBom = async (id) => {
        try {
            await apiClient.post(PRODUCTION_API.S_BOM_DELETE_API(id));
            message.success('BOM이 성공적으로 삭제되었습니다.');
            refreshSBoms();
        } catch (error) {
            console.error('Error deleting SBOM:', error);
            message.error('BOM 삭제 중 오류가 발생했습니다.');
        }
    };

    // 5. 모달 열기/닫기
    const handleOpenModal = (record) => {
        setSelectedSBom(record);
        setIsEditing(!!record);
        setNewSBom(record || {});
        setIsModalVisible(true);
    };

    const handleCloseModal = () => setIsModalVisible(false);

    // 6. Input 값 변경 처리
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewSBom({ ...newSBom, [name]: value });
    };

    // 데이터 새로고침
    const refreshSBoms = async () => {
        try {
            const response = await apiClient.post(PRODUCTION_API.S_BOM_LIST_API);
            setData(response.data);
        } catch (error) {
            console.error('Error refreshing SBOMs:', error);
            message.error('데이터 새로고침 중 오류가 발생했습니다.');
        }
    };

    const handleTabChange = (key) => {
        setActiveTabKey(key);
    };

    const getRowClassName = (record) => {
        return record.isActive ? 'active-row' : 'inactive-row';
    };

    return (
        <Box sx={{ margin: '20px' }}>
            <Grid container spacing={3}>
                <Grid item xs={12} md={12}>
                    <WelcomeSection
                        title="BOM"
                        description={(
                            <Typography>
                                BOM 페이지는 <span>품목별 자재명세</span>를 관리하는 곳임. 이 페이지에서는 <span>명세 내역을 조회, 수정, 삭제</span>할 수 있으며, <span>납품 완료 상태</span>와 <span>매출 정보</span>를 확인할 수 있음. 또한, <span>BOM</span>을 목적에 따라 Green BOM을 작성함.
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
                    <Grid item xs={12} md={12} sx={{ minWidth: '500px !important', maxWidth: '700px !important' }}>
                        <Grow in={true} timeout={200}>
                            <div>
                                {/* BOM 검색 바 */}
                                <Row gutter={16} style={{ marginBottom: '16px' }}>
                                    <Col span={8}>
                                        <Input.Search
                                            placeholder="BOM 검색"
                                            enterButton
                                        />
                                    </Col>
                                </Row>
                                {/* SBOM 목록 */}
                                <Table
                                    dataSource={data}
                                    columns={sbomColumns}
                                    rowKey="id"
                                />

                                {/* 새 BOM 등록 버튼 */}
                                <Button type="primary" onClick={() => handleOpenModal(null)} style={{ marginTop: '16px' }}>
                                    등록
                                </Button>

                                {/* 모달 컴포넌트 */}
                                <Modal
                                    title={isEditing ? '수정' : '등록'}
                                    open={isModalVisible}
                                    onOk={isEditing ? handleEditSBom : handleAddSBom}
                                    onCancel={handleCloseModal}
                                >
                                    <Input
                                        name="code"
                                        placeholder="BOM 코드"
                                        value={newSBom.code}
                                        onChange={handleInputChange}
                                    />
                                    <Input
                                        name="name"
                                        placeholder="BOM 이름"
                                        value={newSBom.name}
                                        onChange={handleInputChange}
                                        style={{ marginTop: '10px' }}
                                    />
                                    <Input
                                        name="description"
                                        placeholder="BOM 설명"
                                        value={newSBom.description}
                                        onChange={handleInputChange}
                                        style={{ marginTop: '10px' }}
                                    />

                                    <Button type="primary" onClick={() => handleOpenModal(null)} style={{ marginTop: '16px' }}>
                                        수정
                                    </Button>
                                    <Button type="primary" onClick={() => handleOpenModal(null)} style={{ marginTop: '16px' }}>
                                        삭제
                                    </Button>
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


export default BomPage;