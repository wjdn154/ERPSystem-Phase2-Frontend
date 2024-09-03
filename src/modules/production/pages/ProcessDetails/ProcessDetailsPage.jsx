import React, { useState } from 'react';
import { Row, Col, Button, Modal } from 'antd';
import ProcessDetailsListSection from '../../components/ProcessDetails/ProcessDetailsListSection.jsx';
import SelectedProcessDetailsSection from '../../components/ProcessDetails/SelectedProcessDetailsSection.jsx';
import { useProcessDetails } from '../../hooks/ProcessDetails/ProcessDetailsHook.jsx';
import { processDetailsColumn } from '../../utils/ProcessDetails/ProcessDetailsColumn.jsx';
import { getRowClassName } from '../../utils/ProcessDetails/ProcessDetailsUtil.jsx';

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
    } = useProcessDetails(initialData);



    return (
        <div style={{ padding: '24px' }}>
            <Row gutter={16}>
                <Col span={24}>
                    <ProcessDetailsListSection
                        columns={processDetailsColumn}
                        data={data}
                        handleSelectedRow={handleSelectedRow} // 행 클릭 시 모달 열자 ㅏ
                        rowClassName={getRowClassName}
                    />
                </Col>
            </Row>
            <Button type="primary" onClick={handleAddProcess} style={{ marginBottom: '16px' }}>
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
