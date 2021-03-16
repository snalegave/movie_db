const sql = require('mssql')

exports.handler = async (event) => {
  let service = event.queryStringParameters.service;
  let order = "release_date";
  let page = 1;
  let itemsPerPage = 20;
  let DESC = false;
  if (event.queryStringParameters.order) {
    order = event.queryStringParameters.order;
  }
  if (event.queryStringParameters.page) {
    page = event.queryStringParameters.page;
  }
  if (event.queryStringParameters.itemsPerPage) {
    itemsPerPage = event.queryStringParameters.itemsPerPage;
  }
  if (event.queryStringParameters.DESC) {
    DESC = event.queryStringParameters.DESC;
  }
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
      `DECLARE @serviceId int;
      SELECT @serviceId = service_id
      FROM dbo.services
      WHERE service_name = '${service}';

      SELECT dbo.movie_service.tmdb_id, title, release_date, countries, original_language, runtime, poster_path FROM dbo.movie_service
      JOIN dbo.movie_data ON dbo.movie_data.tmdb_id=dbo.movie_service.tmdb_id
      JOIN dbo.services ON dbo.movie_service.service_id=dbo.services.service_id
      WHERE dbo.movie_service.service_id=@serviceId
      ORDER BY ${order} ${DESC ? 'DESC' : 'ASC'}
      OFFSET ${(page - 1) * itemsPerPage} ROWS
      FETCH NEXT ${itemsPerPage} ROWS ONLY`)
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
