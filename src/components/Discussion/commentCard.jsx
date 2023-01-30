import { useState } from "react";
import { AiFillDelete } from "react-icons/ai";
import parse from "html-react-parser";
import Reply from "./reply";

var imageUrlRegex = /\b(https?:\/\/[^\s]+)/g;

const CommentCard = ({ value, deleteComment }) => {
  const { _id, name, rating, content } = value;
  const [isOpen, setIsOpen] = useState(false);
  const [reply, setReply] = useState([]);
  const [toggle, setToggle] = useState(true);
  const [replyBox, setReplyBox] = useState(false);

  function addReply(name, comment) {
    setReply((prevReply) => [...prevReply, { name, comment }]);
    setIsOpen(!isOpen);
  }
  const deleteReply = (index) => {
    let deleteList = [...reply];
    deleteList.splice(index, 1);
    setReply(deleteList);
  };

  const imageUrl = value?.content?.match(imageUrlRegex);
  return (
    <>
      <div className="comment-boxes">
        <div className="review">
          <div className="top-area">
            <div className="comment-left" key={_id}>
              <div className="name" data-testid="names">
                {name}
              </div>
              <div className="rating" data-testid="ratings">
                {rating}⭐️
              </div>
            </div>
            <div
              className="add-icon"
              data-testid="toggle-btn"
              onClick={() => setToggle(!toggle)}
            >
              {toggle ? "-" : "+"}
            </div>
          </div>
          {toggle && (
            <div>
              <div className="comment" data-testid="comments">
                {parse(content?.replace(imageUrlRegex, ""))}
              </div>
              {imageUrl && (
                <img
                  src={imageUrl}
                  data-testid="image-preview"
                  className={`${imageUrl ? "image-text-editor" : ""}`}
                  style={{ width: "150px" }}
                />
              )}

              <div className="buttons">
                <button
                  type="button"
                  className="reply"
                  onClick={() => setIsOpen(!isOpen)}
                >
                  <div className="reply-btn">Reply</div>
                </button>
                <button className="reply-count">
                  <div
                    className="view-reply"
                    onClick={() => setReplyBox(!replyBox)}
                  >
                    {replyBox ? "Hide Reply" : "Show Reply"} ({reply.length})
                  </div>
                </button>
                <button
                  role="delete"
                  className="delete"
                  onClick={deleteComment}
                >
                  <AiFillDelete />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
      {isOpen && <Reply onAdd={addReply} />}
      {reply?.map(({ id, name, comment }) => {
        return (
          <>
            {replyBox && (
              <div className="reply-section">
                <div className="comment-boxes" key={id}>
                  <div className="review">
                    <div className="top-area">
                      <div className="name"> {name}</div>
                    </div>
                    <div>
                      <div className="comment">{parse(`${comment}`)}</div>
                      <div className="buttons">
                        <button className="delete" onClick={deleteReply}>
                          <AiFillDelete />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </>
        );
      })}
    </>
  );
};

export default CommentCard;
