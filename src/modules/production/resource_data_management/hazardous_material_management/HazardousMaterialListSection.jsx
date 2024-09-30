import React, {useRef} from 'react';
import {Grid,Paper,Typography}  from "@mui/material";
import {Button, Table as AntTable, Modal, Input, Select, DatePicker} from "antd";
import {hazardousMaterialColumn} from "./HazardousMaterialListColumn.jsx";
const {Option} = Select;

const HazardousMaterialListSection = ({
                                          data,
                                          hazardousMaterialDetail,
                                          setHazardousMaterialDetail,
                                          handleRowSelection,
                                          handleSelectedRow,
                                          insertModal,
                                          handleInsertOk,
                                          handleInsertCancel,
                                          isInsertModalVisible,
                                          handleInputChange,
                                          handleOpenInsertModal

                                     }) => {

    return (
        <Paper elevation={3} sx={{height: '100%', p: 2}}>
            <AntTable
                style={{padding: '20px'}}
                columns={hazardousMaterialColumn}
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
        </Paper>
    )
}

export default HazardousMaterialListSection;