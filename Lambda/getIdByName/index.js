const sql = require('mssql')

exports.handler = async (event) => {
  let name = event.queryStringParameters.name;
  let limit = event.queryStringParameters.limit;
  const config = {
    server: 'imt563-database.cn5vgiklkfqz.us-west-2.rds.amazonaws.com',
    database: 'project',
    user: 'admin',
    password: 'password',
    port: 1433,
    connectionTimeout: 30000,
    requestTimeout: 30000,
  };

  try {
    await sql.connect(config);
    const result = await sql.query(
      `SELECT TOP ${limit} * FROM dbo.movie_data
      WHERE title LIKE '%${name}%'`)
    return {
      statusCode: 200,
      headers: {
        "Access-Control-Allow-Origin" : "*", // Required for CORS support to work
        "Access-Control-Allow-Credentials" : true // Required for cookies, authorization headers with HTTPS
      },
      body: JSON.stringify({
        result: result.recordset
      })
    }
  } catch (err) {
    console.error('cannot connect', err.message);
  }
  return {
    statusCode: 400,
    body: "connect failed",
  }
};
