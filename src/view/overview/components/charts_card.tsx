
import { DatePicker, Popover, Toast } from 'antd-mobile';
import { Action } from 'antd-mobile/es/components/action-sheet';
import { ReactElement, ReactNode, useState } from 'react';
import * as echarts from 'echarts';
import html2canvas from 'html2canvas';
import { useEffect } from 'react';
import dayjs from 'dayjs'

const today = dayjs();
const now = new Date(today.subtract(7,'day').toDate());

const ChartsCard = (): ReactElement<ReactNode> => {
    const [coin, setCoin] = useState<string>('TRX');
    const actions: Action[] = [
        { key: 'trx', text: 'TRX' },
        { key: 'usdt', text: 'USDT-TRC20' },
    ];
    const [selectDateBox, setSelectBox] = useState<boolean>(false);
    const option = {
        tooltip: {
            trigger: "axis",
            formatter: (params: any) => {
                let result = "";
                params.forEach((e: any) => {
                    result +=
                        `<div style="margin-top:12px;display:flex;justify-content: space-between;"><div style="display:flex;"><p style="transform:scale(0.7);">${e.marker}</p>` +
                        `<p>${e.seriesName}</p></div>` +
                        `<p style="margin-left:16px;">${Number(e.value).toFixed(
                            4
                        )}&nbsp;${coin === "TRX" ? coin : "U"
                        }</p></div>`;
                });
                return params[0].name + result;
            },
        },
        legend: {
            data: [
                "商户充值",
                "商户提币",
                "用户提币",
                "用户充值",
                "Search Engine",
            ],
            icon: "circle",
            itemWidth: 6,
            itemGap: 9,
            top: '4%',
            textStyle: {
                fontSize: 12,
                color: "#999",
            },
        },
        grid: {
            left: "3%",
            right: "6%",
            bottom: "4%",
            top: '20%',
            containLabel: true,
        },
        xAxis: [
            {
                type: "category",
                boundaryGap: false,
                data: ['12-12', '12-13', '12-14', '12-15', '12-16', '12-17', '12-18'],
                axisTick: false,
                offset: 10,
                axisLabel: {
                    color: "#999999",
                    fontSize: 12,
                },
                axisLine: false,
            },
        ],
        yAxis: [
            {
                alignTicks: true,
                axisLine: {
                    show: true,
                    lineStyle: {
                        color: "#F5F5FC",
                        width: 2,
                    },
                },
                axisLabel: {
                    color: "#999999",
                },
                splitLine: false,
            },
        ],
        series: [
            {
                name: "商户充值",
                type: "line",
                stack: "Total",
                itemStyle: {
                    color: "rgb(101,220,123)",
                },
                areaStyle: {
                    color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                        {
                            offset: 0,
                            color: "rgba(101,220,123,.3)",
                        },
                        {
                            offset: 1,
                            color: "rgba(101,220,123,.1)",
                        },
                    ]),
                },
                emphasis: {
                    focus: "series",
                },
                data: [12, 23, 60, 90, 2, 22, 50],
            },
            {
                name: "商户提币",
                type: "line",
                stack: "Total",
                itemStyle: {
                    color: "rgb(76,227,249)",
                },
                areaStyle: {
                    color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                        {
                            offset: 0,
                            color: "rgba(76,227,249,.3)",
                        },
                        {
                            offset: 1,
                            color: "rgba(76,227,249,0.1)",
                        },
                    ]),
                },
                emphasis: {
                    focus: "series",
                },
                data: [2, 33, 40, 100, 14, 42, 70],
            },
            {
                name: "用户提币",
                type: "line",
                stack: "Total",
                itemStyle: {
                    color: "rgb(255,212,130)",
                },
                areaStyle: {
                    color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                        {
                            offset: 0,
                            color: "rgba(255,212,130,.4)",
                        },
                        {
                            offset: 1,
                            color: "rgba(255,212,130,0.2)",
                        },
                    ]),
                },
                emphasis: {
                    focus: "series",
                },
                data: [8, 90, 30, 45, 11, 44, 110],
            },
            {
                name: "用户充值",
                type: "line",
                stack: "Total",
                itemStyle: {
                    color: "rgb(107,128,251)",
                },
                areaStyle: {
                    color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                        {
                            offset: 0,
                            color: "rgba(107,128,251,.3)",
                        },
                        {
                            offset: 1,
                            color: "rgba(107,128,251,0.1)",
                        },
                    ]),
                },
                emphasis: {
                    focus: "series",
                },
                data: [14, 43, 50, 104, 70, 48, 10],
            },
        ],
    };
    //下载echarts
    const downEcharts = () => {
        html2canvas(document.getElementById("charts-box") as HTMLElement).then(
            (canvas) => {
                const img = canvas
                    .toDataURL("image/png")
                    .replace("image/png", "image-octet/stream");
                const downImg = document.createElement("a");
                downImg.download = "经营概况.png";
                downImg.href = img;
                document.body.appendChild(downImg);
                downImg.click();
                downImg.remove();
            }
        );
    }
    useEffect(() => {
        let chartsBox = echarts.getInstanceByDom(document.getElementById('charts-box') as HTMLElement);
        if (!chartsBox) {
            chartsBox = echarts.init(document.getElementById('charts-box') as HTMLElement);
        };
        chartsBox.setOption(option);
    }, [coin])
    return (
        <div className='charts-card'>
            <div className='charts-title-msg'>
                <p className='msg-name'>经营概况</p>
                <div className='oper-box'>
                    <div className='select-date' onClick={() => {
                        setSelectBox(true)
                    }}>
                        <p className='iconfont icon-rili'></p>
                    </div>
                    <Popover.Menu
                        actions={actions.map(action => ({
                            ...action,
                            icon: null,
                        }))}
                        onAction={(node: any) => {
                            setCoin(node.text)
                        }}
                        placement='bottomLeft'
                        trigger='click'
                    >
                        <div className='select-coin'>

                            <p>{coin}</p>&nbsp;<p className='iconfont icon-xialajiantouxiaobeifen'></p>
                        </div>
                    </Popover.Menu>
                    <div className='select-date down-charts' onClick={() => { downEcharts() }}>
                        <p className='iconfont icon-cangpeitubiao_xiazaipandiandanxiazaidayinmoban'></p>
                    </div>
                </div>
            </div>
            <div className='charts-box' id="charts-box"></div>
            {/* 选择日期 */}
            <DatePicker
                title='开始时间'
                visible={selectDateBox}
                onClose={() => {
                    setSelectBox(false)
                }}
                precision="day"
                max={now}
                onConfirm={val => {
                    Toast.show(val.toDateString())
                }}
            />
        </div>
    )
};

export default ChartsCard;