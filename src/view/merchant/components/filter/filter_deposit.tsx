
import { ReactElement, ReactNode } from 'react';

const FilterDeposit = () : ReactElement<ReactNode> => {
    return(
        <div className='filter-deposit filter-public'>
            <p className='iconfont icon-shaixuan' onClick={() => {
                console.log('充币筛选')
            }}></p>
        </div>
    )
};

export default FilterDeposit;