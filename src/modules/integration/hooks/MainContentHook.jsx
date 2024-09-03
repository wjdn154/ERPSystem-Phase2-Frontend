import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { subMenuItems } from '../../../config/menuItems.jsx';
import {Typography} from "@mui/material";

const MainContentHook = (selectedSubSubMenu) => {
    const [initialData, setInitialData] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!selectedSubSubMenu || selectedSubSubMenu.text === "회사정보수정") return;

        setLoading(true);

        axios.post(selectedSubSubMenu.apiPath)
            .then(response => {
                setInitialData(response.data);
                console.log(response.data);
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

    return { initialData, error, loading };
}

export default MainContentHook;