import React, {useEffect, useState} from 'react'
import NewsItem from './NewsItem'
import Loading from './Loading';
import PropTypes from 'prop-types'

const News =(props)=>{


  // js function to make first letter capatalize 
  
  const [articles,setArticles]=useState([])
  const [loading,setLoading]=useState(false)
  const [page,setPage]=useState(1)
  const [totalResults,setTotalResults]=useState(0)

  // total result remaining
  //document.title=`NewsMonkey - ${capitalizeFirstLetter(props.category)}`;


function capitalizeFirstLetter(string) {  // cwh make it const
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

 const updateNews =async()=>{
    props.setProgress(20);
    let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&category=${props.category}&apiKey=24ddac3868044f408417793bd9a3bf78&page=${page}&pagesize=20`;

    setLoading(true)
    let data = await fetch(url);
    // props.setProgress(30);
    let parsedData = await data.json();
    // props.setProgress(70);

    setArticles(parsedData.articles)
    // setPage(this.state.page);
    setLoading(false)
    setTotalResults(parsedData.totalResults)


    props.setProgress(100);

  }

  useEffect(()=>{

    setPage(1)
    updateNews();
    // eslint-disable-next-line
  },[])

  const handlePrevClick = async () => {

    // let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&category=${props.category}&apiKey=24ddac3868044f408417793bd9a3bf78&page=${this.state.page - 1}&pagesize=20`;
    // this.setState({
    //   loading: true
    // })
    // let data = await fetch(url);
    // let parsedData = await data.json();

    // this.setState({
    //   page: this.state.page - 1,
    //   articles: parsedData.articles,
    //   loading: false
    // })

  
    setPage(page-1)
    updateNews();

  }

  const handleNextClick = async () => {

    if (page + 1 > Math.ceil(totalResults / 20)) {

    }
    else {
      // let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&category=${props.category}&apiKey=24ddac3868044f408417793bd9a3bf78&page=${this.state.page + 1}&pagesize=20`;
      // this.setState({
      //   loading: true
      // })
      // let data = await fetch(url);
      // let parsedData = await data.json();

      // this.setState({
      //   page: this.state.page + 1,
      //   articles: parsedData.articles,
      //   loading: false
      // })
     
    
    setPage(page+1)
     updateNews(); 

    }
  }




    return (
      <div className='container my-3 '>
        <h3 className='mx-auto text-center' style={{marginTop:'75px'}}>Top {capitalizeFirstLetter(props.category)} HeadLines</h3>
        {loading && <Loading />}
        <div className="row my-3">

          {!loading && articles.map((element) => {

            return <div className="col-md-3" key={element.url}>
              <NewsItem title={element.title ? element.title.slice(0, 45) : ""} description={element.description ? element.description.slice(0, 85) : ""} imageUrl={element.urlToImage} newsUrl={element.url} author={element.author} date={element.publishedAt}/>
            </div>

          })}

        
        </div>

        {!loading&&(
        <div className="d-flex justify-content-between">
          <button disabled={page <= 1} type="button" className="btn btn-dark" onClick={handlePrevClick}>&larr; Prev</button>
          <button disabled={page + 1 > Math.ceil(totalResults / 20)} type="button" className="btn btn-dark" onClick={handleNextClick}>Next &rarr;</button>
        </div>
           )}

      </div>

    )
  
}


News.defaultProps ={
  country:"in",
  category:"general"
}

News.propTypes ={
  country:PropTypes.string
}



export default News
