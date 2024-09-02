import React, {useRef, useState} from 'react';
import { Layout, Menu } from 'antd';
import '../../../../styles/App.css';
import { menuItems, subMenuItems } from '../../../../config/menuItems.jsx';
const { Sider } = Layout;

const Sidebar = () => {
    const [hoveredKey, setHoveredKey] = useState(null);
    const [openKeys, setOpenKeys] = useState([]); // 열려 있는 SubMenu의 키를 관리
    const closeTimeout = useRef(null); // 타이머를 관리하기 위한 ref

    const handleMouseEnter = (key) => {
        if (closeTimeout.current) {
            clearTimeout(closeTimeout.current); // 기존 타이머를 취소
        }
        setHoveredKey(key);
        setOpenKeys((prevOpenKeys) => [...prevOpenKeys, key]); // 현재 열려있는 키를 유지하며 새 키 추가
    };

    const handleMouseLeave = () => {
        closeTimeout.current = setTimeout(() => {
            setHoveredKey(null);
            setOpenKeys([]); // 모든 SubMenu를 닫음
        }, 3000); // 1초 뒤에 메뉴 닫기
    };

    const generateMenuItems = () => {
        return menuItems.map((item, index) => {
            const key = `sub${index + 1}`;
            return {
                key,
                icon: item.icon,
                label: item.text,
                onMouseEnter: () => handleMouseEnter(key),
                onMouseLeave: handleMouseLeave,
                children: subMenuItems[item.text]?.map((subItem, subIndex) => ({
                    key: `${key}-${subIndex + 1}`,
                    label: subItem.text,
                    onMouseEnter: () => handleMouseEnter(`${key}-${subIndex + 1}`),
                    onMouseLeave: handleMouseLeave,
                    children: subItem.items.map((subSubItem, subSubIndex) => ({
                        key: `${key}-${subIndex + 1}-${subSubIndex + 1}`,
                        label: subSubItem.text,
                        onMouseEnter: () => handleMouseEnter(`${key}-${subIndex + 1}-${subSubIndex + 1}`),
                        onMouseLeave: handleMouseLeave,
                    })),
                })),
            };
        });
    };

    return (
        <Sider className="custom-sidebar">
            <Menu
                mode="inline"
                items={generateMenuItems()} // items 속성 사용
                selectedKeys={hoveredKey ? [hoveredKey] : []} // 선택된 키 설정
                openKeys={openKeys} // 열려 있는 SubMenu의 키 설정
                style={{ height: 'calc(100vh - 64px)', overflowY: 'auto', borderRight: 0 }}
                theme="dark"
            />
        </Sider>
    );
};

export default Sidebar;