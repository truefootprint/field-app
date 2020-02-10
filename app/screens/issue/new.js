const New = ({ navigation }) => (
  <View>
    <Text>new screen</Text>

    <TouchableOpacity onPress={() => navigation.navigate("Edit")}>
      <Text>go to edit screen</Text>
    </TouchableOpacity>
  </View>
);

export default New;
