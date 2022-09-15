
import { ReactElement, ReactNode, useEffect } from 'react';
import AccountCard from './components/account_card';
import BalanceCard from './components/balance_card';
import ChartsCard from './components/charts_card';
import CountCard from './components/count_card';
import './index.scss'

const OverView = (): ReactElement<ReactNode> => {
    return (
        <div className='over-view'>
            {/* 账户信息 */}
            <AccountCard/>
            {/* 流水信息 */}
            <CountCard/>
            {/* 余额信息 */}
            <BalanceCard/>
            {/* 图表数据 */}
            <ChartsCard/>
        </div>
    )
};

export default OverView;