import React, { Component } from 'react'


export default class NewsItem extends Component {
  render() {
    let { title, description, imageUrl, newsUrl, author, date,source } = this.props;
    return (
      <div className="my-2">
        <div className="card" style={{ width: "auto" }}>
          <div style={{display:'flex',justifyContent:'flex-end',position:'absolute',right:'0'}}>
          <span class="rounded-pill bg-danger"> {source} </span>
          </div>
          <img src={!imageUrl ? "https://www.washingtonpost.com/wp-apps/imrs.php?src=https://arc-anglerfish-washpost-prod-washpost.s3.amazonaws.com/public/QIFZHYC4C6IOGB4ISDPZBG55BI.jpg&w=1440" : imageUrl} className="card-img-top" alt="..." />
          <div className="card-body">
            <h5 className="card-title">{title}...</h5>
            <p className="card-text">{description}...</p>
            <p className="card-text"><small className="text-body-secondary">By {!author ? "Unknown" : author} on {new Date(date).toUTCString()}</small></p>
            <a href={newsUrl} target="_blank" rel="noreferrer" className="btn btn-sm btn-dark">Read More</a>
          </div>
        </div>
      </div>
    )
  }
}
