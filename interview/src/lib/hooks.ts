import { useEffect, useState } from "react";

export const useInput = <T>(initialValue: T) => {
  const [value, setValue] = useState<T>(initialValue);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(() => e.target.value as T);
  };

  return {
    props: { value, onChange },
    value,
    setValue,
  };
};

export type UserType = {
  name: string;
  departmnetId: string;
  age: string;
  filesId: string;
  parentId: string;
  cover: string;
};

export type DataType = {
  text: string;
  title: string;
  users: UserType[];
}[];

export type FetchDetials = {
  loading: boolean;
  data: DataType | undefined;
  error: string | undefined;
  value: string;
  fun?: (e: DataType) => void;
};

export function useFetch() {
  const [fetchDetails, setFetchDetails] = useState<FetchDetials>({
    loading: false,
    value: "",
    error: undefined,
    data: undefined,
  });

  useEffect(() => {
    var controller = new AbortController();
    var signal = controller.signal;

    setFetchDetails((e) => ({ ...e, error: undefined, loading: true }));

    fetch("http://localhost:3000?term=" + fetchDetails.value, { signal })
      .then((response) => response.json())
      .then((res) =>
        setFetchDetails((e) => ({ ...e, data: res.data, loading: false }))
      )
      .catch((error) =>
        setFetchDetails((e) => ({ ...e, error: error.message, loading: false }))
      );

    return () => {
      controller.abort();
    };
  }, [fetchDetails.value]);

  return {
    ...fetchDetails,
    call(value: string) {
      setFetchDetails((e) => ({
        ...e,
        value,
      }));
    },
  };
}
