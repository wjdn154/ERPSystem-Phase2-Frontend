import React from 'react';
import { Typography } from 'antd';
import WarehouseListSection from '../components/WarehouseListSection';
import ButtonSection from '../components/common/ButtonSection';
import SearchSection from '../components/common/SearchSection';
import WarehouseDetailModal from '../components/modals/WarehouseDetailModal';
import useWarehouseDetail from '../hooks/useWarehouseDetail';  // 커스텀 훅 import

const WarehouseRegistrationPage = ({initialData}) => {
    const {
        warehouse,
        loading,
        error,
        isModalVisible,
        openModal,
        closeModal,
        saveWarehouseDetail,
    } = useWarehouseDetail();  // 커스텀 훅 사용

    const handleRowClick = (warehouseId) => {
        openModal(warehouseId);  // 창고 클릭 시 상세 정보 모달 열기
    };

    if (loading) {
        return (
            <div style={{ textAlign: 'center', padding: '20px' }}>
                <Typography.Text>Loading...</Typography.Text>
            </div>
        );
    }

    if (error) {
        return <Typography.Text type="danger">{error}</Typography.Text>;
    }

    return (
        <div style={{ padding: '20px' }}>
            {/* 검색 섹션 */}
            <SearchSection />

            {/* 창고 목록 섹션 */}
            <WarehouseListSection
                data={data}
                initialData={initialData}
                onRowClick={handleRowClick}  // 창고 클릭 시 모달 열기
            />

            {/* 버튼 섹션 */}
            <ButtonSection onCreateClick={() => openModal(null)} />  {/* 신규 등록 모달 열기 */}

            {/* 창고 상세 정보 모달 */}
            <WarehouseDetailModal
                visible={isModalVisible}
                onCancel={closeModal}
                warehouse={warehouse}
                onSave={saveWarehouseDetail}
            />
        </div>
    );
};

export default WarehouseRegistrationPage;
