import { useNavigate } from 'react-router-dom';

function SignOut({ setUser }) {
  const navigate = useNavigate();

  const handleSignOut = () => {
    localStorage.removeItem('token');
    setUser(null);
    navigate('/login');
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50 p-4">
      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md border border-gray-100 text-center">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Sign Out</h2>
        <p className="text-gray-600 mb-8">Are you sure you want to sign out of your account?</p>
        
        <div className="flex flex-col gap-3">
          <button 
            onClick={handleSignOut}
            className="w-full py-3 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-lg transition-colors shadow-sm"
          >
            Yes, Sign Out
          </button>
          
          <button 
            onClick={() => navigate('/dashboard')}
            className="w-full py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold rounded-lg transition-colors"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

export default SignOut;