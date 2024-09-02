import axios from 'axios';
import { FINANCIAL_API } from '../../../config/apiConstants.jsx';

// 분개유형 출력 함수
export const showJournalEntrySetup = async () => {
    try {
        const response = await axios.post(FINANCIAL_API.SHOW_JOURNAL_ENTRY_TYPE_SETUP_API);
        return response.data;
    } catch (error) {
        console.error("분개 유형 설정 정보를 가져오는데 실패하였습니다.", error);
        throw error;
    }
};

