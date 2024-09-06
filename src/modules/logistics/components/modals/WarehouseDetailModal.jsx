import React, { useEffect } from 'react';
import { Modal, Form, Input, Button, Radio, Select } from 'antd';

const WarehouseDetailModal = ({ visible, onCancel, warehouse, onSave }) => {
    const [form] = Form.useForm();

    // 모달이 열리면 warehouse 데이터를 폼에 미리 채워 넣음
    useEffect(() => {
        if (warehouse) {
            form.setFieldsValue({
                code: warehouse.code,
                name: warehouse.name,
                warehouseType: warehouse.warehouseType,
                productionProcess: warehouse.productionProcess,
                hierarchyGroupList: warehouse.hierarchyGroupList?.map(group => group.id), // id로 설정
                isActive: warehouse.isActive,
            });
        }
    }, [warehouse, form]);

    const handleSave = () => {
        form.validateFields().then(values => {
            onSave(values);  // 수정된 값을 저장
        });
    };

    return (
        <Modal
            open={visible}
            onCancel={onCancel}
            title="창고 상세 정보"
            footer={[
                <Button key="cancel" onClick={onCancel}>
                    닫기
                </Button>,
                <Button key="save" type="primary" onClick={handleSave}>
                    저장
                </Button>,
            ]}
        >
            <Form form={form} layout="vertical">
                <Form.Item label="창고코드" name="code">
                    <Input disabled />
                </Form.Item>
                <Form.Item label="창고명" name="name">
                    <Input />
                </Form.Item>
                <Form.Item label="구분" name="warehouseType">
                    <Radio.Group>
                        <Radio value="WAREHOUSE">창고</Radio>
                        <Radio value="FACTORY">공장</Radio>
                    </Radio.Group>
                </Form.Item>
                <Form.Item label="생산공정명" name="productionProcess">
                    <Input />
                </Form.Item>
                {/*<Form.Item label="계층 그룹" name="hierarchyGroupList">*/}
                {/*    <Select mode="multiple" placeholder="계층 그룹 선택">*/}
                {/*        {warehouse.hierarchyGroupList?.map(group => (*/}
                {/*            <Select.Option key={group.id} value={group.id}>*/}
                {/*                {group.name}*/}
                {/*            </Select.Option>*/}
                {/*        ))}*/}
                {/*    </Select>*/}
                {/*</Form.Item>*/}
                <Form.Item label="사용" name="isActive">
                    <Radio.Group>
                        <Radio value={true}>Yes</Radio>
                        <Radio value={false}>No</Radio>
                    </Radio.Group>
                </Form.Item>
            </Form>
        </Modal>
    );
};

export default WarehouseDetailModal;
