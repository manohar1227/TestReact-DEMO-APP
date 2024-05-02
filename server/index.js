const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

mongoose
  .connect(
    "mongodb://myTester:Mong0U2s3e4.ap-south-1.compute.amazonaws.com/test",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => {
    console.log("connected to Mongo DB");
  })
  .catch((err) => {
    console.error("Could not connect to MongoDB", err);
  });

const assetSchema = new mongoose.Schema({
  PG: String,
  MODEL: String,
  DESCRIPTION: String,
  Country_Code: String,
});

const Asset = mongoose.model("assests_masters", assetSchema);

app.get("/AssetMaster", async (req, res) => {
  try {
    const AssetData = await Asset.find({});
    console.log(AssetData);
    res.send({ data: AssetData });
  } catch (error) {
    console.log("error while fetching data");
  }
});

app.get("/api/test", async (req, res) => {
  try {
    res.send("server  connected ");
  } catch (error) {
    console.log("error while connecting to server");
  }
});

app.post("/AssetMaster", async (req, res) => {
  try {
    const { PG, MODEL, DESCRIPTION, Country_Code } = req.body;

    const newAsset = new Asset({
      PG,
      MODEL,
      DESCRIPTION,
      Country_Code,
    });

    await newAsset.save();
    res.status(201).json(newAsset);
  } catch (error) {
    console.error("Error adding new asset:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.put("/updateAssetMaster/:_id", async (req, res) => {
  const assetId = req.params._id;

  try {
    const updatedAsset = await Asset.findByIdAndUpdate(
      assetId,
      {
        $set: {
          PG: req.body.PG,
          MODEL: req.body.MODEL,
          DESCRIPTION: req.body.DESCRIPTION,
          Country_Code: req.body.Country_Code,
        },
      },
      { new: true }
    );
    if (!updatedAsset) {
      return res.status(404).json({ error: "Asset not found" });
    }

    res.status(200).json(updatedAsset);
    console.log(updatedAsset);
  } catch (error) {
    console.error("Error Updating asset:", error);
    res.status(500).json({ error: "Internal sever Error" });
  }
});

app.delete("/deleteAsset/:_id", async (req, res) => {
  const _id = req.params._id;
  try {
    const deleteAsset = await Asset.findByIdAndDelete(_id);
    if (!deleteAsset) {
      return res.status(404).json({ error: "Asset not found" });
    }
    res.status(200).json({ message: "asset deleted successfully" });
  } catch (error) {
    console.error("error deleteing asset", error);
    res.status(500).json({ error: "server error" });
  }
});
console.log("server running");
app.listen(3010, () => {
  console.log("server running");
});
