import { useState } from "react"

const SearchResult = ({result, addStock}) => {

    const [stockNumber, setStockNumber] = useState("")
    const [buyPrice, setBuyPrice] = useState("")
    const handleChange = (event) => {
        setStockNumber(event.target.value)
    }

    const handleClick = (event) => {
        const stockToAdd = {
            stock: result.symbol,
            noHeld: parseFloat(stockNumber),
            buyPrice: parseFloat(buyPrice),
            notes:""
        }
        addStock(stockToAdd)
        setStockNumber("")
        setBuyPrice("")
    }

    const handlePriceChange = (event) => {
        setBuyPrice(event.target.value)
    }

    return (
        <>
            <tr>
                <td>{result.symbol}</td>
                <td>{result.instrument_name}</td>
                <td>{result.exchange}</td>
                <td><input type="number" name="stockNumber" onChange={handleChange} value={stockNumber}/></td>
                <td><input type="number" name="buyPrice" onChange={handlePriceChange} value={buyPrice}></input> </td>
                <td><button className="search-button" onClick={handleClick}>add</button></td>
            </tr>
        </>
    )
}

{/* <li>{result.symbol} {result.instrument_name} {result.exchange}</li> */}

export default SearchResult