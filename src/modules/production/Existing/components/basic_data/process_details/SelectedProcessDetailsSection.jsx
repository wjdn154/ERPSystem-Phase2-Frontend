import React from 'react';
import { Button, Space, Modal, Form, Input, Select } from 'antd';
import { ActionButtons, showDeleteConfirm} from "../../../utils/common/commonActions.jsx";
import { isTrueOptions } from "../../../utils/common/dropdownOptions.jsx";

const { confirm } = Modal;

const SelectedProcessDetailsSection = ({
                                           processDetail,
                                           handleInputChange,
                                           handleSave,
                                           handleDeleteProcessDetail,
                                       }) => {

    // 삭제 확인 다이얼로그 호출
    const handleDelete = () => {
        showDeleteConfirm(
            '이 작업은 되돌릴 수 없습니다. 정말로 삭제하시겠습니까?',
            () => handleDeleteProcessDetail(processDetail.code)
        );
    };

    if (!processDetail) {
        return <div>공정을 선택하면 상세 조회할 수 있습니다.</div>;
    }

    return (
        <div style={{ padding: '20px', position: 'relative' }}>
            {/* 공정 상세 정보를 표시하는 Form */}
            <Form layout="vertical" initialValues={processDetail}>
                <Form.Item label="공정 코드">
                    <Input
                        value={processDetail.code}
                        onChange={(e) => handleInputChange(e, 'code')}
                    />
                </Form.Item>
                <Form.Item label="공정 명">
                    <Input
                        value={processDetail.name}
                        onChange={(e) => handleInputChange(e, 'name')}
                    />
                </Form.Item>
                <Form.Item label="외주여부">
                    <Select
                        value={processDetail.isOutsourced ? 'Y' : 'N'}
                        options={isTrueOptions}  // 공통 드롭다운 옵션 사용
                        onChange={(value) => handleInputChange({ target: { value } }, 'isUsed')}
                    />
                </Form.Item>
                <Form.Item label="소요시간">
                    <Input
                        value={processDetail.duration}
                        onChange={(e) => handleInputChange(e, 'duration')}
                    />
                </Form.Item>
                <Form.Item label="공정비용">
                    <Input
                        value={processDetail.cost}
                        onChange={(e) => handleInputChange(e, 'cost')}
                    />
                </Form.Item>
                <Form.Item label="불량률(%)">
                    <Input
                        value={processDetail.defectRate}
                        onChange={(e) => handleInputChange(e, 'defectRate')}
                    />
                </Form.Item>
                <Form.Item label="사용여부">
                    <Select
                        value={processDetail.isUsed}  // true 또는 false로 설정
                        options={isTrueOptions}  // 공통 드롭다운 옵션 사용 (value: true/false)
                        onChange={(value) => handleInputChange({ target: { value } }, 'isUsed')}
                    />
                </Form.Item>

            </Form>

            {/* 공통 ActionButtons 컴포넌트 사용 */}
            <ActionButtons
                onSave={handleSave}
                onDelete={handleDelete}
            />
        </div>

    );
};



export default SelectedProcessDetailsSection;
