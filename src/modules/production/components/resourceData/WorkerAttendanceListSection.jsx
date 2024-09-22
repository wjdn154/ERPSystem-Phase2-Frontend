import React, {useRef} from 'react';
import {Grid,Paper,Typography}  from "@mui/material";
import {Button, Table as AntTable, Modal, Input, Select, DatePicker} from "antd";
import moment from "moment";
import {tabItems} from "../../../financial/pages/basic_information_management/account_subject/AccountSubjectUtil.jsx";
import {workerAttendanceListColumn} from "../../utils/resource_data/WorkerAttendanceListColumn.jsx";
const {Option} = Select;

const mergeAttendanceAndAssignment = (attendanceList, assignmentList) => {
    //날짜를 기준으로 근태와 작업배치를 병합
    const mergedList = attendanceList.map(attendance => {
        const matchingAssigment = assignmentList.find(
            assignment => assignment.assignmentDate === attendance.attendanceDate
        );
        return {
            ...attendance,
            workcenterName: matchingAssigment ? matchingAssigment.workcenterName : '미 배치',
            assignmentDate: matchingAssigment ? matchingAssigment.assignmentDate : '미 배치'
        };
    });
    return mergedList;
}

const WorkerAttendanceListSection = ({columns,
                                      data,
                                      handleRowSelection,
                                      handleSelectedRow,
                                      handleUpdateOk,
                                      handleUpdateCancel,
                                      isUpdateModalVisible,
                                      workerDetail,
                                      setWorkerDetail,
                                      handleInputChange,
                                      showUpdateModal,
                                      handleSelectedAttendanceRow,
                                      workerAttendanceListColumn,
                                      workerAttendanceDetail
                                  }) => {
    if(!data) return null;

    //workerAttendance와 workerAssignment가 있다면 이를 병합
    const mergedData = workerAttendanceDetail ? mergeAttendanceAndAssignment(
        workerAttendanceDetail.workerAttendance || [],
        workerAttendanceDetail.workerAssignment || []
        ) : [];

    console.log('workerAttendanceDetail : '+workerAttendanceDetail);
    console.log('병합된 데이터 ' , mergedData);
    return (
        <Paper elevation={3} sx={{height: '100%', p: 2}}>
            <Typography variant="h6" marginBottom={'20px'}>작업자 목록</Typography>
            <AntTable
                style={{padding: '20px'}}
                columns={columns}
                dataSource={data}
                pagination={{pageSize: 10, position: ['bottomCenter'], showSizeChanger: false}} //페지이 크기변경옵션 숨김
                rowSelection={handleRowSelection}  //행선택 옵션
                size="small"
                rowKey="id"   //각행에 고유한 키로 id 사용
                onRow={(record) => ({
                    onClick: () => handleSelectedAttendanceRow(record),   //행 클릭 시 이벤트
                    style: {cursor: 'pointer'},           //커서 스타일 변경
                })}
            />

            <Modal
                title="작업배치 및 근태 목록"
                open={isUpdateModalVisible}
                onCancel={handleUpdateCancel}
                width={800} // 너비를 800px로 설정
                footer={null}    //모달 하단 버튼을 없애기 위해 footer를 null로 설정
            >
                <div style={{display: 'flex', alignItems: 'center'}}>
                    <Input value={"사원번호"}
                           style={{marginRight: '10px',marginTop: '20px', flex: 1, backgroundColor: '#f6a6a6'}} readOnly/>
                    <Input value={workerAttendanceDetail?.employeeNumber} style={{marginRight: '40px',marginTop: '20px',flex: 1}}
                           onChange={(e) => handleInputChange(e, 'employeeNumber')} readOnly/>
                    <Input value={"성명"}
                           style={{marginRight: '10px', marginTop: '20px', flex: 1, backgroundColor: '#f6a6a6'}} readOnly/>
                    <Input value={workerAttendanceDetail?.employeeLastName + workerAttendanceDetail?.employeeFirstName}
                           style={{ marginTop: '20px', flex: 1, backgroundColor: '#F5F5F5'}}
                           onChange={(e) => handleInputChange(e, 'employeeLastName'+'employeeFirstName')} readOnly/>
                </div>
                    <AntTable
                        style={{padding: '20px'}}
                        columns={workerAttendanceListColumn}
                        dataSource={mergedData}
                        pagination={{pageSize: 10, position: ['bottomCenter'], showSizeChanger: false}} //페지이 크기변경옵션 숨김
                        size="small"
                        rowKey="id"   //각행에 고유한 키로 id 사용
                    />
            </Modal>
        </Paper>
)
}

export default WorkerAttendanceListSection;