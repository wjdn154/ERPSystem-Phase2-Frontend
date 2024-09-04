import React from 'react';
import { Button, Space, Modal, Form, Input } from 'antd';

const { confirm } = Modal;

const SelectedWorkcenterSection = ({
                                     workcenter,
                                     handleInputChange,
                                     handleSave,
                                     handleDeleteWorkcenter,
                                   }) => {

  // 삭제 확인 다이얼로그 함수
  const showDeleteConfirm = () => {
    confirm({
      title: '삭제하시겠습니까?',
      content: '이 작업은 되돌릴 수 없습니다. 정말로 삭제하시겠습니까?',
      okText: '예',
      okType: 'danger',
      cancelText: '아니오',
      onOk() {
        console.log("삭제 확인 버튼이 눌렸습니다."); // 확인 로그 추가
        handleDeleteWorkcenter(workcenter.code);
      },
      onCancel() {
        console.log('취소됨');
      },
    });
  };

  if (!workcenter) {
    return <div>작업장을 선택하면 상세 조회할 수 있습니다.</div>;
  }

  return (
      <div style={{ padding: '20px', position: 'relative' }}>
        {/* 작업장 상세 정보를 표시하는 Form */}
        <Form
            layout="vertical"
            initialValues={workcenter}
        >
          <Form.Item label="작업장 코드">
            <Input
                value={workcenter.code}
                onChange={(e) => handleInputChange(e, 'code')}
            />
          </Form.Item>
          <Form.Item label="작업장명">
            <Input
                value={workcenter.name}
                onChange={(e) => handleInputChange(e, 'name')}
            />
          </Form.Item>
          <Form.Item label="작업장 유형">
            <Input
                value={workcenter.workcenterType}
                onChange={(e) => handleInputChange(e, 'workcenterType')}
            />
          </Form.Item>
          <Form.Item label="설명">
            <Input
                value={workcenter.description}
                onChange={(e) => handleInputChange(e, 'description')}
            />
          </Form.Item>
          <Form.Item label="활성 상태">
            <Input
                value={workcenter.isActive ? 'Y' : 'N'}
                onChange={(e) => handleInputChange(e, 'isActive')}
            />
          </Form.Item>
          <Form.Item label="공장 코드">
            <Input
                value={workcenter.factoryCode ? workcenter.factoryCode.code : ''}
                onChange={(e) => handleInputChange(e, 'factoryCode')}
            />
          </Form.Item>
          <Form.Item label="공정 코드">
            <Input
                value={workcenter.processCode ? workcenter.processCode.code : ''}
                onChange={(e) => handleInputChange(e, 'processCode')}
            />
          </Form.Item>

        </Form>

        {/* 저장 및 삭제 버튼 */}
        <Space style={{ position: 'absolute', right: 0, bottom: 0 }}>
          <Button type="primary" onClick={handleSave} style={{ marginTop: '16px' }}>
            저장
          </Button>
          <Button
              type="primary"
              danger
              onClick={showDeleteConfirm}
              style={{ marginTop: '16px' }}
          >
            삭제
          </Button>
        </Space>
      </div>

  );
};

export default SelectedWorkcenterSection;
