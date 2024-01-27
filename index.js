const express = require("express");
const bodyParser = require("body-parser");
const axios = require("axios");

const url = "xyz";

const app = express();

app.use(bodyParser.json());

app.post("/webhook", (req, res) => {
  console.log("Received Webhook:", req.body);
  const webhookData = req.body;

  if (webhookData && webhookData.event) {
    // Assume the event data contains necessary details for Schlage API request
    const schlageApiRequestData = {
      lockId: webhookData.lockId,
      code: webhookData.code,
    };

    // Now just replace the url you can Api Request to Schalage.
    axios
      .post(url, schlageApiRequestData)
      .then((response) => {
        console.log("API request to Schlage successful:", response.data);
        res
          .status(200)
          .send("Webhook event received and API request sent to Schlage.");
      })
      .catch((error) => {
        console.error("Error making API request to Schlage:", error.message);
        res.status(500).send("Internal Server Error");
      });
  } else {
    console.error("Invalid webhook data:", webhookData);
    res.status(400).send("Bad Request");
  }
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
