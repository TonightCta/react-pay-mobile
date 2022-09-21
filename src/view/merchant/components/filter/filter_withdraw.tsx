
import { ReactElement, ReactNode, useState } from 'react';
import { Button, Popup } from 'antd-mobile';
import { IBPayMobile } from '../../../../route/router';
import { useContext } from 'react';
import './index.scss'
import { CloseOutline, DownOutline } from 'antd-mobile-icons';
import { FilterW, Type } from '../../../../utils/types';
import SelectMerchant from './components/select_merchant';
import SelectDate from './components/select_date';
import SelectCoin from './components/select_coin';
import ActionSheet, { Action } from 'antd-mobile/es/components/action-sheet';

interface Select {
    merchant: boolean,
    date: boolean,
    coin: boolean,
    dateType: number,
    status: boolean
}

const actions: Action[] = [
    { text: '提币中', key: '0' },
    { text: '提币完成', key: '3' },
    { text: '已拒绝', key: '2' },
    { text: '取消', key: '4' },
]
const source: FilterW = {
    merchant: '',
    merchant_name: '',
    merchant_email: '',
    order_id: '',
    address: '',
    start: '',
    end: '',
    min: '',
    max: '',
    hash: '',
    coin: '',
    status: '',
}

const FilterWithdraw = (): ReactElement<ReactNode> => {
    const { dispatch } = useContext(IBPayMobile);
    const [filterBox, setFilterBox] = useState<boolean>(false);
    const [selectPopup, setSelectPopup] = useState<Select>({
        merchant: false,
        date: false,
        coin: false,
        dateType: 1,
        status: false
    })
    const [filterMsg, setFilterMsg] = useState<FilterW>(source);
    return (
        <div className='wihdraw-deposit filter-public'>
            <p className='iconfont icon-shaixuan' onClick={() => {
                setFilterBox(true);
            }}></p>
            {/* 筛选弹框 */}
            <Popup visible={filterBox} onMaskClick={() => {
                setFilterBox(false)
            }}>
                <div className='filter-title'>
                    <p>全部筛选</p>
                    <span onClick={() => {
                        setFilterBox(false)
                    }}><CloseOutline /></span>
                </div>
                <div className='filter-inner'>
                    <div className='select-input' onClick={() => {
                        setSelectPopup({
                            ...selectPopup,
                            merchant: true
                        })
                    }}>
                        <p className='inner-label'>商家</p>
                        <div className='input-inner'>
                            <input type="text" value={`${filterMsg.merchant_name ? `${filterMsg.merchant_name}(${filterMsg.merchant_email})` : ''}`} onChange={() => { }} disabled placeholder='请选择商家' />
                            <DownOutline />
                        </div>
                    </div>
                    <div className='select-input with-top'>
                        <p className='inner-label'>订单号</p>
                        <div className='input-inner'>
                            <input type="text" value={filterMsg.order_id} onChange={(e) => {
                                setFilterMsg({
                                    ...filterMsg,
                                    order_id: e.target.value
                                })
                            }} placeholder='请输入订单号' />
                        </div>
                    </div>
                    <div className='select-popup with-top'>
                        <div className='select-popup-inner'>
                            <p className='inner-label'>币种</p>
                            <div className='inner-dom' onClick={() => {
                                setSelectPopup({
                                    ...selectPopup,
                                    coin: true
                                })
                            }}>
                                <p>{filterMsg.coin ? filterMsg.coin : '请选择币种'}</p>
                                <span><DownOutline /></span>
                            </div>
                        </div>
                        <div className='select-popup-inner'>
                            <p className='inner-label'>订单状态</p>
                            <div className='inner-dom' onClick={() => {
                                setSelectPopup({
                                    ...selectPopup,
                                    status: true
                                })
                            }}>
                                <p>{filterMsg.status ? filterMsg.status : '请选择订单状态'}</p>
                                <span><DownOutline /></span>
                            </div>
                        </div>
                    </div>
                    <div className='filter-input'>
                        <p className='inner-label'>地址</p>
                        <div className='input-inner'>
                            <input type="text" value={filterMsg.address} onChange={(e) => {
                                setFilterMsg({
                                    ...filterMsg,
                                    address: e.target.value
                                })
                            }} placeholder='请输入地址' />
                        </div>
                    </div>
                    <div className='select-date'>
                        <p className='inner-label'>下单时间</p>
                        <div className='date-dom'>
                            <div className='date-inner' onClick={() => {
                                setSelectPopup({
                                    ...selectPopup,
                                    date: true,
                                    dateType: 1
                                })
                            }}>
                                <p>{filterMsg.start ? filterMsg.start : '开始日期'}</p>
                                <p className='iconfont icon-rili'></p>
                            </div>
                            <div className='date-mask'></div>
                            <div className='date-inner' onClick={() => {
                                setSelectPopup({
                                    ...selectPopup,
                                    date: true,
                                    dateType: 2
                                })
                            }}>
                                <p>{filterMsg.end ? filterMsg.end : '结束日期'}</p>
                                <p className='iconfont icon-rili'></p>
                            </div>
                        </div>
                    </div>
                    <div className='select-date without-line'>
                        <p className='inner-label'>提币金额</p>
                        <div className='date-dom'>
                            <div className='date-inner'>
                                <input type="number" value={filterMsg.min} onChange={(e) => {
                                    setFilterMsg({
                                        ...filterMsg,
                                        min: e.target.value
                                    })
                                }} placeholder='最小金额' />
                            </div>
                            <div className='date-mask'></div>
                            <div className='date-inner'>
                                <input type="number" value={filterMsg.max} onChange={(e) => {
                                    setFilterMsg({
                                        ...filterMsg,
                                        max: e.target.value
                                    })
                                }} placeholder='最大金额' />
                            </div>
                        </div>
                    </div>
                    <div className='filter-input'>
                        <p className='inner-label'>交易HASH</p>
                        <div className='input-inner'>
                            <input type="text" value={filterMsg.hash} onChange={(e) => {
                                setFilterMsg({
                                    ...filterMsg,
                                    hash: e.target.value
                                })
                            }} placeholder='请输入交易HASH' />
                        </div>
                    </div>
                    <div className='oper-btn'>
                        <Button color='default' onClick={() => {
                            setFilterMsg(source)
                        }}>重置</Button>
                        <Button color='primary' onClick={() => {
                            dispatch({
                                type: Type.SET_WITHDRAW_FILTER,
                                payload: {
                                    filter_withdraw: JSON.stringify(filterMsg)
                                }
                            });
                            setFilterBox(false)
                        }}>确认</Button>
                    </div>
                </div>
            </Popup>
            {/* 选择商家 */}
            <SelectMerchant merchartResult={(value: string, name: string, email: string) => {
                setFilterMsg({
                    ...filterMsg,
                    merchant: value,
                    merchant_name: name,
                    merchant_email: email
                })
            }} resetValue={(value: boolean) => {
                setSelectPopup({
                    ...selectPopup,
                    merchant: value
                });
            }} value={selectPopup.merchant} />
            {/* 选择币种 */}
            <SelectCoin value={selectPopup.coin} coinResult={(value: string) => {
                setFilterMsg({
                    ...filterMsg,
                    coin: value
                })
            }} resetValue={(value: boolean) => {
                setSelectPopup({
                    ...selectPopup,
                    coin: value
                })
            }} />
            {/* 选择时间 */}
            <SelectDate dateResult={(value: string) => {
                if (selectPopup.dateType === 1) {
                    setFilterMsg({
                        ...filterMsg,
                        start: value
                    })
                } else {
                    setFilterMsg({
                        ...filterMsg,
                        end: value
                    })
                }
            }} resetValue={(value: boolean) => {
                setSelectPopup({
                    ...selectPopup,
                    date: value
                });
            }} type={selectPopup.dateType} value={selectPopup.date} />
            {/* 订单状态 */}
            <ActionSheet
                visible={selectPopup.status}
                actions={actions}
                onAction={(action) => {
                    setSelectPopup({
                        ...selectPopup,
                        status: false
                    })
                    if (action.key != '4') {
                        setFilterMsg({
                            ...filterMsg,
                            status: action.text as string
                        })
                    }
                }}
                onClose={() => {
                    setSelectPopup({
                        ...selectPopup,
                        status: false
                    })
                }}
            />
        </div>
    )
};

export default FilterWithdraw;