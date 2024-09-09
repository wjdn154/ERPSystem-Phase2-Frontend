import React, { useState } from 'react';
import { Modal, Button, Select } from 'antd';
import NewProductDetailSection from './NewProductSection';

const NewProductModal = ({ open, onClose, onSave, isSaving, groupList, routingList }) => {
    const [newProductDetail, setNewProductDetail] = useState({
        code: "",
        name: "",
        productGroupId: "",
        standard: "",
        unit: "",
        purchasePrice: "",
        salesPrice: "",
        productType: "",
        productionRoutingId: ""
    });

    const handleInputChange = (key, value) => {
        setNewProductDetail({
            ...newProductDetail,
            [key]: value,
        });
    };

    // 그룹 선택 시 ID 값을 저장
    const handleProductGroupChange = (value) => {
        setNewProductDetail({
            ...newProductDetail,
            productGroupId: value ? Number(value) : "",  // ID(Long) 값 저장
        });
    };

    // 생산 라우팅 선택 시 ID 값을 저장
    const handleProductionRoutingChange = (value) => {
        setNewProductDetail({
            ...newProductDetail,
            productionRoutingId: value ? Number(value) : "",  // ID(Long) 값 저장
        });
    };

    const handleSave = () => {
        onSave(newProductDetail);
    };

    return (

        <div>
            <Modal
                title="신규 품목 등록"
                open={open}
                onCancel={onClose}
                footer={[
                    <Button key="cancel" onClick={onClose} style={{ marginRight: '8px' }}>
                        닫기
                    </Button>,
                    <Button
                        key="save"
                        type="primary"
                        onClick={handleSave}
                        loading={isSaving}
                        disabled={isSaving}
                    >
                        저장
                    </Button>
                ]}
                width={800}
                style={{ padding: '20px', cursor: 'move' }}
            >

                {/* 분리된 컴포넌트 사용 */}
                <NewProductDetailSection
                    productDetail={newProductDetail}  // 기본값 빈 객체 보장
                    handleInputChange={handleInputChange}
                    handleProductGroupChange={handleProductGroupChange}
                    handleProductionRoutingChange={handleProductionRoutingChange}
                    groupList={groupList}  // 그룹 데이터 전달
                    routingList={routingList}  // 라우팅 데이터 전달
                />
            </Modal>
        </div>
    );
};

export default NewProductModal;
