import Checkbox from "../checkbox";
import Button from "../button";
import Image from "../image";
import styles from "./styles.js";

const IssuePreview = ({ color="blue", issue={ versionedContent: {} }, onOpen=()=>{} }) => {
  const isResolved = issue.resolutions && issue.resolutions.length > 0;

  const versionedContent = issue.versionedContent;
  const photo = JSON.parse(versionedContent.photosJson || "[]")[0];

  return (
    <View {...className("issue_preview", styles(color))}>
      <View {...className("side_by_side")}>
        <View {...className("checkbox")}>
          <Checkbox color={color} checked={true} disabled={true}>Issue {isResolved ? "resolved" : "recorded"}</Checkbox>
        </View>

        <View {...className("open")}>
          <Button color={color} caps={false} fill={false} text="View details" onPress={onOpen} />
        </View>
      </View>

      {!isResolved && <>
        <Text {...className("description")} numberOfLines={2}>
          {issue.versionedContent.text}
        </Text>

        {photo && <Image source={photo} {...className("photo")} />}
      </>}
    </View>
  );
};

export default IssuePreview;

