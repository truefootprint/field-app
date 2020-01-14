const sleep = async (ms) => {
  await new Promise(r => setTimeout(r, ms));
};

export default sleep;
