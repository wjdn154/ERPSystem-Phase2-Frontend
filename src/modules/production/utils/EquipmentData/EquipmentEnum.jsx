import React from 'react';
import {Table} from 'antd';

const EquipmentEnum = ({data}) => {

    const equipmentTypeMap = {
        "ASSEMBLY" : "조립 설비",
        "MACHINING" : "가공 설비",
        "INSPECTION" : "검사 설비",
        "PACKAGING" : "포장 설비"
    };

    const operationStatusMap = {
        "BEFORE_OPERATION" : "가동 전",
        "OPERATING" : "가동 중",
        "MAINTENANCE" : "유지보수 중",
        "FAILURE" : "고장",
        "REPAIRING" : "수리 중"
    };
}


export default EquipmentEnum;