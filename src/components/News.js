import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import PropTypes from 'prop-types'

export class News extends Component {
    static defaultProps = {
        country: 'in',
        category: ''
    }
    static propTypes = {
        country: PropTypes.string,
        category: PropTypes.string,
    }
    constructor() {
        super();
        console.log("constructor is working");
        this.state = {
            articles: [],
            loading: false,
            page: 1
        }
    }
API =process.env.REACT_APP_NEWS_API

    //default page
    async componentDidMount() {
        console.log("componentDidMount")
        let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.API}&pageSize=20`
        this.setState({ loading: true })
        let data = await fetch(url)
        let jsonData = await data.json()
        this.setState({
            articles: jsonData.articles,
            totalResults: jsonData.totalResults,
            loading: false
        })
    }



    //Previous page
    PreviousClick = async () => {
        console.log("Privious");
        let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.API}&page=${this.state.page - 1}&pageSize=20`
        this.setState({ loading: true })
        let data = await fetch(url)
        let jsonData = await data.json()
        console.log(jsonData);
        this.setState({
            page: this.state.page - 1,
            articles: jsonData.articles,
            loading: false
        })
    }


    //Next page
    NextClick = async () => {
        console.log("Next");
        if (this.state.page + 1 > Math.ceil(this.state.totalResults / 20)) {

        }
        else {
            let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.API}&page=${this.state.page + 1}&pageSize=20`
            this.setState({ loading: true })
            let data = await fetch(url)
            let jsonData = await data.json()
            console.log(jsonData);

            this.setState({
                page: this.state.page + 1,
                articles: jsonData.articles,
                loading: false
            })
        }
    }
    capitalizeFirstLetter = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }
    render() {
        return (
            <div className="container my-4">
                <h1 className='text-center text-dark' style={{ margin: '35px 0px', marginTop: '90px' }}>React News App - Top {this.capitalizeFirstLetter(this.props.category)} Headlines</h1>
                {this.state.loading && <Spinner />}
                <div className="row">
                    {this.state.articles.map((element) => {
                        return <div className="col-md-3" key={element.url}>
                            <NewsItem title={element.title} source={element.source.name} author={element.author} date={element.publishedAt} image={element.urlToImage ? element.urlToImage : "https://images.pexels.com/photos/158651/news-newsletter-newspaper-information-158651.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"}
                                description={element.description ? element.description.slice(0, 100) : ""} newsUrl={element.url} />
                        </div>
                    })}
                </div>
                <div className="d-flex justify-content-between">
                    <button disabled={this.state.page <= 1} className="btn btn-primary" type="button" onClick={this.PreviousClick}> &larr; Previous page</button>
                    <button disabled={(this.state.page + 1 > Math.ceil(this.state.totalResults / 20))} className="btn btn-primary me-md-2" type="button" onClick={this.NextClick}>Next page &rarr;</button>
                </div>
            </div>
        )
    }
}

export default News
