import type { NextPage } from "next";
import Header from "../components/common/Header";
import InitView from "../components/InitView";

const Home: NextPage = () => {
  return (
    <div className=" flex flex-col justify-center items-center overflow-hidden  ">
      <div className="noise" />
      <Header />
      <InitView />
    </div>
  );
};

export default Home;
