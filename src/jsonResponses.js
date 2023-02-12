const respond = (request, response, content, type, status) => {
  response.writeHead(status, { 'Content-Type': type });
  response.write(content);
  response.end();
};

const getMessage = (request, response, acceptedTypes, status, responsObj) => {
  const messageObj = {
    message: responsObj.message,
    id: responsObj.id,
  };

  if (acceptedTypes[0] === 'text/xml') {
    let responseXML = '<response>';
    responseXML = `${responseXML} <message>${messageObj.message}</message>`;
    responseXML = `${responseXML} <id>${messageObj.id}</id>`;
    responseXML = `${responseXML} </response>`;

    return respond(request, response, responseXML, 'text/xml', 200);
  }

  const messageString = JSON.stringify(messageObj);

  return respond(request, response, messageString, 'application/json', 200);
};

const success = (request, response, acceptedTypes) => {
  const responseJSON = {
    message: 'This is a Successful Response',
    id: 'Success',
  };

  getMessage(request, response, acceptedTypes, 200, responseJSON);
};

const badRequest = (request, response, acceptedTypes, params) => {
  const responseJSON = {
    message: 'This is a Successful Response',
    id: 'Success',
  };

  if (!params.valid || params.valid !== 'true') {
    responseJSON.message = 'Missing valid query parameter set to true';
    responseJSON.id = 'badRequest';
    return getMessage(request, response, acceptedTypes, 400, responseJSON);
  }
  return getMessage(request, response, acceptedTypes, 200, responseJSON);
};

const unauthorized = (request, response, acceptedTypes, params) => {
  const responseJSON = {
    message: 'This is a Successful Response',
    id: 'Success',
  };

  if (!params.loggedIn || params.loggedIn !== 'true') {
    responseJSON.message = 'lacks valid authentication credentials for the requested resource';
    responseJSON.id = 'unauthorized';
    return getMessage(request, response, acceptedTypes, 401, responseJSON);
  }
  return getMessage(request, response, acceptedTypes, 200, responseJSON);
};

const forbidden = (request, response, acceptedTypes) => {
  const responseJSON = {
    message: 'access to the page or resource you were trying to reach is blocked',
    id: 'forbidden',
  };

  getMessage(request, response, acceptedTypes, 403, responseJSON);
};

const internalError = (request, response, acceptedTypes) => {
  const responseJSON = {
    message: 'Internal Error, something went wrong',
    id: 'internalError',
  };

  getMessage(request, response, acceptedTypes, 500, responseJSON);
};

const notImplemeneted = (request, response, acceptedTypes) => {
  const responseJSON = {
    message: 'a get request for this page has not been implemented yet.',
    id: 'notImplemeneted',
  };

  getMessage(request, response, acceptedTypes, 501, responseJSON);
};

const resourcesNotFound = (request, response, acceptedTypes) => {
  const responseJSON = {
    message: 'the page you are looking for was not found.',
    id: 'notFound',
  };

  getMessage(request, response, acceptedTypes, 404, responseJSON);
};

module.exports = {
  getMessage,
  success,
  badRequest,
  unauthorized,
  forbidden,
  internalError,
  notImplemeneted,
  resourcesNotFound,
};
