const BasePresenter = {};

BasePresenter.present = (record) => (
  record ? record.dataValues : null
)

export default BasePresenter;
