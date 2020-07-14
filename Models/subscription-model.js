/* eslint-disable comma-dangle */
module.exports = (sequelize, DataTypes) => {
  const Subscription = sequelize.define(
    'Subscription',
    {
      end_date: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      active: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
        allowNull: false,
      },
      subscription_id: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
      employer_id: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
      package_id: {
        type: DataTypes.STRING(100),
        allowNull: true,
      },
    },
    {
      paranoid: true,
      underscored: true,
    },
  );
  return Subscription;
};
