import React, { useEffect, useState } from 'react';
import { Spin, Typography } from 'antd';
import WarehouseListSection from '../components/WarehouseListSection.jsx';
import { fetchWarehouseList } from '../services/WarehouseApi.jsx';

const WarehouseListPage = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const loadWarehouseList = async () => {
            try {
                const warehouseData = await fetchWarehouseList();
                setData(warehouseData);
                setLoading(false);
            } catch (error) {
                setError('창고 리스트를 불러오는 데 실패했습니다.');
                setLoading(false);
            }
        };

        loadWarehouseList();
    }, []);

    // 로딩 중일 때 스피너 표시
    if (loading) return <Spin size="large" tip="로딩 중..." />;

    // 오류 발생 시 오류 메시지 표시
    if (error) return <Typography.Text type="danger">{error}</Typography.Text>;

    return (
        <div>
            <WarehouseListSection data={data} />
        </div>
    );
};

export default WarehouseListPage;
