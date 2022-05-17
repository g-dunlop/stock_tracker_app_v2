import {useEffect, useState} from 'react';
import Highcharts from 'highcharts/highstock';
import HighchartsReact from 'highcharts-react-official';

const MyStockItemsGraph = ({selectedStock, ticker}) => {

    const [lineData, setLineData] = useState(null)
    const [candleData, setCandleData] = useState(null)
    const [interval, setInterval] = useState("1month")
    const [myStockData, setMyStockData] = useState(null)
    const [chartType, setChartType] = useState("line");
    

    const handleClick = (event) => {
        setInterval(event.target.value)
    }

    const handleTypeClick = (event) => {
        setChartType(event.target.value);
        
    }

    const keys = ["b9807276d5104b33b92d92ff766ab531", "45bcd3cd4e5744298c4fdb0dcd6a1249", "f95ae7b120094694aa29d206c16751f4", "4d3df07bd71d4d198ec7b0071f70c982", "8603921c05d4466f92b11e6ebb617a1b", "785770a8e60c4e02a239d14734459b72"]
    const randKey = keys[Math.floor(Math.random() * keys.length)]

    const fetchMyStockData = function(ticker){
        fetch(`https://api.twelvedata.com/time_series?symbol=${ticker}&interval=${interval}&apikey=${randKey}`)
        .then(res => res.json())
        .then(data => setMyStockData(data))}

        useEffect(() => {
            fetchMyStockData(ticker)
        }, [ticker, interval])

    useEffect(() => {
        if (myStockData !== null ){
            if(chartType==="line"){
              
                makeLineChart()
                // makeCandleChart()
            }
            else if(chartType==="candle"){
                
                makeCandleChart()
            }
        } 
        }, [myStockData, chartType] )


        //this function to make line chart
    const makeLineChart = () => {
        const stockDataValuesList = myStockData.values.map((value, index) => {
            return parseFloat(value.close)
        }) 
        let reversedArray =[]
            for (let i=0; i<stockDataValuesList.length; i++){
                reversedArray.unshift(stockDataValuesList[i])
            }
        // setData(reversedArray)
        const stockDataDatesList = myStockData.values.map((value, index) => {
            return (value.datetime)
        }) 

        let reversedArrayTwo =[]
            for (let i=0; i<stockDataDatesList.length; i++){
                reversedArrayTwo.unshift(stockDataDatesList[i])
            }

            let dataSet =[]
            for (let i=0; i<stockDataDatesList.length; i++){
                let name = reversedArrayTwo[i]
                let value = parseInt(reversedArray[i])
                dataSet.push({ name : name, y:value});
            } setLineData(dataSet)
    }

    const makeCandleChart = () => {
        const candleDataValuesList = myStockData.values.map((value, index) => {
            return  [parseFloat(value.open), parseFloat(value.high), parseFloat(value.low), parseFloat(value.close)]
            
        })   
        // console.log(candleDataValuesList)  
        let reversedArray =[]
            for (let i=0; i<candleDataValuesList.length; i++){
                reversedArray.unshift(candleDataValuesList[i])
            }   

            // let reversedArrayTwo =[]
            // for (let i=0; i<stockDataDatesList.length; i++){
            //     reversedArrayTwo.unshift(stockDataDatesList[i])
            // }

            setCandleData(reversedArray);

    }

    //dateTime, open, high, low, close
    // PSEUDO
    //


    //make another function here for candle stock chart - will need to format the data values differently https://www.highcharts.com/blog/tutorials/candlestick-or-heikin-ashi/
    
    // const stockDataDatesList = myStockData.values.map((value, index) => {
    //     return value.close
    // })

    const optionsCandle = {
        title: {
            text:`last 30 ${interval} stock candle`
    },
    xAxis: {
        title: {
            text:`${interval}`
        }
    },
    yAxis: {
        title: {
            text:'Price(USD)'
        }
    },
    series: [
        {
            type:'candlestick',
            name: `${interval}`,
            data: candleData
        }
    ]
}

    const optionsLine = {
        title: {
            text:`last 30 ${interval} stock close price`
    },
    xAxis: {
        title: {
            text:`${interval}`
        }
    },
    yAxis: {
        title: {
            text:'Price(USD)'
        }
    },
    series: [
        {   
            
            name: `${interval} close price`,
            data: lineData
        }
    ]
}

    return(
        <div className="my-stock-items-graph">
            <div className="buttons">
                <button onClick={handleTypeClick} value="line">Line</button>
                <button onClick={handleTypeClick} value="candle">Candle</button>
              
            </div>
            <div className="stock-details">
                <div>
                <h3>STOCK:    <span className="info">{selectedStock.meta.symbol}  </span></h3>
                 <h4>EXCHANGE: <span className="info">{selectedStock.meta.exchange}</span></h4>
                </div>
                <div>
                <h3>INTERVAL: <span className="info">{interval}</span></h3>
                <h4>CURRENCY: <span className="info">{selectedStock.meta.currency}</span></h4>

                </div>
            </div>
            <div className="buttons">
                <button onClick={handleClick} value="1h">Hourly</button>
                <button onClick={handleClick} value="1day">Daily</button>
                <button onClick={handleClick} value="1week">Weekly</button>
                <button onClick={handleClick} value="1month">Monthly</button>
            </div>
            {chartType === "line" && lineData !== null  ? <HighchartsReact containerProps={{ style: { height: "100%" } }} highcharts={Highcharts} constructor-type={'stockChart'} options={optionsLine}/> :null}
            {candleData !== null && chartType === "candle" ? <HighchartsReact containerProps={{ style: { height: "100%" } }} highcharts={Highcharts} constructor-type={'stockChart'} options={optionsCandle}/> :null}

        </div>
    )
}

export default MyStockItemsGraph;