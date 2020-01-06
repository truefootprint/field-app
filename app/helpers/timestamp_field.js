const timestampField = (name) => ({
  type: Sequelize.DATE,
  get() {
    const date = this.getDataValue(name);
    const pushed = this.getDataValue("pushed");

    if (isNaN(date) && !pushed) {
      console.warn("Date is NaN. Set '{ raw: true }' to avoid a Sequelize bug.");
    }

    return date;
  },
});

export default timestampField;
