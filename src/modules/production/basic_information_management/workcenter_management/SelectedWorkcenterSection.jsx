import React from 'react';
import { Form, Input, Select } from 'antd';
import { ActionButtons, showDeleteConfirm } from '../../common/commonActions.jsx';  // 공통 버튼 및 다이얼로그
import { isTrueOptions, workcenterTypeOptions } from '../../common/dropdownOptions.jsx';  // 공통 드롭다운 옵션

const SelectedWorkcenterSection = ({
                                     workcenter,
                                     handleInputChange,
                                     handleSave,
                                     handleDeleteWorkcenter,
                                   }) => {

  // 삭제 확인 다이얼로그 호출
  const handleDelete = () => {
    showDeleteConfirm(
        '이 작업은 되돌릴 수 없습니다. 정말로 삭제하시겠습니까?',
        () => handleDeleteWorkcenter(workcenter.code)
    );
  };

  if (!workcenter) {
    return <div>작업장을 선택하면 상세 조회할 수 있습니다.</div>;
  }

  return (
      <div style={{ padding: '20px', position: 'relative' }}>
        <Form layout="vertical" initialValues={workcenter}>

          <Form.Item label="작업장 코드">
            <Input
                value={workcenter.code}
                onChange={(e) => handleInputChange(e, 'code')}
                disabled
            />
          </Form.Item>

          <Form.Item label="작업장명">
            <Input
                value={workcenter.name}
                onChange={(e) => handleInputChange(e, 'name')}
            />
          </Form.Item>

          <Form.Item label="작업장 유형">
            <Select
                value={workcenter.workcenterType}
                options={workcenterTypeOptions}  // 공통 드롭다운 옵션 사용
                onChange={(value) => handleInputChange({ target: { value } }, 'workcenterType')}
            />
          </Form.Item>

          {/* 활성 상태 (공통 드롭다운 사용) */}
          <Form.Item label="활성 상태">
            <Select
                value={workcenter.isActive ? 'Y' : 'N'}
                options={isTrueOptions}  // 공통 드롭다운 옵션 사용
                onChange={(value) => handleInputChange({ target: { value } }, 'isActive')}
            />
          </Form.Item>

          {/* 공장 코드 */}
          <Form.Item label="공장명">
            <Input
                value={workcenter.factoryName || ''}
                onChange={(e) => handleInputChange(e, 'factoryName')}
            />
          </Form.Item>

          {/* 공정 코드 */}
          <Form.Item label="생산공정 코드">
            <Input
                value={workcenter.processCode || ''}
                onChange={(e) => handleInputChange(e, 'processCode')}
            />
          </Form.Item>
          {/* 공정 코드 */}
          <Form.Item label="생산공정명">
            <Input
                value={workcenter.processName || ''}
                onChange={(e) => handleInputChange(e, 'processName')}
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

export default SelectedWorkcenterSection;
