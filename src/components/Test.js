import React, { useEffect, useState } from "react";

const Test = () => {
  const [responseMessage, setResponseMessage] = useState("");

  useEffect(() => {
    const testServerConnection = async () => {
      try {
        const response = await fetch(
          "https://testreact-demo-app-backend.onrender.com/api/test"
        );
        const data = await response.text();
        console.log(data);
        setResponseMessage(data);
      } catch (error) {
        setResponseMessage("Error connecting to the server.");
      }
    };

    testServerConnection();
  }, []);

  return (
    <div>
      <div>{responseMessage}</div>
    </div>
  );
};

export default Test;
