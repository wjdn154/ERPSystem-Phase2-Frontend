import axios from 'axios';
import { LOGISTICS_API } from '../../../config/apiConstants.jsx';
import * as console from "react-dom/test-utils";
import error from "eslint-plugin-react/lib/util/error.js";

// // 품목 기본 정보 호출 함수
// export const fetchProduct = async () => {
//     try {
//         const response = await axios.post(LOGISTICS_API.PRODUCT_LIST_API);
//         return response.data;
//     } catch (error) {
//         console.error("품목 정보를 가져오는 중 오류 발생:", error);
//         throw error;
//     }
// };

// 품목 리스트를 가져오는 함수
export const fetchProductList = async () => {
    try {
        const response = await axios.get('/api/product/list');
        return response.data.map((product) => ({
            code: product.code,
            name: product.name,
            productGroupName: product.productGroupName,
            standard: product.standard,
            unit: product.unit,
            purchasePrice: product.purchasePrice,
            salesPrice: product.salesPrice,
            productType: product.productType,
            productionRoutingName: product.productionRoutingName,
        }));
    } catch (error) {
        console.error('Error fetching product list:', error);
        throw error;
    }
};

// 품목 상세 정보 호출 함수
export const fetchProductDetail = async (id) => {
    try {
        if (!id) {
            console.error("Invalid product ID:", id);
            return null;
        }

        const response = await axios.post(LOGISTICS_API.PRODUCT_DETAIL_API(id));
        return response.data;
    } catch (error) {
        console.error("Error fetching product detail:", error);
        return null;
    }
}

// 새로운 품목 등록 함수
export const saveProductDetail = async (newProductDetail) => {

    try {
        const response = await axios.post(LOGISTICS_API.PRODUCT_CREATE_API, {
            code: newProductDetail.code,
            name: newProductDetail.name,
            productGroupId: Number(newProductDetail.productGroupId),
            productionRoutingId: Number(newProductDetail.productionRoutingId),
            standard: newProductDetail.standard,
            unit: newProductDetail.unit,
            purchasePrice: parseFloat(newProductDetail.purchasePrice),
            salesPrice: parseFloat(newProductDetail.salesPrice),
            productType: newProductDetail.productType,
        });  // POST 요청으로 새로운 품목 등록

        return response.data;  // 성공적으로 등록된 데이터 반환
    } catch (error) {
        console.error("새 품목을 저장하는 중 오류 발생:", error.message || error);
        throw error;
    }
};

// 품목 상세 정보에서 수정하기 함수
export const updateProductDetail = async (id, data) => {
    try {
        if (typeof id !== 'string' && typeof id !== 'number') {
            throw new Error('Invalid ID type');
        }
        const response = await axios.put(LOGISTICS_API.PRODUCT_UPDATE_API(id),
            data);

        console.log('Sending data to server:', data);

        return response.data;
    } catch (error) {
        console.error("품목 상세 정보를 업데이트 하는 중 오류 발생:", error);
        throw error;
    }
}
