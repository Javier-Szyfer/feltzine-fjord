import Link from "next/link";

export const error = () => {
  return (
    <div className="absolute inset-0  flex flex-col justify-center items-center h-screen w-screen">
      You are in the wrong place.
      <div className="noise" />
      <button className="relative underline mt-2">
        <Link href="/" passHref>
          Go back home
        </Link>
      </button>
    </div>
  );
};

export default error;
