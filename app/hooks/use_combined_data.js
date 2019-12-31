import useMyData from "./use_my_data";

const useCombinedData = (options) => {
  const myData = useMyData(options);

  return myData;
};

export default useCombinedData;
