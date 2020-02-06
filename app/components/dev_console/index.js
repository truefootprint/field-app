import styles from "./styles.js";

const DevConsole = () => {
  const [showing, setShowing] = useState(false);
  const [bigger, setBigger] = useState(false);
  const [lines, setLines] = useState([]);
  const ref = useRef();

  useEffect(() => {
    Logger.onLine = () => {
      setLines([...Logger.lines]);

      if (ref.current) {
        setTimeout(() => {
          ref.current.scrollToEnd();
        }, 50);
      }
    };

    return () => Logger.onLine = () => {};
  }, []);

  const printFiles = () => {
    Logger.log("--------");
    File.listing().then(f => f.forEach(Logger.info));
  };

  const actions = {
    reset: resetEverything,
    files: printFiles,
    bigger: () => setBigger(true),
    smaller: () => setBigger(false),
    show: () => setShowing(true),
    hide: () => setShowing(false),
  };

  const renderAction = (name, text) => (
    <Touchable onPress={actions[name]}>
      <Text {...className(["action", name, showing && "visible"])}>{text}</Text>
    </Touchable>
  );

  return (
    <View {...className(["dev_console", showing && "showing", showing && bigger && "bigger"], styles)}>
      <View {...className("actions")}>
        {showing && renderAction("reset", "Reset app")}
        {showing && renderAction("files", "Print files")}
        {showing && !bigger && renderAction("bigger", "Bigger")}
        {showing && bigger && renderAction("smaller", "Smaller")}
        {!showing && renderAction("show", "Show console")}
        {showing && renderAction("hide", "Hide console")}
      </View>

      <ScrollView ref={ref}>
        {lines.map((line, i) => (
          <Text key={i} {...className(["line", line.type])}>
            &gt; {line.message}
          </Text>
        ))}
      </ScrollView>
    </View>
  );
};

export default DevConsole;
