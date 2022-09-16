
import { DotLoading, List, PullToRefresh } from 'antd-mobile';
import { RightOutline } from 'antd-mobile-icons';
import { PullStatus } from 'antd-mobile/es/components/pull-to-refresh';
import { sleep } from 'antd-mobile/es/utils/sleep';
import { ReactElement, ReactNode, useContext, useEffect } from 'react';
import { IBPayMobile } from '../../../route/router';

interface Deposit {
    icon: string,
    coin: string,
    date: string,
    merchant_name: string,
    address: string,
    amount: number
}

const statusRecord: Record<PullStatus, ReactElement | string> = {
    pulling: '用力拉',
    canRelease: '松开吧',
    refreshing: <DotLoading color='primary' />,
    complete: '好啦',
}
const DepositList = (): ReactElement<ReactNode> => {
    const { state } = useContext(IBPayMobile);
    useEffect(() => {
        const filter = state.filter_deposit ? JSON.parse(state.filter_deposit) : '';
        console.log(filter)
    },[state.filter_deposit])
    const list: Deposit[] = [
        {
            icon: require('../../../assets/images/coin.png'),
            coin: 'USDT-TRC20',
            date: '2022-06-08 22:51:53',
            merchant_name: '派大星',
            address: 'TR4FZ7ZLKfgnKoVkjvNjrkn',
            amount: 740.0000
        },
        {
            icon: require('../../../assets/images/coin.png'),
            coin: 'USDT-TRC20',
            date: '2022-06-08 22:51:53',
            merchant_name: '章鱼哥',
            address: 'TR4FZ7ZLKfgnKoVkjvNjrkn',
            amount: 8640.0000
        },
    ]
    return (
        <div className='deposit-list list-public'>
            <PullToRefresh
                onRefresh={async () => {
                    await sleep(1000)
                }}
                renderText={status => {
                    return <div style={{ fontSize: '14px' }}>{statusRecord[status]}</div>
                }}
            >
                <List>
                    <ul>
                        {
                            list.map((item: Deposit, index: number): ReactElement => {
                                return (
                                    <li key={index}>
                                        <div className='coin-msg'>
                                            <div className='img-text'>
                                                <img src={item.icon} alt="" />
                                                <div className='msg-text'>
                                                    <p>{item.coin}</p>
                                                    <p>{item.date}</p>
                                                </div>
                                            </div>
                                            <div className='fee-msg'>
                                                <p>
                                                    查看HASH
                                                    <RightOutline fontSize={12}/>
                                                </p>
                                            </div>
                                        </div>
                                        <div className='pay-msg'>
                                            <div className='msg-public'>
                                                <p>商户名称</p>
                                                <p>
                                                    {item.merchant_name}
                                                </p>
                                            </div>
                                            <div className='msg-public'>
                                                <p>充币地址</p>
                                                <p>
                                                    {item.address}
                                                </p>
                                            </div>
                                            <div className='msg-public'>
                                                <p>充值金额</p>
                                                <p>
                                                    <span className='strong-text'>{item.amount.toFixed(4)}</span>
                                                </p>
                                            </div>
                                        </div>
                                    </li>
                                )
                            })
                        }
                    </ul>
                </List>
            </PullToRefresh>
        </div>
    )
};

export default DepositList;