// The callback is called whenever all of the conditions are met.

const useWhen = (conditions, callback=()=>{}, additionalDependencies=[]) => {
  useEffect(() => {
    if (conditions.every(c => c)) {
      callback();
    }
  }, [...conditions, ...additionalDependencies]);
};

export default useWhen;
