import React from "react";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import { Bell, MessageSquare, User as UserIcon, LogOut } from "lucide-react";
import { useAuth } from "../../context/AuthContext";

const MainLayout: React.FC = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [showProfileMenu, setShowProfileMenu] = React.useState(false);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };
  const isActive = (path: string) =>
    location.pathname === path
      ? "bg-blue-700 text-white"
      : "text-white hover:bg-blue-600";

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header / Navbar */}
      <header className="bg-hcmut-blue text-white shadow-md sticky top-0 z-50">
        <div className="px-10 h-16 flex items-center justify-between">
          {/* Left Side: Logo & Navigation */}
          <div className="flex items-center space-x-8">
            {/* Logo */}
            <div className="flex items-center">
              <img src="/src/assets/01_logobachkhoatoi.png" alt="BK TP.HCM" className="h-10" />
            </div>

            {/* Navigation Links */}
            <nav className="hidden md:flex space-x-1">
              <Link
                to="/"
                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${isActive(
                  "/"
                )}`}
              >
                Home
              </Link>
              <Link
                to="/dashboard"
                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${isActive(
                  "/dashboard"
                )}`}
              >
                Dashboard
              </Link>
              <Link
                to="/reports"
                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${isActive(
                  "/reports"
                )}`}
              >
                Reports
              </Link>
              <Link
                to="/my-sessions"
                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${isActive(
                  "/my-sessions"
                )}`}
              >
                My Sessions
              </Link>
              <Link
                to="/courses"
                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${isActive(
                  "/courses"
                )}`}
              >
                Courses
              </Link>
            </nav>
          </div>

          {/* Right Side: Icons */}
          <div className="flex items-center space-x-6">
            <button className="p-1 rounded-full hover:bg-blue-600 focus:outline-none">
              <Bell className="w-6 h-6" /> {/* Notifications */}
            </button>
            <button className="p-1 rounded-full hover:bg-blue-600 focus:outline-none">
              <MessageSquare className="w-6 h-6" /> {/* Messages */}
            </button>

            {/* Profile Dropdown */}
            <div className="relative">
              <button
                onClick={() => setShowProfileMenu(!showProfileMenu)}
                className="flex items-center space-x-2 p-1 rounded-full hover:bg-blue-600 focus:outline-none"
              >
                <div className="w-8 h-8 rounded-full bg-gray-200 overflow-hidden border-2 border-white">
                  {user?.avatarUrl ? (
                    <img
                      src={user.avatarUrl}
                      alt="User"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <UserIcon className="w-full h-full p-1 text-gray-500" />
                  )}
                </div>
              </button>

              {/* Dropdown Menu */}
              {showProfileMenu && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 text-gray-700 ring-1 ring-black ring-opacity-5">
                  <div className="px-4 py-2 border-b text-sm">
                    <p className="font-bold">{user?.name}</p>
                    <p className="text-xs text-gray-500 truncate">
                      {user?.email}
                    </p>
                  </div>
                  <Link
                    to="/profile"
                    className="block px-4 py-2 text-sm hover:bg-gray-100"
                    onClick={() => setShowProfileMenu(false)}
                  >
                    Your Profile
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100 flex items-center"
                  >
                    <LogOut className="w-4 h-4 mr-2" /> Sign out
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-grow max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="bg-white border-t mt-auto">
        <div className="max-w-7xl mx-auto py-4 px-4 text-center text-sm text-gray-500">
          © 2025 Ho Chi Minh City University of Technology
        </div>
      </footer>
    </div>
  );
};
export default MainLayout;
