import React, {useRef} from 'react';
import {Grid,Paper,Typography}  from "@mui/material";
import {Button, Table as AntTable, Modal, Input, Select, DatePicker} from "antd";
import moment from "moment";
import {tabItems} from "../../../financial/pages/basic_information_management/account_subject/AccountSubjectUtil.jsx";
const {Option} = Select;


const MaintenanceHistoryListSection = ({columns,
                                      data,
                                      handleRowSelection,
                                      handleSelectedRow,
                                      handleInsertOk,
                                      handleInsertCancel,
                                      isInsertModalVisible,
                                      maintenanceDataDetail,
                                      setMaintenanceDataDetail,
                                      handleInputChange,
                                      handleOpenInsertModal,
                                      handleCostInput
                                  }) => {
    if(!data) return null;

    const workcenterCodeRef = useRef(null);
    const factoryCodeRef = useRef(null);
    const equipmentNumRef = useRef(null);
    const equipmentNameRef = useRef(null);
    const maintenanceManagerRef = useRef(null);
    const maintenanceCostRef = useRef(null);
    const titleRef = useRef(null);
    const maintenanceDetailRef = useRef(null);

    return (
        <Paper elevation={3} sx={{height: '100%', p: 2}}>
            <Typography variant="h6" marginBottom={'20px'}>유지보수 이력 목록</Typography>
            <div style={{display: 'flex', justifyContent: 'flex-end', marginRight: '20px'}}>
                <Button onClick={handleOpenInsertModal} type="primary">등록</Button>
            </div>
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
                title="유지보수 정보 등록"
                open={isInsertModalVisible}
                onOk={handleInsertOk}
                onCancel={handleInsertCancel}
                width={800} // 너비를 800px로 설정
            >

                <div style={{display: 'flex', alignItems: 'center'}}>
                    <Input value={"설치된 작업장 코드"} style={{marginRight: '10px', flex: 1, backgroundColor: '#f6a6a6'}}
                           readOnly/>
                    <Input value={maintenanceDataDetail?.workcenterCode || ''} style={{marginRight: '30px', flex: 1}}
                           onChange={(e) => handleInputChange(e, 'workcenterCode')}
                        //Ant Design의 Input 컴포넌트 내부의 input DOM에 접근하려면 ref를 통해 실제 DOM 요소에 접근해야 함
                           ref={workcenterCodeRef}/>
                    <Input value={"설치된 공장 코드"} style={{marginRight: '10px', flex: 1, backgroundColor: '#f6a6a6'}}
                           readOnly/>
                    <Input value={maintenanceDataDetail?.factoryCode || ''} style={{flex: 1}}
                           onChange={(e) => handleInputChange(e, 'factoryCode')}
                           ref={factoryCodeRef}/>

                </div>
                <div style={{display: 'flex', alignItems: 'center'}}>
                    <Input value={"설비 번호"}
                           style={{marginRight: '10px', marginTop: '20px', flex: 0.28, backgroundColor: '#f6a6a6'}}
                           readOnly/>
                    <Input value={maintenanceDataDetail?.equipmentNum || ''} style={{marginTop: '20px', flex: 1}}
                           onChange={(e) => handleInputChange(e, 'equipmentNum')}
                           ref={equipmentNumRef}/>
                </div>
                <div style={{display: 'flex', alignItems: 'center'}}>
                    <Input value={"유형"}
                           style={{marginRight: '10px', marginTop: '20px', flex: 1, backgroundColor: '#f6a6a6'}}
                           readOnly/>
                    <Select
                        value={maintenanceDataDetail?.maintenanceType || ''}
                        onChange={(value) => handleInputChange({target: {value}}, 'maintenanceType')}
                        style={{marginRight: '30px', marginTop: '20px', flex: 1.2}}
                    >
                        <Option value={"EMERGENCY_REPAIR"}>긴급 수리</Option>
                        <Option value={"REGULAR_INSPECTION"}>정기점검</Option>
                        <Option value={"FAILURE_REPAIR"}>고장 수리</Option>
                    </Select>
                    <Input value={"관리 담당자"}
                           style={{marginRight: '10px', marginTop: '20px', flex: 1, backgroundColor: '#f6a6a6'}}
                           readOnly/>
                    <Input value={maintenanceDataDetail?.maintenanceManager || ''} style={{marginTop: '20px', flex: 1}}
                           onChange={(e) => handleInputChange(e, 'maintenanceManager')}
                           ref={maintenanceManagerRef}/>
                </div>
                <div style={{display: 'flex', alignItems: 'center'}}>
                    <Input value={"진행 상태"}
                           style={{marginRight: '10px', marginTop: '20px', flex: 1, backgroundColor: '#f6a6a6'}}
                           readOnly/>
                    <Select
                        value={maintenanceDataDetail?.maintenanceStatus}
                        onChange={(value) => handleInputChange({target: {value}}, 'maintenanceStatus')}
                        style={{marginRight: '30px', marginTop: '20px', flex: 1.2}}
                    >
                        <Option value={true}>완료</Option>
                        <Option value={false}>작업 중</Option>
                    </Select>
                    <Input value={"유지보수 비용"}
                           style={{marginRight: '10px', marginTop: '20px', flex: 1, backgroundColor: '#f6a6a6'}}
                           readOnly/>
                    <Input value={maintenanceDataDetail?.maintenanceCost || ''} style={{marginTop: '20px', flex: 1}}
                           onChange={(e) => handleInputChange(e, 'maintenanceCost')}
                           onKeyPress={handleCostInput}/>
                </div>
                <div style={{display: 'flex', alignItems: 'center'}}>
                    <Input value={"유지보수 일자"}
                           style={{marginRight: '10px', marginTop: '20px', flex: 1, backgroundColor: '#f6a6a6'}}
                           readOnly/>
                    <DatePicker
                        value={maintenanceDataDetail?.maintenanceDate ? moment(maintenanceDataDetail.maintenanceDate, 'YYYY-MM-DD') : null}
                        style={{marginRight: '30px', marginTop: '20px', flex: 1}}
                        onChange={(date, dateString) => handleInputChange({target: {value: dateString}}, 'maintenanceDate')}
                    />
                    <Input value={"다음 유지보수 예정일"}
                           style={{marginRight: '10px', marginTop: '20px', flex: 1, backgroundColor: '#f6a6a6'}}
                           readOnly/>
                    <DatePicker
                        value={maintenanceDataDetail?.nextScheduleDate ? moment(maintenanceDataDetail.nextScheduleDate, 'YYYY-MM-DD') : null}
                        onChange={(date, dateString) => handleInputChange({target: {value: dateString}}, 'nextScheduleDate')}
                        style={{width: '100%', marginTop: '20px', flex: 1}}
                    />
                </div>
                <div style={{display: 'flex', alignItems: 'center'}}>
                    <Input value={"제목"}
                           style={{marginRight: '10px', marginTop: '20px', flex: 0.28, backgroundColor: '#f6a6a6'}}
                           readOnly/>
                    <Input value={maintenanceDataDetail?.title || ''} style={{marginTop: '20px', flex: 1}}
                           onChange={(e) => handleInputChange(e, 'title')}
                           ref={titleRef}/>
                </div>
                <div style={{display: 'flex', alignItems: 'center'}}>
                    <Input value={"내용"}
                           style={{marginRight: '10px', marginTop: '20px', flex: 0.28, backgroundColor: '#f6a6a6'}}
                           readOnly/>
                    <Input value={maintenanceDataDetail?.maintenanceDetail || ''}
                              style={{marginTop: '20px', flex: 1}}
                        onChange={(e) => handleInputChange(e, 'maintenanceDetail')}
                        ref={maintenanceDetailRef}/>
                </div>
            </Modal>
        </Paper>
    )
}

export default MaintenanceHistoryListSection;