/*******************************************************************************
** Desafio Desenvolvedor
** Developed by Renato De Almeida Faria.
********************************************************************************/

// npm install pg pg-hstore sequelize uuid

import { DataTypes, Model, Sequelize } from 'sequelize';
import { v4 as uuid } from 'uuid';

import { getEnv } from './dotenv';

const db = getEnv('POSTGRES_DB', '');
const user = getEnv('POSTGRES_USER', '');
const pass = getEnv('POSTGRES_PASSWORD', '');
const address = getEnv('POSTGRES_ADDRESS', 'localhost');
const port = getEnv('POSTGRES_PORT', '5432');

export const sequelize = new Sequelize(`postgres://${user}:${encodeURIComponent(pass)}@${address}:${port}/${db}`, {
  host: address,
  pool: { idle: 20000 },
  logging: false,
});
sequelize
  .authenticate()
  .then(() => {
    console.log('Successfully connect to PostGres.');
  })
  .catch((err) => {
    console.error('Connection error', err);
    process.exit();
  });

export function setModel(tableName: string) {
  class model extends Model {}
  model.init(
    {
      id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, allowNull: false, primaryKey: true },
      data: { type: DataTypes.JSONB, defaultValue: {}, allowNull: false },
      control: { type: DataTypes.JSONB, defaultValue: {}, allowNull: false },
    },
    {
      tableName: tableName,
      timestamps: false,
      sequelize,
    }
  );
  model.beforeCreate((obj) => (obj['id'] = uuid()));
  model.sync({ force: false }).then(() => {
    console.log(`Table ${tableName} ok!`);
  });
  return model;
}

export function setLocalStorageModel() {
  class model extends Model {}
  model.init(
    {
      id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, allowNull: false, primaryKey: true },
      type: { type: DataTypes.STRING, defaultValue: '', allowNull: false },
      data: { type: DataTypes.JSONB, defaultValue: {}, allowNull: false },
      control: { type: DataTypes.JSONB, defaultValue: {}, allowNull: false },
    },
    {
      tableName: 'LocalStorage',
      timestamps: false,
      sequelize,
    }
  );
  model.beforeCreate((obj) => (obj['id'] = uuid()));
  model.sync({ force: false }).then(() => {
    console.log('Table LocalStorage ok!');
  });
  return model;
}