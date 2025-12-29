import { useNavigate } from 'react-router-dom';
 

function SignOut({setUser}) {
  const navigate = useNavigate();

/**
 * Handle sign out by removing user authentication tokens and redirecting to login page.
 */
  const handleSignOut = () => {
    // Remove user authentication tokens (if stored)
    localStorage.removeItem('token');
    // localStorage.removeItem('user');
    setUser(null);
    // Redirect to login page
    navigate('/login');
  };

  return (
    <div className="signout-container">
      <h2>Are you sure you want to sign out?</h2>
      <div className="signout-buttons">
        <button className="confirm-btn" onClick={handleSignOut}>
          Yes, Sign Out
        </button>
        <button className="cancel-btn" onClick={() => navigate('/dashboard')}>
          Cancel
        </button>
      </div>
    </div>
  );
}

export default SignOut;
