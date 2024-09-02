import { useState, useEffect } from 'react';
import {
    fetchWorkcenters,
    fetchWorkcenterDetails,
    createWorkcenter,
    updateWorkcenter,
    deleteWorkcenter
} from '../../services/Workcenter/WorkcenterApi'; 

export const useWorkcenter = () => {
    const [workcenters, setWorkcenters] = useState([]); // 작업장 목록 상태
    const [selectedWorkcenter, setSelectedWorkcenter] = useState(null); // 선택된 작업장 상태
    const [loading, setLoading] = useState(false); // 로딩 상태
    const [error, setError] = useState(null); // 에러 상태

    // 작업장 목록을 가져오는 함수
    const loadWorkcenters = async () => {
        setLoading(true);
        setError(null);
        try {
            const data = await fetchWorkcenters();
            setWorkcenters(data);
        } catch (err) {
            setError(err);
        } finally {
            setLoading(false);
        }
    };

    // 특정 작업장을 선택하고 상세 정보를 가져오는 함수
    const selectWorkcenter = async (code) => {
        setLoading(true);
        setError(null);
        try {
            const data = await fetchWorkcenterDetails(code);
            setSelectedWorkcenter(data);
        } catch (err) {
            setError(err);
        } finally {
            setLoading(false);
        }
    };

    // 작업장을 생성하는 함수
    const addWorkcenter = async (newWorkcenter) => {
        setLoading(true);
        setError(null);
        try {
            const createdWorkcenter = await createWorkcenter(newWorkcenter);
            setWorkcenters(prevWorkcenters => [...prevWorkcenters, createdWorkcenter]);
        } catch (err) {
            setError(err);
        } finally {
            setLoading(false);
        }
    };

    // 작업장을 수정하는 함수
    const updateSelectedWorkcenter = async (code, updatedWorkcenter) => {
        setLoading(true);
        setError(null);
        try {
            const updated = await updateWorkcenter(code, updatedWorkcenter);
            setWorkcenters(prevWorkcenters =>
                prevWorkcenters.map(wc => (wc.code === code ? updated : wc))
            );
            if (selectedWorkcenter && selectedWorkcenter.code === code) {
                setSelectedWorkcenter(updated);
            }
        } catch (err) {
            setError(err);
        } finally {
            setLoading(false);
        }
    };

    // 작업장을 삭제하는 함수
    const removeWorkcenter = async (code) => {
        setLoading(true);
        setError(null);
        try {
            await deleteWorkcenter(id);
            setWorkcenters(prevWorkcenters => prevWorkcenters.filter(wc => wc.code !== code));
            if (selectedWorkcenter && selectedWorkcenter.code === code) {
                setSelectedWorkcenter(null);
            }
        } catch (err) {
            setError(err);
        } finally {
            setLoading(false);
        }
    };

    // 컴포넌트가 마운트될 때 작업장 목록을 로드
    useEffect(() => {
        loadWorkcenters();
    }, []);

    return {
        workcenters,
        selectedWorkcenter,
        loading,
        error,
        loadWorkcenters,
        selectWorkcenter,
        addWorkcenter,
        updateSelectedWorkcenter,
        removeWorkcenter
    };
};
