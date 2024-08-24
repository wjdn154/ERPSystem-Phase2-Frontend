import { useState } from 'react';

const AppHook = () => {
    // 대분류 메뉴 상태 관리
    const [selectedMenu, setSelectedMenu] = useState('그룹웨어');
    // 중분류 메뉴 상태 관리
    const [selectedSubMenu, setSelectedSubMenu] = useState('기초정보관리');
    // 소분류 메뉴 상태 관리
    const [selectedSubSubMenu, setSelectedSubSubMenu] = useState('회사정보수정');

    return {
        selectedMenu,
        setSelectedMenu,
        selectedSubMenu,
        setSelectedSubMenu,
        selectedSubSubMenu,
        setSelectedSubSubMenu
    };
};

export default AppHook;