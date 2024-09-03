import React, { useEffect, useRef, useState } from 'react';
import { Layout, Menu } from 'antd';
import { useDispatch } from 'react-redux';
import '../../../../styles/App.css';
import { menuItems, subMenuItems } from '../../../../config/menuItems.jsx';
import { setSelectedMenu, setSelectedSubMenu, setSelectedSubSubMenu } from '../../../../store.jsx';

const { Sider } = Layout;

const Sidebar = () => {
    const dispatch = useDispatch();
    const [openKeys, setOpenKeys] = useState([]);
    const [lastOpenKeys, setLastOpenKeys] = useState([]);
    const sidebarRef = useRef(null);

    useEffect(() => {
        const sidebar = sidebarRef.current;

        const handleMouseEnter = () => {
            setOpenKeys(lastOpenKeys);
        };

        const handleMouseLeave = () => {
            setLastOpenKeys(openKeys);
            setOpenKeys([]);
        };

        sidebar.addEventListener('mouseenter', handleMouseEnter);
        sidebar.addEventListener('mouseleave', handleMouseLeave);

        return () => {
            sidebar.removeEventListener('mouseenter', handleMouseEnter);
            sidebar.removeEventListener('mouseleave', handleMouseLeave);
        };
    }, [openKeys, lastOpenKeys]);

    const handleOpenChange = (keys) => {
        setOpenKeys(keys);
    };


    const handleClick = (menu, subMenu, subSubItem) => {
        // Redux 상태 업데이트
        dispatch(setSelectedMenu(menu));
        dispatch(setSelectedSubMenu(subMenu));
        dispatch(setSelectedSubSubMenu(subSubItem));
    };

    // 메뉴 아이템을 items 속성에 맞게 변환
    const menuItemsWithSubMenu = menuItems.map((item, index) => ({
        key: `sub${index + 1}`,
        icon: item.icon,
        label: item.text,
        children: subMenuItems[item.text].map((subItem, subIndex) => ({
            key: `sub${index + 1}-${subIndex + 1}`,
            label: subItem.text,
            children: subItem.items.map((subSubItem, subSubIndex) => ({
                key: `sub${index + 1}-${subIndex + 1}-${subSubIndex + 1}`,
                label: (
                    <div
                        onClick={() => handleClick(item.text, subItem.text, subSubItem)}
                        style={{ cursor: 'pointer' }}
                    >
                        {subSubItem.text}
                    </div>
                ),
            })),
        })),
    }));

    return (
        <Sider className="custom-sidebar" ref={sidebarRef}
            // style={{
            //     transition: 'width 0.6s ease, min-width 0.6s ease, max-width 0.6s ease',
            // }}
        >
            <Menu
                mode="inline"
                defaultSelectedKeys={['1']}
                openKeys={openKeys}
                onOpenChange={handleOpenChange}
                items={menuItemsWithSubMenu}  // items 속성 사용
                style={{ height: 'calc(100vh - 64px)', overflowY: 'auto', borderRight: 0 }}
                theme="dark"
            />
        </Sider>
    );
};

export default Sidebar;