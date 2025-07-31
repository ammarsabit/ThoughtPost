import { useState } from "react";
import { FaBookmark, FaRegBookmark } from "react-icons/fa6";


interface Props {
    blogId: string;
    bookmarked: boolean;

  onBookMark: (id: string, statues: boolean) => void;
}

const BookmarkIcon = ({blogId, bookmarked, onBookMark}: Props) => {
    const [bookMarked, setBookMarked] = useState(false);

  return (
    <div
      onClick={() => {
        setBookMarked(!bookMarked);
        onBookMark(blogId, bookMarked);
      }}
    >
      {bookmarked ? <FaBookmark size={30} /> : <FaRegBookmark size={30} />}
    </div>
  );
};

export default BookmarkIcon;
