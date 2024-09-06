import React, {useEffect, useState} from 'react';
import {Button, Modal} from 'antd';
import ProductDetailSection from './ProductDetailSection';

const ProductDetailModal = ({ open, onClose, productDetail, onSave, isSaving }) => {
    const [editableProductDetail, setEditableProductDetail] = useState({ ...productDetail });

    // productDetail이 변경되었을 때 editableProductDetail도 업데이트
    useEffect(() => {
        setEditableProductDetail({ ...productDetail });
    }, [productDetail]);

    const handleInputChange = (key, value) => {
        if (key === 'productGroup') {
            setEditableProductDetail({
                ...editableProductDetail,
                productGroupId: value.id,  // 그룹 ID
            });
        } else if (key === 'productionRouting') {
            setEditableProductDetail({
                ...editableProductDetail,
                productionRoutingId: value.id,  // 라우팅 ID
            });
        } else {
            setEditableProductDetail({
                ...editableProductDetail,
                [key]: value,
            });
        }
    };

    const handleSave = () => {
        if (onSave) {
            onSave(editableProductDetail);
        }
    }
    return (
        <Modal
            title="품목 상세 정보"
            open={open}
            onCancel={onClose}
            footer={[
                <Button
                    key="save"
                    type="primary"
                    onClick={handleSave}
                    loading={isSaving}
                    disabled={isSaving}
                >
                    저장
                </Button>,
            ]}
            width={700}  // 모달의 너비를 조절
            style={{ padding: '20px', cursor: 'move' }}
        >
            <ProductDetailSection
                productDetail={editableProductDetail}
                handleInputChange={handleInputChange}
            />
        </Modal>
    );
};

export default ProductDetailModal;