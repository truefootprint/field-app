import { Chevron } from "../svg_icon";
import Sticky from "../sticky";
import styles from "./styles.js";

// You must call this component as a function for sticky headers to work:
//
// <Sticky.Container>
//   {Expander({ text: "title", children: <Text>content</Text> })}
// </Sticky.Container>

const Expander = ({ children, ...props } = {}) => {
  const channel = { setActives: {} };
  const key = (i) => `${props.text}-${i}`;

  return [
    <Sticky key={key(0)}>
      <Header channel={channel} sticky={true} {...props} />
    </Sticky>,

    <Header key={key(1)} channel={channel} sticky={false} {...props} />,
    <Content key={key(2)} channel={channel} {...props}>{children}</Content>,

    // Clear the sticky header after the content has finished:
    <Sticky key={key(3)} />
  ];
};

const Header = ({ channel, color="blue", text, sticky, expanded=false }) => {
  const [active, setActive] = useState(expanded);
  const classes = ["header", sticky && "sticky_header"];

  // Remember setActive for the sticky and non-sticky header:
  channel.setActives[sticky] = setActive;

  // Hide either the sticky or non-sticky header:
  if (active !== sticky) return null;

  const toggle = () => {
    channel.setVisible(!active);

    // Toggle the sticky and non-sticky headers:
    channel.setActives[true](!active);
    channel.setActives[false](!active);
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

const Content = ({ channel, children, expanded=false }) => {
  const [visible, setVisible] = useState(expanded);

  channel.setVisible = setVisible;

  return (
    <View {...className(["content", visible && "visible"])}>
      {children}
    </View>
  );
};

export default Expander;
