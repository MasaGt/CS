const http = require("http");
const soap = require("soap");

// Define the service implementation
const mySOAP = {
  myService: {
    myPort: {
      sayHello: function (args) {
        return {
          msg: `Hello, ${args.name}`,
        };
      },
      getAllUsers: function (args) {
        return {
          users: [
            { name: "user1", age: 10 },
            { name: "uesr2", age: 20 },
            { name: "user3", age: 30 },
          ],
        };
      },
    },
  },
};

// Create the SOAP server
const xml = require("fs").readFileSync("./myservice.wsdl", "utf8");
var server = http.createServer(function (request, response) {
  response.end("404: Not Found: " + request.url);
});
server.listen(8000);
const soapServer = soap.listen(server, "/greeting", mySOAP, xml, function () {
  console.log("SOAP server running at http://localhost:8000/greeting?wsdl");
});

soapServer.log = function (type, data, req) {
  console.log(data);
};
