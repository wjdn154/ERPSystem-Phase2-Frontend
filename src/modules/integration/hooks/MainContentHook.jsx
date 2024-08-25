import { useState, useEffect } from 'react';
import axios from 'axios';
import { FINANCIAL_API } from '../../../config/apiConstants';

const MainContentHook = (selectedSubSubMenu) => {
    const [initialData, setInitialData] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!selectedSubSubMenu || selectedSubSubMenu === "회사정보수정") return;

        setLoading(true);
        const endpoint = getApiEndpoint(selectedSubSubMenu);

        axios.post(endpoint)
            .then(response => {
                setInitialData(response.data);
                setError(null);
            })
            .catch(err => {
                setError('데이터 로딩 중 오류가 발생했습니다.');
                setInitialData(null);
            })
            .finally(() => {
                setLoading(false);
            });
    }, [selectedSubSubMenu]);

    function getApiEndpoint(subSubMenu) {
        switch (subSubMenu) {
            case '계정과목및적요등록':
                return `${FINANCIAL_API.ACCOUNT_SUBJECTS_API}`;
            case '다른메뉴':
                return 'anotherMenu';
            default:
                return 'default';
        }
    }

    return { initialData, error, loading };
}

export default MainContentHook;