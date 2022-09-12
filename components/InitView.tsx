import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import useSound from 'use-sound';
//COMPONENTS
import IntroText from './IntroText';
import News from './common/News';

const InitView = () => {
  const [visible, setVisible] = useState(false);
  const [enterSound] = useSound(
    'https://res.cloudinary.com/aldi/video/upload/v1660491197/feltzine/enter_w9keap.mp3',
    { volume: 0.5 }
  );

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1, ease: 'easeInOut' }}
      className="relative w-full px-4 sm:max-w-2xl lg:max-w-4xl lg:shadow-xl lg:shadow-stone-600/50  h-full min-h-[80vh] mt-2 flex flex-col justify-between items-center "
    >
      <News size="2xl" />
      <IntroText setVisible={setVisible} visible={visible} />
      <div className="w-24 sm:w-32 shadow-lg shadow-gray-50/30 my-8 md:my-4 ">
        <Image
          src={
            'https://res.cloudinary.com/aldi/image/upload/v1661456238/feltzine/fz-boxlogo-50_wedhlx.png'
          }
          alt="FeltZine logo"
          width={500}
          height={333}
          layout="responsive"
          priority={true}
        />
      </div>
      <Link href={'/drops'} passHref>
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, ease: 'easeInOut' }}
          whileHover={{ scale: 1.1, transition: { duration: 0.4 } }}
          onClick={() => {
            enterSound(), setVisible(false);
          }}
          className=" text-lg bg-[#202020] text-[#dddddd] hover:text-[#f6f6f6] my-8 md:my-4 cursor-fancy text-shadowFirst py-2 px-4 shadow-md shadow-gray-50/80 rounded-none "
        >
          ENTER
        </motion.button>
      </Link>
    </motion.div>
  );
};

export default InitView;
