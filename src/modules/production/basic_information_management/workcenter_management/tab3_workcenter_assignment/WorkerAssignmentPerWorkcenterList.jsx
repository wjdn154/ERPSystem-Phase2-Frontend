import React, {useEffect, useState} from 'react';
import { Box, TextField, Typography, Grid, Paper, Link, Dialog, DialogTitle, DialogContent, DialogActions, CircularProgress } from "@mui/material";
import { Table, Button, Alert, notification} from "antd";
import {PRODUCTION_API} from "../../../../../config/apiConstants.jsx";
import apiClient from "../../../../../config/apiClient.jsx";
import {useNotificationContext} from "../../../../../config/NotificationContext.jsx";
import dayjs from "dayjs";

const WorkerAssignmentPerWorkcenterList = ({ columns, data, handleRowSelection, handleSelectedRow, rowClassName }) => {
    const [allAssignments, setAllAssignments] = useState([]);
    const notify = useNotificationContext();


    // 전체 작업자 배정 목록 가져오기
    useEffect(() => {
        fetchAllAssignments();
    }, []);

    const fetchAllAssignments = async () => {
        try {
            const response = await apiClient.post(
                PRODUCTION_API.WORKER_ASSIGNMENT_TODAY_SUMMARY_API,
                null, // 본문이 필요 없으면 null로 설정
                {
                    params: {
                        includeShiftType: true, // 필수 파라미터 포함 여부 확인
                        shiftType: 1, // 기본값 설정, 서버에서 요구하는 값인지 확인 필요
                        date: dayjs().format('YYYY-MM-DD') // 오늘 날짜 전달
                    }
                }
            );
            const assignments = response.data?.workerAssignments || [];
            setAllAssignments(assignments); // 서버로부터 받은 데이터 설정항상 배열로 설정
            // setAllAssignments(response.data.workerAssignments); //
        } catch (error) {
            console.error('전체 작업자 배정 목록을 불러오는 중 오류가 발생했습니다.', error);
            notify('error', '조회 오류', '전체 작업자 배정 목록을 불러오는 중 오류가 발생했습니다.');
            setAllAssignments([]); // 오류 발생 시 빈 배열로 설정
        }
    };

    // `data`가 존재하면 사용하고, 없으면 `allAssignments` 사용
    const tableData = Array.isArray(data) && data.length > 0 ? data : allAssignments;

    return (
        <Grid>
            <Table
                columns={columns}
                dataSource={tableData}
                pagination={{ pageSize: 15, position: ['bottomCenter'], showSizeChanger: false }}
                size="small"
                rowKey="id" // WorkerAssignment에서 id 필드를 사용
                onRow={(record) => ({
                    onClick: () => handleSelectedRow(record), // 행 클릭 시 해당 배정이력 선택
                    style: { cursor: 'pointer' },
                })}
                rowClassName={rowClassName}
            />
            {tableData.length === 0 && (
                <Typography style={{ marginTop: '16px', textAlign: 'center' }}>
                    배정된 작업자 명단이 없습니다.
                </Typography>
            )}
        </Grid>
    )
}

export default WorkerAssignmentPerWorkcenterList;