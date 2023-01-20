import { useState } from "react";
import { AiFillDelete } from "react-icons/ai";
import parse from "html-react-parser";
import Reply from "./reply";

const Card = ({ value, onDelete }) => {
  const { id, name, comment, rating, image } = value;
  const [isOpen, setIsOpen] = useState(false);
  const [count, setCount] = useState(0);
  const [reply, setReply] = useState([]);
  const [toggle, setToggle] = useState(true);
  const [isToggle, setIsToggle] = useState(true);
  const [replyBox, setReplyBox] = useState(false);
  const [file, setFile] = useState();

  function addReply(name, comment) {
    setReply((prevReply)=>[...prevReply, { name, comment }]);
    setIsOpen(!isOpen);
    setCount(count + 1);
  }
  const onDeleteReply = (index) => {
    let deleteList = [...reply];
    deleteList.splice(index, 1);
    setReply(deleteList);
    setCount(count - 1);
  };
  return (
    <>
      <div className="comment-boxes" key={id}>
        <div className="review">
          <div className="top-area">
            <div className="comment-left">
              <div className="name"> {name}</div>
              <div className="rating">{rating}⭐️</div>
            </div>
            <div className="add-icon" onClick={() => setToggle(!toggle)}>
              {toggle ? "-" : "+"}
            </div>
          </div>
          {toggle && (
            <div>
              <div className="comment">{parse(`${comment}`)}</div>
              <img
                src={image}
                className={`${
                  image ? "image-text-editor" : "images-text-editor"
                }`}
                style={{ width: "150px" }}
              />

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
                    {replyBox ? "Hide Reply" : "Show Reply"} ({count})
                  </div>
                </button>
                <button className="delete" onClick={onDelete}>
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
                    {isToggle && (
                      <div>
                        <div className="comment">{parse(`${comment}`)}</div>
                        <div className="buttons">
                          <button className="delete" onClick={onDeleteReply}>
                            <AiFillDelete />
                          </button>
                        </div>
                      </div>
                    )}
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

export default Card;
