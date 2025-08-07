import type { Comments } from "../types/Comments";
import style from "./DisplayComment.module.css";

interface DisplayCommentProps {
  comment: Comments;
}

function DisplayComment({ comment }: DisplayCommentProps) {
  const postedOn = new Date(comment.postedAt).toLocaleDateString();

  return (
    <div className={style.commentCard}>
      <div className={style.header}>
        <span className={style.username}>
          {comment.username.firstName} {comment.username.lastName}
        </span>
        <span className={style.date}>{postedOn}</span>
      </div>
      <p className={style.text}>{comment.text}</p>
    </div>
  );
}

export default DisplayComment;
