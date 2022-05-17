import {useState, useEffect} from 'react';
import MyStocksList from '../components/MyStocks/MyStocksList';
import StockService from '../services/StockServices';
import MyPieChart from '../components/MyStocks/MyPieChart';
import MyStockNews from '../components/MyStocks/MyStockNews';

import {css} from '@emotion/react';
// import ClipLoader from 'react-spinners/ClipLoader';
import PulseLoader from 'react-spinners/PulseLoader'; //https://www.npmjs.com/package/react-spinners

import MyStockItemsGraph from '../components/MyStocks/MyStockItemsGraph';

const MyStockContainer = ({stockToAdd}) => {

    const [myStockSearchTerms, setMyStockSearchTerms] = useState([])
    const [myStockObj, setMyStockObj] = useState(null)
    const [myStockObjectList, setMyStockObjectList] = useState([])
    const [loading, setIsLoading] = useState(true)
    const [userDetails, setUserDetails] = useState(null)
    const [selectedStock, setSelectedStock] = useState(null)
    const [ticker, setTicker] = useState(null)
    const [pieData, setPieData] = useState(null)
    const [newsData, setNewsData] = useState([])

    useEffect(() => {
        fetchDB()
        
        setTimeout(() => {
            setIsLoading(false)
        }, 1000)
    }, [])


    useEffect(() => {
        if(stockToAdd !== null) {
            addStockToUser(stockToAdd)
        }
    }, [stockToAdd])

    const addStockToUser = function (stockToAdd) {
        const temp = {...userDetails[0]}
        temp.stocksHeld.push(stockToAdd)
        StockService.updateUserDetails(temp)
        .then(()=> fetchDB()) 
    }

    const removeStockFromUser = (stockTicker) => {
        const temp = {...userDetails[0]}
        let newArray = [];
        for (let i=0; i<temp.stocksHeld.length; i++){
            if (temp.stocksHeld[i].stock === stockTicker){
                console.log(temp.stocksHeld[i].stock);
                newArray = temp.stocksHeld.splice(i, 1);
            }
        }
        
        setIsLoading(true);
        StockService.updateUserDetails(temp)
        .then(() => fetchDB())
        setTimeout(() => {
            setIsLoading(false)
        }, 1000)
        
    }

    const fetchDB = function() {
        fetch('http://localhost:9000/api/userStocks/')
        .then(res => res.json())
        .then(data => setUserDetails(data))
    }

    const fetchNews = function(ticker) {
        fetch(`https://api.marketaux.com/v1/news/all?symbols=${ticker}&filter_entities=true&language=en&api_token=VVaG4obPuvnKKh0Vu1VoTwMft87Fk3yC0UR2O4wy`)
        .then(res=> res.json())
        .then(data => setNewsData(data.data))
    }

    useEffect(() => {
        if (userDetails !== null){
            tickerMap()
        }
    }, [userDetails])

    const tickerMap = function() {
        const newArray = userDetails[0].stocksHeld.map((stock) => {
            return stock.stock
        }) 
        setMyStockSearchTerms(newArray)
    }

    useEffect(() => {
        if (myStockSearchTerms.length > 0){
            fetchMyStockObj(myStockSearchTerms);
            // fetchNews(myStockSearchTerms)
        }
    }, [myStockSearchTerms])

    const keys = ["b9807276d5104b33b92d92ff766ab531", "45bcd3cd4e5744298c4fdb0dcd6a1249", "f95ae7b120094694aa29d206c16751f4", "4d3df07bd71d4d198ec7b0071f70c982", "8603921c05d4466f92b11e6ebb617a1b", "785770a8e60c4e02a239d14734459b72"]
    const randKey = keys[Math.floor(Math.random() * keys.length)]

    const fetchMyStockObj = function(searchValues){
        fetch(`https://api.twelvedata.com/time_series?symbol=${searchValues.toString()}&interval=1month&apikey=${randKey}`)
        .then(res => res.json())
        .then(data => setMyStockObj(data))
    }

    useEffect(() => {
    if (myStockObj !== null)
    {
        let newArray = [];
        for (let i=0; i < myStockSearchTerms.length; i++){
            newArray.push(myStockObj[myStockSearchTerms[i]])
        } 
        setMyStockObjectList(newArray)
    }
    }, [myStockObj])

    //component functions

    const handleStockSelect = (index) => {
        const selectStock = myStockObjectList[index]
        setSelectedStock(selectStock)
        setTicker(selectStock.meta.symbol)
        fetchNews(selectStock.meta.symbol)
        setPieData(null)
    }

    const send = (data) => {
        setPieData(data)
    }

    return(
        <div className="my-stocks-container">
            
            <div className="my-stocks-container-box">
            <div className="my-stocks-left">

                {loading === true ? <PulseLoader className="loader" /> : <MyStocksList removeStockFromUser={removeStockFromUser} stocks={myStockObjectList} handleStockSelect={handleStockSelect} userDetails={userDetails} send={send}/>}
            </div>
            <div className="my-stocks-right">
                {selectedStock !== null ? <MyStockItemsGraph selectedStock={selectedStock} ticker={ticker} /> : null}
                {pieData !== null ? <MyPieChart pieData={pieData}/>: null}
            </div>
            </div>
            <div className="my-stock-news-container">
                {selectedStock!==null ? <MyStockNews newsData={newsData} ticker={ticker} /> : null}
            </div>
        </div>
    )
}

export default MyStockContainer;