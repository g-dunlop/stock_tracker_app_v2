import { useState, useEffect } from "react";
import MyStockItem from "./MyStockItem";

const MyStocksList = ({stocks, handleStockSelect, userDetails, send, removeStockFromUser})  => {
  
    const stockItems = stocks.map((stock, index) => {
        return <MyStockItem stock={stock} key={index} index={index} handleStockSelect={handleStockSelect} userDetails={userDetails} removeStockFromUser={removeStockFromUser}/>
    });

    //TOTAL PORTFOLIO VALUE
    // const stockValues = stocks.map(({values}) => {values[0].close})
    let stockValues = []
    for(let i = 0; i<stocks.length; i++){
        // console.log(stocks[i])
        stockValues.push(stocks[i].values[0].close)
    }

    // console.log(userDetails)
    
    const numberHeld = userDetails[0].stocksHeld.map(({noHeld}) => (noHeld))

    let totalVal = 0
    for(let i = 0; i<numberHeld.length; i++){
        let runner = 0
        runner = numberHeld[i]*stockValues[i]
        totalVal = totalVal+ runner
    }
    const totalValue = totalVal.toLocaleString("en-US", {style:"currency", currency:"USD"})

    //TOTAL PROFIT/LOSS
    let buyPrices = []
    for (let i=0; i<stocks.length; i++){
        buyPrices.push(userDetails[0].stocksHeld[i].buyPrice)
        // console.log(buyPrices)
    }
    let totalSpend = 0
    for(let i=0; i<numberHeld.length; i++){
        let runner = 0
        runner = numberHeld[i]*buyPrices[i]
        totalSpend = totalSpend+runner
    }
    const pL = (totalVal-totalSpend)
    const profitLoss = pL.toLocaleString("en-US", {style:"currency", currency:"USD"});

   //pie chart portfolio values data calculations
    //make an array of objects with y as key and holding value as value(stock values)

    const stockNames = userDetails[0].stocksHeld.map(({stock}) => (stock))

    let pieChartData = []
    for (let i=0; i<stockNames.length; i++){
        
        let name = stockNames[i]
        let value = parseInt(stockValues[i])*numberHeld[i]
        pieChartData.push({ name : name, y:value});
    }

    useEffect(() => {
        send(pieChartData)
    }, [])
    
    return(
        <div className="my-stocks-list">
            <h2 className="portfolio-title">MY Portfolio</h2>
            <div className="portfolio-stats">
            <h3>Total value: USD <span className="amount">{totalValue}</span> </h3>
            {pL > 0 ? <h3> P/L: <span className="green amount"> {profitLoss}</span></h3>: <h3> P/L: <span className="red">{profitLoss}</span></h3>}
            </div>
            <table className="table">
                <tr>
                    <th>Stock</th>
                    <th>Amount</th>
                    <th>Price</th>
                    <th>Holding Value</th>
                    <th>Buy Price</th>
                    <th>P/L</th>
                </tr>
                {stockItems}
            </table>
        </div>
    )
}

export default MyStocksList;