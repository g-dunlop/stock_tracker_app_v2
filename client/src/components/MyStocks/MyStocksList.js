import MyStockItem from "./MyStockItem";

const MyStocksList = ({stocks, handleStockSelect, userDetails})  => {

    const stockItems = stocks.map((stock, index) => {
        return <MyStockItem stock={stock} key={index} index={index} handleStockSelect={handleStockSelect} userDetails={userDetails} />
    });

    // const stockValues = stocks.map(({values}) => {values[0].close})
    let stockValues = []
    for(let i = 0; i<stocks.length; i++){
        stockValues.push(stocks[i].values[0].close)
    }

    const numberHeld = userDetails[0].stocksHeld.map(({noHeld}) => (noHeld))

    let totalVal = 0
    for(let i = 0; i<numberHeld.length; i++){
        let runner = 0
        runner = numberHeld[i]*stockValues[i]
        totalVal = totalVal+ runner
    }

    return(
        <div>
            <h2>Total value: {totalVal} </h2>
            <table>
                <tr>
                    <th>Stock Name</th>
                    <th>Number of Stocks</th>
                    <th>Current Price</th>
                    <th>Holding Value</th>
                    
                </tr>
                {stockItems}
            </table>
        </div>
    )
}

export default MyStocksList;