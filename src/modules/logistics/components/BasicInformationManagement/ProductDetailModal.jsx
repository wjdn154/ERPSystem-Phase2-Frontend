import React from 'react';
import { Modal } from 'antd';
import ProductDetailSection from './ProductDetailSection';

const ProductDetailModal = ({ open, onClose, productDetail }) => {
    return (
        <Modal
            title="품목 상세 정보"
            open={open}
            onCancel={onClose}
            footer={null}
            width={700}  // 모달의 너비를 조절
            Style={{ padding: '20px' }}  // 모달 내용의 패딩 조절
        >
            <ProductDetailSection productDetail={productDetail} />
        </Modal>
    );
};

export default ProductDetailModal;