import { useEffect, useState } from "react";
import List from "./Components/List";
import { Route, Routes } from "react-router-dom";
import Detail from "./Components/Detail";

const App = () => {
  const [movies, setMovies] = useState([]);
  const [keywordSearch, setkeywordSearh] = useState("");

  const getAllMovies = async (keywordSearch:string) => {
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0NzFkZGE0ODdlNGI4ZjcyYjI0ZTJmNzM2MGNiNjhmOSIsInN1YiI6IjY1MTMxNzI4YTkxMTdmNzY1YWEyYTY0ZiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.CY1i_s9SKeKNNvewcseUGA3NJMOsT1pCWs1nS7OkP-Q",
      },
    };
    const url = keywordSearch
      ? "https://api.themoviedb.org/3/search/movie?include_adult=false&language=en-US&page=1"
      : "https://api.themoviedb.org/3/trending/movie/day?language=en-US";

    const respone = await fetch(`${url}&&query=${keywordSearch}`, options);
    const Data = await respone.json();
    console.log(Data);

    setMovies(Data.results);
    console.log(keywordSearch);
  };
  useEffect(() => {
    getAllMovies(keywordSearch);
  }, []);

  return (
    <div>
      <div  className="flex h-[8vh] bg-stone-950  fixed w-full">
        <div className=" ms-8">
          <img
            className=" w-[10vh]"
            src="https://cdn.dribbble.com/users/4542449/screenshots/14435668/artboard_8.png"
            alt=""
          />
        </div>
        <div className="h-[100%] flex w-full me-[17vh] justify-center relative ">
          <input
            className=" h-[70%] w-[40vh]  rounded-2xl p-4 outline-none border-none mt-2  "
            type="search"
            placeholder="Search ..."
            value={keywordSearch}
            onChange={(e) => setkeywordSearh(e.target.value)}
          />
          <input
            className=" bg-white  p-2 border-l-2 shadow-2xl rounded-2xl absolute top-2 left-[105vh]"
            type="submit"
            onClick={() => {
              getAllMovies(keywordSearch);
            }}
          />
        </div>
      </div>
      <div className=" pt-20">
        <Routes>
          <Route path="/" element={<List Movies={movies} />} />
          <Route path="/Detail/:id" element={<Detail/>}  />
        </Routes>
      </div>
    </div>
  );
};

export default App;
