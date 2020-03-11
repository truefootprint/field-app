import Image from "../image";
import styles from "./styles.js";

const IssueNote = ({ color, text, photosJson, resolved, user, currentUser, previousNote }) => {
  const photos = JSON.parse(photosJson);
  const hasContent = text || photos.length > 0;

  const isSameUser = previousNote && previousNote.user.id === user.id;
  const isThisUser = user.id === currentUser.id;

  const classes = [
    "issue_note",
    hasContent && "has_content",
    isSameUser && "same_user",
    isThisUser && "this_user",
  ];

  const imageClasses = (i) => (
    ["image", i === 0 && "first_child", i === photos.length - 1 && "last_child"]);

  return <>
    <View {...className(classes, styles(color))}>
      {hasContent && <Text {...className(["text", "name"])} numberOfLines={1}>
        {user.name}
      </Text>}

      {!!text && <Text {...className("text")}>{text}</Text>}

      <View {...className("images")}>
        {photos.map((photo, i) => (
          <Image color={color} source={photo} key={i} {...className(imageClasses(i))} />
        ))}
      </View>
    </View>

    {resolved && <View {...className("resolved")}>
      <Text {...className(["text", "name", "white"])} numberOfLines={1}>
        {user.name}
      </Text>

      <Text {...className(["text", "white"])}>This issue is resolved</Text>
    </View>}
  </>;
};

export default IssueNote;
