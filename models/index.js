const Sequelize = require("sequelize");
const db = new Sequelize("postgres://localhost:5432/wikistack", {
  logging: false,
});

const User = db.define("user", {
  name: { type: Sequelize.STRING, allowNull: false },
  email: { type: Sequelize.STRING, allowNull: false, isEmail: true },
});

const Page = db.define("page", {
  title: { type: Sequelize.STRING, allowNull: false },
  slug: { type: Sequelize.STRING, allowNull: false },
  content: { type: Sequelize.TEXT, allowNull: false },
  status: { type: Sequelize.ENUM("open", "closed"), defaultValue: "closed" },
});

/*

Setting up slug generation based off title as a hook

Page.beforeValidate(generateSlug());

const generateSlug = (title) => title.replace(/\s+/g, "_").replace(/\W/g, "");
*/

module.exports = {
  db,
  Page,
  User,
};
