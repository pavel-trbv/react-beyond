const service = service => {

  return async function(req, res, next) {

    let _response;

    switch(req.method) {

      case 'GET':
        if (!req.params[0]) {
          _response = await service.find(req.query);
          res.json(_response);
        } else {
          _response = await service.get(req.params[0], req.query);
          res.json(_response);
        }
        break;

      case 'POST':
        _response = await service.create(req.body);
        res.json(_response);
        break;
      
      case 'PUT':
        _response = await service.update(req.params[0]);
        res.json(_response);
        break;

      case 'PATCH':
        _response = await service.patch(req.params[0]);
        res.json(_response);
        break;

      case 'DELETE': 
        _response = await service.remove(req.params[0]);
        res.json(_response);
        break;
    }
  }
}

const url = url => {
  return [url, url + '/*'];
}

export { service, url }