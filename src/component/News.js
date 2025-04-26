import React, { Component } from 'react';
import NewsItem from './NewsItem';
import Spin from './Spin';
import PropTypes from 'prop-types'
import InfiniteScroll from 'react-infinite-scroll-component';



export default class News extends Component {

  static defaultProps = {
    country: 'in',
    pageSize: 6,
    category: 'sports'
  }
  static propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string
  }

  constructor(props) {
    super(props);
    this.state = {
      articles: [],
      loading: true,
      page: 1,
      totalResults: 0
    }
    document.title = `${this.capitalizeFirstLetter(this.props.category)} - NewsMonkey`
  }
  capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1)
  }
  async updateNews() {
    this.props.setProgress(20);
    const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=015c588fb5bf4beea357229ba08748d2&page=${this.state.page}&pageSize=${this.props.pageSize}`;
    this.setState({ loading: true })
    let data = await fetch(url);
    this.props.setProgress(50);
    let parsedData = await data.json();
    this.props.setProgress(70);
    this.setState({
      // page: this.state.page,
            articles: parsedData.articles,
            totalResults: parsedData.totalResults,
            loading: false,

    });
    this.props.setProgress(100);
  }
  async componentDidMount() {
    // let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=015c588fb5bf4beea357229ba08748d2&page=1&pageSize=${this.props.pageSize}`;
    // // this.setState({ loading: true })
    // let data = await fetch(url);
    // let parsedData = await data.json();
    // this.setState({
    //   articles: parsedData.articles,
    //   totalResults: parsedData.totalResults,
    //   loading: false
    // });
    this.updateNews();
  }


  handlePrevClick = async () => {
    this.setState({ page: this.state.page - 1 });
    this.updateNews();
}

handleNextClick = async () => {
    this.setState({ page: this.state.page + 1 });
    this.updateNews()
}
  // handlePrevClick = async () => {//////////////////
  //   // let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=015c588fb5bf4beea357229ba08748d2&page=${this.state.page - 1}&pageSize=${this.props.pageSize}`;
  //   // this.setState({ loading: true })
  //   // let data = await fetch(url);
  //   // let parsedData = await data.json();
  //   // this.setState({
  //   //   page: this.state.page - 1,
  //   //   articles: parsedData.articles,
  //   //   loading: false

  //   // });
  //   this.setState({page: this.state.page-1});////////////////
  //   this.updateNews();//////////////////////

  // }
  // handleNextClick = async () => {//////////////////////
  //   // if(this.state.page+1 > (Math.ceil(this.state.totalResults/20))) {

  //   // }
  //   // else {
  //   // let url = `https://newsapi.org/v2/top-headlines?country==${this.props.country}&category=${this.props.category}&apiKey=015c588fb5bf4beea357229ba08748d2&page=${this.state.page + 1}&pageSize=${this.props.pageSize}`;
  //   // this.setState({ loading: true })
  //   // let data = await fetch(url);
  //   // let parsedData = await data.json();
  //   // this.setState({
  //   //   page: this.state.page + 1,
  //   //   articles: parsedData.articles,
  //   //   loading: false

  //   // });

  //   // }
  //   this.setState({page: this.state.page+1});///////////////////
  //   this.updateNews();/////////////////
  // }

  // fetchMoreData = async () => {
  //   this.setState({ page: this.state.page + 1 });
  //   const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=015c588fb5bf4beea357229ba08748d2&page=${this.state.page}&pageSize=${this.props.pageSize}`;
  //   let data = await fetch(url);
  //   let parsedData = await data.json();
  //   this.setState({
  //     // page: this.state.page,
  //     articles: this.state.articles.concat(parsedData.articles),
  //     totalResults:parsedData.totalResults,

  //   });
  //   // this.updateNews();

  // }
  fetchMoreData = async () => {  
    this.setState({page: this.state.page + 1})
    const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=015c588fb5bf4beea357229ba08748d2&page=${this.state.page}&pageSize=${this.props.pageSize}`;
    let data = await fetch(url);
    let parsedData = await data.json()
    this.setState({
        articles: this.state.articles.concat(parsedData.articles),
        totalResults: parsedData.totalResults,
        loading:false
    })
  };

  render() {
    return (
      <>
         <h1 className="text-center" style={{ margin: '35px 0px' ,marginTop:'80px'}}>NewsMonkey - Top {this.capitalizeFirstLetter(this.props.category)} Headlines</h1>
                {this.state.loading && <Spin />}
                <InfiniteScroll
                    dataLength={this.state.articles.length}
                    next={this.fetchMoreData}
                    hasMore={this.state.articles.length < this.state.totalResults}
                    loader={<Spin/>}
                > 
                    <div className="container">
                         
                    <div className="row">
                        {this.state.articles.map((element) => {
                            return <div className="col-md-4" key={element.url}>
                                <NewsItem title={element.title ? element.title : ""} description={element.description ? element.description : ""} imageUrl={element.urlToImage} newsUrl={element.url} author={element.author} date={element.publishedAt} source={element.source.name} />
                            </div>
                        })}
                    </div>
                    </div> 
                </InfiniteScroll>


        {/* <div className="container d-flex justify-content-between">
          <button type="button" disabled={this.state.page <= 1} onClick={this.handlePrevClick} className="btn btn-dark">&larr;Previous</button>
          <button type="button" disabled={(this.state.page + 1 > (Math.ceil(this.state.totalResults / this.props.pageSize)))} onClick={this.handleNextClick} className="btn btn-dark">Next&rarr;</button>
        </div> */}




      </>
    )
  }
}

