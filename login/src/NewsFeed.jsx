import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';


function NewsFeed() {
  const [articles, setArticles] = useState([]);
  const [error, setError] = useState('');
  const navigate = useNavigate();


  React.useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
      return;
    }

    axios.get('http://localhost:5000/api/news', {
      headers: { Authorization: token }
    })
      .then(res => setArticles(res.data.articles))
      .catch(() => setError('Failed to load news.'));
  }, [navigate]);





  return (
    <div className="container mt-5">
      <h2>News Feed</h2>
      {error && <div className="alert alert-danger">{error}</div>}
      <ul className="list-group">
        {articles.map((a, i) => (
          <li key={i} className="list-group-item">
            <h5>{a.title}</h5>
            <p>{a.description}</p>
            <a href={a.url} target="_blank" rel="noopener noreferrer">Read more</a>
          </li>
        ))}
      </ul>
    </div>
  );
}




export default NewsFeed;
