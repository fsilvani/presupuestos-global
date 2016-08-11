var apiRoutes = require('./apiRoutes');

module.exports = function(app){
  app.get('/api/presupuestos/get', function(req, res){
    apiRoutes.findAllBudgets(function(results){
      res.json(results);
    });
  });
  app.get('/api/presupuestos/get/:_budgetId', function(req, res){
    apiRoutes.findBudgetById(req.params._budgetId, function(results){
      res.json(results);
    });
  });
  app.post('/api/presupuestos/post', function(req, res){
    apiRoutes.saveBudget(req.body, function(results){
      res.json(results);
    });
  });
  app.delete('/api/presupuestos/delete/:_budgetId', function(req, res){
    apiRoutes.removeBudget(req.params._budgetId, function(results){
      res.json(results);
    });
  });

  app.get('/api/clientes/get', function(req, res){
    apiRoutes.findAllClients(function(results){
      res.json(results);
    });
  });
  app.get('/api/clientes/get/:_clientId', function(req, res){
    apiRoutes.findClientById(req.params._clientId, function(results){
      res.json(results);
    });
  });
  app.post('/api/clientes/post', function(req, res){
    apiRoutes.saveClient(req.body, function(results){
      res.json(results);
    });
  });
  app.delete('/api/clientes/delete/:_clientId', function(req, res){
    apiRoutes.removeClient(req.params._clientId, function(results){
      res.json(results);
    });
  });
  app.put('/api/clientes/update', function(req, res){
    apiRoutes.updateClient(req.body, function(results){
      res.json(results);
    });
  });

  app.get('/api/pagos/get', function(req, res){
    apiRoutes.findAllPayments(function(results){
      res.json(results);
    });
  });
  app.get('/api/pagos/get/:_paymentId', function(req, res){
    apiRoutes.findPaymentById(req.params._paymentId, function(results){
      res.json(results);
    });
  });
  app.post('/api/pagos/post', function(req, res){
    apiRoutes.savePayment(req.body, function(results){
      res.json(results);
    });
  });
  app.delete('/api/pagos/delete/:_paymentId', function(req, res){
    apiRoutes.removePayment(req.params._paymentId, function(results){
      res.json(results);
    });
  });
};
