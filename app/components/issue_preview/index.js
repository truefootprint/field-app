import Checkbox from "../checkbox";
import Button from "../button";
import Downloader from "../downloader"
import Image from "react-native-fullwidth-image"
import styles from "./styles.js";

const IssuePreview = ({ color="blue", issue={}, onOpen=()=>{} }) => {
  const showDetails = !issue.resolution;
  const descriptor = issue.resolution ? "resolved" : "recorded";

  const photo = issue.photos && issue.photos[0];
  const uri = photo && Fingerprint.path(photo.md5, photo.url);

  return (
    <View {...className("issue_preview", styles(color))}>
      <View {...className("side_by_side")}>
        <View {...className("checkbox")}>
          <Checkbox color={color} checked={true} disabled={true}>Issue {descriptor}</Checkbox>
        </View>

        <View {...className("open")}>
          <Button color={color} caps={false} fill={false} text="View details" onPress={onOpen} />
        </View>
      </View>

      {showDetails && <>
        <Text {...className("description")} numberOfLines={2}>
          {issue.description}
        </Text>

        {photo && <Downloader color={color} md5={photo.md5}>
          <Image {...className("photo")} source={{ uri }} />
        </Downloader>}
      </>}
    </View>
  );
};

export default IssuePreview;

