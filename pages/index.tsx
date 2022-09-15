import type { NextPage } from 'next';
import Header from '../components/common/Header';
import SEO from '../components/common/SEO';
import InitView from '../components/InitView';

const Home: NextPage = () => {
  return (
    <>
      <SEO />
      <div className=" flex flex-col justify-center items-center overflow-hidden  ">
        <div className="noise" />
        <Header />
        <InitView />
      </div>
    </>
  );
};

export default Home;
