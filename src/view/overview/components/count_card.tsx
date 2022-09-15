
import { Popover } from 'antd-mobile';
import { ReactElement, ReactNode } from 'react';
import { useState } from 'react';

interface Inner {
    name: string,
    list: { coin: string, count: number }[]
}

interface Card {
    icon: string,
    title: string,
    count: number,
    background: string,
    more?: Inner[],
    more_icon?: string,
    uint?: string,
}

const CountCard = (): ReactElement<ReactNode> => {
    const [list, setList] = useState<Card[]>([
        {
            icon: 'icon-a-bianzu50',
            title: '总商户',
            count: 123,
            background: 'linear-gradient(47deg, #FF98B7 0%, #FF7398 100%)'
        },
        {
            icon: 'icon-a-bianzu9',
            title: '总提币',
            count: 123,
            background: 'linear-gradient(45deg, #D7ACFC 0%, #B27AFF 100%)',
            more: [
                {
                    name: '商户',
                    list: [
                        {
                            coin: 'TRX',
                            count: 100
                        }
                    ],
                },
                {
                    name: '用户',
                    list: [
                        {
                            coin: 'USDT-TRC20',
                            count: 1000.00
                        }
                    ],
                }
            ],
            uint: 'U',
            more_icon: require('../../../assets/images/count_card/arrow_1.png')
        },
        {
            icon: 'icon-a-bianzu501',
            title: '总充值',
            count: 123,
            background: 'linear-gradient(44deg, #8AE3BE 0%, #53C390 100%)',
            more: [
                {
                    name: '商户',
                    list: [
                        {
                            coin: 'ETH',
                            count: 0
                        }
                    ],
                },
                {
                    name: '用户',
                    list: [
                        {
                            coin: 'DOGE',
                            count: 0
                        }
                    ],
                }
            ],
            uint: 'U',
            more_icon: require('../../../assets/images/count_card/arrow_2.png')
        },
        {
            icon: 'icon-a-bianzu51',
            title: '总手续费',
            count: 123,
            background: 'linear-gradient(46deg, #E7DC5D 0%, #E5CA4D 100%)',
            more: [
                {
                    name: '商户',
                    list: [
                        {
                            coin: 'BTC',
                            count: 0
                        }
                    ],
                },
                {
                    name: '用户',
                    list: [
                        {
                            coin: 'AAVE',
                            count: 0
                        }
                    ],
                }
            ],
            uint: 'U',
            more_icon: require('../../../assets/images/count_card/arrow_3.png')
        }
    ]);
    const PopCon = (props: { list: Inner[] }): ReactElement => {
        return (
            <div className='popver-content'>
                {
                    props.list.map((item: Inner, index: number): ReactElement => {
                        return (
                            <div className='content-inner' key={index}>
                                <p className='inner-title'>{item.name}</p>
                                <ul>
                                    {
                                        item.list.map((inner, indexInner): ReactElement => {
                                            return (
                                                <li key={indexInner}>
                                                    <p>{inner.coin}</p>
                                                    <p>{inner.count}</p>
                                                </li>
                                            )
                                        })
                                    }
                                </ul>
                            </div>
                        )
                    })
                }
            </div>
        )
    }
    return (
        <div className='count-card'>
            <ul>
                {
                    list.map((item: Card, index: number): ReactElement<ReactNode> => {
                        return (
                            <li key={index} style={{ background: item.background }}>
                                <p className='item-name'>
                                    <span className={`iconfont ${item.icon}`}></span>
                                    {item.title}
                                </p>
                                <div className='item-count'>
                                    <p className='count-text'>{item.count}&nbsp;{item.uint && item.uint}</p>
                                    {item.more &&
                                        <Popover
                                            content={<PopCon list={item.more} />}
                                            trigger='click'
                                            placement='bottom'
                                        >
                                            <div className='count-detail'>
                                                <p>明细</p>
                                                <img src={item.more_icon} />
                                            </div>
                                        </Popover>}
                                </div>
                            </li>
                        )
                    })
                }
            </ul>
        </div>
    )
};

export default CountCard;