
import { Popup } from 'antd-mobile';
import { CloseOutline } from 'antd-mobile-icons';
import { ReactElement, ReactNode, useState } from 'react';
import { useEffect } from 'react';
import './index.scss'

interface Props {
    value: boolean,
    coinResult: (value: string) => void,
    resetValue: (value: boolean) => void
}

const SelectCoin = (props: Props): ReactElement<ReactNode> => {
    const [visible, setVisible] = useState<boolean>(false);
    const coin = [
        'BTC', 'ETH', 'AAVE', 'DOGE', 'USDT', 'TRX'
    ]
    useEffect(() => {
        setVisible(props.value)
    }, [props.value]);
    const closePopup = () => {
        props.resetValue(false);
        setVisible(false)
    }
    return (
        <div className='select-coin'>
            <Popup visible={visible} onMaskClick={() => {
                setVisible(false)
            }}>
                <div className='select-merchant'>
                    <p className='merchant-title'>
                        选择币种
                        <CloseOutline onClick={() => {
                            closePopup()
                        }} />
                    </p>
                    <ul>
                        {
                            coin.map((item: string, index: number): ReactElement => {
                                return (
                                    <li key={index} onClick={() => {
                                        props.coinResult(item);
                                        closePopup();
                                    }}>{item}</li>
                                )
                            })
                        }
                    </ul>
                </div>
            </Popup>
        </div>
    )
};

export default SelectCoin;