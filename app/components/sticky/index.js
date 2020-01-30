import styles from "./styles.js";

const Container = ({ children=[] }) => {
  children = [children].flat(Infinity);

  const indices = filterIndex(children, c => c.type === Sticky);

  return (
    <ScrollView stickyHeaderIndices={indices} contentContainerStyle={styles.content}>
      {children}
    </ScrollView>
  );
};

const Sticky = ({ children }) => (
  <View {...className("sticky", styles)}>
    <View {...className("inner")}>{children}</View>
  </View>
);

Sticky.Container = Container;

export default Sticky;
