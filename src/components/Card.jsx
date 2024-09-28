import { useNavigate } from "react-router-dom";

export default function Card({ posts }) {
  const navigate = useNavigate();
  function handleClick(id) {
    navigate(`/detail/${id}`);
  }
  return (
    <div className="max-w-sm shadow-lg p-4 rounded-lg">
      <div className="p-2">
        <img
          src={posts.imgUrl}
          alt={posts.title}
          className="object-cover rounded-lg"
          loading="lazy"
        />
      </div>
      <div className="p-2">
        <h1 className="text-lg font-semibold text-[1rem] text-white">
          {posts.title}
        </h1>
      </div>
      <div className="p-2">
        <p className="text-white-200 text-[1rem]">{posts.content}</p>
      </div>
      <div>
        <button
          className="text-2xl font-bold px-6 text-white bg-black rounded-lg text-center"
          onClick={() => handleClick(posts.id)}
        >
          <span>See Detail</span>
        </button>
      </div>
    </div>
  );
}
