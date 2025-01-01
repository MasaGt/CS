const http = require("http");
const soap = require("soap");

// Define the service implementation
const myService = {
  MyService: {
    MyFunctionPort: {
      MyFunction: function (args) {
        return {
          name: args.name,
        };
      },
    },
  },
};

// Create the SOAP server
const xml = require("fs").readFileSync("./weather.wsdl", "utf8");
var server = http.createServer(function (request, response) {
  response.end("404: Not Found: " + request.url);
});
server.listen(8000);
const soapServer = soap.listen(
  server,
  "/MyFunction",
  myService,
  xml,
  function () {
    console.log("SOAP server running at http://localhost:8000/weather?wsdl");
  }
);

soapServer.log = function (type, data, req) {
  console.log(data);
};
