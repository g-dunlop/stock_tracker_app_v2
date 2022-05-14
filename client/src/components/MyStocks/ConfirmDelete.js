
const ConfirmDelete = ({handleRemoveConfirm}) => {

    const handleOption = (evt) => {
        handleRemoveConfirm(evt.target.value);

    }

    return (
        <div className="confirm-delete-container">
            <div className="confirm-delete-contents">
                    <h3>Please Confirm</h3>
                    <p>Are you sure you want to remove this stock?</p>
                    <div className="buttons">
                    <button className="delete-confirm" onClick={handleOption} value="yes">Yes</button>
                    <button className="delete-confirm" onClick={handleOption} value="no">No</button>
                </div>
            </div>
        </div>
    )
}

export default ConfirmDelete;