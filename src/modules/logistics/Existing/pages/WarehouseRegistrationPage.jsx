import React from 'react';
import { Typography } from 'antd';
import WarehouseListSection from '../components/WarehouseListSection';
import ButtonSection from '../components/common/ButtonSection';
import SearchSection from '../components/common/SearchSection';
import useWarehouseDetail from '../hooks/useWarehouseDetail';  // 커스텀 훅 import

const WarehouseRegistrationPage = ({initialData}) => {
    const {
        loading,
        error,
    } = useWarehouseDetail();  // 커스텀 훅 사용

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
            />

            {/* 버튼 섹션 */}
            <ButtonSection onCreateClick={() => openModal(null)} />  {/* 신규 등록 모달 열기 */}
        </div>
    );
};

export default WarehouseRegistrationPage;
