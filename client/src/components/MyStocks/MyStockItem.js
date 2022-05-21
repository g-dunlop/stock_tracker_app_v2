import React from "react";
import {useState} from 'react';
import ConfirmDelete from "./ConfirmDelete";
import StockNotes from "./StockNotes";
import Notes from '../../static/notes-icon.png';
import Delete from '../../static/delete.png';


const MyStockItem = ({stock, index, handleStockSelect, userDetails, removeStockFromUser, updateStock}) => {

    const [isConfirm, setIsConfirm] = useState("false");
    const [isNotes, setIsNotes] = useState(false);

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


    const handleFirstRemoveClick = () => {
        setIsConfirm("true");
    }

    const handleRemoveConfirm = (option) => {
        // console.log(evt.target.value);
        if (option === "yes"){
            removeStockFromUser(stock.meta.symbol);
        } else{
            setIsConfirm("false")
        }
    }

    const handleNotesClick = (evt) => {
        setIsNotes(!isNotes)
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
                <div className="table-buttons">
                    <button className="notes" onClick={handleNotesClick}><img src={Notes} height="33px" width="40px" /></button>
                    {isNotes ? <StockNotes stock={stock} handleNotesClick={handleNotesClick} userDetails={userDetails} index={index} updateStock={updateStock} /> : null}
                    <button className="" onClick={handleFirstRemoveClick} value={stock.meta.symbol}><img src={Delete} height="33px" width="40px"/></button>
                </div>
               
            </tr>
            {isConfirm === "true" ? <ConfirmDelete handleRemoveConfirm = {handleRemoveConfirm} Box /> : null}
        </>
    )
}

export default MyStockItem;