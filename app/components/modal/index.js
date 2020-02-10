import styles from "./styles.js";
import { Times } from "../svg_icon";

const Modal = ({ color="blue", title, onClose=()=>{}, children }) => (
  <View {...className("modal", styles(color))}>
    <ScrollView {...className("inner")} contentContainerStyle={{ flex: 1 }}>
      <View {...className("top")}>
        <Text {...className("heading")}>{title}</Text>

        <TouchableOpacity {...className("touchable")} onPress={onClose} activeOpacity={0.8}>
          <Times size={40} />
        </TouchableOpacity>
      </View>

      {children}
    </ScrollView>
  </View>
);

export default Modal;
