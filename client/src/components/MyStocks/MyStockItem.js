
const MyStockItem = ({stock, index, handleStockSelect, userDetails, removeStockFromUser}) => {

    const handleClick = () => {
        handleStockSelect(index)
    }

    const numberHeld = userDetails[0].stocksHeld[index].noHeld;
    const currentPrice = parseFloat(stock.values[0].close);
    const currentPriceFormat = currentPrice.toLocaleString("en-US", {style:"currency", currency:"USD"});
    const holdingValue = userDetails[0].stocksHeld[index].noHeld * stock.values[0].close;
    const newHoldingValue = holdingValue.toLocaleString("en-US", {style:"currency", currency:"USD"});
    const buyPrice = userDetails[0].stocksHeld[index].buyPrice;
    const newBuyPrice = buyPrice.toLocaleString("en-US", {style:"currency", currency:"USD"});
    const profit = (numberHeld * currentPrice) - (buyPrice * numberHeld)
    const profitToShow = profit.toLocaleString("en-US", {style:"currency", currency:"USD"});
    const loss = (numberHeld * currentPrice) - (buyPrice * numberHeld)
    const lossToShow = loss.toLocaleString("en-US", {style:"currency", currency:"USD"});

    const handleRemove = (evt) => {
        // console.log(evt.target.value);
        removeStockFromUser(evt.target.value);
    }

    

    return(
        <>
            <tr>
                <td onClick={handleClick}><span className="stock-symbol">{stock.meta.symbol}</span></td>
                <td>{numberHeld}</td>
                <td>{currentPriceFormat}</td>
                <td>{newHoldingValue}</td>
                <td>{newBuyPrice}</td>
                {(numberHeld * currentPrice) - (buyPrice * numberHeld) > 0 ? <td className="green">{profitToShow}</td> : <td className="red">{lossToShow}</td>}
                <button onClick={handleRemove} value={stock.meta.symbol}>Remove</button>
            </tr>
        </>
    )
}

export default MyStockItem;