import { Spinner } from "@nextui-org/react";
import Collapse from "./components/collapse";
import Search from "./components/search";
import { useFetch } from "./lib/hooks";
import { useEffect, useState } from "react";

function App() {
  const [loadingAnimation, setLoadingAnimation] = useState(false);
  const data = useFetch();

  useEffect(() => {
    const t = setTimeout(() => {
      setLoadingAnimation(true);
    }, 3000);
    data.call("");

    return () => {
      clearTimeout(t);
    };
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-20">
      <div className=" flex flex-col justify-center items-center max-w-lg w-full space-y-10 ">
        <Search />
        {data.data && loadingAnimation ? (
          <Collapse reports={data.data} />
        ) : (
          <Spinner />
        )}
      </div>
    </div>
  );
}

export default App;
