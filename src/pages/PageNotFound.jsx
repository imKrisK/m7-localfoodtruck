import React, { useState, useEffect} from "react";

function PageNotFound() {
    const [time, setTime] = useState(new Date().toLocaleTimeString());
    
    useEffect(() => {
        const timer = setInterval(() => {
        setTime(new Date().toLocaleTimeString());
        }, 1000);
    
        return () => clearInterval(timer);
    }, []);
    
    return (
        <div>
        <h1>404 - Page Not Found</h1>
        <p>The page you are looking for does not exist.</p>
        <p>Current time: {time}</p>
        </div>
    );
}

export default PageNotFound;