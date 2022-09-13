
import { ReactNode } from 'react';
import './index.scss'

const NotFound = () : React.ReactElement<ReactNode> => {
    return (
        <div className='not-found'>
            页面未找到
        </div>
    )
};

export default NotFound;