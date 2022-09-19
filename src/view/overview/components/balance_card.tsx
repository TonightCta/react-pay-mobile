
import { Popover, Toast } from 'antd-mobile';
import { ReactElement, ReactNode, useState } from 'react';
import { useContext } from 'react';
import { IBPayMobile } from '../../../route/router';
import { useEffect } from 'react';
import { WalletViewApi } from '../../../request/api';

interface Balance {
    icon: string,
    uint: string,
    title: string,
    tootip?: string,
    count: number,
    detail: Inner[],
    btn: string,
}

interface Inner {
    coin: string,
    amount: number
}

const source = [
    {
        icon: require('../../../assets/images/balance_card/card_1.png'),
        uint: 'U',
        title: '可代付',
        count: 0,
        btn: 'deposit',
        detail: [
            {
                coin: 'USDT-TRC20',
                amount: 0
            }
        ]
    },
    {
        icon: require('../../../assets/images/balance_card/card_2.png'),
        uint: 'TRX',
        title: '代付矿工费',
        tootip: '商户代付时链上所需的矿工费',
        count: 0,
        btn: 'deposit',
        detail: [
            {
                coin: 'USDT-TRC20',
                amount: 0
            }
        ]
    },
    {
        icon: require('../../../assets/images/balance_card/card_3.png'),
        uint: 'U',
        title: '可提现',
        count: 0,
        btn: 'withdraw',
        detail: [
            {
                coin: 'USDT-TRC20',
                amount: 0
            }
        ]
    },
    {
        icon: require('../../../assets/images/balance_card/card_4.png'),
        uint: 'TRX',
        title: '提现矿工费',
        count: 0,
        btn: 'deposit',
        detail: [
            {
                coin: 'USDT-TRC20',
                amount: 0
            },
            {
                coin: 'TRX',
                amount: 0
            }
        ]
    },
]

const BalanceCard = (): ReactElement<ReactNode> => {
    const [list, setList] = useState<Balance[]>(source);
    const { state } = useContext(IBPayMobile);
    useEffect(() => {
        return () => {
            setList(source)
        }
    }, []);
    useEffect(() => {
        walletViewService();
    },[state.merchant_id])
    const walletViewService = async () => {
        const { merchant_id } = state;
        const reuslt = await WalletViewApi({
            mch_id: merchant_id
        });
        const list = source;
        const { data } = reuslt;
        list[0].count = data.mchAvailableTotal;
        list[0].detail = data.mchAvailable;
        list[1].count = data.mchFeeAvailableTotal;
        list[1].detail = data.mchFeeAvailable;
        list[2].count = data.userAvailableTotal;
        list[2].detail = data.userAvailable;
        list[3].count = data.userFeeAvailableTotal;
        list[3].detail = data.userFeeAvailable;
        setList([...list])
    }
    const PopBalance = (props: { list: Inner[] }): ReactElement => {
        return (
            <div className='popver-content'>
                <ul className='balance-pop'>
                    {
                        props.list.map((item: Inner, index: number): ReactElement => {
                            return (
                                <li key={index}>
                                    <p>{item.coin}</p>
                                    <p>{item.amount}</p>
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
                                <div className='left-m'>
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
                                        <p className='inner-count'>{Number(item.count).toFixed(4)}&nbsp;{item.uint}</p>
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
                                </div>
                                <div className='oper-btn'>
                                    <button color='default' onClick={() => {
                                        Toast.show('移动站功能建设中，如需使用此功能请移步至PC站')
                                    }}>{item.btn === 'deposit' ? '充值' : '提现'}</button>
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