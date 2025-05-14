import { useNavigate, Outlet } from 'react-router-dom'

// Removed duplicate declarations of DashboardPage
export default function DashboardPage() {
    const navigate = useNavigate();
    return (
      <div className="DashboardPage componentBox">
        <h1>Dashboard</h1>
        <p>Welcome to your dashboard!</p>
        <button onClick={() => navigate('/dash/tasks')}>Show Tasks</button>
        <button onClick={() => navigate('/dash/message')}>Show Messages</button>
        <button onClick={() => navigate(-1)}>Back</button>
        <Outlet />
      </div>
    );
}

