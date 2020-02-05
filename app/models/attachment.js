const Attachment = sequelize.define("attachment", {
  md5: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  url: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  filename: {
    type: Sequelize.VIRTUAL,
    get() {
      return Fingerprint.filename(this.md5, this.url);
    },
  },
  pulled: {
    type: Sequelize.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  },
  createdAt: timestampField("createdAt"),
  updatedAt: timestampField("updatedAt"),
});

Attachment.onLoad = () => {
  // Set up associations here.
};

export default Attachment;
