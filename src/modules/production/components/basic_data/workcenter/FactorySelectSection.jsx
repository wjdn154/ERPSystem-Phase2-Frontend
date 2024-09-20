import React, { useState, useEffect } from 'react';
import { Select, message } from "antd";
import { CircularProgress } from "@mui/material";
import axios from 'axios';

const { Option } = Select;

const FactorySelectSection = ({ onFactoryChange }) => {
    const [factoryList, setFactoryList] = useState([]);  // 공장 목록 상태
    const [loading, setLoading] = useState(true);  // 로딩 상태

    // 서버에서 공장 리스트를 가져오는 useEffect
    useEffect(() => {
        const fetchFactories = async () => {
            try {
                const response = await axios.post('/api/production/workcenters/factories/');
                setFactoryList(response.data);  // 서버에서 받은 데이터로 공장 목록 업데이트
                setLoading(false);  // 로딩 종료
            } catch (error) {
                message.error('공장 목록을 불러오는데 실패했습니다.');  // 오류 메시지 출력
                setLoading(false);  // 로딩 종료
            }
        };

        fetchFactories();
    }, []);

    if (loading) {
        return <CircularProgress />;  // 로딩 중일 때 로딩 스피너 표시
    }

    return (
        <div>
            <Select
                style={{ width: 200 }}
                placeholder="공장 선택"
                onChange={onFactoryChange}  // 공장 선택 시 호출되는 핸들러
            >
                {factoryList.map((factory) => (
                    <Option key={factory.id} value={factory.id}>
                        {factory.name}
                    </Option>
                ))}
            </Select>
        </div>
    );
};

export default FactorySelectSection;
