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
      return `${this.md5}.${File.extension(this.url)}`;
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
