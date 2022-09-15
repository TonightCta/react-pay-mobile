
import { Popover } from 'antd-mobile';
import { ReactElement, ReactNode, useState } from 'react';

interface Balance {
    icon: string,
    uint: string,
    title: string,
    tootip?: string,
    count: number,
    detail: Inner[]
}

interface Inner {
    coin: string,
    count: number
}

const BalanceCard = (): ReactElement<ReactNode> => {
    const [list, setList] = useState<Balance[]>([
        {
            icon: require('../../../assets/images/balance_card/card_1.png'),
            uint: 'U',
            title: '可代付',
            count: 0,
            detail: [
                {
                    coin: 'USDT-TRC20',
                    count: 0
                }
            ]
        },
        {
            icon: require('../../../assets/images/balance_card/card_2.png'),
            uint: 'TRX',
            title: '代付矿工费',
            tootip: '商户代付时链上所需的矿工费',
            count: 0,
            detail: [
                {
                    coin: 'USDT-TRC20',
                    count: 0
                }
            ]
        },
        {
            icon: require('../../../assets/images/balance_card/card_3.png'),
            uint: 'U',
            title: '可提现',
            count: 0,
            detail: [
                {
                    coin: 'USDT-TRC20',
                    count: 0
                }
            ]
        },
        {
            icon: require('../../../assets/images/balance_card/card_4.png'),
            uint: 'TRX',
            title: '提现矿工费',
            count: 0,
            detail: [
                {
                    coin: 'USDT-TRC20',
                    count: 0
                },
                {
                    coin: 'TRX',
                    count: 0
                }
            ]
        },
    ]);
    const PopBalance = (props: { list: Inner[] }): ReactElement => {
        return (
            <div className='popver-content'>
                <ul className='balance-pop'>
                    {
                        props.list.map((item: Inner, index: number): ReactElement => {
                            return (
                                <li key={index}>
                                    <p>{item.coin}</p>
                                    <p>{item.count}</p>
                                </li>
                            )
                        })
                    }
                </ul>
            </div>
        )
    }
    return (
        <div className='balance-card'>
            <ul>
                {
                    list.map((item: Balance, index: number): ReactElement => {
                        return (
                            <li key={index}>
                                <img src={item.icon} alt="" />
                                <div className='balance-inner'>
                                    <div className='inner-name'>
                                        <p>{item.title}</p>
                                        {item.tootip && <Popover
                                            content={<p className='tooltip-mine'>{item.tootip}</p>}
                                            trigger='click'
                                            placement='top'
                                        >
                                            <p className='iconfont icon-question-2beifen'></p>
                                        </Popover>}
                                    </div>
                                    <p className='inner-count'>{item.count}&nbsp;{item.uint}</p>
                                    <Popover
                                        content={<PopBalance list={item.detail} />}
                                        trigger='click'
                                        placement='bottom'
                                    >
                                        <p className='coin-detail'>
                                            币种明细
                                            <span className='iconfont icon-xialajiantouxiaobeifen'></span>
                                        </p>
                                    </Popover>
                                </div>
                            </li>
                        )
                    })
                }
            </ul>
        </div>
    )
};
export default BalanceCard;