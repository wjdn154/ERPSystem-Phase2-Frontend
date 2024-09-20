import React, { useState, useEffect } from 'react';
import WorkerAssignmentPerWorkcenterList from './WorkerAssignmentPerWorkcenterList.jsx';
import { workerAssignmentColumns } from '../../../utils/basicData/Workcenter/WorkerAssignmentColumns.jsx'; // 컬럼 설정
import { DatePicker, Button } from 'antd';
import axios from 'axios';
import moment from 'moment';

const { RangePicker } = DatePicker;

const WorkerAssignmentPage = () => {
    const [workerAssignments, setWorkerAssignments] = useState([]);
    const [selectedWorkerAssignment, setSelectedWorkerAssignment] = useState(null);
    const [loading, setLoading] = useState(true);  // 로딩 상태 관리
    const [dateRange, setDateRange] = useState([moment(), moment()]);  // 기본값: 오늘의 날짜 범위

    // 오늘의 작업자 배정 데이터 조회
    useEffect(() => {
        fetchWorkerAssignments(moment(), moment());  // 기본적으로 오늘 날짜로 설정
    }, []);

    // API 호출 함수
    const fetchWorkerAssignments = (startDate, endDate) => {
        setLoading(true);  // 로딩 상태 설정
        axios.post('/api/production/workerAssignment/daily', {
            date: startDate.format('YYYY-MM-DD'),  // 시작 날짜
            includeShiftType: false,  // 교대유형 포함 여부
            shiftTypeId: null           // 교대유형 ID (필요 시 설정)
        })
            .then(response => {
                setWorkerAssignments(response.data.workerAssignments);  // 데이터 설정
                setLoading(false);  // 로딩 상태 해제
            })
            .catch(error => {
                console.error("작업자 배정 데이터를 불러오는데 실패했습니다.", error);
                setLoading(false);  // 로딩 상태 해제
            });
    };

    // 날짜 범위 선택 핸들러
    const handleDateChange = (dates) => {
        setDateRange(dates);  // 선택된 날짜 범위를 저장
    };

    // 기간 조회 버튼 클릭 핸들러
    const handleSearchByDate = () => {
        if (dateRange && dateRange.length === 2) {
            const [startDate, endDate] = dateRange;
            fetchWorkerAssignments(startDate, endDate);  // 선택된 기간으로 작업자 배정 조회
        }
    };

    const handleSelectedRow = (record) => {
        setSelectedWorkerAssignment(record);
        console.log('선택된 작업자 배정:', record);
    };

    return (
        <div>
            <h1>작업장별 작업자 배정 명단</h1>

            {/* 날짜 범위 선택 */}
            <div style={{ marginBottom: '20px' }}>
                <RangePicker
                    value={dateRange}
                    onChange={handleDateChange}
                    format="YYYY-MM-DD"
                />
                <Button type="primary" onClick={handleSearchByDate} style={{ marginLeft: '10px' }}>
                    조회
                </Button>
            </div>

            {loading ? (
                <p>로딩 중...</p>
            ) : (
                <WorkerAssignmentPerWorkcenterList
                    columns={workerAssignmentColumns}
                    data={workerAssignments}
                    handleSelectedRow={handleSelectedRow}
                    rowClassName={(record) => (record.id === selectedWorkerAssignment?.id ? 'selected-row' : '')}
                />
            )}
        </div>
    );
};

export default WorkerAssignmentPage;