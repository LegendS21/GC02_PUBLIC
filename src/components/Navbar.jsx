import { Link, useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();
  function handleLogout() {
    localStorage.clear();
    navigate("/login");
  }
  return (
    <>
      <nav className="navbar z-10 p-3 bg-gray-100 shadow flex justify-evenly">
        <div className="flex space-x-6">
          <Link className="text-2xl font-bold" to="/">
            <span>Home</span>
          </Link>
        </div>
      </nav>
    </>
  );
}
