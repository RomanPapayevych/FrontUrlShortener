import React, { useEffect, useState } from "react";
import axios from "axios";
import { useLocation, useNavigate } from 'react-router-dom'; 
import {jwtDecode} from "jwt-decode";

const UrlTable = () => {
    const navigate = useNavigate()
    const location = useLocation()
    const [urls, setUrls] = useState([]);
    const [newUrl, setNewUrl] = useState('');
    const [userRole, setUserRole] = useState(null);
    const [userId, setUserId] = useState(null);
    const [errorMessage, setErrorMessage] = useState("");
    // const [currentPage, setCurrentPage] = useState(1); 
    // const [totalPages, setTotalPages] = useState(1);
    // const [itemsPerPage] = useState(5); 

    const email = location.state?.email;
    const token = localStorage.getItem('token');

  useEffect(() => {
    const fetchUrls = async () => {
      try {
        const response = await axios.get("https://localhost:7062/api/Url",{
            // params: {
            //     page: currentPage,
            //     pageSize: itemsPerPage,
            // },
            headers: { Authorization: `Bearer ${token}` }
        });
        setUrls(response.data.$values);
        //setTotalPages(response.data.totalPages); 
        const decodedToken = jwtDecode(token);
        setUserRole(decodedToken['http://schemas.microsoft.com/ws/2008/06/identity/claims/role']);
        setUserId(decodedToken['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier']);
        
      } catch (error) {
        console.error("Error fetching URLs:", error);
      }
    };

    fetchUrls();
  }, [token]);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`https://localhost:7062/api/Url/url/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setUrls(urls.filter((url) => url.id !== id)); 

    } catch (error) {
      console.error("Error deleting URL:", error);
    }
  };
  const handleInfo = (id) => {
    navigate(`/info/${id}`, { state: { email, id } });
  };

    const handleAddUrl = async (e) => {
    e.preventDefault();
    setErrorMessage('');
    if (!newUrl) {
      console.error("URL input is empty.");
      return;
    }
    const urlPattern = /^(https?:\/\/)?([a-zA-Z0-9\-]+\.)+[a-zA-Z]{2,6}(\/[a-zA-Z0-9\-_.]*)*\/?$/;
    if (!urlPattern.test(newUrl)) {
        setErrorMessage('Invalid URL format.');
        return;
    }
    try {
      const response = await axios.post("https://localhost:7062/api/Url/shorten", newUrl, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
  
      setUrls([...urls, response.data]);
      setNewUrl('');
    } catch (error) {
        setErrorMessage("URL already exist")
        console.error("Error adding URL:", error.response ? error.response.data : error.message);
    }
  };
    const handleGoBack = () =>{
        navigate('/profile', { state: { email } });
    };

    const goToAbout = () => {
        navigate('/about', { state: { email } });
    } 
    const goToLogin = () => {
        navigate('/login')
    } 
    const goToRegister = () => {
        navigate('/register')
    } 
  return (
    <div className="url-table">
        {token && <button type="submit" onClick={handleGoBack}> {"<-"}back</button>}
        <button onClick={goToAbout}>About Url-shortener</button>
        {!token && (
            <div>
                <button onClick={goToRegister}>Register</button>
                <button onClick={goToLogin}>Login</button>
            </div>
        )}
      <h2>URL Records</h2>
      {token && (
                <form onSubmit={handleAddUrl} className="add-url-form">
                    <input type="text" value={newUrl} onChange={(e) => setNewUrl(e.target.value)} placeholder="Enter full URL to shorten" required />
                    <button type="submit">Add URL</button>
                    {errorMessage && <p>{errorMessage}</p>}    
                </form>
                
            )}
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Original URL</th>
            <th>Short URL</th>
            <th>Created At</th>
            {token && <th>Actions</th>}
          </tr>
        </thead>
        <tbody>
          {urls.map((url) => (
            <tr key={url.id}>
              <td>{url.id}</td>
              <td>{url.url}</td>
              <td><a href={`http://localhost:5173/${url.shortUrl}`} target="_blank" rel="noopener noreferrer">{`http://localhost:5173/${url.shortUrl}`}</a></td> 
              <td>{new Date(url.createdAt).toLocaleString()}</td>
              <td>
                {token && (
                    <button onClick={() => handleInfo(url.id)}>Info</button>
                )}
                {(userRole === 'Admin' || (userId === url.userId.toString())) && (
                    <button onClick={() => handleDelete(url.id)}>Delete</button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UrlTable;
