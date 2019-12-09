import { Chevron } from "../svg_icon";
import Sticky from "../sticky";
import styles from "./styles.js";

// You must call this component as a function for sticky headers to work:
//
// <Sticky.Container>
//   {Expander({ text: "title", children: <Text>content</Text> })}
// </Sticky.Container>

const Expander = ({ children, ...props } = {}) => {
  const channel = { setActives: [] };
  const key = (i) => `${props.text}-${i}`;

  return [
    <Sticky key={key(0)}>
      <Header channel={channel} sticky={true} {...props} />
    </Sticky>,

    <Header key={key(1)} channel={channel} sticky={false} {...props} />,
    <Content key={key(2)} channel={channel}>{children}</Content>,

    // Clear the sticky header after the content has finished:
    <Sticky key={key(3)} />
  ];
};

const Header = ({ channel, color="blue", text, sticky }) => {
  const [active, setActive] = useState(false);
  const classes = ["header", sticky && "sticky_header"];

  useEffect(() => { channel.setActives.push(setActive) }, []);

  // Hide either the sticky or non-sticky header:
  if (active !== sticky) return null;

  const toggle = () => {
    channel.setVisible(!active);
    channel.setActives.forEach(f => f(!active));
  };

  return (
    <Touchable onPress={toggle}>
      <View {...className(classes, styles(color))} data={{ sticky, active }}>
        <View {...className("inner")}>
          <Text {...className("text")}>
            {text}
          </Text>

          <View {...className(["icon", sticky && "sticky_icon"])}>
            <Chevron size={15} />
          </View>
        </View>
      </View>
    </Touchable>
  );
};

const Content = ({ channel, children }) => {
  const [visible, setVisible] = useState(false);

  channel.setVisible = setVisible;

  return (
    <View {...className(["content", visible && "visible"])}>
      {children}
    </View>
  );
};

export default Expander;
