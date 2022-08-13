import { useState } from "react";
import Timer from "./Timer";
import { motion } from "framer-motion";
import { format } from "date-fns";
import { fadeInUp, stagger } from "../animations/animations";

const DropsGrid = () => {
  const date: any = new Date("2022-09-12T15:00:00");
  const formattedDate = format(date, "MM-dd-yyyy");
  const deadline = date.getTime();

  const [tv1Hover, setTv1Hover] = useState(false);
  // const [tv2Hover, setTv2Hover] = useState(false);
  // const [tv3Hover, setTv3Hover] = useState(false);
  // const [tv4Hover, setTv4Hover] = useState(false);
  return (
    <motion.div
      exit={{ opacity: 0 }}
      initial="initial"
      animate="animate"
      className="absolute inset-0 "
    >
      <motion.div
        variants={stagger}
        className="cursor-pointer lg:shadow-xl lg:shadow-stone-600/50 gap-6 mt-12 py-12 md:py-32 px-4 w-full my-auto   mx-auto sm:max-w-6xl  grid grid-col-1 md:grid-cols-2 place-content-center md:gap-1 font-bold md:max-w-4xl  "
      >
        {/* //TV1 */}
        <motion.div
          variants={fadeInUp}
          className="border-[0.9px] border-[#55505084] shadow-md shadow-stone-200/10 text-[#ff0000] p-4 h-64 bg-[#00000055]  opacity-95"
        >
          <motion.div
            whileHover={{
              scale: 1.008,
              transition: { duration: 0.2 },
            }}
            onHoverStart={() => setTv1Hover(true)}
            onHoverEnd={() => setTv1Hover(false)}
            className="text-shadowFirst relative   w-full h-full "
          >
            <div className="absolute border-[0.5px] border-[#9da6a824]  inset-0  rounded-2xl bg-gradient-to-t  from-[#31333e31] to-[#9f959525] w-full h-full hover:blur-sm" />
            <div className="absolute inset-0 shadow-xl shadow-stone-200/5 rounded-2xl bg-[url('../public/images/tv-bg.png')] w-full h-full  flex flex-col justify-center items-center ">
              <h2 className="text-[#ff0000] text-xl">COLLECTION 1</h2>
              {!tv1Hover && <Timer deadline={deadline} />}
              {tv1Hover && <p className="text-2xl">{formattedDate}</p>}
            </div>
          </motion.div>
        </motion.div>
        {/* TV2 */}
        <motion.div
          variants={fadeInUp}
          className="border-[0.9px] border-[#55505084] shadow-md shadow-stone-200/10 cursor-pointer  h-64 p-4 bg-[#00000055] opacity-50"
        >
          <motion.div
            whileHover={{
              scale: 1.008,
              transition: { duration: 0.2 },
            }}
            className="text-shadowInit1 relative  w-full h-full "
          >
            <div className="absolute border-[0.5px] border-[#5e5d5d3a]  inset-0  rounded-2xl bg-gradient-to-t  from-[#31333e31] to-[#9f959525] w-full h-full " />
            <div className="hover:blur-sm absolute inset-0 shadow-xl shadow-stone-500/10 rounded-2xl bg-[url('../public/images/tv-bg.png')] w-full h-full  flex flex-col justify-center items-center ">
              <h2 className="text-xl">COLLECTION 2</h2>
              <h3 className="text-xl font-semibold">- Coming soon -</h3>
            </div>
          </motion.div>
        </motion.div>
        {/* TV3 */}
        <motion.div
          variants={fadeInUp}
          className="border-[0.9px] border-[#55505084] shadow-md shadow-stone-200/10 cursor-pointer  h-64 p-4 bg-[#00000055] opacity-50"
        >
          <motion.div
            whileHover={{
              scale: 1.008,
              transition: { duration: 0.2 },
            }}
            className="text-shadowInit1 text-shadowInit2 relative  w-full h-full "
          >
            <div className="absolute  inset-0 border-[0.5px] border-[#4c4a4a93]  rounded-2xl bg-gradient-to-t  from-[#31333e31] to-[#9f959525] w-full h-full " />
            <div className="hover:blur-sm absolute inset-0  rounded-2xl bg-[url('../public/images/tv-bg.png')] w-full h-full  flex flex-col justify-center items-center ">
              <h2 className="text-xl">COLLECTION 3</h2>
              <h3 className="text-xl font-semibold">- Coming soon -</h3>
            </div>
          </motion.div>
        </motion.div>
        {/* TV4 */}
        <motion.div
          variants={fadeInUp}
          className="border-[0.9px] border-[#55505084] shadow-md shadow-stone-200/10 cursor-pointer  h-64 p-4 bg-[#00000055] opacity-50"
        >
          <motion.div
            whileHover={{
              scale: 1.008,
              transition: { duration: 0.2 },
            }}
            className=" relative text-shadowInit1 text-shadowInit3 p-6   rounded-2xl w-full hover:blur-sm   h-full flex flex-col justify-center items-center space-y-2 "
          >
            <div className="absolute  border-[0.5px] border-[#4c4a4a93]  rounded-2xl bg-gradient-to-t  from-[#31333e31] to-[#9f959525] w-full h-full " />
            <div className="hover:blur-sm   rounded-2xl bg-[url('../public/images/tv-bg.png')] w-full h-full  flex flex-col justify-center items-center ">
              <h2 className="text-xl">COLLECTION 4</h2>
              <h3 className="text-xl font-semibold">- COMING SOON -</h3>
            </div>
          </motion.div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default DropsGrid;
