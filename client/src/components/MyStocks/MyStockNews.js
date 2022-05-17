import NewsItem from './/NewsItem';


const MyStockNews = ({newsData, ticker}) => {

    
    const newsItems = newsData.map((newsItem, index) => {
        console.log(newsItem)
        return <NewsItem newsItem={newsItem} key={index} />
    })

    return (
        <>
            <h2 className="news-header"> {ticker} News</h2>
            <ul className="stock-news-list">
                {/* {newsData.data[0].title} */}
                {newsItems}
            </ul>
        </>

    )
}

export default MyStockNews;