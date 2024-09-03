import React from 'react';
import { Button, Space, Modal, Form, Input } from 'antd';

const { confirm } = Modal;

const SelectedProcessDetailsSection = ({
                                           processDetail,
                                           handleInputChange,
                                           handleSave,
                                           handleDeleteProcessDetail,
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
                handleDeleteProcessDetail(processDetail.code);
            },
            onCancel() {
                console.log('취소됨');
            },
        });
    };

    if (!processDetail) {
        return <div>공정을 선택하면 상세 조회할 수 있습니다.</div>;
    }

    return (
        <div style={{ padding: '20px', position: 'relative' }}>
            {/* 공정 상세 정보를 표시하는 Form */}
            <Form
                layout="vertical"
                initialValues={processDetail}
            >
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
                    <Input
                        value={processDetail.isOutsourced ? 'Y' : 'N'}
                        onChange={(e) => handleInputChange(e, 'isOutsourced')}
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
                    <Input
                        value={processDetail.isUsed ? 'Y' : 'N'}
                        onChange={(e) => handleInputChange(e, 'isUsed')}
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



export default SelectedProcessDetailsSection;
