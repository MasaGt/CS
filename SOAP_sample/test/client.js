const soap = require("soap");

// Create the SOAP client
const url = "http://localhost:8000/MyFunction?wsdl";

soap.createClient(url, {}, function (err, client) {
  if (err) {
    console.error("Error creating SOAP client:", err);
    return;
  }

  console.log(`describe: ${JSON.stringify(client.describe())}`);
  // Make a SOAP request
  const args = { name: "Andy" };
  client.MyFunction(
    args,
    function (err, result, rawResponse, soapHeader, rawRequest) {
      if (err) {
        console.error("Error making SOAP request:", err);
        return;
      }

      // console.log(`rawResponse: ${rawResponse}`);
      // console.log(`rawRequest: ${rawRequest}`);

      // Handle the SOAP response
      console.log("result:", result);
    }
  );
});
