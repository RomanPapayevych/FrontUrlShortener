import { useNavigate, useLocation } from 'react-router-dom';

const AdminProfile = () => {
    const navigate = useNavigate() 
    const location = useLocation() 
    const email = location.state?.email;
    
    const handleControl = () =>{
        navigate("/urlTable", {state: {email}})
    }

    return (
        <div className="container_for_admin">
            <h1 className="pms">UrlTable</h1>
            <div className="action-buttons">
                <button className="btn create-btn" onClick={handleControl}>Urls list</button>
            </div>
        </div>
    );
}
export default AdminProfile;