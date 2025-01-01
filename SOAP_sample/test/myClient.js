const soap = require("soap");

// Create the SOAP client
const url = "http://localhost:8000/greeting?wsdl";

soap.createClient(url, {}, function (err, client) {
  if (err) {
    console.error("Error creating SOAP client:", err);
    return;
  }
  //
  // Make a SOAP request
  //   const args = { name: "Andy" };
  //   client.sayHello(

  //   const args = null; // wsdl のメッセージ形式が rpc のとき
  const args = {}; // wsdl のメッセージ形式が document のとき
  client.getAllUsers(
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
