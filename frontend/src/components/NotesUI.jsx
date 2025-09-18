import { PenSquareIcon, Trash2Icon } from "lucide-react";
import { Link } from "react-router";
import { formatDate } from "../libs/utils.js";
import api from "../libs/axios.js";
import toast from "react-hot-toast";

const NotesUI = ({note, setNotes}) => {
    const handleDelete = async (e, noteId) => {
        e.preventDefault();
        if (!window.confirm("are you sure you want to delete this note?"))  {
            return;
        }
        try {
            await api.delete(`/notes/${noteId}`);
            setNotes((prev) => prev.filter(note => note._id != noteId));
            toast.success("Note deleted successfully")
        } catch (error) {
            console.error("Error in handling delete", error)
        } finally {

        }
    }
    return (
        <Link to={`/note/${note._id}`}
            className="card bg-base-100 hover:shadow-lg transition-all duration-200
                border-t-4 border-solid border-[#FFA0A0]"
        >
            <div className="card bg-base-100 card-sm shadow-lg">
                <div className="card-body">
                    <h3 className="card-title">{note.title}</h3>
                    <p>{note.content}</p>
                    <div className="justify-between items-center mt-4 card-actions">
                        <span className="text-sm text-base-content/60">
                            {formatDate(new Date(note.createdAt))}
                        </span>
                        <div className="flex items-center gap-1">
                            <PenSquareIcon className="size-4"/>
                            <button className="btn btn-ghost text-error" onClick={(e) => handleDelete(e, note._id)}>
                                <Trash2Icon className="size-4"/>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </Link>
        
    );
};

export default NotesUI;