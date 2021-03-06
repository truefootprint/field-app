class ApplicationPresenter {
  static async present(object) {
    if (Array.isArray(object)) {
      return await this.presentCollection(object);
    } else {
      return await this.presentElement(object);
    }
  }

  static async presentCollection(records) {
    const promises = records.map(r => this.present(r));

    return await Promise.all(promises);
  }

  static async presentElement(record) {
    if (!record) return null;

    if (record.dataValues) {
      return record.dataValues;
    }

    return {
      ...record,
      pushed: parseBool(record.pushed),
      createdAt: parseDate(record.createdAt),
      updatedAt: parseDate(record.updatedAt),
    };
  }

  static async presentNested(key, presenter, fn) {
    const object = await fn();
    const presented = await presenter.present(object);

    return { [key]: presented };
  }

  static async presentOne(where: {}) {
    const record = await this.model().findOne({ raw: true, where });
    return record && await this.presentElement(record);
  }

  static async presentAll(where: {}) {
    const records = await this.model().findAll({ raw: true, where });
    return await this.presentCollection(records);
  }

  static model() {
    throw new Error("Implement me");
  }
}

const parseDate = (string) => (
  new Date(string.replace(" ","T").replace(" +00:00","Z"))
);

const parseBool = (number) => (
  number === 1 ? true : false
);

export default ApplicationPresenter;
