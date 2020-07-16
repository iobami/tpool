/* eslint-disable comma-dangle */
module.exports = (sequelize, DataTypes) => {
  const Feature = sequelize.define(
    'Feature',
    {
      description: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      feature_id: {
        type: DataTypes.STRING(255),
        primaryKey: true,
        allowNull: false,
      },
    },
    {
      underscored: true,
    },
  );
  // eslint-disable-next-line no-unused-vars
  Feature.associate = (model) => {
    Feature.belongsToMany(model.Package, {
      as: 'packages',
      through: 'PackageFeatures',
      foreignKey: 'feature_id',
    });
  };

  return Feature;
};
