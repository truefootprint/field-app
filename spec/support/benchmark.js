const benchmark = async (callback, limit = 250) => {
  const before = (new Date).getTime();
  await callback();
  const after = (new Date).getTime();
  const duration = after - before;

  if (duration > limit) {
    Logger.warn(`Benchmark took ${duration}ms which exceeds ${limit}ms`);
  }

  return duration;
};

export default benchmark;
