import React, {useRef} from 'react';
import {Grid,Paper,Typography}  from "@mui/material";
import {Button, Table as AntTable, Modal as AntModal, Input, Select, DatePicker} from "antd";
import {materialListColumn} from "./MaterialListColumn.jsx";
const {Option} = Select;

const MaterialListSection = ({
                                       data,
                                       materialDataDetail,
                                       setMaterialDataDetail,
                                       handleRowSelection,
                                       handleSelectedRow,
                                       insertModal,
                                       handleInsertOk,
                                       handleInsertCancel,
                                       isInsertModalVisible,
                                       handleInputChange,
                                       handleOpenInsertModal,
                                       updateModal,
                                       handleUpdateOk,
                                       handleUpdateCancel,
                                       isUpdateModalVisible,
                                       handleDelete
                                   }) => {

    return (
        <Paper elevation={3} sx={{height: '100%', p: 2}}>
            <div style={{display: 'flex', justifyContent: 'flex-end', marginRight: '20px'}}>
                <Button onClick={handleOpenInsertModal} type="primary">등록</Button>
            </div>
            <AntTable
                style={{padding: '20px'}}
                columns={materialListColumn}
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
                title="자재 상세 정보 등록"
                open={isInsertModalVisible}
                onOk={handleInsertOk}
                onCancel={handleInsertCancel}
                width={800} // 너비를 700px로 설정
            >

                <div style={{display: 'flex', alignItems: 'center'}}>
                    <Input value={"자재 코드"} style={{marginRight: '10px', flex: 1, backgroundColor: '#f6a6a6'}}
                           readOnly/>
                    <Input value={materialDataDetail?.materialCode || ''} style={{marginRight: '30px', flex: 1}}
                           onChange={(e) => handleInputChange(e, 'materialCode')}/>
                    <Input value={"자재 명"} style={{marginRight: '10px', flex: 1, backgroundColor: '#f6a6a6'}}
                           readOnly/>
                    <Input value={materialDataDetail?.materialName || ''} style={{flex: 1}}
                           onChange={(e) => handleInputChange(e, 'materialName')}/>
                </div>

                <div style={{display: 'flex', alignItems: 'center'}}>
                    <Input value={"자재 유형"}
                           style={{marginRight: '10px', marginTop: '20px', flex: 1, backgroundColor: '#f6a6a6'}}
                           readOnly/>
                    <Select
                        value={materialDataDetail?.materialType || ''}
                        onChange={(value) => handleInputChange({target: {value}}, 'materialType')}
                        style={{marginRight: '30px', marginTop: '20px', flex: 1.2}}
                    >
                        <Option value={"METAL"}>금속</Option>
                        <Option value={"PLASTIC"}>플라스틱</Option>
                        <Option value={"WOOD"}>목재</Option>
                        <Option value={"CHEMICAL"}>화학물질</Option>
                        <Option value={"TEXTILE"}>섬유</Option>
                        <Option value={"ELECTRONIC"}>전자부품</Option>
                        <Option value={"CERAMIC"}>세라믹</Option>
                        <Option value={"GLASS"}>유리</Option>
                        <Option value={"PAPER"}>종이</Option>
                        <Option value={"RUBBER"}>고무</Option>
                        <Option value={"COMPOSITE"}>복합재료</Option>
                        <Option value={"OTHER"}>기타 자재</Option>
                    </Select>
                    <Input value={"재고 수량"}
                           style={{marginRight: '10px', marginTop: '20px', flex: 1, backgroundColor: '#f6a6a6'}}
                           readOnly/>
                    <Input value={materialDataDetail?.stockQuantity || ''} style={{marginTop: '20px', flex: 1}}
                           onChange={(e) => handleInputChange(e, 'stockQuantity')}/>
                </div>

                <div style={{display: 'flex', alignItems: 'center'}}>
                    <Input value={"거래처 코드"}
                           style={{marginRight: '10px', marginTop: '20px', flex: 1, backgroundColor: '#f6a6a6'}}
                           readOnly/>
                    <Input value={materialDataDetail?.representativeCode || ''}
                           style={{marginRight: '30px', marginTop: '20px', flex: 1}}
                           onChange={(e) => handleInputChange(e, 'representativeCode')}/>
                    <Input value={"거래처 명"}
                           style={{marginRight: '10px', marginTop: '20px', flex: 1, backgroundColor: '#f6a6a6'}}
                           readOnly/>
                    <Input value={materialDataDetail?.representativeName || ''} style={{marginTop: '20px', flex: 1}}
                           onChange={(e) => handleInputChange(e, 'representativeName')}/>
                </div>

                <div style={{display: 'flex', alignItems: 'center'}}>
                    <Input value={"구매 가격"}
                           style={{marginRight: '10px', marginTop: '20px', flex: 0.28, backgroundColor: '#f6a6a6'}}
                           readOnly/>
                    <Input value={materialDataDetail?.purchasePrice || ''}
                           style={{marginTop: '20px', flex: 1}}
                           onChange={(e) => handleInputChange(e, 'purchasePrice')}/>
                </div>
                <br/>
                <Typography>유해물질 등록</Typography>
                <div style={{display: 'flex', alignItems: 'center'}}>
                    <Input value={"유해물질 코드"}
                           style={{marginRight: '10px', marginTop: '20px', flex: 1, backgroundColor: '#f6a6a6'}}
                           readOnly/>
                    <Input value={materialDataDetail?.hazardousMaterialCode || ''}
                           style={{marginRight: '30px', marginTop: '20px', flex: 1}}
                           onChange={(e) => handleInputChange(e, 'hazardousMaterialCode')}/>
                    <Input value={"유해물질 명"}
                           style={{marginRight: '10px', marginTop: '20px', flex: 1, backgroundColor: '#f6a6a6'}}
                           readOnly/>
                    <Input value={materialDataDetail?.hazardousMaterialName || ''}
                           style={{marginTop: '20px', flex: 1}}
                           onChange={(e) => handleInputChange(e, 'hazardousMaterialName')}/>
                </div>
                <div style={{display: 'flex', alignItems: 'center'}}>
                    <Input value={"위험 등급"}
                           style={{marginRight: '10px', marginTop: '20px', flex: 1, backgroundColor: '#f6a6a6'}}
                           readOnly/>
                    <Input value={materialDataDetail?.hazardousMaterialCode || ''}
                           style={{marginRight: '30px', marginTop: '20px', flex: 1}}
                           onChange={(e) => handleInputChange(e, 'hazardousMaterialCode')}/>
                    <Input value={"유해물질 명"}
                           style={{marginRight: '10px', marginTop: '20px', flex: 1, backgroundColor: '#f6a6a6'}}
                           readOnly/>
                    <Input value={materialDataDetail?.hazardousMaterialName || ''}
                           style={{marginTop: '20px', flex: 1}}
                           onChange={(e) => handleInputChange(e, 'hazardousMaterialName')}/>
                </div>
            </AntModal>

            <div style={{display: 'flex', justifyContent: 'flex-end', marginRight: '20px'}}>
                <Button onClick={updateModal} type="primary"
                        style={{marginRight: '10px'}}> 수정</Button>
                <Button onClick={handleDelete} type="danger">삭제</Button>
            </div>

            <AntModal
                title="자재 상세 정보 수정"
                open={isUpdateModalVisible}
                onOk={handleUpdateOk}
                onCancel={handleUpdateCancel}
                width={800} // 너비를 700px로 설정
            >

                <div style={{display: 'flex', alignItems: 'center'}}>
                    <Input value={"자재 코드"} style={{marginRight: '10px', flex: 1, backgroundColor: '#f6a6a6'}}
                           readOnly/>
                    <Input value={materialDataDetail?.materialCode} style={{marginRight: '30px', flex: 1}}
                           onChange={(e) => handleInputChange(e, 'materialCode')}/>
                <Input value={"자재 명"} style={{marginRight: '10px', flex: 1, backgroundColor: '#f6a6a6'}}
                       readOnly/>
                <Input value={materialDataDetail?.materialName} style={{flex: 1}}
                       onChange={(e) => handleInputChange(e, 'materialName')}/>
            </div>

            <div style={{display: 'flex', alignItems: 'center'}}>
                <Input value={"자재 유형"}
                       style={{marginRight: '10px', marginTop: '20px', flex: 1, backgroundColor: '#f6a6a6'}}
                       readOnly/>
                <Select
                    value={materialDataDetail?.materialType}
                    onChange={(value) => handleInputChange({target: {value}}, 'materialType')}
                    style={{marginRight: '30px', marginTop: '20px', flex: 1.2}}
                >
                    <Option value={"METAL"}>금속</Option>
                    <Option value={"PLASTIC"}>플라스틱</Option>
                    <Option value={"WOOD"}>목재</Option>
                    <Option value={"CHEMICAL"}>화학물질</Option>
                    <Option value={"TEXTILE"}>섬유</Option>
                    <Option value={"ELECTRONIC"}>전자부품</Option>
                    <Option value={"CERAMIC"}>세라믹</Option>
                    <Option value={"GLASS"}>유리</Option>
                    <Option value={"PAPER"}>종이</Option>
                    <Option value={"RUBBER"}>고무</Option>
                    <Option value={"COMPOSITE"}>복합재료</Option>
                    <Option value={"OTHER"}>기타 자재</Option>
                </Select>
                <Input value={"재고 수량"}
                       style={{marginRight: '10px', marginTop: '20px', flex: 1, backgroundColor: '#f6a6a6'}}
                       readOnly/>
                <Input value={materialDataDetail?.stockQuantity} style={{marginTop: '20px', flex: 1}}
                       onChange={(e) => handleInputChange(e, 'stockQuantity')}/>
            </div>

            <div style={{display: 'flex', alignItems: 'center'}}>
                <Input value={"거래처 코드"}
                       style={{marginRight: '10px', marginTop: '20px', flex: 1, backgroundColor: '#f6a6a6'}}
                       readOnly/>
                <Input value={materialDataDetail?.representativeCode}
                       style={{marginRight: '30px', marginTop: '20px', flex: 1}}
                       onChange={(e) => handleInputChange(e, 'representativeCode')}/>
                <Input value={"거래처 명"}
                       style={{marginRight: '10px', marginTop: '20px', flex: 1, backgroundColor: '#f6a6a6'}}
                       readOnly/>
                <Input value={materialDataDetail?.representativeName} style={{marginTop: '20px', flex: 1}}
                       onChange={(e) => handleInputChange(e, 'representativeName')}/>
            </div>

            <div style={{display: 'flex', alignItems: 'center'}}>
                <Input value={"구매 가격"}
                       style={{marginRight: '10px', marginTop: '20px', flex: 1, backgroundColor: '#f6a6a6'}}
                       readOnly/>
                <Input value={materialDataDetail?.purchasePrice}
                       style={{marginRight: '30px', marginTop: '20px', flex: 1}}
                       onChange={(e) => handleInputChange(e, 'purchasePrice')}/>
                <Input value={"유해물질 개수"}
                       style={{marginRight: '10px', marginTop: '20px', flex: 1, backgroundColor: '#f6a6a6'}}
                       readOnly/>
                <Input type="number"
                       value={materialDataDetail?.hazardousMaterial?.length}
                       style={{marginTop: '20px', flex: 1}}
                       readOnly/>
            </div>
            </AntModal>

        </Paper>
    )
}

export default MaterialListSection;