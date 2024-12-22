import sql from 'mssql'
import config from '../utils/config.js'

const connectDB = async () => {
  try {
    await sql.connect(config)
    console.log(`connected: ${new Date().toString()}`)
    return
  } catch (err) {
    console.log(err)
    console.log(`failed to connect: ${new Date().toString()}`)
  }
}

const readQuery = async (q) => {
  try {
    console.log(q)
    const result = await sql.query(q)
    console.log(result)
    console.log(result.recordset[0])
    return result.recordset[0]
  } catch (err) {
    console.log(err)
    throw new Error(err)
  }
}

const probeQuery = async (q) => {
  try {
    console.log(q)
    const result = await sql.query(q)
    console.log(result)
    console.log(result.recordset[0])
    return result.recordset[0]
  } catch (err) {
    console.log(err)
    throw new Error(err)
  }
}

const updateQuery = async (q, r) => {
  try {
    await sql.query(q)
    const result = await sql.query(r)
    console.log(result)
    console.log(result.recordset[0])
    return result.recordset[0]
  } catch (err) {
    console.log(err)
    throw new Error(err)
  }
}

const items = async (q) => {
  try {
    console.log("i just did extract");
    const result = await sql.query(q);
    for (const [key, value] of Object.entries(result)) {
      console.log(`${key} is a key`);
    }
    return result.recordset;
  } catch (err) {
    console.log(err);
    throw new Error(err);
  }
};

const injectAndReturnAll = async (q, r) => {
  try {
    await sql.query(q)
    const result = await sql.query(r)
    console.log(result)
    console.log(result.recordset)
    return result.recordset;
  } catch (err) {
    console.log(err)
    throw new Error(err)
  }
}

export default connectDB
export { readQuery, updateQuery, probeQuery, items, injectAndReturnAll }
