import React, {useEffect, useRef, useState} from 'react';
import { Layout, Menu } from 'antd';
import '../../../../styles/App.css';
import { menuItems, subMenuItems } from '../../../../config/menuItems.jsx';
const { Sider } = Layout;
const { SubMenu } = Menu;

const Sidebar = () => {
    const sidebarRef = useRef(null);

    useEffect(() => {
        const sidebar = sidebarRef.current;
        const submenuArrows = sidebar.querySelectorAll('.ant-menu-submenu-arrow');

        const handleMouseEnter = () => {
            submenuArrows.forEach(arrow => {
                arrow.style.display = 'block';
            });
        };

        const handleMouseLeave = () => {
            submenuArrows.forEach(arrow => {
                arrow.style.display = 'none';
            });
        };

        sidebar.addEventListener('mouseenter', handleMouseEnter);
        sidebar.addEventListener('mouseleave', handleMouseLeave);

        return () => {
            sidebar.removeEventListener('mouseenter', handleMouseEnter);
            sidebar.removeEventListener('mouseleave', handleMouseLeave);
        };
    }, []);

    return (
        <Sider className="custom-sidebar" ref={sidebarRef}>
            <Menu
                mode="inline"
                defaultSelectedKeys={['1']}
                style={{ height: 'calc(100vh - 64px)', overflowY: 'auto', borderRight: 0 }}
                theme="dark"
            >
                {menuItems.map((item, index) => (
                    <SubMenu
                        key={`sub${index + 1}`}
                        icon={item.icon}
                        title={item.text}
                    >
                        {subMenuItems[item.text] && subMenuItems[item.text].map((subItem, subIndex) => (
                            <SubMenu
                                key={`sub${index + 1}-${subIndex + 1}`}
                                title={subItem.text}
                            >
                                {subItem.items.map((subSubItem, subSubIndex) => (
                                    <Menu.Item
                                        key={`sub${index + 1}-${subIndex + 1}-${subSubIndex + 1}`}
                                    >
                                        {subSubItem.text}
                                    </Menu.Item>
                                ))}
                            </SubMenu>
                        ))}
                    </SubMenu>
                ))}
            </Menu>
        </Sider>
    );
};

export default Sidebar;