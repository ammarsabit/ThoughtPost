import { FaRegBookmark } from "react-icons/fa6";

interface Card {
  usr_name: string;
  date: string;
  titile: string;
  tags: [];
}

interface Props {
  postInfo: Card[];
  onMore: () => void;
}

const BlogCard = () => {
  return (
    <div className="card">
      <div className="card-body d-flex flex-column">
        <h2 className="fs-4">Ammar Sabit</h2>
        <h3 className="fs-6 text-secondary">Jul 26</h3>
        <h1 className="fw-bolder">Best React Native Icon Libraries in 2025</h1>
          <ul className="list-group list-group-horizontal list-unstyled">
            <li className="mx-2"><span className="text-info">#</span>reactnative</li>
            <li className="mx-2"><span className="text-info">#</span>webdev</li>
            <li className="mx-2"><span className="text-info">#</span>icon</li>
            <li className="mx-2"><span className="text-info">#</span>besticon</li>
          </ul>
          <div className="align-self-end">
            <FaRegBookmark size={30}/>
          </div>
      </div>
    </div>
  );
};

export default BlogCard;
