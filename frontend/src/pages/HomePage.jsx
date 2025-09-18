import { useState } from "react";
import NavBar from "../components/NavBar";
import RateLimitUI from "../components/RateLimitUI";
import { useEffect } from "react";
import axios from "axios";

const HomePage = () => {
    const [isRateLimited, setIsRateLimited] = useState(true);
    const [notes, setNotes] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchNotes = async () => {
            try {
                const res = await axios.get("http://localhost:5001/api/notes")
                console.log(res.data);
            } catch (error) {
                console.error(error);
            }
        }

        fetchNotes();

    })

    
    return (
        <div className="min-h-screen">
            <NavBar/>
            {isRateLimited && <RateLimitUI />}
        </div>
    );
};

export default HomePage;