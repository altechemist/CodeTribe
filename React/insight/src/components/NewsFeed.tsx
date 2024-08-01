import React, { useEffect, useState } from "react";
import axios from "axios";

function NewsFeed() {
  const [news, setNews] = useState([]);
  const apiKey: string = "9a45d8a7572c4bbeb1cd2e1bd99ae90c";
  const country: string = "za";
  const category: string = "entertainment";

  const fetchNews = async () => {
    try {
      // Use template literals for string interpolation
      const feed = await axios.get(
        `https://newsapi.org/v2/everything?domains=wsj.com&apiKey=${apiKey}`
      );

      console.log(feed);

      setNews(feed.data.articles);
    } catch (error) {
      console.error("Error fetching articles: ", error);
    }
  };

  useEffect(() => {
    fetchNews();
  }, []);

  return (
    <div className="container flex news-feed">
      <div className="d-flex justify-content-between">
        <div className="row">
          {news.map((article, index) => (
            <div className="col-sm-6">
              <div className="card mb-4">
                <div></div>

                {/* Card Image */}
                <img
                  className="card-img-top"
                  src={article.urlToImage}
                  alt="Articles"
                />

                <div className="card-body">
                  {/* Article title */}
                  <h5 className="card-header">{article.title}</h5>

                  {/* Article summary */}
                  <p className="card-text m-2">{article.description}</p>

                  {/* Article author */}
                  <p className="card-subtitle m-2 text-body-secondary">
                    {article.author}
                  </p>

                  {/* Read More Link */}
                  <a
                    className="btn btn-primary"
                    href={article.url}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Read more...
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default NewsFeed;
