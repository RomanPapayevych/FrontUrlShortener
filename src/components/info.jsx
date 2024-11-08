import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useLocation, useNavigate } from 'react-router-dom'; 

const Info = () => {
  const { id } = useParams();
  const [urlInfo, setUrlInfo] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate()
  const location = useLocation()
  const email = location.state?.email 

  useEffect(() => {
    const fetchUrlInfo = async () => {
      try {
        const response = await axios.get(`https://localhost:7062/api/Url/${id}`, {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`  
            }
        });
        setUrlInfo(response.data);  
      } catch (error) {
        setErrorMessage("Error fetching URL details");
        console.error("Error fetching URL details:", error);
      }
    };

    fetchUrlInfo();
  }, [id]); 

    const handleGoBack = () =>{
        navigate('/urlTable', {state: {email}})
    }

  if (errorMessage) {
    return <div>{errorMessage}</div>;
  }

  if (!urlInfo) {
    return <div>Loading...</div>; 
  }

  return (
    <div className="url-info">
      <h2>URL Information</h2>
      <p><strong>Original URL:</strong> {urlInfo.url}</p>
      <p><strong>Short URL:</strong> <a href={`http://localhost:5173/${urlInfo.shortUrl}`} target="_blank" rel="noopener noreferrer">{`http://localhost:5173/${urlInfo.shortUrl}`}</a></p>
      <p><strong>Created At:</strong> {new Date(urlInfo.createdAt).toLocaleString()}</p>
      <p><strong>User ID:</strong> {urlInfo.userId}</p>
      <button onClick={handleGoBack}>Back to URL Table</button>
    </div>
  );
};

export default Info;
