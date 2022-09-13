
import { ReactElement, ReactNode, useEffect } from 'react';
import './index.scss'

const OverView = (): ReactElement<ReactNode> => {
    useEffect(() => {
        console.log('overview')
    }, [])
    return (
        <div className='over-view'>
            <p>概览</p>
        </div>
    )
};

export default OverView;