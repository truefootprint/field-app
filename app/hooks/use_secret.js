const useSecret = (key, onMiss=()=>{}) => {
  const [value, setValue] = useState();

  useEffect(() => {
    Secret.read(key, v => v ? setValue(v) : onMiss());
  }, []);

  const setSecret = (value) => {
    Secret.write(key, value, v => setValue(v));
  };

  return [value, setSecret];
};

export default useSecret;
