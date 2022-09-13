
import { ReactElement, ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppOutline, UnorderedListOutline } from 'antd-mobile-icons';
import { TabBar } from 'antd-mobile'
import './index.scss'

const NavBottom = (): ReactElement<ReactNode> => {
    const navigate = useNavigate();
    const tabs = [
        {
            key: 'home',
            title: '首页',
            icon: <AppOutline />,
        },
        {
            key: 'todo',
            title: '商家',
            icon: <UnorderedListOutline />,
        }
    ];
    return (
        <div className='nav-bottom'>
            <TabBar onChange={(e) => {
                switch (e) {
                    case 'home':
                        navigate('/')
                        break;
                    case 'todo':
                        navigate('/merchant');
                        break;
                    default:
                        navigate('/')
                }
            }}>
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