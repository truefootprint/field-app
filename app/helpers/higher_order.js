const higherOrder = (fn, options1) => {
  return (options2) => {
    return fn({ ...options1, ...options2 });
  }
};

export default higherOrder;
