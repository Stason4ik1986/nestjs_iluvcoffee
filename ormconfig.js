module.exports = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'pass123',
  database: 'postgres',
  entities: ['dist/**/*.entity.js'],
  migrations: ['dist/migrations/*.js'],
  cli: {
    migrationsDir: 'src/migrations',
  },
}

// npx typeorm migration:run - run migration
// npx typeorm migration:create -n CoffeeRefactor - add migration manually
// npx typeorm migration:generate -n SchemaSync - add migration automatically