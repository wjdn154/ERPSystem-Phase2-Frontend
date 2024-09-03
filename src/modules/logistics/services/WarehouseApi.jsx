import axios from 'axios';
import { LOGISTICS_API } from '../../../config/apiConstants.jsx';

export const fetchWarehouseList = async () => {
    try {
        const response = await axios.post(LOGISTICS_API.WAREHOUSE_LIST_API); 
        return response.data;
    } catch (error) {
        console.error("창고 리스트를 가져오는 중 오류 발생:", error);
        throw error;
    }
};
