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

const Bookmarks: React.FC<NewsArticleProps> = ({ newsCategory }) => {
  const [news, setNews] = useState<Article[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [showModal, setShowModal] = useState<{
    visible: boolean;
    article?: Article;
  }>({ visible: false });

  const fetchNews = () => {
    try {
      // Retrieve the stored user profile from localStorage
      const feed = localStorage.getItem("news_app");

      if (feed) {
        const userProfile = JSON.parse(feed);
        if (userProfile.bookmarks) {
          setNews(JSON.parse(userProfile.bookmarks));
        } else {
          console.log("No bookmarks found.");
          setError("No bookmarks found.");
        }
      } else {
        console.log("No news app data found in localStorage.");
        setError("Failed to load news app data.");
      }
    } catch (error) {
      console.error("Error fetching articles: ", error);
      setError("Failed to load bookmarks.");
    }
  };

  useEffect(() => {
    fetchNews();
  }, [newsCategory]);

  function handleDelete(index: number): void {
    const updatedBookmarks = news.filter((_, i) => i !== index);
    setNews(updatedBookmarks);
    const userDetails = localStorage.getItem("news_app");
    if (userDetails) {
      const parsedUserDetails = JSON.parse(userDetails);
      parsedUserDetails.bookmarks = updatedBookmarks;
      localStorage.setItem("news_app", JSON.stringify(parsedUserDetails));
    }
  }

  return (
    <div className="container flex news-feed">
      <h2 className="display-5 fw-bold text-body-emphasis text-center pb-3">
        Bookmarks
      </h2>
      {error && <div className="alert alert-danger text-center">{error}</div>}
      <div className="d-flex justify-content-between">
        <div className="row">
          {news.length === 0 ? (
            <div className="text-center">No bookmarks found.</div>
          ) : (
            news.map((article, index) => (
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
                          <button
                            className="btn btn-primary"
                            onClick={() => handleDelete(index)}
                          >
                            <i className="bi bi-trash"></i>
                          </button>
                          <button
                            className="btn btn-primary"
                            onClick={() =>
                              setShowModal({ visible: true, article })
                            }
                          >
                            <i className="bi bi-share-fill"></i>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {showModal.visible && (
        <div
          className="modal fade show"
          style={{ display: "block" }}
          onClick={() => setShowModal({ visible: false })}
        >
          <div className="modal-dialog" onClick={(e) => e.stopPropagation()}>
            <div className="modal-content">
              <div className="modal-header">
                <h1 className="modal-title fs-5">Share the news!</h1>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setShowModal({ visible: false })}
                ></button>
              </div>
              <div className="modal-body">
                <ShareSocial
                  title={showModal.article?.title}
                  url={showModal.article?.url}
                  socialTypes={[
                    "facebook",
                    "twitter",
                    "reddit",
                    "linkedin",
                    "whatsapp",
                  ]}
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Bookmarks;
