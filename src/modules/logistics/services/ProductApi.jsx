import axios from 'axios';
import { LOGISTICS_API } from '../../../config/apiConstants.jsx';

// 품목 기본 정보 호출 함수
export const fetchProduct = async () => {
    try {
        const response = await axios.post(LOGISTICS_API.PRODUCT_LIST_API);
        return response.data;
    } catch (error) {
        console.error("품목 정보를 가져오는 중 오류 발생:", error);
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
