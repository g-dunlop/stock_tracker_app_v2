const NewsItem = ({newsItem}) => {

    return(

        <>
        <div className="news-item-container">
            <div className="news-item-top">
                <img height="50px" width="50px" src={newsItem.image_url} ></img>
                <a href={newsItem.url}><h4>{newsItem.title}</h4></a>
            </div>
            <p>{newsItem.description}</p>
        </div>
        </>
    )
}

export default NewsItem;