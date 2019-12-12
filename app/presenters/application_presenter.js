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
    return record ? record.dataValues : null
  }

  static async presentNested(key, presenter, fn) {
    const object = await fn();
    const presented = await presenter.present(object);

    return { [key]: presented };
  }
}

export default ApplicationPresenter;
