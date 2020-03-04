import { v4 } from "uuid";
import * as Random from "expo-random";

const uuid = async () => {
  if (typeof jest !== "undefined") {
    return "00000000-0000-0000-0000-000000000000";
  }

  const random = await Random.getRandomBytesAsync(16);

  return v4({ random });
};

export default uuid;
