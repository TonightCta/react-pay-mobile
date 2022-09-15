
import { ReactElement, ReactNode } from 'react';

const FilterWithdraw = () : ReactElement<ReactNode> => {
    return(
        <div className='wihdraw-deposit filter-public'>
            <p className='iconfont icon-shaixuan' onClick={() => {
                console.log('提币筛选')
            }}></p>
        </div>
    )
};

export default FilterWithdraw;