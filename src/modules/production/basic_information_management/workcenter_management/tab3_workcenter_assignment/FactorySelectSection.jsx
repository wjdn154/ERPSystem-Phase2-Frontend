import React, {useCallback, useEffect, useMemo, useState} from 'react';
import { Form, Grid, Modal, Select, Table, Input, DatePicker, Button, Typography, Col, Row} from 'antd';
import { CircularProgress } from "@mui/material";
import apiClient from "../../../../../config/apiClient.jsx";
import {PRODUCTION_API} from "../../../../../config/apiConstants.jsx";
import {useNotificationContext} from "../../../../../config/NotificationContext.jsx";

const { Option } = Select;

const FactorySelectSection = ({ onFactoryChange }) => {
    const [factoryList, setFactoryList] = useState([]);  // 공장 목록 상태
    const [loading, setLoading] = useState(true);  // 로딩 상태
    const notify = useNotificationContext(); // 알림 컨텍스트 사용
    const [workcenterList, setWorkcenterList] = useState([]); // 작업장 목록 상태



    useEffect(() => {
        const fetchFactories = async () => {
            try {
                const response = await apiClient.post(PRODUCTION_API.SEARCH_FACTORIES_API);
                setFactoryList(response.data);  // 서버에서 받은 데이터로 공장 목록 업데이트
                setLoading(false);  // 로딩 종료
                // notify('success', '조회 성공', '공장 목록을 정상적으로 조회했습니다.')
            } catch (error) {
                setLoading(false);  // 로딩 종료
                notify('error', '조회 오류', '공장목록을 불러오는 중 오류가 발생했습니다.')
            }
        };

        fetchFactories();
    }, []);

    // 선택된 공장에 맞는 작업장 목록 가져오기
    const fetchWorkcentersByFactory = async (factoryCode) => {
        setLoading(true);
        try {
            const response = await apiClient.post(PRODUCTION_API.WORKCENTER_LIST_API);
            const filteredWorkcenters = response.data.filter(
                (workcenter) => workcenter.factoryCode === factoryCode // 공장 코드로 필터링
            );
            setWorkcenterList(filteredWorkcenters);
            setLoading(false);
            notify('success', '조회 성공', '공장별 작업장 목록을 정상적으로 조회했습니다.')
        } catch (error) {
            notify('error', '조회 오류', '작업장 목록을 불러오는 중 오류가 발생했습니다.')
            setLoading(false);
        }
    };


    if (loading) {
        return <CircularProgress />;  // 로딩 중일 때 로딩 스피너 표시
    }

    return (
        <div>
            <Form.Item label="공장 선택" required>
                <Select
                    placeholder="공장을 선택하세요"
                    style={{ width: 200 }}
                    onChange={handleFactoryChange}
                >
                    {factories.map((factory) => (
                        <Option key={factory.code} value={factory.code}>
                            {factory.name}
                        </Option>
                    ))}
                </Select>
            </Form.Item>
            {/* 작업장 선택 */}
            <Select
                style={{ width: 200 }}
                placeholder="작업장 선택"
            >
                {workcenterList.map((workcenter) => (
                    <Option key={workcenter.code} value={workcenter.code}>
                        {workcenter.name}
                    </Option>
                ))}
            </Select>
        </div>


    );
};

export default FactorySelectSection;
