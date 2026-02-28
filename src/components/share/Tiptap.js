"use client";

import { useEffect, useRef } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import TextAlign from "@tiptap/extension-text-align";
import { TextStyle } from "@tiptap/extension-text-style";
import Color from "@tiptap/extension-color";
import Image from "tiptap-extension-resize-image";

import {
    Box,
    IconButton,
    Typography
} from "@mui/material";
import ImageIcon from "@mui/icons-material/Image";

import {
    FormatBold,
    FormatItalic,
    FormatUnderlined,
    FormatListBulleted,
    FormatListNumbered,
    Link as LinkIcon,
    FormatAlignLeft,
    FormatAlignCenter,
    FormatAlignRight,
    Undo,
    Redo,
} from "@mui/icons-material";

const Tiptap = ({ value, onChange, onUpload }) => {

    const editor = useEditor({
        extensions: [
            StarterKit,
            TextAlign.configure({ types: ["heading", "paragraph"] }),
            TextStyle,
            Color,
            Image
        ],
        content: value,
        onUpdate({ editor }) {
            onChange?.(editor.getHTML());
        },
        immediatelyRender: false,
    });

    const fileInputRef = useRef(null);

    useEffect(() => {
        if (editor && value !== editor.getHTML()) {
            editor.commands.setContent(value);
        }
    }, [value, editor]);

    if (!editor) return null;

    const insertImage = () => {
        fileInputRef.current?.click();
    }

    const handleImageChange = async (e) => {
        const file = e.target.files?.[0];
        if (!file) return;

        if (onUpload) {
            const blobUrl = onUpload(file);
            if (blobUrl) editor.chain().focus().setImage({ src: blobUrl }).run();
        }

        e.target.value = "";
    }

    const setLink = () => {
        const url = prompt("ใส่ URL:");
        if (url) editor.chain().focus().setLink({ href: url }).run();
    }

    const setColor = () => {
        const color = prompt("ใส่รหัสสี เช่น #ff0000:");
        if (color) editor.chain().focus().setColor(color).run();
    }

    return (
        <Box
            p={2}
            boxSizing="border-box"
            display="flex"
            flexDirection="column"
            gap={2}
            border="1px solid"
            borderColor="divider"
            borderRadius={1}
        >
            <Box display="flex">
                <IconButton
                    sx={{
                        width: 36,
                        height: 36,
                        bgcolor: editor.isActive("bold") ? "divider" : "transparent",
                        "&:hover": { bgcolor: editor.isActive("bold") ? "divider" : "action.hover" }
                    }}
                    size="small"
                    onClick={() => editor.chain().focus().toggleBold().run()}
                >
                    <FormatBold fontSize="small" />
                </IconButton>

                <IconButton
                    sx={{
                        width: 36,
                        height: 36,
                        bgcolor: editor.isActive("italic") ? "divider" : "transparent",
                        "&:hover": { bgcolor: editor.isActive("italic") ? "divider" : "action.hover" }
                    }}
                    size="small"
                    onClick={() => editor.chain().focus().toggleItalic().run()}
                >
                    <FormatItalic fontSize="small" />
                </IconButton>

                <IconButton
                    sx={{
                        width: 36,
                        height: 36,
                        bgcolor: editor.isActive("underline") ? "divider" : "transparent",
                        "&:hover": { bgcolor: editor.isActive("underline") ? "divider" : "action.hover" }
                    }}
                    size="small"
                    onClick={() => editor.chain().focus().toggleUnderline().run()}
                >
                    <FormatUnderlined fontSize="small" />
                </IconButton>

                {[1, 2, 3, 4, 5, 6].map((level) => (
                    <IconButton
                        key={level}
                        size="small"
                        sx={{
                            width: 36,
                            height: 36,
                            p: 1,
                            bgcolor: editor.isActive("heading", { level }) ? "divider" : "transparent",
                            "&:hover": { bgcolor: editor.isActive("heading", { level }) ? "divider" : "action.hover" },
                        }}
                        onClick={() => editor.chain().focus().toggleHeading({ level }).run()}
                    >
                        <Typography variant="body2" fontWeight="600">H{level}</Typography>
                    </IconButton>
                ))}

                <IconButton
                    sx={{
                        width: 36,
                        height: 36,
                        bgcolor: editor.isActive("bulletList") ? "divider" : "transparent",
                        "&:hover": { bgcolor: editor.isActive("bulletList") ? "divider" : "action.hover" }
                    }}
                    size="small"
                    onClick={() => editor.chain().focus().toggleBulletList().run()}
                >
                    <FormatListBulleted fontSize="small" />
                </IconButton>

                <IconButton
                    sx={{
                        width: 36,
                        height: 36,
                        bgcolor: editor.isActive("orderedList") ? "divider" : "transparent",
                        "&:hover": { bgcolor: editor.isActive("orderedList") ? "divider" : "action.hover" }
                    }}
                    size="small"
                    onClick={() => editor.chain().focus().toggleOrderedList().run()}
                >
                    <FormatListNumbered fontSize="small" />
                </IconButton>

                <IconButton
                    sx={{
                        width: 36,
                        height: 36,
                        bgcolor: editor.isActive({ textAlign: "left" }) ? "divider" : "transparent",
                        "&:hover": { bgcolor: editor.isActive({ textAlign: "left" }) ? "divider" : "action.hover" }
                    }}
                    size="small"
                    onClick={() => editor.chain().focus().setTextAlign("left").run()}
                >
                    <FormatAlignLeft fontSize="small" />
                </IconButton>

                <IconButton
                    sx={{
                        width: 36,
                        height: 36,
                        bgcolor: editor.isActive({ textAlign: "center" }) ? "divider" : "transparent",
                        "&:hover": { bgcolor: editor.isActive({ textAlign: "center" }) ? "divider" : "action.hover" }
                    }}
                    size="small"
                    onClick={() => editor.chain().focus().setTextAlign("center").run()}
                >
                    <FormatAlignCenter fontSize="small" />
                </IconButton>

                <IconButton
                    sx={{
                        width: 36,
                        height: 36,
                        bgcolor: editor.isActive({ textAlign: "right" }) ? "divider" : "transparent",
                        "&:hover": { bgcolor: editor.isActive({ textAlign: "right" }) ? "divider" : "action.hover" }
                    }}
                    size="small"
                    onClick={() => editor.chain().focus().setTextAlign("right").run()}
                >
                    <FormatAlignRight fontSize="small" />
                </IconButton>

                {/* <IconButton
                    size="small"
                    onClick={setColor}
                >
                    <FormatColorText fontSize="small" />
                </IconButton> */}

                <IconButton
                    size="small"
                    onClick={insertImage}
                >
                    <ImageIcon fontSize="small" />
                </IconButton>

                <IconButton
                    size="small"
                    onClick={setLink}
                >
                    <LinkIcon fontSize="small" />
                </IconButton>

                <IconButton
                    sx={{
                        width: 36,
                        height: 36,
                    }}
                    size="small"
                    onClick={() => editor.chain().focus().undo().run()}
                >
                    <Undo fontSize="small" />
                </IconButton>
                <IconButton
                    sx={{
                        width: 36,
                        height: 36,
                    }}
                    size="small"
                    onClick={() => editor.chain().focus().redo().run()}
                >
                    <Redo fontSize="small" />
                </IconButton>
            </Box>

            {/* Editor Content */}
            <EditorContent
                editor={editor}
                style={{
                    minHeight: 200,
                    padding: 12,
                    fontSize: 15,
                    border: "1px solid #cccccc",
                    borderRadius: 4,
                    outline: "none",
                }}
                className="tiptap-content"
            />

            <input
                hidden
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleImageChange}
            />

            <style jsx global>
                {`
                    .tiptap-content .ProseMirror:focus {
                        outline: none;
                    }

                    .tiptap-content p,
                    .tiptap-content h1,
                    .tiptap-content h2,
                    .tiptap-content h3,
                    .tiptap-content h4,
                    .tiptap-content h5,
                    .tiptap-content h6,
                    .tiptap-content ul,
                    .tiptap-content ol,
                    .tiptap-content blockquote {
                        margin: 0;
                        padding: 0;
                    }

                    .tiptap-content ul,
                    .tiptap-content ol {
                        padding-left: 40px;
                    }

                    .tiptap-content img {
                        max-width: 100%;
                        height: auto;
                        cursor: pointer;
                    }
                `}
            </style>
        </Box>
    );
};

export default Tiptap;