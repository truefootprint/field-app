import styles from "./styles.js";

const Lightbox = ({ visible=true, onDismiss, children }) => {
  return (
    <Modal visible={visible} animationType="fade" transparent>
      <View {...className("inner", styles)} data={{ visible }}>
        <Touchable onPress={onDismiss}>
          <View {...className("background")} />
        </Touchable>

        <View {...className("foreground")}>
          {children}
        </View>
      </View>
    </Modal>
  );
};

export default Lightbox;
