import React, { useState, useEffect } from 'react';
import { Row, Col, Button, Modal, Input, Table, Typography, message } from 'antd';
import apiClient from "../../../../config/apiClient.jsx";
import { PRODUCTION_API } from '../../../../config/apiConstants.jsx';
import {Grid} from "@mui/material";
import WelcomeSection from "../../../common/components/WelcomeSection.jsx";

const { Text } = Typography;

const SBomPage = () => {
    const [data, setData] = useState([]); // BOM 데이터 목록
    const [selectedSBom, setSelectedSBom] = useState(null); // 선택된 BOM
    const [isModalVisible, setIsModalVisible] = useState(false); // 모달 열림 여부
    const [newSBom, setNewSBom] = useState({}); // 새로 추가하거나 수정할 BOM 데이터
    const [isEditing, setIsEditing] = useState(false); // 수정 모드 여부
    const [activeTabKey, setActiveTabKey] = useState('1'); // 탭 관리 상태

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
        try {
            await apiClient.post(PRODUCTION_API.S_BOM_CREATE_API, newSBom);
            message.success('새 BOM이 성공적으로 추가되었습니다.');
            setIsModalVisible(false);
            refreshSBoms();
        } catch (error) {
            console.error('Error adding SBOM:', error);
            message.error('새 BOM 추가 중 오류가 발생했습니다.');
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

    // Table 컬럼 정의
    const sbomColumns = [
        {
            title: 'BOM 코드',
            dataIndex: 'code',
            key: 'code',
            width: '20%',
        },
        {
            title: 'BOM 이름',
            dataIndex: 'name',
            key: 'name',
            width: '20%',
        },
        {
            title: 'BOM 설명',
            dataIndex: 'description',
            key: 'description',
            width: '30%',
        },
        {
            title: '사용',
            dataIndex: 'isActive',
            key: 'isActive',
            render: (text) => (text ? 'Y' : 'N'),
            width: '10%',
        },
        {
            title: '',
            key: 'action',
            render: (text, record) => (
                <span>
                    <a onClick={() => handleOpenModal(record)}>수정</a>
                    <a style={{ marginLeft: 8 }} onClick={() => handleDeleteSBom(record.id)}>삭제</a>
                </span>
            ),
            width: '5%',
        },
    ];

    return (
        <div style={{ padding: '24px' }}>

            <Grid container spacing={3}>
                <Grid item xs={12} md={12}>
                    <WelcomeSection
                        title="BOM 관리"
                        description={(
                            <Typography>
                                BOM 관리 페이지는 BOM 관리 시스템에서{' '}
                                <span style={{ color: '#00C1D8' }}>품목별 자재명세</span>와{' '}
                                <span style={{ color: '#00C1D8' }}>명세 변경이력</span>을{' '}
                                <span style={{ color: '#00C1D8' }}>관리하고 등록</span>하는 중요한 기능을 제공하는 페이지임.
                                <br />
                                이 페이지는 BOM의 효율적인 운영과 관리를 지원하며, BOM 상태를 실시간으로 모니터링하는 데 필수적인 역할을 함.
                            </Typography>
                        )}
                        tabItems={tabItems()}
                        activeTabKey={activeTabKey}
                        handleTabChange={handleTabChange}
                    />
                </Grid>
                {activeTabKey === '1' && (
                    <Grid item xs={12} md={12}>
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
                        </Modal>

                    </Grid>
                )}

                {activeTabKey === '2' && (
                    <Grid>
                        {/* BOM 검색 바 */}
                        <Row gutter={16} style={{ marginBottom: '16px' }}>
                            <Col span={8}>
                                <Input.Search
                                    placeholder="BOM 검색"
                                    enterButton
                                />
                            </Col>
                        </Row>

                        {/* (임시) SBOM 목록 //TODO Green BOM 으로 변경 */}
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
                            visible={isModalVisible}
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
                        </Modal>
                    </Grid>
                )}

            </Grid>
        </div>

    );
};

const tabItems = () => {
    return [
        {
            key: '1',
            label: 'S-BOM',
            children: <Typography>표준 자재명세서</Typography>,
        },
        {
            key: '2',
            label: 'Green BOM',
            children: <Typography>친환경 자재명세서</Typography>,
        },
    ];
}

// 탭 변경 함수
const handleTabChange = (key) => {
    console.log("탭변경 확인 key : ", key);
    setActiveTabKey(key); // 상태 업데이트
};

const getRowClassName = (record) => {
    return record.isActive ? 'active-row' : 'inactive-row';
};

export default SBomPage;
