class ApplicationPresenter {
  static present(record) {
    return record ? record.dataValues : null
  }
}

export default ApplicationPresenter;
