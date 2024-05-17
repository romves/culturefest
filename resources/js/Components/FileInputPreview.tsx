import { X } from "lucide-react";
import React from "react";

interface IFileInputPreviewProps {
    src: string;
    deleteHandler: () => void;
}

const FileInputPreview = ({ src, deleteHandler }: IFileInputPreviewProps) => {
    return (
        <div className="relative group">
            <img
                src={src}
                alt="event image"
                className="border border-neutral-400 rounded-md w-[10rem] aspect-video object-contain bg-slate-400/40"
            />

            <button
                type="button"
                className="absolute transition-all opacity-0 top-1 right-1 group-hover:opacity-100"
                onClick={deleteHandler}
            >
                <X size={20} className="rounded-full bg-white/80"/>
            </button>
        </div>
    );
};

export default FileInputPreview;
