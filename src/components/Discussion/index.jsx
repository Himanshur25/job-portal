import { useState, useRef } from "react";
import "./index.css";
import Navbar from "../Navbar";
import StarRating from "./rating";
import Card from "./card";

export default function Discussion() {
  const [comment, setComment] = useState("");
  const [name, setName] = useState("");
  const [count, setCount] = useState(0);
  const [rating, setRating] = useState(0);
  const [commentList, setCommentList] = useState([]);
  const commentRef = useRef(null);
  const onClickHandler = (e) => {
    e.preventDefault();
    setName("");
    commentRef.current.value = "";
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
        },
      ]);
      setCount(count + 1);
    }
  };
  const onNameChangeHandler = (e) => {
    setName(e.target.value);
  };
  const onChangeHandler = (e) => {
    setComment(e.target.value);
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
            }}
          >
            MARK YOUR REVIEWS
          </div>

          <form className="comment-form">
            <div className="input-group">
              <span className="input-group-add">Name</span>
              <input
                type="text"
                placeholder="Your name"
                className="form-control"
                value={name}
                onChange={onNameChangeHandler}
              />
            </div>
            <div className="input-group">
              <span className="input-group-add">Comment</span>
              <div
                type="text"
                className="form-control comment"
                contentEditable="true"
                data-placeholder="Enter your review"
                value={comment}
                onChange={onChangeHandler}
                ref={commentRef}
              />
            </div>
            <div>
              Your Rating :-
              <StarRating onChange={setRating} />
            </div>

            <button className="submit" onClick={onClickHandler}>
              Submit
            </button>
          </form>
        </div>
      </div>
      <div className="line">Comments ({count})</div>
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
