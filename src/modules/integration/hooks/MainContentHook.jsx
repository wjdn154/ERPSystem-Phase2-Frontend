import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { subMenuItems } from '../../../config/menuItems.jsx';
import {Typography} from "@mui/material";

const MainContentHook = (selectedSubSubMenu) => {
    const [initialData, setInitialData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        let isMounted = true; // 컴포넌트 마운트 상태 확인

        const fetchData = () => {
            if (selectedSubSubMenu && selectedSubSubMenu.apiPath) {
                setLoading(true);

                axios.post(selectedSubSubMenu.apiPath)
                    .then(response => {
                        if (isMounted) {
                            setInitialData(response.data);
                            setError(null);
                        }
                    })
                    .catch(err => {
                        if (isMounted) {
                            setError('데이터 로딩 중 오류가 발생했습니다.');
                            setInitialData(null);
                        }
                    })
                    .finally(() => {
                        if (isMounted) {
                            setLoading(false);
                        }
                    });
            }
        };

        fetchData();

        // 클린업 함수로 컴포넌트 언마운트 시 isMounted 플래그를 false로 설정
        return () => {
            isMounted = false;
        };
    }, [selectedSubSubMenu]);

    return { initialData, error, loading };
}

export default MainContentHook;