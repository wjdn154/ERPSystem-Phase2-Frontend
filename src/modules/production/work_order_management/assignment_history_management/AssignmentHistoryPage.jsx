import React, { useEffect, useState } from 'react';
import { Box, Grid, Grow, Typography } from '@mui/material';
import WelcomeSection from '../../../../components/WelcomeSection.jsx';
import { tabItems } from './AssignmentHistoryUtil.jsx';
import { Button } from 'antd';
import TemporarySection from "../../../../components/TemporarySection.jsx";
import {PRODUCTION_API} from "../../../../config/apiConstants.jsx";
import apiClient from "../../../../config/apiClient.jsx";

const AssignmentHistoryPage = () => {
    const [activeTabKey, setActiveTabKey] = useState('1');
    const [assignments, setAssignments] = useState([]); // 작업자 배정 데이터를 저장할 상태
    const [loading, setLoading] = useState(true); // 로딩 상태 관리

    const handleTabChange = (key) => {
        setActiveTabKey(key);
    };

// 현재 월의 작업자 배정 목록 조회 함수
    const getCurrentMonthWorkerAssignments = async () => {
        const currentDate = new Date();
        const year = currentDate.getFullYear(); // 현재 연도
        const month = currentDate.getMonth() + 1; // 현재 월 (0부터 시작하므로 +1)

        try {
            // 쿼리 파라미터로 year와 month를 전송
            const response = await apiClient.post(`${PRODUCTION_API.WORKER_ASSIGNMENT_MONTHLY_API}?year=${year}&month=${month}`);
            console.log("응답 데이터:", response.data); // 응답 데이터 확인용 로그
            return response.data;
        } catch (error) {
            console.error("작업자 배정 정보를 가져오는 중 오류 발생:", error);
            throw error;
        }
    };



    // 컴포넌트가 마운트될 때 현재 월의 작업자 배정 데이터를 불러옴
    useEffect(() => {
        getCurrentMonthWorkerAssignments();
    }, []);

    return (
        <Box sx={{ margin: '20px' }}>
            <Grid container spacing={3}>
                <Grid item xs={12} md={12}>
                    <WelcomeSection
                        title="작업 지시"
                        description={(
                            <Typography>
                                작업배정이력 관리 페이지는 <span>작업이 배정된 내역을 기록하고 이력을 관리</span>하는 곳임. 이 페이지에서는 <span>각 작업 지시에 따라 배정된 작업자, 배정 시간, 배정 완료 여부</span>를 기록할 수 있으며, 이를 통해 <span>작업 배정의 효율성</span>을 높이고 <span>작업자별 성과</span>를 추적할 수 있음.
                            </Typography>
                        )}
                        tabItems={tabItems()}
                        activeTabKey={activeTabKey}
                        handleTabChange={handleTabChange}
                    />
                </Grid>
            </Grid>

            {/* 작업자 배정 데이터를 보여줄 부분 */}
            {loading ? (
                <Typography>로딩 중...</Typography>
            ) : (
                <Grid sx={{ padding: '0px 20px 0px 20px' }} container spacing={3}>
                    <Grid item xs={12} md={5} sx={{ minWidth: '500px !important', maxWidth: '700px !important' }}>
                        <Grow in={true} timeout={200}>
                            <div>
                                {/* 작업자 배정 데이터를 렌더링 */}
                                {assignments.length > 0 ? (
                                    <ul>
                                        {assignments.map((assignment) => (
                                            <li key={assignment.id}>
                                                {assignment.workerName} - {assignment.assignmentDate} - {assignment.workcenterName}
                                            </li>
                                        ))}
                                    </ul>
                                ) : (
                                    <Typography>이번 달 배정된 작업자가 없습니다.</Typography>
                                )}
                            </div>
                        </Grow>
                    </Grid>
                </Grid>
            )}

            {activeTabKey === '2' && (
                <Grid sx={{ padding: '0px 20px 0px 20px' }} container spacing={3}>
                    <Grid item xs={12} md={5} sx={{ minWidth: '500px !important', maxWidth: '700px !important' }}>
                        <Grow in={true} timeout={200}>
                            <div>
                                <TemporarySection />
                            </div>
                        </Grow>
                    </Grid>
                </Grid>
            )}
        </Box>
    );
};

export default AssignmentHistoryPage;
