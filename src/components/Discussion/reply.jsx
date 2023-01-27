import React from "react";
import { useState, useRef } from "react";
import "./index.css";
import Editor from "./editor";
import { BiUserCircle } from "react-icons/bi";

const Reply = ({ onAdd }) => {
  const [comment, setComment] = useState("");
  const [name, setName] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const commentRef = useRef();
  const handleNameChange = (e) => {
    setName(e.target.value);
  };
  const handleCommentChange = (e) => {
    setComment(e.target.value);
  };

  return (
    <div>
      <form className="comments-form">
        <div className="input-group">
          <div className="comments-name">
            <div className="icon-name">
              <div className="user-icon">
                <BiUserCircle />
              </div>
              <input
                type="text"
                placeholder="Your name"
                className="form-control"
                value={name}
                onChange={handleNameChange}
              />
            </div>
          </div>
        </div>
        <div className="input-group">
          <div
            type="text"
            className="form-control comments"
            contentEditable="true"
            data-placeholder="Join the discussion...."
            value={comment}
            onInput={handleCommentChange}
            ref={commentRef}
          />
          <div className="icon-button">
            <Editor onUrlChange={setImageUrl} commentRef={commentRef} />

            <button
              className="submit"
              onClick={() => onAdd(name, commentRef.current.innerHTML)}
            >
              Comment
            </button>
          </div>
          <div className="only-image">
            {imageUrl && (
              <img src={imageUrl} alt="" className="image-preview" />
            )}
          </div>
        </div>
      </form>
    </div>
  );
};

export default Reply;
