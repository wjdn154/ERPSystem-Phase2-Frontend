// import React, {useMemo, useState} from 'react';
// import { Box, Grid, Grow } from '@mui/material';
// import {usersDataHook} from "../hooks/UsersDataHook.jsx";
// import UsersDataListSection from "../components/Users/UsersDataListSection.jsx";
// import {usersDataListColumn} from "../utils/UsersData/UsersDataListColumn.jsx";
// import UsersDataDetailSection from "../components/Users/UsersDataListSection.jsx";
// import PermissionDetailModal from '../components/Permission/PermissionDetailModal.jsx';
// import { message } from 'antd';
//
//
// const UsersDataPage = ({initialData}) => {
//     const [showDetail, setShowDetail] = useState(false); // 상세 정보 표시 여부 상태
//     const [selectedUser, setSelectedUser] = useState(null); // 선택된 사용자 상태
//
//     const usersMemoizedData = useMemo(() => initialData, [initialData]);
//
//     const{
//         data,
//         handleSelectedRow,
//         handleRowSelection,
//     } = usersDataHook(initialData);
//     console.log('rendered data:',data);
//
//     // 사용자 클릭 시 상세 정보 보여주기
//     const handleRowClick = (record) => {
//         setSelectedUser(record); // 클릭한 사용자 정보 저장
//         setShowDetail(true);     // 상세 정보 섹션 표시
//     };
//
//     return (
//         <Box sx={{flewGrow: 1, p:3}}>
//             <Grid container spacing={2} sx={{marginTop: 2}}>
//                 {/* 사용자정보 리스트 영역 */}
//                 <Grid item xs={12}>
//                     <Grow in={true} timeout={200}>
//                         <div>
//                             <UsersDataListSection
//                                 columns={usersDataListColumn(handleRowClick)}
//                                 data={data}
//                                 handleRowSelection={{handleRowSelection}}
//                                 handleSelectedRow={{handleSelectedRow}}
//                             />
//                         </div>
//                     </Grow>
//                 </Grid>
//             </Grid>
//
//             {/* 사용자정보 상세 영역 */}
//             {showDetail && selectedUser && ( // showDetail이 true일 때만 렌더링
//                 <Grid item xs={12}>
//                     <Grow in={showDetail} timeout={200} key={selectedUser?.id}>
//                         <div>
//                                 <UsersDataDetailSection
//                                     user={selectedUser} // 선택된 사용자 정보 전달
//                                     handleClose={() => setShowDetail(false)} // 상세 정보 닫기 핸들러
//                                 />
//                         </div>
//                     </Grow>
//                 </Grid>
//             )}
//         </Box>
//     )
// }
//
// export default UsersDataPage;


import React, { useState } from 'react';
import UsersDataListSection from '../components/Users/UsersDataListSection.jsx';
import PermissionsModal from '../components/Permission/PermissionDetailModal.jsx';
import { message } from 'antd';

const UsersDataPage = () => {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);
    const [permissions, setPermissions] = useState(['READ', 'WRITE', 'DELETE']); // 서버에서 받아온 권한 목록
    const [userPermissions, setUserPermissions] = useState({});

    const data = [
        { userId: 'aks', userName: '만수이', employeeNumber: '1001', employeeName: '김지호' },
        { userId: 'aaa', userName: '정현이', employeeNumber: '1002', employeeName: '이성민' },
        { userId: 'asd', userName: '지혁이', employeeNumber: '1003', employeeName: '최수진' },
    ];

    const handleShowPermissions = (user) => {
        setSelectedUser(user);
        setIsModalVisible(true);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
        setSelectedUser(null);
    };

    const handleSavePermissions = (selectedPermissions) => {
        message.success(`${selectedUser.userName}님의 권한이 저장되었습니다.`);
        setUserPermissions({
            ...userPermissions,
            [selectedUser.userId]: selectedPermissions,
        });
        setIsModalVisible(false);
    };

    return (
        <div>
            <UsersDataListSection data={data} onShowPermissions={handleShowPermissions} />
            <PermissionsModal
                visible={isModalVisible}
                onCancel={handleCancel}
                onSave={handleSavePermissions}
                permissions={permissions}
                userPermissions={userPermissions[selectedUser?.userId]}
            />
        </div>
    );
};

export default UsersDataPage;
