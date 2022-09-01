import { createContext, useContext, useState } from "react";

interface AllTvsContextProps {
  allTVS: boolean;
  setAllTVs: (allTvs: boolean) => void;
  enter: boolean;
  setEnter: (enter: boolean) => void;
}

interface props {
  children: JSX.Element | JSX.Element[];
}
const AllTvsContext = createContext<AllTvsContextProps>(
  {} as AllTvsContextProps
);

export function AllTvsWrapper({ children }: props) {
  //STATE
  const [allTVS, setAllTVs] = useState(true);
  const [enter, setEnter] = useState(false);

  return (
    <AllTvsContext.Provider
      value={{
        allTVS,
        setAllTVs,
        enter,
        setEnter,
      }}
    >
      {children}
    </AllTvsContext.Provider>
  );
}

export function useAllTvsContext() {
  const context = useContext(AllTvsContext);

  if (!context) {
    console.error("Error deploying AllTvsContext!!!");
  }

  return context;
}

export default useAllTvsContext;
