import React, { useEffect, useState } from "react";
import axios from "axios";

function NewsFeed() {
  const [news, setNews] = useState([]);

  const fetchNews = async () => {
    try {
      const feed = await axios.get(
        "https://newsapi.org/v2/everything?domains=wsj.com&apiKey=9a45d8a7572c4bbeb1cd2e1bd99ae90c"
      );

      setNews(feed.data.articles);
    } catch (error) {
      console.error("Error fetching articles: ", error);
    }
  };

  useEffect(() => {
    fetchNews();
  }, []);

  return (
    <div>
      <h1>News Feed</h1>
      {news.map((article, index) => (
        <div key={index}>
          <h2>{article.title}</h2>
          <p>{article.author}</p>
          <p>{article.description}</p>
          <a href={article.url} target="_blank" rel="noopener noreferrer">
            Read more...
          </a>
        </div>
      ))}
    </div>
  );
}

export default NewsFeed;
