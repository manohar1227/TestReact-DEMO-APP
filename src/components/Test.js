import React, { useEffect, useState } from "react";

const Test = () => {
  useEffect(() => {
    const testServerConnection = async () => {
      try {
        const response = await fetch(
          "https://testreact-demo-app-backend.onrender.com/api/test"
        );
        const data = await response.text();
        console.log(data);
      } catch (error) {
        setResponseMessage("Error connecting to the server.");
      }
    };

    testServerConnection();
  }, []);
};

export default Test;
