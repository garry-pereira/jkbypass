// master config, do not change. this user must be created in the database on host system
const config = {
  user: 'gmaster',
  password: '123',
  server: '10.1.10.23',
  port: 50258,
  database: 'JKTTDB',
  options: {
    encrypt: false,
  },
}

// export our master config
export default config
