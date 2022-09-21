import { AnimatePresence, motion } from 'framer-motion';
import { useEffect } from 'react';
import { easing } from '../animations/animations';
import { SplitChars } from './SplitChars';

function IntroText({ visible, setVisible }: any) {
  useEffect(() => {
    setVisible(true);
  });
  return (
    <div className="flex mt-10 md:mt-5 justify-center items-center px-0 lg:px-20">
      <div className="text-shadowFirst text-center tracking-tighter text-[14px] xs:text-[20px] md:text-2xl ">
        <AnimatePresence>
          {visible && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <SplitChars
                initial={{ y: '115%' }}
                animate="visible"
                variants={{
                  visible: (i: number) => ({
                    y: 0,
                    transition: {
                      delay: i * 0.18,
                      ease: easing,
                    },
                  }),
                }}
              >
                Four drops collaboration between Felt Zine and Fjord Foundry.
              </SplitChars>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

export default IntroText;
