const DataTypes = require("sequelize");
const { Model } = DataTypes;

module.exports = class User extends Model {
  static init(sequelize) {
    return super.init(
      {
        // id가 기본적으로 들어있다.
        user_id: {
          type: DataTypes.STRING(30), // STRING, TEXT, BOOLEAN, INTEGER, FLOAT, DATETIME
          allowNull: false, // 필수
          unique: true, // 고유한 값
        },
        password: {
          type: DataTypes.STRING(300),
          allowNull: false, // 필수
        },
        name: {
          type: DataTypes.STRING(30),
          allowNull: false, // 필수
        },
        introduction: {
          type: DataTypes.STRING(100),
          allowNull: true,
        },
        refresh_token: {
          type: DataTypes.STRING(300),
          allowNull: true,
        },
        profile_image: {
          type: DataTypes.STRING(300),
          allowNull: true,
        },
        background_image: {
          type: DataTypes.STRING(300),
          allowNull: true,
        },
      },
      {
        modelName: "User",
        tableName: "users",
        charset: "utf8",
        collate: "utf8_general_ci", // 한글 저장
        sequelize,
      }
    );
  }
  static associate(db) {}
};
