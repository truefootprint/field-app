import styles from "./styles.js";

const Layout = ({ children }) => (
  <View {...className("layout", styles)}>
    {children}
  </View>
);

export default Layout;
