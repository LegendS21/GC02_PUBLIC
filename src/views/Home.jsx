import { useEffect, useState } from "react";
import Card from "../components/Card";
import axios from "axios";
import imgLoading from "../assets/Spinner@1x-1.0s-200px-200px.svg";
export default function HomePage({ url }) {
  const [search, setSearch] = useState("");
  const [order, setOrder] = useState("ASC");
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPage, setTotalPage] = useState(0);
  const [posts, setPosts] = useState([]);
  const [category, setCategory] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  async function fetchPosts() {
    try {
      setLoading(true);
      const { data } = await axios.get(
        `${url}/apis/pub/blog/posts?q=${search}&sort=${order}&i=${selectedCategory}&page=${currentPage}`
      );
      setPosts(data.data.query);
      setTotalPage(data.data.pagination.totalPage);
      setCurrentPage(data.data.pagination.currentPage);
      console.log(data.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }
  async function fetchCategory() {
    try {
      const { data } = await axios.get(`${url}/apis/pub/blog/categories`);
      setCategory(data.data);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    fetchCategory();
    fetchPosts();
  }, [search, order, selectedCategory, currentPage]);
  return (
    <>
      <div className="flex justify-center items-center pt-10">
        <form method="get" className="text-center mr-5">
          <input
            type="search"
            name="search"
            placeholder="search"
            className="input input-bordered input-accent md:w-auto input-sm"
            onChange={(e) => setSearch(e.target.value)}
          />
        </form>
        <select
          className="mr-5 p-2 rounded-lg bg-sky-950"
          name="order"
          onChange={(e) => setOrder(e.target.value)}
        >
          <option value="ASC">Ascending</option>
          <option value="DESC">Descending</option>
        </select>
        <select
          name="category"
          className="p-2 rounded-lg bg-sky-950"
          onChange={(e) => setSelectedCategory(e.target.value)}
        >
          {category.map((e) => (
            <option key={e.id} value={e.name}>
              {e.name}
            </option>
          ))}
        </select>
      </div>
      <div>
        {loading ? (
          <>
            <div className="flex justify-center items-center h-screen">
              <img src={imgLoading} alt="" />
            </div>
          </>
        ) : (
          <main className="m-20 grid grid-cols-3 pt-0">
            {posts.map((post) => {
              return <Card posts={post} key={post.id} />;
            })}
          </main>
        )}
      </div>
      <div>
        <div className="join place-items-center flex justify-center">
          <button
            onClick={(i) => setCurrentPage(1)}
            className="join-item btn"
            disabled={currentPage == 1}
          >
            «
          </button>
          {[...Array(totalPage)].map((_, index) => (
            <button
              className={`join-item btn btn-square$`}
              key={index}
              onClick={() => setCurrentPage(index + 1)}
            >
              {index + 1}
            </button>
          ))}
          <button
            onClick={(i) => setCurrentPage(totalPage)}
            className="join-item btn"
            disabled={currentPage == totalPage}
          >
            »
          </button>
        </div>
      </div>
    </>
  );
}
