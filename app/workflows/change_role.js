import { Updates } from "expo";
import pullData from "./pull_data";

const changeRole = async ({ role }) => {
  await new Client().postChangeRoles(role);

  await pullData({ force: true });

  Updates.reload(); // Reload the app.
};

export default changeRole;
