import React, {useRef} from 'react';
import {Grid,Paper,Typography}  from "@mui/material";
import {Button, Table as AntTable, Modal as AntModal, Input, Select, DatePicker} from "antd";
import moment from "moment";
const {Option} = Select;


const EquipmentDataListSection = ({columns,
                                      data,
                                      handleRowSelection,
                                      handleSelectedRow,
                                      handleSave,
                                      insertEquipmentModal,
                                      handleInsertOk,
                                      handleInsertCancel,
                                      isInsertModalVisible,
                                      equipmentDataDetail,
                                      setEquipmentDataDetail,
                                      handleInputChange,
                                      handleOpenInsertModal,
                                      handleCostInput
                                  }) => {
    if(!data) return null;

    const workcenterCodeRef = useRef(null);
    const factoryCodeRef = useRef(null);
    const equipmentNumRef = useRef(null);
    const equipmentNameRef = useRef(null);
    const modelNameRef = useRef(null);
    const manufacturerRef = useRef(null);
    const equipmentTypeRef = useRef(null);
    const installDateRef = useRef(null);
    const purchaseDateRef = useRef(null);
    const equipmentImgRef = useRef(null);

    return (
        <Paper elevation={3} sx={{height: '100%', p: 2}}>
            <Typography variant="h6" marginBottom={'20px'}>설비 정보 목록</Typography>
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


            <AntModal
                title="설비 상세 정보 등록"
                open={isInsertModalVisible}
                onOk={handleInsertOk}
                onCancel={handleInsertCancel}
                width={700} // 너비를 700px로 설정
            >

                <div style={{display: 'flex', alignItems: 'center'}}>
                    <Input value={"설치된 작업장 코드"} style={{marginRight: '10px', flex: 1, backgroundColor: '#f6a6a6'}}
                           readOnly/>
                    <Input value={equipmentDataDetail?.workcenterCode || ''} style={{marginRight: '30px', flex: 1}}
                           onChange={(e) => handleInputChange(e, 'workcenterCode')}
                           //Ant Design의 Input 컴포넌트 내부의 input DOM에 접근하려면 ref를 통해 실제 DOM 요소에 접근해야 함
                           ref={workcenterCodeRef}/>
                    <Input value={"설치된 공장 코드"} style={{marginRight: '10px', flex: 1, backgroundColor: '#f6a6a6'}}
                           readOnly/>
                    <Input value={equipmentDataDetail?.factoryCode || ''} style={{flex: 1}}
                           onChange={(e) => handleInputChange(e, 'factoryCode')}
                           ref={factoryCodeRef}/>

                </div>
                <div style={{display: 'flex', alignItems: 'center'}}>
                    <Input value={"설비 번호"}
                           style={{marginRight: '10px', marginTop: '20px', flex: 0.27, backgroundColor: '#f6a6a6'}}
                           readOnly/>
                    <Input value={equipmentDataDetail?.equipmentNum || ''} style={{marginTop: '20px', flex: 1}}
                           onChange={(e) => handleInputChange(e, 'equipmentNum')}
                           ref={equipmentNumRef}/>
                </div>
                <div style={{display: 'flex', alignItems: 'center'}}>
                    <Input value={"설비 명"}
                           style={{marginRight: '10px', marginTop: '20px', flex: 1, backgroundColor: '#f6a6a6'}}
                           readOnly/>
                    <Input value={equipmentDataDetail?.equipmentName || ''}
                           style={{marginRight: '30px', marginTop: '20px', flex: 1}}
                           onChange={(e) => handleInputChange(e, 'equipmentName')}
                           ref={equipmentNameRef}/>
                    <Input value={"모델 명"}
                           style={{marginRight: '10px', marginTop: '20px', flex: 1, backgroundColor: '#f6a6a6'}}
                           readOnly/>
                    <Input value={equipmentDataDetail?.modelName || ''} style={{marginTop: '20px', flex: 1}}
                           onChange={(e) => handleInputChange(e, 'modelName')}
                           ref={modelNameRef}/>
                </div>
                <div style={{display: 'flex', alignItems: 'center'}}>
                    <Input value={"유형"}
                           style={{marginRight: '10px', marginTop: '20px', flex: 1, backgroundColor: '#f6a6a6'}}
                           readOnly/>
                    <Select
                        value={equipmentDataDetail?.equipmentType || ''}
                        onChange={(value) => handleInputChange({target: {value}}, 'equipmentType')}
                        style={{marginRight: '30px', marginTop: '20px', flex: 1.2}}
                    >
                        <Option value={"ASSEMBLY"}>조립 설비</Option>
                        <Option value={"MACHINING"}>가공 설비</Option>
                        <Option value={"INSPECTION"}>검사 설비</Option>
                        <Option value={"PACKAGING"}>포장 설비</Option>
                    </Select>
                    <Input value={"제조사"}
                           style={{marginRight: '10px', marginTop: '20px', flex: 1, backgroundColor: '#f6a6a6'}}
                           readOnly/>
                    <Input value={equipmentDataDetail?.manufacturer || ''} style={{marginTop: '20px', flex: 1}}
                           onChange={(e) => handleInputChange(e, 'manufacturer')}
                           ref={manufacturerRef}/>
                </div>
                <div style={{display: 'flex', alignItems: 'center'}}>
                    <Input value={"구매 날짜"}
                           style={{marginRight: '10px', marginTop: '20px', flex: 1, backgroundColor: '#f6a6a6'}}
                           readOnly/>
                    <DatePicker
                        disabledDate={(current) => current && current.year() !== 2024}
                        value={equipmentDataDetail?.purchaseDate ? moment(equipmentDataDetail.purchaseDate, 'YYYY-MM-DD') : null}
                        style={{marginRight: '30px', marginTop: '20px', flex: 1}}
                        onChange={(date, dateString) => handleInputChange({target: {value: dateString}}, 'purchaseDate')}
                    />
                    <Input value={"설치날짜"}
                           style={{marginRight: '10px', marginTop: '20px', flex: 1, backgroundColor: '#f6a6a6'}}
                           readOnly/>
                    <DatePicker
                        disabledDate={(current) => current && current.year() !== 2024}
                        value={equipmentDataDetail?.installDate ? moment(equipmentDataDetail.installDate, 'YYYY-MM-DD') : null}
                        onChange={(date, dateString) => handleInputChange({target: {value: dateString}}, 'installDate')}
                        style={{width: '100%', marginTop: '20px', flex: 1}}
                    />
                </div>
                    <div style={{display: 'flex', alignItems: 'center'}}>
                        <Input value={"가동 상태"}
                               style={{marginRight: '10px', marginTop: '20px', flex: 1, backgroundColor: '#f6a6a6'}}
                               readOnly/>
                        <Select
                            value={equipmentDataDetail?.operationStatus || ''}
                            onChange={(value) => handleInputChange({target: {value}}, 'operationStatus')}
                            style={{marginRight: '30px', marginTop: '20px', flex: 1.2}}
                        >
                            <Option value={"BEFORE_OPERATION"}>가동 전</Option>
                            <Option value={"OPERATING"}>가동 중</Option>
                            <Option value={"MAINTENANCE"}>유지보수 중</Option>
                            <Option value={"FAILURE"}>고장</Option>
                            <Option value={"REPAIRING"}>수리 중</Option>
                        </Select>
                        <Input value={"구매 비용"}
                               style={{marginRight: '10px', marginTop: '20px', flex: 1, backgroundColor: '#f6a6a6'}}
                               readOnly/>
                        <Input value={equipmentDataDetail?.cost || ''} style={{marginTop: '20px', flex: 1}}
                               onChange={(e) => handleInputChange(e, 'cost')}
                               ref={(input) => workcenterCodeRef.current = input?.input}
                               onKeyPress={handleCostInput}/>
                    </div>
                    <div style={{display: 'flex', alignItems: 'center'}}>
                        <Input value={"설비 이미지"}
                               style={{marginRight: '10px', marginTop: '20px', flex: 0.27, backgroundColor: '#f6a6a6'}}
                               readOnly/>
                        <Input value={equipmentDataDetail?.equipmentImg || ''} style={{marginTop: '20px', flex: 1}}
                               onChange={(e) => handleInputChange(e, 'equipmentImg')}
                               ref={equipmentImgRef}/>
                    </div>
            </AntModal>
        </Paper>
)
}

export default EquipmentDataListSection;