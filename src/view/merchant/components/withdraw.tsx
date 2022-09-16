
import { ReactElement, ReactNode } from 'react';
import copy from 'copy-to-clipboard';
import { DotLoading, List, PullToRefresh, Toast } from 'antd-mobile';
import { sleep } from 'antd-mobile/es/utils/sleep'
import { PullStatus } from 'antd-mobile/es/components/pull-to-refresh';
import { useContext } from 'react';
import { IBPayMobile } from '../../../route/router';
import { useEffect } from 'react';


interface Withdraw {
    icon: string,
    coin: string,
    date: string,
    fee: number,
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

const WithdrawList = (): ReactElement<ReactNode> => {
    const { state } = useContext(IBPayMobile);
    useEffect(() => {
        const filter = state.filter_withdraw ? JSON.parse(state.filter_withdraw) : '';
        console.log(filter)
    },[state.filter_withdraw])
    const list: Withdraw[] = [
        {
            icon: require('../../../assets/images/coin.png'),
            coin: 'USDT-TRC20',
            date: '2022-06-08 22:51:53',
            fee: 7.40,
            merchant_name: '派大星',
            address: 'TR4FZ7ZLKfgnKoVkjvNjrkn',
            amount: 740.0000
        },
        {
            icon: require('../../../assets/images/coin.png'),
            coin: 'USDT-TRC20',
            date: '2022-06-08 22:51:53',
            fee: 86.40,
            merchant_name: '章鱼哥',
            address: 'TR4FZ7ZLKfgnKoVkjvNjrkn',
            amount: 8640.0000
        },
    ];
    return (
        <div className='withdraw-list list-public'>
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
                            list.map((item: Withdraw, index: number): ReactElement => {
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
                                                <p>手续费</p>
                                                <p>{item.fee.toFixed(2)}</p>
                                            </div>
                                        </div>
                                        <div className='pay-msg'>
                                            <div className='msg-public'>
                                                <p>商户名称</p>
                                                <p>
                                                    {item.merchant_name}
                                                    <span className='iconfont icon-a-fuzhibeifen2' onClick={() => {
                                                        copy(item.merchant_name)
                                                        Toast.show('复制成功')
                                                    }}></span>
                                                </p>
                                            </div>
                                            <div className='msg-public'>
                                                <p>提币地址</p>
                                                <p>
                                                    {item.address}
                                                    <span className='iconfont icon-a-fuzhibeifen2' onClick={() => {
                                                        copy(item.address)
                                                        Toast.show('复制成功')
                                                    }}></span>
                                                </p>
                                            </div>
                                            <div className='msg-public'>
                                                <p>提币金额</p>
                                                <p>
                                                    <span className='strong-text'>{item.amount.toFixed(4)}</span>
                                                    <span className='iconfont icon-a-fuzhibeifen2' onClick={() => {
                                                        copy(String(item.amount));
                                                        Toast.show('复制成功')
                                                    }}></span>
                                                </p>
                                            </div>
                                        </div>
                                        <div className='oper-box'>
                                            <button className='reject-btn'>拒绝</button>
                                            <button className='primary-btn'>填写HASH</button>
                                            <button className='primary-btn'>查看</button>
                                            <button className='done-btn'>提币完成</button>
                                            <button className='done-btn'>已拒绝</button>
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
export default WithdrawList;

