import React, {useRef} from 'react';
import {Grid,Paper,Typography}  from "@mui/material";
import {Button, Table as AntTable, Modal, Input, Select, DatePicker} from "antd";
import moment from "moment";
import {tabItems} from "../../../financial/utils/AccountSubject/AccountSubjectUtil.jsx";
const {Option} = Select;


const WorkerListSection = ({columns,
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
                                  }) => {
    if(!data) return null;

    console.log('workerDetail : '+workerDetail);
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
                    onClick: () => handleSelectedRow(record),   //행 클릭 시 이벤트
                    style: {cursor: 'pointer'},           //커서 스타일 변경
                })}
            />

            <Modal
                title="작업자 정보 수정"
                open={isUpdateModalVisible}
                onOk={handleUpdateOk}
                onCancel={handleUpdateCancel}
                width={800} // 너비를 800px로 설정
            >
                <div style={{display: 'flex', alignItems: 'center'}}>
                    <Input value={"사원번호"}
                           style={{marginRight: '10px', flex: 0.27, backgroundColor: '#f6a6a6'}} readOnly/>
                    <Input value={workerDetail?.employeeNumber} style={{flex: 1}}
                           onChange={(e) => handleInputChange(e, 'employeeNumber')} readOnly/>
                </div>
                <div style={{display: 'flex', alignItems: 'center'}}>
                    <Input value={"성명"}
                           style={{marginRight: '10px', marginTop: '20px', flex: 1, backgroundColor: '#f6a6a6'}}
                           readOnly/>
                    <Input value={workerDetail?.employeeLastName + workerDetail?.employeeFirstName}
                           style={{marginRight: '50px', marginTop: '20px', flex: 1, backgroundColor: '#F5F5F5'}}
                           onChange={(e) => handleInputChange(e, 'employeeLastName'+'employeeFirstName')} readOnly/>
                    <Input value={"부서"}
                           style={{marginRight: '10px', marginTop: '20px', flex: 1, backgroundColor: '#f6a6a6'}}
                           readOnly/>
                    <Input value={workerDetail?.departmentName} style={{marginTop: '20px', flex: 1}}
                           onChange={(e) => handleInputChange(e, 'departmentName')} readOnly/>
                </div>
                <div style={{display: 'flex', alignItems: 'center'}}>
                    <Input value={"직위"}
                           style={{marginRight: '10px', marginTop: '20px', flex: 1, backgroundColor: '#f6a6a6'}}
                           readOnly/>
                    <Input value={workerDetail?.positionName}
                           style={{marginRight: '50px', marginTop: '20px', flex: 1}}
                           onChange={(e) => handleInputChange(e, 'positionName')} readOnly/>
                    <Input value={"직책"}
                           style={{marginRight: '10px', marginTop: '20px', flex: 1, backgroundColor: '#f6a6a6'}}
                           readOnly/>
                    <Input value={workerDetail?.jobTitleName}
                           style={{marginTop: '20px', flex: 1}}
                           onChange={(e) => handleInputChange(e, 'jobTitleName')} readOnly/>
                </div>
                <div style={{display: 'flex', alignItems: 'center'}}>
                    <Input value={"전화번호"}
                           style={{marginRight: '10px', marginTop: '20px', flex: 1, backgroundColor: '#f6a6a6'}}
                           readOnly/>
                    <Input value={workerDetail?.phoneNumber}
                           style={{marginRight: '50px', marginTop: '20px', flex: 1}}
                           onChange={(e) => handleInputChange(e, 'phoneNumber')} readOnly/>
                    <Input value={"고용일"}
                           style={{marginRight: '10px', marginTop: '20px', flex: 1, backgroundColor: '#f6a6a6'}}
                           readOnly/>
                    <Input value={workerDetail?.hireDate}
                           style={{marginTop: '20px', flex: 1}}
                           onChange={(e) => handleInputChange(e, 'hireDate')} readOnly/>
                </div>
                <div style={{display: 'flex', alignItems: 'center'}}>
                    <Input value={"고용유형"}
                           style={{marginRight: '10px', marginTop: '20px', flex: 1, backgroundColor: '#f6a6a6'}}
                           readOnly/>
                    <Input value={workerDetail?.employmentType}
                           style={{marginRight: '50px', marginTop: '20px', flex: 1}}
                           onChange={(e) => handleInputChange(e, 'employmentType')} readOnly/>
                    <Input value={"고용상태"}
                           style={{marginRight: '10px', marginTop: '20px', flex: 1, backgroundColor: '#f6a6a6'}}
                           readOnly/>
                    <Input value={workerDetail?.employmentStatus}
                           style={{marginTop: '20px', flex: 1}}
                           onChange={(e) => handleInputChange(e, 'employmentStatus')} readOnly/>
                </div>
                <div style={{display: 'flex', alignItems: 'center'}}>
                    <Input value={"안전교육 이수 여부"}
                           style={{marginRight: '10px', marginTop: '20px', flex: 1, backgroundColor: '#f6a6a6'}} readOnly/>
                    <Select
                        value={workerDetail?.trainingStatus}
                        onChange={(value) => handleInputChange({target: {value:value}}, 'trainingStatus')}
                        style={{marginRight: '50px', marginTop: '20px', flex: 1.15}}
                    >
                        <Option value={true}>이수</Option>

                        <Option value={false}>미이수</Option>
                    </Select>
                    <Input value={"배치된 작업장"}
                           style={{marginRight: '10px', marginTop: '20px', flex: 1, backgroundColor: '#f6a6a6'}} readOnly/>
                    <Input value={workerDetail?.workcenterName}
                           style={{marginTop: '20px', flex: 1}}
                           onChange={(e) => handleInputChange(e, 'workcenterName')} readOnly/>
                </div>
                <div style={{display: 'flex', alignItems: 'center'}}>
                    <Input value={"프로필 사진"}
                           style={{marginRight: '10px', marginTop: '20px', flex: 0.27, backgroundColor: '#f6a6a6'}}
                           readOnly/>
                    <Input value={workerDetail?.profilePicture}
                           style={{marginTop: '20px', flex: 1}}
                           onChange={(e) => handleInputChange(e, 'profilePicture')} readOnly/>
                </div>
            </Modal>
        </Paper>
    )
}

export default WorkerListSection;