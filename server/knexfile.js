export const development = {
  client: 'mysql',
  connection: {
    host : 'localhost',
    port : 3306,
    user:     'user',
    password: '123',
    database: 'card-project'
  },
  migrations: {
    tableName: 'migrations'
  },
  seeds: {
    tableName: 'seeds'
  }
};
