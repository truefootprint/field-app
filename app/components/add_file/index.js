import styles from "./styles.js";

const AddFile = ({ color="blue", onAdd=()=>{} }) => (
  <View {...className("add_file", styles(color))}>
    <TouchableOpacity {...className("touchable")} onPress={onAdd} activeOpacity={0.8}>
      <View {...className("circle")}>
        <Text {...className("plus")}>
          +
        </Text>
      </View>
    </TouchableOpacity>
  </View>
);

export default AddFile;
