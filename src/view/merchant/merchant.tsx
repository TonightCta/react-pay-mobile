
import { ReactElement, ReactNode, useEffect } from 'react';
import './index.scss'

const MerchantView = (): ReactElement<ReactNode> => {
    useEffect(() => {
        console.log('merchant')
    }, [])
    return (
        <div className='merchant-view'>
            <p>商家</p>
        </div>
    )
};

export default MerchantView;