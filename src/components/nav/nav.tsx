
import { ReactElement, ReactNode, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { AppOutline, UnorderedListOutline } from 'antd-mobile-icons';
import { TabBar } from 'antd-mobile'
import './index.scss'
import { useEffect } from 'react';

const NavBottom = (): ReactElement<ReactNode> => {
    const navigate = useNavigate();
    const location = useLocation();
    const [activeRouter, setActiveRouter] = useState<string>('home')
    useEffect(() => {
        const { pathname } = location;
        switch (pathname) {
            case '/':
                setActiveRouter('home')
                break;
            case '/merchant':
                setActiveRouter('todo');
                break;
            default:
                setActiveRouter('home')
        }
    }, [])
    const tabs = [
        {
            key: 'home',
            title: '概览',
            icon: <span className='iconfont icon-overview'></span>,
        },
        {
            key: 'todo',
            title: '商家',
            icon: <span className='iconfont icon-merchant'></span>,
        }
    ];
    return (
        <div className='nav-bottom'>
            <TabBar onChange={(e) => {
                switch (e) {
                    case 'home':
                        navigate('/');
                        setActiveRouter('home')
                        break;
                    case 'todo':
                        navigate('/merchant');
                        setActiveRouter('todo');
                        break;
                    default:
                        setActiveRouter('home')
                        navigate('/')
                }
            }} activeKey={activeRouter}>
                {
                    tabs.map((item): ReactElement => {
                        return (
                            <TabBar.Item key={item.key} icon={item.icon} title={item.title}></TabBar.Item>
                        )
                    })
                }
            </TabBar>
        </div>
    )
};

export default NavBottom;