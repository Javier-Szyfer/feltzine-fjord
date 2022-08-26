import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import useSound from "use-sound";
//COMPONENTS
import IntroText from "./IntroText";
import News from "./News";

const InitView = ({ enter, setEnter }: any) => {
  const [visible, setVisible] = useState(false);
  const [enterSound] = useSound(
    "https://res.cloudinary.com/aldi/video/upload/v1660491197/feltzine/enter_w9keap.mp3",
    { volume: 0.5 }
  );

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1, ease: "easeInOut" }}
      className="relative w-full px-4 sm:max-w-2xl lg:max-w-4xl lg:shadow-xl lg:shadow-stone-600/50  h-full min-h-[80vh] mt-12 md:mt-6 flex flex-col justify-between items-center "
    >
      <News size="2xl" />
      <IntroText setVisible={setVisible} visible={visible} />
      <div className="w-32 shadow-lg shadow-gray-50/30 ">
        <Image
          src={
            "https://res.cloudinary.com/aldi/image/upload/v1661456238/feltzine/fz-boxlogo-50_wedhlx.png"
          }
          alt="FeltZine logo"
          width={500}
          height={333}
          layout="responsive"
          priority={true}
        />
      </div>
      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, ease: "easeInOut" }}
        onClick={() => {
          enterSound(), setEnter(true), setVisible(false);
        }}
        className=" text-lg bg-[#202020] mt-4 cursor-fancy text-shadowFirst py-2 px-4 shadow-sm shadow-gray-100/60 rounded-none "
      >
        ENTER
      </motion.button>
    </motion.div>
  );
};

export default InitView;
