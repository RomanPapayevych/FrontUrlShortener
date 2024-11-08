import React, { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

const RedirectPage = () => {
  const navigate = useNavigate();
  const { shortUrl } = useParams(); 
  console.log("shortUrl:", shortUrl);

  useEffect(() => {
    const redirectToOriginalUrl = async () => {
      try {
        const response = await axios.get(`https://localhost:7062/api/Url/$${shortUrl}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          }
        });
        if (response.data.url) {
            console.log('Redirect URL:', response.data.url);
            window.location.href = response.data.url;
        } else {
          console.error('URL не знайдено');
        }
      } catch (error) {
        console.error('Помилка при редіректі:', error);
      }
    };

    redirectToOriginalUrl();
  }, [shortUrl, navigate]);

  return <div>Redirecting...</div>;
};

export default RedirectPage;
