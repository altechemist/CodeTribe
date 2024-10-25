import React, { useEffect, useState } from "react";
import axios from "axios";
import placeholderImage from "../assets/news.png";
import { ShareSocial } from "react-share-social";

// Props
interface NewsArticleProps {
  newsCategory: string;
}

interface Article {
  title: string;
  description: string;
  author: string;
  urlToImage: string;
  url: string;
}

const NewsFeed: React.FC<NewsArticleProps> = ({ newsCategory }) => {
  const [news, setNews] = useState<Article[]>([]);
  const [bookmarks, setBookmarks] = useState<Article[]>([]);

  const apiKey: string = "9a45d8a7572c4bbeb1cd2e1bd99ae90c";
  const country: string = "us";

  useEffect(() => {
    fetchNews();
    loadBookmarks();
  }, [newsCategory]);

  const fetchNews = async () => {
    try {
      const response = await axios.get(
        `https://newsapi.org/v2/top-headlines?country=${country}&category=${newsCategory}&apiKey=${apiKey}`
      );
      setNews(response.data.articles);

      // Save article offline
      const savedNews = localStorage.getItem("news");
      if (savedNews) {
        const savedArticles = JSON.parse(savedNews);
        if (savedArticles.length > 0) {
          setNews(savedArticles);
        }
      } else {
        localStorage.setItem("news", JSON.stringify(news));
      }
    } catch (error) {
      console.error("Error fetching articles: ", error);
    }
  };

  const loadBookmarks = () => {
    const savedBookmarks = localStorage.getItem("bookmarks");
    if (savedBookmarks) {
      setBookmarks(JSON.parse(savedBookmarks));
    }
  };

  const saveBookmarksToLocalStorage = (updatedBookmarks: Article[]) => {
    localStorage.setItem("bookmarks", JSON.stringify(updatedBookmarks));
  };

  const bookmarkNews = (article: Article) => {
    const updatedBookmarks = [...bookmarks, article];
    setBookmarks(updatedBookmarks);
    saveBookmarksToLocalStorage(updatedBookmarks);
    alert("Bookmarked");
  };

  return (
    <div className="container flex news-feed">
      <div className="d-flex justify-content-between">
        <div className="row">
          {news.map((article: Article, index) => (
            <div className="col-sm-6" key={index}>
              <div className="card mb-4 rounded-4">
                <img
                  className="card-img-top headline-image p-3 rounded-5"
                  src={article.urlToImage || placeholderImage}
                  alt="Articles"
                />
                <div className="card-body">
                  <h5 className="card-header p-1 pb-2">{article.title}</h5>
                  <p className="card-text p-1">
                    {article.description || "Description not available"}
                  </p>
                  <p className="card-subtitle text-body-secondary p-1">
                    {article.author || "Unknown Author"}
                  </p>
                  <div className="d-flex">
                    <div className="col">
                      <a
                        className="btn btn-primary"
                        href={article.url}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Read more...
                      </a>
                    </div>
                    <div className="col text-end">
                      <div className="btn-group">
                        <button className="btn btn-primary" onClick={() => bookmarkNews(article)}>
                          <i className="bi bi-bookmark-plus-fill"></i>
                        </button>
                        <button
                          className="btn btn-primary"
                          data-bs-toggle="modal"
                          data-bs-target="#sharingModal"
                        >
                          <i className="bi bi-share-fill"></i>
                        </button>
                      </div>
                      <div>
                        <div
                          className="modal fade"
                          id="sharingModal"
                          data-bs-backdrop="static"
                          data-bs-keyboard="false"
                          aria-labelledby="staticBackdropLabel"
                          aria-hidden="true"
                        >
                          <div className="modal-dialog">
                            <div className="modal-content">
                              <div className="modal-header">
                                <h1 className="modal-title fs-5" id="staticBackdropLabel">
                                  Share the news!
                                </h1>
                                <button
                                  type="button"
                                  className="btn-close"
                                  data-bs-dismiss="modal"
                                  aria-label="Close"
                                ></button>
                              </div>
                              <div className="modal-body">
                                <ShareSocial
                                  title={article.title}
                                  url={article.url}
                                  socialTypes={["facebook", "twitter", "reddit", "linkedin", "whatsapp"]}
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default NewsFeed;
