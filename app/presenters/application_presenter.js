class ApplicationPresenter {
  static async present(object) {
    if (Array.isArray(object)) {
      return await this.present_collection(object);
    } else {
      return await this.present_element(object);
    }
  }

  static async present_collection(records) {
    const promises = records.map(r => this.present(r));

    return await Promise.all(promises);
  }

  static async present_element(record) {
    return record ? record.dataValues : null
  }

  static async present_nested(key, presenter, fn) {
    const object = await fn();
    const presented = await presenter.present(object);

    return { [key]: presented };
  }
}

export default ApplicationPresenter;
