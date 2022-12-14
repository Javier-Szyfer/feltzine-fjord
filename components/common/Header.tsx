import Link from 'next/link';
import { useRouter } from 'next/router';
import { AiOutlineWallet } from 'react-icons/ai';
import useSoundContext from '../../context/soundContext/soundCtx';
import { ConnectBtn } from './ConnectBtn';

const Header = () => {
  const router = useRouter();
  const route = router.pathname;

  const { tv1SoundtrackStop } = useSoundContext();

  const stopSounds = () => {
    tv1SoundtrackStop();
  };
  return (
    <div className="flex w-full flex-col gap-4  items-center  pt-8">
      {/* Mobile connect */}
      {route !== '/' && (
        <div className=" md:pl-4  md:fixed z-40 md:right-4  lg:hidden h-auto flex items-center gap-4 cursor-fancy text-sm ">
          <ConnectBtn />
          <Link href={'/nfts'} rel="preload">
            <AiOutlineWallet className="w-6 h-6 text-shadowFirst text-[#cccccc] shadow-md shadow-[#f8f8f8]/30" />
          </Link>
        </div>
      )}
      {/* Desktop connect */}
      {route !== '/' && (
        <div className=" hidden lg:flex fixed  items-end flex-col top-8 right-4 gap-2 cursor-fancy text-sm ">
          <ConnectBtn />
          <Link href={'/nfts'} rel="preload">
            <button onClick={stopSounds}>
              <AiOutlineWallet className="w-6 h-6 text-shadowFirst text-[#cccccc] shadow-md shadow-[#f8f8f8]/30" />
            </button>
          </Link>
        </div>
      )}
      <Link href={'/drops'}>
        <h1 className="relative text-[#fdfdfd] mt-2  md:mt-0 text-shadowTitle  2xs:text-xl xs:text-2xl  md:text-3xl lg:text-5xl xl:text-6xl">
          Fjord x Felt Zine
        </h1>
      </Link>
    </div>
  );
};

export default Header;
