import { Updates } from "expo";
import { AsyncStorage } from "react-native";
import pullData from "./pull_data";

const changeRole = async ({ project, role }) => {
  await new Client().postChangeRoles(role);

  await pullData({ force: true });

  // Once the app has reloaded, nagivate to the intro screen for the project.
  await AsyncStorage.setItem("NavigateTo", project.id.toString());

  Updates.reload(); // Reload the app.
};

const navigateToIntro = async ({ navigation, projects }) => {
  const projectId = await AsyncStorage.getItem("NavigateTo");
  if (!projectId) return;

  await AsyncStorage.removeItem("NavigateTo");

  const projectIndex = projects.findIndex(p => p.id.toString() === projectId);

  useTranslate.setProject(projects[projectIndex]); // Use the project-specific translations.
  navigation.navigate("Intro", { introPage: 1, projectIndex });
};

export default changeRole;
export { navigateToIntro };
