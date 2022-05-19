import { useEffect, useState } from "react"



const StockNotes = ({stock, handleNotesClick, userDetails, index, updateStock}) => {

    const[notes, setNotes] = useState(userDetails[0].stocksHeld[index].notes)

    const handleCancelClick = () => {
        handleNotesClick()
    }

    const handleSave = (evt) => {
        evt.preventDefault()
        const stockToUpdate = {
            stock: userDetails[0].stocksHeld[index].stock,
            noHeld: userDetails[0].stocksHeld[index].noHeld,
            buyPrice: userDetails[0].stocksHeld[index].buyPrice,
            notes: notes
        }

        updateStock(stockToUpdate)
        // console.log(stockToUpdate)
        handleNotesClick()
    }

    const updateNotes = (evt) => {
        setNotes(evt.target.value)
    }

    return (
        <div className="stock-notes-container">
            <h3>{stock.meta.symbol} notes</h3>
            {/* <input classname="stocknotes-input" value="notes" type="text" focus></input> */}
           
                <form onSubmit={handleSave}>
                    <textarea onChange={updateNotes} height="150px" width="150px" value={notes} />
                    <div className="notes-buttons">
                        <input type="submit" value="save"></input>  
                        <button onClick={handleCancelClick}>Cancel</button>
                    </div>
                </form>
           
        </div>
    )

}

export default StockNotes;