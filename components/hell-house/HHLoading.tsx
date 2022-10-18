import { motion } from 'framer-motion';

const HHLoading = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.75, ease: 'easeInOut' }}
    >
      <div className="text-shadowFirst   min-h-[60vh]  lg:min-h-[70vh] min-w-none flex justify-center items-center w-full ">
        LOADING...
      </div>
    </motion.div>
  );
};

export default HHLoading;
