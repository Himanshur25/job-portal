import { useState, useRef, useEffect } from "react";
import "./index.css";
import Navbar from "../Navbar";
import StarRating from "./rating";
import Card from "./card";
import Comment from "./editor";
import { BiUserCircle } from "react-icons/bi";

export default function Discussion() {
  const [comment, setComment] = useState("");
  const [name, setName] = useState("");
  const [count, setCount] = useState(0);
  const [rating, setRating] = useState(0);
  const [commentList, setCommentList] = useState([]);
  const [imageUrl, setImageUrl] = useState("");
  const [file, setFile] = useState();
  const commentRef = useRef();
  const onClickHandler = (e) => {
    e.preventDefault();
    setName("");
    setImageUrl();
    if (name === "") {
      window.alert("Enter the credentials");
    } else {
      setCommentList((prev) => [
        ...prev,
        {
          name,
          comment: commentRef.current.innerHTML,
          rating,
          id: commentList.length + 1,
          image: imageUrl,
        },
      ]);
      setCount(count + 1);
    }
    commentRef.current.innerHTML = "";
  };
  const onNameChangeHandler = (e) => {
    setName(e.target.value);
  };
  const onChangeHandler = (e) => {
    const target = e.currentTarget;
    const value = e.currentTarget.textContent;
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

  const onDelete = (index) => {
    let deleteList = [...commentList];
    deleteList.splice(index, 1);
    setCommentList(deleteList);
    setCount(count - 1);
  };
  return (
    <>
      <Navbar />
      <div className="discussion">
        <div className="right">
          <div
            className="discuss"
            style={{
              textAlign: "center",
              marginTop: "10px",
              marginBottom: "10px",
              fontSize: "27px",
              fontWeight: "bold",
              color: "blue",
            }}
          >
            JOB DISQUS
          </div>

          <form className="comment-form">
            <div className="input-group">
              <div className="comment-name">
                <div className="line"> {count} Comments</div>
                <div className="icon-name">
                  <div className="user-icon">
                    <BiUserCircle />
                  </div>
                  <input
                    type="text"
                    placeholder="Your name"
                    className="form-control"
                    value={name}
                    onChange={onNameChangeHandler}
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
                value={comment}
                onInput={onChangeHandler}
                ref={commentRef}
              />
              <div className="icon-button">
                <Comment
                  onUrlChange={setImageUrl}
                  commentRef={commentRef}
                />

                <button className="submit" onClick={onClickHandler}>
                  Comment
                </button>
              </div>
              <div className="only-image">
                <img
                  src={imageUrl}
                  className="image-preview"
                  alt="no-img"
                />
              </div>
            </div>
          </form>
        </div>
      </div>
      <div className="comment-section">
        <div className="comment-box">
          {commentList.map((data) => {
            return <Card key={data.id} value={data} onDelete={onDelete} />;
          })}
        </div>
      </div>
    </>
  );
}


