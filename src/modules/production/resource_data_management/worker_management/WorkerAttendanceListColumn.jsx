import React from "react";
import {Tag} from "antd";

const attendanceStatusMap={
    "PRESENT" : "출근",
    "ABSENT" : "결근",
    "LEAVE" : "휴가",
    "PUBLIC_HOLIDAY" : "공휴일",
    "EARLY_LEAVE" : "조퇴",
    "LATE" : "지각",
    "BUSINESS_TRIP" : "출장",
    "TRAINING" : "교육",
    "SABBATICAL" : "휴직",
    "SICK_LEAVE" : "병가",
    "REMOTE_WORK" : "자택 근무",
    "ON_DUTY" : "근무",
    "OVERTIME" : "야근",
    "SHIFT_WORK" : "교대 근무"
}

export const
    workerAttendanceListColumn = [
    {
        title: <span>근태 일자</span>,  // 컬럼 제목
        dataIndex: 'attendanceDate',  // 데이터 인덱스: 이 필드는 데이터 객체의 'jobTitleName' 속성과 연결됩니다.
        key:'attendanceDate',
        width: '16%',  // 컬럼 너비 설정
        align: 'center',
    },
    {
        title: <span>출근시간</span>,  // 컬럼 제목
        dataIndex: 'checkTime',  // 데이터 인덱스: 이 필드는 데이터 객체의 'employmentStatus' 속성과 연결됩니다.
        key:'checkTime',
        width: '15%',  // 컬럼 너비 설정
        align: 'center',
    },
    {
        title: <span>퇴근시간</span>,  // 컬럼 제목
        dataIndex: 'checkoutTime',  // 데이터 인덱스: 이 필드는 데이터 객체의 'employmentType' 속성과 연결됩니다.
        key:'checkoutTime',
        width: '15%',  // 컬럼 너비 설정
        align: 'center',
    },
    {
        title: <span>근무상태</span>,  // 컬럼 제목
        dataIndex: 'attendanceStatus',  // 데이터 인덱스: 이 필드는 데이터 객체의 'trainingStatus' 속성과 연결됩니다.
        key:'attendanceStatus',
        width: '16%',  // 컬럼 너비 설정
        align: 'center',
        render: (text) => {
            let color;
            switch (text){
                case "PRESENT" : color = 'blue';
                    break;
                case "LATE" : color = 'yellow';
                    break;
                case "ABSENT" : color = 'red';
                    break;
                default: color = 'black';
            }
            return (
            <Tag color={color}>
                {attendanceStatusMap[text] || text}
            </Tag>
            )
        }
    },
    {
        title: <span>작업배치 일자</span>,  // 컬럼 제목
        dataIndex: 'assignmentDate',  // 데이터 인덱스: 이 필드는 데이터 객체의 'positionName' 속성과 연결됩니다.
        key:'assignmentDate',
        width: '18%',  // 컬럼 너비 설정
        align: 'center',
    },
    {
        title: <span>배치된 작업장</span>,  // 컬럼 제목
        dataIndex: 'workcenterName',  // 데이터 인덱스: 이 필드는 데이터 객체의 'departmentName' 속성과 연결됩니다.
        key:'workcenterName',
        width: '20%',  // 컬럼 너비 설정
        align: 'center',
    }
];
