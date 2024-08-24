import axios from 'axios';
import { FINANCIAL_API } from '../../../config/apiConstants.jsx';
import { accountSubjectHook } from '../hooks/AccountSubjectHook.jsx';

// 계정과목 기본 정보 호출 함수
export const fetchAccountSubject = async () => {
    try {
        const response = await axios.post(FINANCIAL_API.ACCOUNT_SUBJECTS_API);
        return response.data; // 데이터를 반환
    } catch (error) {
        console.error("계정과목 상세 정보를 가져오는 중 오류 발생:", error);
        throw error; // 호출한 곳에서 에러 처리
    }
};

// 계정과목 상세 호출 함수
export const fetchAccountSubjectDetail = async (code) => {
    try {
        const response = await axios.post(FINANCIAL_API.ACCOUNT_SUBJECT_DETAIL_API(code));
        return response.data; // 데이터를 반환
    } catch (error) {
        console.error("계정과목 상세 정보를 가져오는 중 오류 발생:", error);
        throw error; // 호출한 곳에서 에러 처리
    }
};