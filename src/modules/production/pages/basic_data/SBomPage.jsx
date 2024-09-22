import React, { useState, useEffect } from 'react';
import { Row, Col, Button, Modal, Input, Table, Typography, message } from 'antd';
import apiClient from "../../../../config/apiClient.jsx";
import { PRODUCTION_API } from '../../../../config/apiConstants.jsx';

const { Text } = Typography;

const SBomPage = () => {
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
            title: '사용 여부',
            dataIndex: 'isActive',
            key: 'isActive',
            render: (text) => (text ? '사용 중' : '미사용'),
            width: '10%',
        },
        {
            title: '동작',
            key: 'action',
            render: (text, record) => (
                <span>
                    <a onClick={() => handleOpenModal(record)}>수정</a>
                    <a style={{ marginLeft: 8 }} onClick={() => handleDeleteSBom(record.id)}>삭제</a>
                </span>
            ),
            width: '20%',
        },
    ];

    return (
        <div style={{ padding: '24px' }}>
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
                새 BOM 등록
            </Button>

            {/* 모달 컴포넌트 */}
            <Modal
                title={isEditing ? 'BOM 수정' : '새 BOM 등록'}
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
        </div>
    );
};

export default SBomPage;
