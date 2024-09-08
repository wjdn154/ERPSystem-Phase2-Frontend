import { useState, useEffect } from 'react';

const useSidebarState = (selectedMenu, selectedSubMenu) => {
    const [open, setOpen] = useState({});
    const [subOpen, setSubOpen] = useState({});

    useEffect(() => {
        setOpen({ [selectedMenu]: true });
        setSubOpen({ [selectedSubMenu]: true });
    }, [selectedMenu, selectedSubMenu]);

    return { open, setOpen, subOpen, setSubOpen };
};

export default useSidebarState;