import { motion } from 'framer-motion';

const LELoading = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.75, ease: 'easeInOut' }}
      //   className=" text-drop1  relative  lg:min-h-none   text-sm md:text-[18px] lg:text-lg border-[0.9px] h-full w-full mt-4 md:mt-0 border-[#302e2e84] shadow-xl shadow-red-800/10 hover:shadow-[#ff370030]/30 text-[#ff0000] bg-[#01000055]  p-4  opacity-95"
    >
      <div className="text-shadowFirst h-full min-h-[60vh] min-w-none flex justify-center items-center w-full ">
        LOADING...
      </div>
    </motion.div>
  );
};

export default LELoading;
