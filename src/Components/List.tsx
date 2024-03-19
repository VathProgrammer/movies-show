import React from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

interface typeData {
  Movies: string | string[];
}

const List: React.FC<typeData> = (props) => {
  const { Movies } = props;
  const image_url = "https://image.tmdb.org/t/p/w500";
  const loading_url = "https://i.gifer.com/ZKZg.gif";
  return (
    <>
      <motion.div
        layout
        className=" w-[70%] grid grid-cols-5  mx-auto gap-x-5 gap-y-10  py-5"
      >
        <AnimatePresence>
          {Movies.length === 0 ? (
            <div className=" flex justify-center align-middle me-60">
              <img
                className=" ms-96 bg-stone-950 w-10"
                src={loading_url}
                alt=""
              />
            </div>
          ) : (
            Movies.map((e) => {
              return (
                <Link to={"Detail/" + e.id} key={e.id}>
                  <motion.div
                    className=" h-[40vh] cursor-pointer overflow-hidden group"
                    layout
                    animate={{ opacity: 1, scale: 1 }}
                    initial={{ opacity: 0, scale: 0 }}
                    exit={{ opacity: 0 }}
                  >
                    <img
                      className="object-cover w-full rounded-lg h-[90%] group-hover:scale-105"
                      src={image_url + e.poster_path}
                      alt=""
                    />
                    <p className=" ">{e.title}</p>
                  </motion.div>
                </Link>
              );
            })
          )}
        </AnimatePresence>
      </motion.div>
    </>
  );
};

export default List;
