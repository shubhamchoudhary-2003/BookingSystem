import React from "react";
import Link from "next/link";
const Home = () => {
  return (
    <div className="flex justify-center items-center h-screen bg-white">
      <div className="big-box">
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
          <Link href="/OrderPage">
            <button className="btn bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
              ORDER
            </button>
          </Link>
          <Link href="/NewPage">
            <button className="btn bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
              FORM
            </button>
          </Link>

          <Link href="">
            <button className="btn bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded">
              APIS
            </button>
          </Link>

          <Link href="">
            <button className="btn bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded">
              MORE
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
