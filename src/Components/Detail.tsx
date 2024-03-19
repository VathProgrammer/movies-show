import { useParams } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

interface typeofData {
  backdrop_path: string;
  poster_path: string;
  title: string;
  release_date: string;
  vote_average: string;
  runtime: string;
  overview: string;
  gen: string;
  length: string;
  pro: string;
  production_companies: string;
  videos: string;
}

const Detail = () => {
  const [Singlemovies, setSingleMovies] = useState<typeofData>({});
  const { id } = useParams();
  const [trailer, setTrailer] = useState("");
  const [disTrialer, setdisTrailer] = useState(false);
  const getAllMovies = async () => {
    const api = `https://api.themoviedb.org/3/movie/${id}?api_key=471dda487e4b8f72b24e2f7360cb68f9&&append_to_response=videos`;
    const respone = await fetch(api);
    const Data = await respone.json();

    console.log(Data);
    setSingleMovies(Data);
  };
  useEffect(() => {
    getAllMovies();
  }, []);
  const image_url = "https://image.tmdb.org/t/p/w500";

  const Displayvdo = () => {
    const TrailerKey = Singlemovies.videos.results.find(
      (video: string) =>
        video.name === "Official Trailer" || video.type === "Trailer"
    );

    setTrailer(TrailerKey.key);
    setdisTrailer(!disTrialer);
  };
  return (
    <>
      {Singlemovies.length === 0 ? (
        <div className=" w-full justify-center align-middle">
          <h1>Loading ...</h1>
        </div>
      ) : (
        <div>
          <AnimatePresence>
            <motion.div
              layout
              animate={{ opacity: 1, x: 0 }}
              initial={{ opacity: 0, x: 50 }}
              exit={{ opacity: 0, x: 0 }}
            >
              <img
                className=" object-cover h-screen blur-sm w-full  -z-10 fixed"
                src={image_url + Singlemovies.backdrop_path}
                alt=""
              />
            </motion.div>
          </AnimatePresence>
          <div className="w-[70%] mx-auto">
            <div className=" flex justify-between">
              <div className=" mt-20">
                <img
                  className=" w-56 h-72 rounded-md"
                  src={image_url + Singlemovies.poster_path}
                  alt=""
                />
                <button
                  onClick={Displayvdo}
                  className=" text-white border mt-4 rounded-lg  font-sanf  py-1 px-5"
                >
                  {disTrialer ? "Close Traler" : "Play Trailer"}
                </button>
                {disTrialer && (
                  <iframe
                    src={`https://www.youtube.com/embed/${trailer}`}
                    allowFullScreen
                    width={420}
                    height={315}
                    className=" w-72 h-52 mt-2 rounded-lg"
                  ></iframe>
                )}
              </div>
              <div className=" h-screen w-[50vw] right-0 backdrop-blur-xl fixed  p-10 flex flex-col overflow-hidden">
                <motion.div layout>
                  <h1 className=" text-3xl font-bold  tracking-wide  leading-10">
                    {Singlemovies.title}
                  </h1>
                </motion.div>

                <p className=" leading-8">
                  Release Date: {Singlemovies.release_date}
                </p>
                <p className=" leading-8">
                  Rate: {Singlemovies.vote_average}⭐
                </p>
                <p>Runtime: {Singlemovies.runtime} minutes</p>
                <hr className="mt-9" />
                <p className=" mt-4 text-2xl truncate hover:text-clip">
                  {Singlemovies.overview}
                </p>
                <hr className="mt-7" />

                {Singlemovies.genres?.map((gen: string) => {
                  return (
                    <p className=" leading-7" key={gen.id}>
                      {gen.name}
                    </p>
                  );
                })}
                {Singlemovies.production_companies?.map((pro: string) => {
                  return (
                    <p className=" leading-10" key={pro.id}>
                      {pro.name}
                    </p>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Detail;
