import React, { useEffect, useState } from "react";
import axios from "axios";

// Placeholder image
import placeholderImage from "../assets/news.png";

// Props
interface NewsArticleProps {
 newsCategory: string;
}

const NewsFeed: React.FC<NewsArticleProps> = ({ newsCategory }) => {
  const [news, setNews] = useState([]);
  const apiKey: string = "";
  const country: string = "us";
  

  useEffect(() => {
    fetchNews();
  });

  const fetchNews = async () => {
    try {
      // Use template literals for string interpolation
      const feed = await axios.get(
        `https://newsapi.org/v2/top-headlines?country=${country}&category=${newsCategory}&apiKey=${apiKey}`
      );

      console.log(feed);

      setNews(feed.data.articles);
    } catch (error) {
      console.error("Error fetching articles: ", error);
    }
  };

  return (
    <div className="container flex news-feed">
      <div className="d-flex justify-content-between">
        <div className="row">
          {news.map((article, index) => (
            <div className="col-sm-6">
              <div className="card mb-4 rounded-4">
                <div></div>

                {/* Card Image */}
                <img
                  className="card-img-top headline-image p-3 rounded-5"
                  src={article.urlToImage || placeholderImage}
                  alt="Articles"
                />

                <div className="card-body">
                  {/* Article title */}
                  <h5 className="card-header p-1 pb-2">{article.title}</h5>

                  {/* Article summary */}
                  <p className="card-text p-1">
                    {article.description || "Description not available"}
                  </p>

                  {/* Article author */}
                  <p className="card-subtitle text-body-secondary p-1">
                    {article.author || "Unknown Author"}
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
