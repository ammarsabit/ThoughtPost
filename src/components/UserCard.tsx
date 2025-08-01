interface Props {
  author: string;
  avatar: string;
  createdAt: string;
}

const UserCard = ({ author, avatar, createdAt }: Props) => {
  return (
    <div className="d-flex">
      <img
        src={avatar}
        alt="author profile picture"
        className="rounded-circle align-self-center"
        width={60}
      />
      <div className="mx-3">
        <h2 className="fs-4">{author}</h2>
        <h3 className="fs-6 text-secondary">
          {new Date(createdAt).toLocaleDateString("en-US", {
            dateStyle: "long",
          })}
        </h3>
      </div>
    </div>
  );
};

export default UserCard;
