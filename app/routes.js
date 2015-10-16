
var utility = require('./models/utilities.js');
var loginAuth = require('./models/loginAuth');
var viewLicense = require('./models/viewLicense');
/*var Todo = require('./models/todo');

function getTodos(res){
	Todo.find(function(err, todos) {

			// if there is an error retrieving, send the error. nothing after res.send(err) will execute
			if (err)
				res.send(err)

			res.json(todos); // return all todos in JSON format
		});
};*/
/*Pallav Jain*/


module.exports = function(app) {

	app.post('/authenticate',function(req,res){
		console.log("Authenticated called");
		loginAuth.authenticateUser(req,res);
	});

	app.post('/api/requestLicense', function(req, res) {
		console.log("Request License request received" + req.body.mydata);
		utility.requestLicense(req);
		res.send("License requested");
	});

	app.get('/api/viewLicense/:username', function(req, res) {
		console.log("viewLicense request - " + req.params.username);
		viewLicense.getSoftwareLicenses(req.params.username,function(allAssets){
			console.log('All assets' + JSON.stringify(allAssets));
			res.send(allAssets);
		});
	});

	app.get('/api/viewMyRequests/:username', function(req, res) {
		console.log("viewMyRequests request - " + req.params.username);
		utility.myPendingTasks(req.params.username,function(myTasks){
			res.send(myTasks);
		});
	});

	app.get('/api/viewMyPendingRequests/:username', function(req, res) {
		console.log("viewMyRequests request - " + req.params.username);
		utility.viewMyPendingRequests(req.params.username,function(myTasks){
			res.send(myTasks);
		});
	});

	

	app.post('/api/signup', function(req, res) {
		console.log("User Sign up request received" );
		utility.signUpUser(req);
		res.send("User Created Successfully. Click ok to login");
	 });

	app.post('/api/issueLicense', function(req, res) {
		console.log("Issue License request received" + req.body.mydata);
		utility.issueLicense(req);
		res.send("License Issued");
	});

	app.post('/api/transfer', function(req, res) {
	console.log("Transfer Request received");
	console.log(req);
	utility.transferLicense(req);
	res.send("Transfer Completed");
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