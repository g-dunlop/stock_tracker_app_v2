use userStocks;
db.dropDatabase();

db.userStocks.insertMany([
    
    {
        username: "Dennis",
        email: "dennis@dennis.com",
        stocksHeld: [{
            stock: "AAPL",
            noHeld: 100,
            buyPrice: 105.24,
            notes: ""
        },
        {
            stock: "GOOG",
            noHeld: 100,
            buyPrice: 2253.7,
            notes: ""
        },
        {    
        stock: "TSLA",
        noHeld: 100,
        buyPrice:1000.53,
        notes:""
    }]
    }
    // {
    //     username: "Betty",
    //     email: "betty@dennis.com",
    //     stocksHeld: [{
    //         stock: "APPL",
    //         noHeld: 100
    //     },
    //     {
    //         stock: "GOOG",
    //         noHeld: 100
    //     },
    //     {    
    //     stock: "TSLA",
    //     noHeld: 100
    // }]
    // },
    // {
    //     username: "Clive",
    //     email: "Clive@dennis.com",
    //     stocksHeld: [{
    //         stock: "APPL",
    //         noHeld: 100
    //     },
    //     {
    //         stock: "GOOG",
    //         noHeld: 100
    //     },
    //     {    
    //     stock: "TSLA",
    //     noHeld: 100
    // }]
    // }

]);