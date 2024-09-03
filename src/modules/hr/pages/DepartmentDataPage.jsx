// import React, {useMemo} from 'react';
// import { Box, Grid, Grow } from '@mui/material';
// import {departmentDataHook} from "../hooks/DepartmentDataHook.jsx"
// import DepartmentDataListSection from "../components/Department/DepartmentDataListSection.jsx"
// import {departmentDataListColumn} from "../utils/DepartmentData/DepartmentDataListColumn.jsx"
// import {usersDataHook} from "../hooks/UsersDataHook.jsx";
// import UsersDataListSection from "../components/Users/UsersDataListSection.jsx";
// import {usersDataListColumn} from "../utils/UsersData/UsersDataListColumn.jsx";
//
// const DepartmentDataPage = ({initialData}) => {
//
//     const departmentMemoizedData = useMemo(() => initialData, [initialData])
//
//     const{
//         data,
//         showDetail,
//         handleSelectedRow,
//         handleRowSelection,
//         departmentDataDetail,
//         setDepartmentDataDetail
//
//     } = departmentDataHook(initialData);
//     console.log('rendered data:',data);
//
//     return (
//         <Box sx={{flewGrow: 1, p:3}}>
//             <Grid container spacing={2} sx={{marginTop: 2}}>
//                 {/* 부서정보 리스트 영역 */}
//                 <Grid item xs={12}>
//                     <Grow in={true} timeout={200}>
//                         <div>
//                             <DepartmentDataListSection
//                                 columns={departmentDataListColumn}
//                                 data={data}
//                                 handleRowSelection={{handleRowSelection}}
//                                 handleSelectedRow={{handleSelectedRow}}
//                             />
//                         </div>
//                     </Grow>
//                 </Grid>
//             </Grid>
//
// }