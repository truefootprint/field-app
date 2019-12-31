const timestampField = (name) => ({
  type: Sequelize.DATE,
  get() {
    const date = this.getDataValue(name);

    if (isNaN(date)) {
      console.warn("Date is NaN. Set '{ raw: true }' to avoid a Sequelize bug.");
    }

    return date;
  },
});

export default timestampField;
