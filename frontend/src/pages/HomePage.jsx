import { useState } from "react";
import NavBar from "../components/NavBar";
import RateLimitUI from "../components/RateLimitUI";
import { useEffect } from "react";
import axios from "axios";
import NotesUI from "../components/NotesUI";
import api from "../libs/axios";
import NotesNotFound from "../components/NotesNoteFound";

const HomePage = () => {
    const [isRateLimited, setIsRateLimited] = useState(false);
    const [notes, setNotes] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchNotes = async () => {
            try {
                const res = await api.get("/notes")
                setNotes(res.data);
                setIsRateLimited(false);
                console.log(res.data);
            } catch (error) {
                console.error("Error fetching notes", error);
                if (error.response.status === 429) {
                    setIsRateLimited(true);
                } else {
                    toast.error("Failed to load notes");
                }
            } finally {
                setLoading(false);
            }
        }

        fetchNotes();

    }, [])

    
    return (
        <div className="min-h-screen">
            <NavBar/>
            {isRateLimited && <RateLimitUI />}
            <div className="max-w-7xl mx-auto p-4 mt-6">
                {loading && <div className="text-center text-primary">Loading...</div>}
                {notes.length == 0 && !isRateLimited && (
                    <NotesNotFound/>
                )}
                {notes.length > 0 && !isRateLimited && (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {notes.map((note) => (
                            <NotesUI key={note._id} note={note} setNotes={setNotes}></NotesUI>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default HomePage;