import { useState, useRef, useEffect } from "react";
import "./index.css";
import Navbar from "../Navbar";
import StarRating from "./rating";
import Card from "./card";
import Editor from "./editor";
import { BiUserCircle } from "react-icons/bi";

export default function Discussion() {
  const [name, setName] = useState("");
  const [rating, setRating] = useState(0);
  const [commentList, setCommentList] = useState([]);
  const [imageUrl, setImageUrl] = useState("");
  const commentRef = useRef();

  const handleSubmit = (event) => {
    event.preventDefault();
    const comment = commentRef.current.innerText;
    setName("");
    setImageUrl("");
    if (name.length === 0 || comment.length === 0) {
      window.alert("Enter the credentials");
    } else {
      setCommentList((prev) => [
        ...prev,
        {
          name,
          comment,
          rating,
          id: commentList.length + 1,
          image: imageUrl,
        },
      ]);
    }
    commentRef.current.innerText = "";
  };
  const handleNameChange = (e) => {
    setName(e.target.value);
  };
  const handleCommentChange = (e) => {
    const value = e.currentTarget.innerText;
    const length = value.length;

    if (length === 0) {
      setImageUrl("");
    }
    var urlRegex = /(https?:\/\/[^\s]+)/g;
    if (value.search(urlRegex) === 1) {
      const url = value.replace(urlRegex, function (url) {
        return '<a href="' + url + '">' + url + "</a>";
      });
      commentRef.current.innerHTML = url;
    } else {
      setImageUrl();
    }
    setImageUrl(value?.match(urlRegex));
  };

  const Delete = (index) => {
    let deleteList = [...commentList];
    deleteList.splice(index, 1);
    setCommentList(deleteList);
  };
  return (
    <>
      <Navbar />
      <div className="discussion">
        <div className="right">
          <div className="discuss">JOB DISQUS</div>

          <form className="comment-form">
            <div className="input-group">
              <div className="comment-name">
                <div className="line"> {commentList.length} Comments</div>
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
            <div className="star-rating">
              <div className="rating-text">You rated this </div>
              <StarRating onChange={setRating} />
            </div>
            <div className="input-group">
              <div
                type="text"
                className="form-control comment"
                contentEditable="true"
                data-placeholder="Join the discussion...."
                // value={comment}
                onInput={handleCommentChange}
                ref={commentRef}
              />
              <div className="icon-button">
                <Editor onUrlChange={setImageUrl} commentRef={commentRef} />

                <button className="submit" onClick={handleSubmit}>
                  Comment
                </button>
              </div>
              <div className="only-image">
                {imageUrl && (
                  <img
                    src={imageUrl}
                    className={`${imageUrl ? "image-text-editor" : ""}`}
                  />
                )}
              </div>
            </div>
          </form>
        </div>
      </div>
      <div className="comment-section">
        <div className="comment-box">
          {commentList.map((data) => {
            return <Card key={data.id} value={data} onDelete={Delete} />;
          })}
        </div>
      </div>
    </>
  );
}
