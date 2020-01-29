import { Updates } from "expo";

const resetEverything = async () => {
  // Reset the database.
  await sequelize.sync({ force: true });

  // Delete everything in /documents.
  const paths = await File.listing();
  const removes = paths.map(p => File.remove(p, { force: true }));
  await Promise.all(removes);

  // Delete the API token.
  await Secret.remove("token");

  // Restart the app.
  Updates.reload();
};

export default resetEverything;
