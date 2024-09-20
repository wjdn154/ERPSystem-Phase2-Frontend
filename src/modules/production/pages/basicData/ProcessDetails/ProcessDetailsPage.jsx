import React from 'react';
import { Row, Col, Button, Modal, Typography } from 'antd';
import SearchBar from '../../../components/basicData/ProcessDetails/SearchBar.jsx';
import ProcessDetailsListSection from '../../../components/basicData/ProcessDetails/ProcessDetailsListSection.jsx';
import SelectedProcessDetailsSection from '../../../components/basicData/ProcessDetails/SelectedProcessDetailsSection.jsx';
import { useProcessDetails } from '../../../hooks/basicData/ProcessDetails/ProcessDetailsHook.jsx';
import { processDetailsColumn } from '../../../utils/basicData/ProcessDetails/ProcessDetailsColumn.jsx';
import { getRowClassName, filterProcessDetails } from '../../../utils/basicData/ProcessDetails/ProcessDetailsUtil.jsx';

const { Text } = Typography;

const ProcessDetailsPage = ({ initialData }) => {
    const {
        data,
        processDetail,
        handleSave,
        handleSelectedRow,
        handleDeleteProcessDetail,
        isProcessModalVisible,
        handleClose,
        handleInputChange,
        handleAddProcess,
        handleSearch,
        searchData,
        isSearchActive,
    } = useProcessDetails(initialData);

    return (
        <div style={{ padding: '24px' }}>
            {/* 검색 바 */}
            <Row gutter={16} style={{ marginBottom: '16px' }}>
                <Col span={8}>
                    <SearchBar onSearch={handleSearch} />
                </Col>
            </Row>

            {/* 검색 결과 목록 또는 경고 메시지 */}
            {isSearchActive && (
                <>
                    {searchData && searchData.length > 0 ? (
                        <Row gutter={16} style={{ marginBottom: '16px' }}>
                            <Col span={24}>
                                <ProcessDetailsListSection
                                    columns={processDetailsColumn}
                                    data={searchData}
                                    handleSelectedRow={handleSelectedRow}
                                    rowClassName={getRowClassName}
                                />
                            </Col>
                        </Row>
                    ) : (
                        <Text type="warning">검색하신 공정명을 찾을 수 없습니다.</Text>
                    )}
                </>
            )}

            {/* 기본 데이터 목록 */}
            <Row gutter={16} style={{ marginTop: isSearchActive && searchData && searchData.length > 0 ? '16px' : '0' }}>
                <Col span={24}>
                    <ProcessDetailsListSection
                        columns={processDetailsColumn}
                        data={data}
                        handleSelectedRow={handleSelectedRow}
                        rowClassName={getRowClassName}
                    />
                </Col>
            </Row>

            {/* 공정 추가 버튼 */}
            <Button type="primary" onClick={handleAddProcess} style={{ marginTop: '16px' }}>
                등록
            </Button>

            {/* 모달 컴포넌트 */}
            {processDetail && (
                <Modal
                    visible={isProcessModalVisible} // 모달 상태에 따라 표시
                    onCancel={handleClose} // 모달을 닫는 함수
                    footer={null} // 모달의 하단 버튼 제거
                >
                    <SelectedProcessDetailsSection
                        processDetail={processDetail}
                        handleClose={handleClose}
                        handleInputChange={handleInputChange}
                        handleSave={handleSave}
                        handleDeleteProcessDetail={handleDeleteProcessDetail}
                    />
                </Modal>
            )}
        </div>
    );
};

export default ProcessDetailsPage;
