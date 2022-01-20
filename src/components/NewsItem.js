import React, { Component } from 'react'

export class NewsItem extends Component {
    render() {
    let  {title, description, image, newsUrl, author, date, source} = this.props
        return (
  <div className="card">
    <span className="position-absolute top-0 translate-middle badge rounded-pill bg-primary" style={{left: '85%', zIndex:'1'}}>
    {source}
  </span>
  <img src={image} className="card-img-top"/>
  <div className="card-body">
    <h5 className="card-title">{title}</h5>
    <p className="card-text">{description}...</p>
    <p className="card-text"><small className="text-muted"> {author?`By ${author}` : ""} on {new Date(date).toGMTString()}</small></p>
    <a href={newsUrl} target="_blank" className="btn btn-primary">Read More</a>
  </div>
</div>
        )
    }
}
export default NewsItem
