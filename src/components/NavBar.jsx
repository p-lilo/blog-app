import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function Navbar() {
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/');
    } catch (error) {
      console.error('Error during logout:', error);
    }
  };

  return (
    <div className="drawer drawer-end">
      <input id="drawer-toggle" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content">
        <nav className="navbar bg-purple-100 shadow-md px-6 py-2">
          <Link to="/" className="text-2xl font-bold text-purple-700">MyBlog</Link>
          <div className="ml-auto">
            {currentUser ? (
              <label htmlFor="drawer-toggle" className="btn btn-ghost btn-circle avatar">
                <div className="w-10 rounded-full ring ring-purple-400 ring-offset-base-100 ring-offset-2">
                  <img src="https://i.pravatar.cc/100" alt="avatar" />
                </div>
              </label>
            ) : (
              <Link to="/login" className="btn btn-outline text-purple-600 border-purple-400 hover:bg-purple-200">
                Login
              </Link>
            )}
          </div>
        </nav>
      </div>

      {currentUser && (
        <div className="drawer-side z-50">
          <label htmlFor="drawer-toggle" className="drawer-overlay"></label>
          <ul className="menu p-6 w-80 min-h-full bg-purple-50 text-purple-800">
            <h1 className="text-2xl font-bold mb-4">Welcome {currentUser.name}</h1>
            <li>
              <Link to="/favorites" className="hover:bg-purple-200 rounded-lg">Favorite Posts</Link>
            </li>
            <li className="mt-4">
              <button
                onClick={handleLogout}
                className="text-red-600 hover:bg-red-100 rounded-lg px-3 py-2 text-left w-full"
              >
                Logout
              </button>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
}

export default Navbar;
