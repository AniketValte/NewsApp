import React from 'react'

const NewsItem =(props)=> {
 

        let {title,description,imageUrl,newsUrl,author,date}=props;

        return (
            <div>
                <div className="card my-3">
                    <img src={imageUrl ? imageUrl:"https://static.theprint.in/wp-content/uploads/2024/01/K2717_Antonov_An.32_Indian_Air_Force_8414615500-e1539012355973.jpg"} className="card-img-top" alt="..." style={{ height: '185px' }} />
                        <div className="card-body">
                            <h5 className="card-title">{title}...</h5>
                            <p className="card-text">{description}...</p>
                            <a href={newsUrl} target="_blank" rel="noreferrer" className="btn btn-sm btn-dark">Read More</a>
                            <p className="card-text"><small className="text-danger">By {author?author:"unknown"} on {new Date(date).toGMTString()}</small></p>
                        </div>
                </div>
            </div>
        )

}

export default NewsItem
