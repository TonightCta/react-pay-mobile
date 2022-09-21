
import { ReactElement, ReactNode } from 'react';
import AccountCard from './components/account_card';
import BalanceCard from './components/balance_card';
import ChartsCard from './components/charts_card';
import CountCard from './components/count_card';
import './index.scss'
import { useContext } from 'react';
import { IBPayMobile } from '../../route/router';

const OverView = (): ReactElement<ReactNode> => {
    const { state } = useContext(IBPayMobile);
    const account = JSON.parse(state.account || '{}');
    return (
        <div className='over-view'>
            {/* 账户信息 */}
            <AccountCard />
            {/* 流水信息 */}
            {account.merchantInfo.is_admin && <CountCard />}
            {/* 余额信息 */}
            <BalanceCard />
            {/* 图表数据 */}
            <ChartsCard />
        </div>
    )
};

export default OverView;