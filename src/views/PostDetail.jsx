import axios from "axios";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import imgLoading from "../assets/Spinner@1x-1.0s-200px-200px.svg";
export default function Detail({ url }) {
  const { id } = useParams();
  const [post, setPost] = useState("");
  const [loading, setLoading] = useState(false);
  async function fetchDetailPost() {
    try {
      setLoading(true);
      const { data } = await axios.get(`${url}/apis/pub/blog/posts/${id}`);
      setPost(data.data);
      //   console.log(data, id);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }
  useEffect(() => {
    fetchDetailPost();
  }, []);
  return (
    <>
      {loading ? (
        <>
          <div className="flex justify-center items-center h-screen">
            <img src={imgLoading} alt="" />
          </div>
        </>
      ) : (
        <div className="p-20 bg-gray-100 shadow-2xl flex flex-row">
          <figure className="flex w-52 h-52">
            <img
              src={post.imgUrl}
              alt="post image"
              className="object-cover rounded-lg pr-5"
            />
          </figure>
          <div className="flex flex-1 flex-col">
            <b className="mb-5 text-left">{post.title}</b>
            <p className="text-left">{post.content}</p>
          </div>
        </div>
      )}
    </>
  );
}
