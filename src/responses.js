const respond = (request, response, status, object, type) => {
  response.writeHead(status, { 'Content-Type': type });
  response.write(object);

  response.end();
};


const success = (request, response, params, acceptedTypes) => {
  const responseJSON = {
    message: 'The response was successful',
  };

  if (acceptedTypes[0] === 'text/xml') {
    let responseXML = '<response>';
    responseXML = `${responseXML} <message> ${responseJSON.message} </message>`;
    responseXML = `${responseXML} </response>`;

    return respond(request, response, 200, responseXML, 'text/xml');
  }

  const responseString = JSON.stringify(responseJSON);
  return respond(request, response, 200, responseString, 'application/json');
};

const badRequest = (request, response, params, acceptedTypes) => {
  const responseJSON = {
    message: 'This request has the required parameters',
  };

  if (!params.valid || params.valid !== 'true') {
    responseJSON.message = 'Missing valid query parameter';
    responseJSON.id = 'badRequest';

    if (acceptedTypes[0] === 'text/xml') {
      let responseXML = '<response>';
      responseXML = `${responseXML} <message> ${responseJSON.message} </message>`;
      responseXML = `${responseXML} <id> ${responseJSON.id} </id>`;
      responseXML = `${responseXML} </response>`;

      return respond(request, response, 400, responseXML, 'text/xml');
    }

    const responseString = JSON.stringify(responseJSON);
    return respond(request, response, 400, responseString, 'application/json');
  }

  if (acceptedTypes[0] === 'text/xml') {
    let responseXML = '<response>';
    responseXML = `${responseXML} <message> ${responseJSON.message} </message>`;
    responseXML = `${responseXML} </response>`;

    return respond(request, response, 200, responseXML, 'text/xml');
  }

  const responseString = JSON.stringify(responseJSON);
  return respond(request, response, 200, responseString, 'application/json');
};

const unauthorized = (request, response, params, acceptedTypes) => {
  const responseJSON = {
    message: 'You are authorized to access this resource.',
  };

  if (!params.loggedIn || params.loggedIn !== 'yes') {
    responseJSON.message = 'You are not logged in and do not have access to this resource.';
    responseJSON.id = 'unauthorized';

    if (acceptedTypes[0] === 'text/xml') {
      let responseXML = '<response>';
      responseXML = `${responseXML} <message> ${responseJSON.message} </message>`;
      responseXML = `${responseXML} <id> ${responseJSON.id} </id>`;
      responseXML = `${responseXML} </response>`;

      return respond(request, response, 401, responseXML, 'text/xml');
    }

    const responseString = JSON.stringify(responseJSON);
    return respond(request, response, 401, responseString, 'application/json');
  }

  if (acceptedTypes[0] === 'text/xml') {
    let responseXML = '<response>';
    responseXML = `${responseXML} <message> ${responseJSON.message} </message>`;
    responseXML = `${responseXML} </response>`;

    return respond(request, response, 200, responseXML, 'text/xml');
  }

  const responseString = JSON.stringify(responseJSON);
  return respond(request, response, 200, responseString, 'application/json');
};

const forbidden = (request, response, params, acceptedTypes) => {
  const responseJSON = {
    message: 'This resource is forbidden',
    id: 'forbidden',
  };

  if (acceptedTypes[0] === 'text/xml') {
    let responseXML = '<response>';
    responseXML = `${responseXML} <message> ${responseJSON.message} </message>`;
    responseXML = `${responseXML} <id> ${responseJSON.id} </id>`;
    responseXML = `${responseXML} </response>`;

    return respond(request, response, 403, responseXML, 'text/xml');
  }

  const responseString = JSON.stringify(responseJSON);
  return respond(request, response, 403, responseString, 'application/json');
};

const internal = (request, response, params, acceptedTypes) => {
  const responseJSON = {
    message: 'There was an internal error while processing your request.',
    id: 'internal',
  };

  if (acceptedTypes[0] === 'text/xml') {
    let responseXML = '<response>';
    responseXML = `${responseXML} <message> ${responseJSON.message} </message>`;
    responseXML = `${responseXML} <id> ${responseJSON.id} </id>`;
    responseXML = `${responseXML} </response>`;

    return respond(request, response, 500, responseXML, 'text/xml');
  }

  const responseString = JSON.stringify(responseJSON);
  return respond(request, response, 500, responseString, 'application/json');
};

const notImplemented = (request, response, params, acceptedTypes) => {
  const responseJSON = {
    message: 'This resource has yet to be implemented',
    id: 'notImplemented',
  };

  if (acceptedTypes[0] === 'text/xml') {
    let responseXML = '<response>';
    responseXML = `${responseXML} <message> ${responseJSON.message} </message>`;
    responseXML = `${responseXML} <id> ${responseJSON.id} </id>`;
    responseXML = `${responseXML} </response>`;

    return respond(request, response, 501, responseXML, 'text/xml');
  }

  const responseString = JSON.stringify(responseJSON);
  return respond(request, response, 501, responseString, 'application/json');
};

const notFound = (request, response, params, acceptedTypes) => {
  const responseJSON = {
    message: 'The page you are looking for was not found.',
    id: 'notFound',
  };

  if (acceptedTypes[0] === 'text/xml') {
    let responseXML = '<response>';
    responseXML = `${responseXML} <message> ${responseJSON.message} </message>`;
    responseXML = `${responseXML} <id> ${responseJSON.id} </id>`;
    responseXML = `${responseXML} </response>`;

    return respond(request, response, 404, responseXML, 'text/xml');
  }

  const responseString = JSON.stringify(responseJSON);
  return respond(request, response, 404, responseString, 'application/json');
};


module.exports = {
  success,
  badRequest,
  unauthorized,
  forbidden,
  internal,
  notImplemented,
  notFound,
};
