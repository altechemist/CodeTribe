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
  const [showModal, setShowModal] = useState<{ visible: boolean; article?: Article }>({ visible: false });

  useEffect(() => {
    fetchNews();
  }, [newsCategory]);

  const fetchNews = () => {
    try {
      const feed = localStorage.getItem('bookmarks');
      if (feed) {
        setNews(JSON.parse(feed));
      }
    } catch (error) {
      console.error("Error fetching articles: ", error);
      setError("Failed to load bookmarks.");
    }
  };


  return (
    <div className="container flex news-feed">
      <div className="d-flex justify-content-between">
        <div className="row">
          {error && <div className="alert alert-danger">{error}</div>}
          {news.length === 0 ? (
            <div>No bookmarks found.</div>
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
                          <button className="btn btn-primary">
                            <i className="bi bi-bookmark-plus-fill"></i>
                          </button>
                          <button
                            className="btn btn-primary"
                            onClick={() => setShowModal({ visible: true, article })}
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
        <div className="modal fade show" style={{ display: 'block' }} onClick={() => setShowModal({ visible: false })}>
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
                  socialTypes={["facebook", "twitter", "reddit", "linkedin", "whatsapp"]}
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
