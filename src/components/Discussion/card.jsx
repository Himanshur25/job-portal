import { useState } from "react";
import { AiFillDelete } from "react-icons/ai";
import { MdOutlineReply } from "react-icons/md";
import parse from "html-react-parser";

const Card = ({ value, onDelete }) => {
  const { id, name, comment, rating } = value;
  const [isOpen, setIsOpen] = useState(false);
  const [count, setCount] = useState(0);
  const [reply, setReply] = useState([]);
  function addReply(name, comment) {
    setReply([...reply, { name, comment }]);
    setIsOpen(!isOpen);
    setCount(count + 1);
  }
  return (
    <>
      <div className="comment-boxes" key={id}>
        <div className="review">
          <div className="comment">{parse(`${comment}`)}</div>
          <div className="rating">{rating}⭐️</div>
          <div className="name"> - {name}</div>

          <div className="buttons">
            <button className="reply" onClick={() => setIsOpen(!isOpen)}>
              <MdOutlineReply />
            </button>
            <button className="delete" onClick={onDelete}>
              <AiFillDelete />
            </button>
          </div>
        </div>
      </div>
      {isOpen && <Reply onAdd={addReply} />}

      {reply?.map(({ id, name, comment }) => {
        return (
          <div className="reply-section">
            <div className="comment-boxes" key={id}>
              <div className="review">
                <div className="comment">{parse(`${comment}`)}</div>
                <div className="name">
                  <MdOutlineReply /> {name}
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </>
  );
};

export default Card;
