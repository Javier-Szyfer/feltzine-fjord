import { ConnectBtn } from "./ConnectBtn";

interface HeaderProps {
  enter?: boolean;
}

const Header = ({ enter }: HeaderProps) => {
  return (
    <div className="flex w-full flex-col gap-4 md:gap-0 md:flex-row items-center md:justify-center pt-2 md:pt-8">
      {/* Mobile connect */}
      {enter && (
        <div className="mt-4 sm:mt-0 lg:hidden h-auto  cursor-fancy text-sm md:pl-4  md:fixed z-40 md:top-8 md:right-4">
          <ConnectBtn />
        </div>
      )}
      {/* Desktop connect */}
      {enter && (
        <div className=" hidden lg:flex fixed  top-8 right-4 cursor-fancy text-sm ">
          <ConnectBtn />
        </div>
      )}
      <h1 className="text-[#fdfdfd] mt-2  md:mt-0 text-shadowTitle  2xs:text-xl xs:text-2xl  md:text-3xl lg:text-5xl xl:text-6xl">
        Fjord x Felt Zine
      </h1>
    </div>
  );
};

export default Header;
