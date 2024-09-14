import React from 'react';
import { Modal, Descriptions, Button } from 'antd';

const UsersDataDetailSection = ({ user, handleClose }) => {
    return (
        <Modal
            title={`${user.userName} 상세 정보`}
            open={true}
            onCancel={handleClose}
            footer={[
                <Button key="close" onClick={handleClose}>
                    닫기
                </Button>
            ]}
        >
            <Descriptions bordered>
                <Descriptions.Item label="사용자 아이디">{user.userId}</Descriptions.Item>
                <Descriptions.Item label="사용자 이름">{user.userName}</Descriptions.Item>
                <Descriptions.Item label="사원 번호">{user.employeeNumber}</Descriptions.Item>
                <Descriptions.Item label="사원 이름">{user.employeeName}</Descriptions.Item>
            </Descriptions>
        </Modal>
    );
};

export default UsersDataDetailSection;
