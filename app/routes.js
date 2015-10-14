var utility = require('./models/utilities.js');

module.exports = function(app) {

	// api ---------------------------------------------------------------------
	// get all todos
	app.get('/api/viewLicense', function(req, res) {
		console.log("get Request Received");
	});

	app.post('/api/signup', function(req, res) {
		console.log("User Sign up request received");
		utility.signUpUser(req);
		res.send("User Created");
	 });

	// create todo and send back all todos after creation
	/*app.post('/api/todos', function(req, res) {

		// create a todo, information comes from AJAX request from Angular
		Todo.create({
			text : req.body.text,
			done : false
		}, function(err, todo) {
			if (err)
				res.send(err);

			// get and return all the todos after you create another
			getTodos(res);
		});

	});

	// delete a todo
	app.delete('/api/todos/:todo_id', function(req, res) {
		Todo.remove({
			_id : req.params.todo_id
		}, function(err, todo) {
			if (err)
				res.send(err);

			getTodos(res);
		});
	});*/

	// application -------------------------------------------------------------
	app.get('/', function(req, res) {
		res.sendfile('./public/index.html'); // load the single view file (angular will handle the page changes on the front-end)
	});
};