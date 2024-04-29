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

// const express = require("express");
// const session = require("cookie-session");
// const cors = require("cors");
// const mongoose = require("mongoose");
// const { PORT, SERVER_SESSION_SECRET } = require("./config");
// //const UserModel = require('./Models/Test')

// let app = express();

// app.post("/post", (req, res) => {
//   console.log("Connected to React");
//   res.redirect("/");
// });
// app.use(cors());
// app.use(express.static("src"));
// app.use(
//   session({
//     secret: SERVER_SESSION_SECRET,
//     maxAge: 24 * 60 * 60 * 1000,
//   })
// );
// app.use(require("./routes/auth"));
// app.use(require("./routes/hubs"));
// app.use(cors());
// app.use(express.json());

// mongoose.connect("mongodb+srv://sipra23:sipra23nayak@cluster0.lhxt429.mongodb.net/Test",
// {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// }
// )
// .then(() => {
//   console.log("connected to Mongo DB");
// })
// .catch((err) => {
//   console.error("Could not connect to MongoDB", err);
// });
// const UserSchema = new mongoose.Schema({
//   name: String,
//   objectid: Number,
//   //name: String,
// });

// const UserModel = mongoose.model("TestingFile", UserSchema);

// app.post("/boq", async (req, res) => {
//   try {
//     const { name,objectid } = req.body;

//     const newUserModel : new UserModel({
//       name,
//       objectid,
//       //name,
//     });

//     await newUserModel.save();
//     res.status(201).json(newUserModel);
//   } catch (error) {
//     console.error("Error adding new asset:", error);
//     res.status(500).json({ error: "Internal Server Error" });
//   }
// });

// app.listen(PORT, () => console.log(`Server listening on port ${PORT}...`));

// import React, { useEffect, useState, useRef } from "react";
// import { ReactDOM } from "react";
// import DataTable from "react-data-table-component";
// import { ExportToExcel } from "./ExportToExcel";
// import { ExportToJson } from "./ExportToJson";
// import "./tab.css";
// import usePagination from "./pagination";
// import axios from "axios";

// function BoqTable({ formaturn, guid }) {
//   console.log(typeof formaturn);
//   const [records, setRecords] = useState([]);
//   const [tableData, setTableData] = useState([]);
//   const [selectedRows, setSelectedRows] = useState([]);

//   useEffect(() => {
//     async function fetchData() {
//       try {

//         console.log("getTableData");
//         const tokenResponse = await fetch("/api/auth/token");
//         const { access_token } = await tokenResponse.json();
//         console.log("access_token");
//         const response = await fetch(
//           `https://developer.api.autodesk.com/modelderivative/v2/designdata/${formaturn}/metadata/${guid}`,
//           {
//             method: "GET",
//             headers: {
//               Authorization: `Bearer ${access_token}`,
//             },
//           }
//         );

//         const data = await response.json();
//         console.log(data);

//         const objects = data.data.objects[0].objects;
//         console.log(objects);
//         setRecords(objects);
//         setTableData(objects);

//         console.log("called boqdata function");
//       } catch (error) {
//         console.error("Error fetching data:", error);
//       }
//     }
//     fetchData();
//   }, [formaturn, guid]);
//   const columns = [
//     {
//       name: "Name",
//       selector: (row) => row.name,
//       sortable: true,
//     },
//     {
//       name: "Model ID",
//       selector: (row) => row.objectid,
//       center: true,
//       sortable: true,
//       width: "130px",
//     },
//     {
//       name: "Category",
//       sortable: true,
//       width: "140px",
//       selector: (row) => row.name,
//     },
//     {
//       name: "Unit Cost",
//       sortable: true,
//       width: "140px",
//     },
//     {
//       name: "Country Code",
//       sortable: true,
//       width: "180px",
//     },
//     {
//       name: "Quantity",
//       sortable: true,
//     },
//   ];

//   const handleRowSelected = (rows) => {
//     setSelectedRows(rows.selectedRows);
//   };

//   const Filter = (event) => {
//     setRecords(
//       tableData.filter((f) => f.name.toLowerCase().includes(event.target.value))
//     );
//   };

//   const Submit = async () => {
//     try {
//     // Extracting only the required properties from each record
//     const dataToSend = records.map(({ name, objectid }) => ({ name, objectid }));
//     // Assuming you have an API endpoint to post data to MongoDB
//     const response = await axios.post("http://localhost:3000/boq", dataToSend);
//     console.log("Data saved:", response.data);
//     } catch (error) {
//     console.error("Error saving data:", error);
//     }
//     };

//   return (
//     <div className="datatable" id="boq-table">
//       <DataTable
//         columns={columns}
//         data={records}
//         customStyles={customStyles}
//         fixedHeader
//         fixedHeaderScrollHeight="345px"
//         highlightOnHover
//         pagination
//         selectableRows
//         selectableRowsHighlight
//         onSelectedRowsChange={handleRowSelected}
//       ></DataTable>
//       <button className="save-btn" onClick={Submit}>Submit</button>
//       <button className="save-btn">Release To ERP</button>
//     </div>
//   );
// }

// const customStyles = {
//   headRow: {
//     style: {
//       backgroundColor: "#343a40",
//       color: "white",
//       backgroundColor: "grey",
//       minHeight: "25px",
//     },
//   },
//   headCells: {
//     style: {
//       fontSize: "12px",
//       fontWeight: "500",
//       textTransform: "uppercase",

//     },
//   },
//   cells: {
//     style: {
//       backgroundColor: "#343a40",
//       color: "white",
//       fontSize: "12px",
//       // width:"10px",
//     },
//   },
//   rows: {
//     style: {
//       minHeight: "25px",
//       "&:not(:last-of-type)": {
//         borderBottomStyle: "solid",
//         borderBottomWidth: "0px",
//       },
//     },
//   },
// };
// export default BoqTable;
// has context menu

// const express = require("express");
// const session = require("cookie-session");
// const cors = require("cors");
// const mongoose = require("mongoose");
// const { PORT, SERVER_SESSION_SECRET } = require("./config");
// //const UserModel = require('./Models/Test')

// const app = express();

// app.post("/post", (req, res) => {
//   console.log("Connected to React");
//   res.redirect("/");
// });
// app.use(cors());
// app.use(express.static("src"));
// app.use(
//   session({
//     secret: SERVER_SESSION_SECRET,
//     maxAge: 24 * 60 * 60 * 1000,
//   })
// );
// app.use(require("./routes/auth"));
// app.use(require("./routes/hubs"));
// app.use(cors());
// app.use(express.json());

// mongoose.connect("mongodb+srv://sipra23:sipra23nayak@cluster0.lhxt429.mongodb.net/Test",
// {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// }
// )
// .then(() => {
//   console.log("connected to Mongo DB");
// })
// .catch((err) => {
//   console.error("Could not connect to MongoDB", err);
// });

//     console.log(req.body);
//     // const saveboq= await newUserModel.save();
//     // res.status(201).json(saveboq);
//     await newUserModel.save(function(err){
//       if(err){
//            console.log(err);
//            return;
//       }});
//   } catch (error) {
//     console.error("Error adding new asset:", error);
//     res.status(500).json({ error: "Internal Server Error" });
//   }
// });
// app.listen(PORT, () => console.log(`Server listening on port ${PORT}...`));

// const IssuesSchema = new mongoose.Schema({
//   title:String,
//   description:String,
//   locationDetails:String,
//   startDate:Date,
//   status:String,
//   dueDate:Date,

// });

// const IssuesModel = mongoose.model("Issues", UserSchema);

// //app.use(express.json());
// app.post("/boq", async (req, res) => {
//   try {
//     const { name,objectid } = req.body;
//     //const boq = req.body;
//     console.log("Post Method");
//     const newUserModel = new UserModel({

//       name:req.body.name,
//       objectid:req.body.objectid,
//     });
//     console.log("Schema");
