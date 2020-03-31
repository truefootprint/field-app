import MapView, { Marker } from "react-native-maps";
import Image from "../image";
import styles from "./styles.js";

const Map = () => {
  const [region, setRegion] = useState({
    latitude: 3.7,
    longitude: 29.5,
    latitudeDelta: 1,
    longitudeDelta: 1,
  });

  const [colors, setColors] = useState(["red", "red"]);
  const uri = File.interpolate("[[[documents]]]/d1cd76a708872ce4aa870a2a22b480a7.png");

  return (
    <View {...className("map", styles)}>
      <MapView {...className("map_view", styles)} initialRegion={region} onRegionChange={setRegion}>

        <Marker coordinate={{ latitude: 3.698, longitude: 29.637 }}
                title="Healthcare Center 1"
                description="Description 1"
                pinColor="red" />

        <Marker coordinate={{ latitude: 3.798, longitude: 29.337 }}
                title="Healthcare Center 2"
                description="Description 2"
                pinColor="green" />

        <Marker coordinate={{ latitude: 3.898, longitude: 29.737 }}>
          <Text style={{ color: "red" }}>FieldApp Map Prototype</Text>
        </Marker>

        <Marker coordinate={{ latitude: 3.233, longitude: 29.15 }} image={{ uri }} />
      </MapView>

      <Textj>{region}</Textj>
    </View>
  );
};

export default Map;
