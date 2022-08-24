import React, { useEffect, useState } from 'react'

import NewsItem from './NewsItem'
import Spinner from './Spinner';
import PropTypes from 'prop-types';
import InfiniteScroll from "react-infinite-scroll-component";



 const News =(props)=> {
    const[articles, setArtticles] = useState([])
    const[loading, setLoading] = useState(true)
    const[page, setPage] = useState(1)
    const[totalResults, settotalResults] = useState(0)
 
   
  
  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }


  const updateNews = async ()=> {
    props.setProgress(10);

    const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=c6902fd671b64b5ea5fcbbbd9b2fe808&page=${page}&pageSize=${props.pageSize}`;
   
    setLoading(true)

    let data = await fetch(url);
    props.setProgress(30);
    let parsedData = await data.json();
    props.setProgress(70);
    // console.log(parsedData);
    setArtticles(parsedData.articles)
    settotalResults(parsedData.totalResults)
    setLoading(false)
    
    props.setProgress(100);
  }

  // will run once
  useEffect(()=>{
     document.title = `${capitalizeFirstLetter(props.category)} - NewsMonkey`
    updateNews();
// eslint-disable-next-line 
  }, []);

 



  const fetchMoreData = async () => {
    
    const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apikey=c6902fd671b64b5ea5fcbbbd9b2fe808&page=${page+1}&pageSize=${props.pageSize}`;
    let data = await fetch(url);
    setPage(page + 1)
    let parsedData = await data.json()
    
    setArtticles(articles.concat(parsedData.articles))
    settotalResults(parsedData.totalResults)
    // setLoading(false)
};

 
    return (
      <>
        <h1 className='text-center' style={{margin: '35px 0px', marginTop: '90px'}}>News24 - Top {capitalizeFirstLetter(props.category)} Headlines</h1>
        {/* {loading && <Spinner />} */}

        <InfiniteScroll
          dataLength={articles.length}
          next={fetchMoreData}
          hasMore={articles.length !== totalResults}
          loader={<Spinner />}
        >
          <div className="container">
            <div className="row">

              
              {articles.map((element) => {
                // console.log(element)
                return <div className="col-md-4" key={element.url}>
                  <NewsItem title={element.title ? element.title : ""} description={element.description ? element.description : ""} imageUrl={element.urlToImage} newsUrl={element.url} author={element.author} date={element.publishedAt} source={element.source.name} />
                </div>

              })}

            </div>
          </div>
        </InfiniteScroll>

        
      </>
    )
  }


News.defaultProps = {
  pageSize: 8,
  country: 'in',
  category: 'general'
}

News.propTypes = {
  pageSize: PropTypes.number,
  country: PropTypes.string,
  category: PropTypes.string
}

export default News









// **********Class Based***********
// import React, { Component } from 'react'
// import NewsItem from './NewsItem'
// import Spinner from './Spinner';
// import PropTypes from 'prop-types';
// import InfiniteScroll from "react-infinite-scroll-component";



// export default class News extends Component {

//   static defaultProps = {
//     pageSize: 8,
//     country: 'in',
//     category: 'general'
//   }

//   static propTypes = {
//     pageSize: PropTypes.number,
//     country: PropTypes.string,
//     category: PropTypes.string
//   }

//   constructor(props) {
//     super(props);
//     // console.log("Hello I m constructor from news component");
//     this.state = {
//       articles: [],
//       loading: true,
//       page: 1,
//       totalResults: 0
//     }
//     document.title = `${this.capitalizeFirstLetter(props.category)} - NewsMonkey`
//   }
//   capitalizeFirstLetter = (string) => {
//     return string.charAt(0).toUpperCase() + string.slice(1);
//   }


//   async updateNews() {
//     props.setProgress(10);

//     const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=c6902fd671b64b5ea5fcbbbd9b2fe808&page=${this.state.page}&pageSize=${props.pageSize}`;
//     this.setState({ loading: true })

//     let data = await fetch(url);
//     props.setProgress(30);
//     let parsedData = await data.json();
//     props.setProgress(70);
//     // console.log(parsedData);
//     this.setState({
//       articles: parsedData.articles,
//       totalResults: parsedData.totalResults,
//       loading: false
//     })
//     props.setProgress(100);
//   }

//   async componentDidMount() {
//     this.updateNews()
//   }

//   // handlePrevClick = async ()=>{
//   //   // console.log("clicked on prev")
//   //   this.updateNews()
//   //   this.setState({page: this.state.page - 1})
//   // }

//   // handleNextClick = async ()=>{
//   //   // console.log("clicked on next")

//   //   this.setState({page: this.state.page + 1})
//   //   this.updateNews()

//   //   }

//   fetchMoreData = async () => {
//     this.setState({ page: this.state.page + 1 })
//     const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apikey=c6902fd671b64b5ea5fcbbbd9b2fe808&page=${this.state.page}&pageSize=${props.pageSize}`;
//     let data = await fetch(url);
//     let parsedData = await data.json()
//     this.setState({
//         articles: this.state.articles.concat(parsedData.articles),
//         totalResults: parsedData.totalResults,
//         loading: false,
//     })
// };

//   render() {
//     return (
//       <>
//         <h1 className='text-center'>NewsMonkey - Top {this.capitalizeFirstLetter(props.category)} Headlines</h1>
//         {/* {this.state.loading && <Spinner />} */}

//         <InfiniteScroll
//           dataLength={this.state.articles.length}
//           next={this.fetchMoreData}
//           hasMore={this.state.articles.length !== this.totalResults}
//           loader={<Spinner />}
//         >
//           <div className="container">
//             <div className="row">

              
//               {this.state.articles.map((element) => {
//                 // console.log(element)
//                 return <div className="col-md-4" key={element.urlToImage}>
//                   <NewsItem title={element.title ? element.title : ""} description={element.description ? element.description : ""} imageUrl={element.urlToImage} newsUrl={element.url} author={element.author} date={element.publishedAt} source={element.source.name} />
//                 </div>

//               })}

//             </div>
//           </div>
//         </InfiniteScroll>

//         {/* <div className="container d-flex justify-content-between">
//           <button disabled={this.state.page<=1} type="button" className="btn btn-dark" onClick={this.handlePrevClick}>&larr; Previous</button>
//           <button  disabled={this.state.page + 1 > Math.ceil(this.state.totalResults/props.pageSize)} type="button" className="btn btn-dark"onClick={this.handleNextClick}>Next &rarr;</button>
//         </div> */}
//       </>
//     )
//   }
// }

