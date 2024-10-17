import React, {useEffect} from 'react';
import {Form, Input, Select, Button, Space, Popconfirm, Row, Col} from 'antd';
import {Typography, Paper, Divider, Box} from '@mui/material';
import {useHierarchyGroups} from '../hierarchy_group_management/HierarchyGroupHook.jsx';

const {Option} = Select;

const WarehouseDetailSection = ({
                                    warehouseDetail,
                                    handleUpdateWarehouse,
                                    handleRegisterWarehouse,
                                    handleDeleteWarehouse,
                                    isCreating,
                                    onCancel,
                                }) => {
    const [form] = Form.useForm();
    const {flatHierarchyGroups} = useHierarchyGroups();

    useEffect(() => {
        if (isCreating) {
            form.resetFields();
        } else if (warehouseDetail) {
            form.setFieldsValue({
                ...warehouseDetail,
                isActive: warehouseDetail.isActive ? '사용중' : '사용중단',
                hierarchyGroups: warehouseDetail.hierarchyGroups?.map((group) => group.id) || [],
            });
        }
    }, [isCreating, warehouseDetail, form]);

    const handleSubmit = (values) => {
        const formData = {
            ...values,
            isActive: values.isActive === '사용중',
            hierarchyGroups: values.hierarchyGroups?.map((id) =>
                flatHierarchyGroups.find((group) => group.id === id)
            ),
        };

        if (isCreating) {
            handleRegisterWarehouse(formData);
        } else {
            handleUpdateWarehouse(warehouseDetail.id, formData);
        }
    };

    return (
        <Paper
            elevation={3}
            sx={{padding: '20px', height: '100%', display: 'flex', flexDirection: 'column'}}
        >
            <Typography variant="h6" sx={{marginBottom: '20px'}}>
                {isCreating ? '신규 창고 등록' : '창고 상세 정보'}
            </Typography>
            <Divider/>

            <Form form={form} onFinish={handleSubmit} style={{flex: 1, overflowY: 'auto'}}>
                <Row gutter={[24, 16]}> {/* Row의 세로 간격 설정 */}
                    <Col span={24}>
                        <Form.Item
                            name="code"
                            rules={[{required: true, message: '창고 코드를 입력해주세요.'}]}
                        >
                            <Input
                                addonBefore="창고 코드"
                                placeholder="창고 코드를 입력해주세요."
                                disabled={!isCreating}
                            />
                        </Form.Item>
                    </Col>

                    <Col span={24}>
                        <Form.Item
                            name="name"
                            rules={[{required: true, message: '창고명을 입력해주세요.'}]}
                        >
                            <Input addonBefore="창고명" placeholder="창고명을 입력해주세요."/>
                        </Form.Item>
                    </Col>

                    <Col span={24}>
                        <Form.Item
                            name="warehouseType"
                            rules={[{required: true, message: '창고 유형을 선택해주세요.'}]}
                        >
                            <Select placeholder="창고 유형을 선택해주세요.">
                                <Option value="WAREHOUSE">창고</Option>
                                <Option value="FACTORY">공장</Option>
                                <Option value="OUTSOURCING_FACTORY">외주 공장</Option>
                            </Select>
                        </Form.Item>
                    </Col>

                    <Col span={24}>
                        <Form.Item name="productionProcessName">
                            <Input
                                addonBefore="생산공정명"
                                placeholder="생산공정명을 입력해주세요."
                            />
                        </Form.Item>
                    </Col>

                    <Col span={24}>
                        <Form.Item name="hierarchyGroups">
                            <Select
                                mode="multiple"
                                placeholder="계층 그룹을 선택해주세요."
                                optionLabelProp="label"
                                style={{width: '100%'}}
                            >
                                {flatHierarchyGroups.map((group) => (
                                    <Option key={group.id} value={group.id} label={group.name}>
                                        {`${group.code} - ${group.name}`}
                                    </Option>
                                ))}
                            </Select>
                        </Form.Item>
                    </Col>

                    <Col span={24}>
                        <Form.Item
                            name="isActive"
                            rules={[{required: true, message: '활성화 여부를 선택해주세요.'}]}
                        >
                            <Select placeholder="활성화 여부를 선택해주세요.">
                                <Option value="사용중">사용중</Option>
                                <Option value="사용중단">사용중단</Option>
                            </Select>
                        </Form.Item>
                    </Col>
                </Row>
                <Box style={{display: 'flex', justifyContent: 'flex-end', marginTop: '20px'}}>
                    <Button type="primary" htmlType="submit" style={{marginRight: '8px'}}>
                        {isCreating ? '등록하기' : '수정하기'}
                    </Button>

                    {!isCreating && (
                        <Popconfirm
                            title="정말로 삭제하시겠습니까?"
                            onConfirm={() => handleDeleteWarehouse(warehouseDetail.id)}
                            okText="예"
                            cancelText="아니오"
                        >
                            <Button danger style={{marginRight: '8px'}}>삭제하기</Button>
                        </Popconfirm>
                    )}

                    <Button onClick={onCancel}>취소</Button>
                </Box>
            </Form>

        </Paper>

    );
};

export default WarehouseDetailSection;
