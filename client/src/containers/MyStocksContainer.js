import {useState, useEffect} from 'react';
import MyStocksList from '../components/MyStocks/MyStocksList';

import {css} from '@emotion/react';
// import ClipLoader from 'react-spinners/ClipLoader';
import PulseLoader from 'react-spinners/PulseLoader'; //https://www.npmjs.com/package/react-spinners

import MyStockItemsGraph from '../components/MyStocks/MyStockItemsGraph';

const MyStockContainer = () => {

    const [myStockSearchTerms, setMyStockSearchTerms] = useState([])
    const [myStockObj, setMyStockObj] = useState(null)
    const [myStockObjectList, setMyStockObjectList] = useState([])
    const [loading, setIsLoading] = useState(true)
    const [userDetails, setUserDetails] = useState(null)
    const [selectedStock, setSelectedStock] = useState(null)

    useEffect(() => {
        fetchDB()
        setTimeout(() => {
            setIsLoading(false)
        }, 2000)
    }, [])

    const fetchDB = function() {
        fetch('http://localhost:9000/api/userStocks/')
        .then(res => res.json())
        .then(data => setUserDetails(data))
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
        }
    }, [myStockSearchTerms])

    const keys = ["b9807276d5104b33b92d92ff766ab531", "45bcd3cd4e5744298c4fdb0dcd6a1249", "f95ae7b120094694aa29d206c16751f4", "4d3df07bd71d4d198ec7b0071f70c982", "8603921c05d4466f92b11e6ebb617a1b"]
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
    }

    return(
        <div className="my-stocks-container">
            
            <div className="my-stocks-container-box">
            <div className="my-stocks-left">
            <h2>My Stocks</h2>
                {loading === true ? <PulseLoader /> : <MyStocksList stocks={myStockObjectList} handleStockSelect={handleStockSelect} userDetails={userDetails}/>}
            </div>
            <div className="my-stocks-right">
                {selectedStock !== null ? <MyStockItemsGraph selectedStock={selectedStock} /> : null}
            </div>
            </div>
        </div>
    )
}

export default MyStockContainer;