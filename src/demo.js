import React, { useState, useEffect } from "react";
import DataTable from "react-data-table-component";
import axios from "axios";
import usePagination from "./usePagination";
import { ExportAssetsToExcel } from "./ExportToExcel";
import { ExportAssetsToJson } from "./ExportToJson";
function RctTable() {
  const [data, setData] = useState([]);
  const [uniqueCountryCodes, setUniqueCountryCodes] = useState([]);
  const {
    currentPage,
    itemsPerPage,
    paginate,
    changeItemsPerPage,
    getPaginatedData,
  } = usePagination();
  const [newRowData, SetNewRowData] = useState({
    PG: "",
    MODEL: "",
    DESCRIPTION: "",
    Country_Code: "",
  });
  const [editingRow, setEditingRow] = useState(null);
  const [editingData, setEditingData] = useState({});
  const [selectedRows, setSelectedRows] = useState([]);

  const columns = [
    {
      name: "pg",
      selector: (row) => row.PG,
      sortable: true,
      width: "80px",
    },
    {
      name: "Model",
      selector: (row) => row.MODEL,
      width: "200px",
    },
    {
      name: "Description",
      selector: (row) => row.DESCRIPTION,
      width: "400px",
      wrap: false,
      cell: (row) =>
        editingRow && editingRow._id === row._id ? (
          <input
            type="text"
            value={editingData[row._id]?.DESCRIPTION || row.DESCRIPTION}
            onChange={(e) => handleCellChange(e, row, "DESCRIPTION")}
            onBlur={() => handleCellBlur(row._id)}
            style={{ width: "300px" }}
          />
        ) : (
          row.DESCRIPTION
        ),
    },

    {
      name: "Country_Code",
      selector: (row) => row.Country_Code,
      width: "200px",
      cell: (row) =>
        editingRow && editingRow._id === row._id ? (
          <select
            type="text"
            value={editingData[row._id]?.Country_Code || row.Country_Code}
            onChange={(e) => handleCellChange(e, row, "Country_Code")}
            onBlur={() => handleCellBlur(row._id)}
            style={{ width: "50px" }}
          >
            {uniqueCountryCodes.map((code) => (
              <option key={code} value={code}>
                {code}
              </option>
            ))}
          </select>
        ) : (
          row.Country_Code
        ),
    },

    {
      name: "Edit",

      cell: (row) =>
        editingRow && editingRow._id === row._id ? (
          <div>
            <img
              src="images/close.png"
              alt="cancle logo"
              style={{ width: "20px", height: "20px" }}
              onClick={() => setEditingRow(null)}
            ></img>
          </div>
        ) : (
          <img
            src="images/edit.png"
            alt="edit logo"
            style={{ width: "20px", height: "20px" }}
            onClick={() => handleEditClick(row)}
          ></img>
        ),
    },

    {
      name: "save",
      cell: (row) => (
        // <button onClick={() => handleSaveEdit(row)}>save</button>
        <img
          src="images/diskette.png"
          alt="save logo"
          style={{ width: "20px", height: "20px" }}
          onClick={() => handleSaveEdit(row)}
        ></img>
      ),
    },
    {
      name: "Delelte",
      cell: (row) => (
        <img
          src="images/bin.png"
          alt="delete logo"
          style={{ width: "20px", height: "20px" }}
          onClick={() => handleDelete(row)}
        ></img>
      ),
    },
  ];

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get("http://localhost:3010/AssetMaster");

      setData(response.data.data);
      console.log(response.data.data[0]._id);

      const uniqueCountry = [
        ...new Set(response.data.data.map((item) => item["Country_Code"])),
      ];
      setUniqueCountryCodes(uniqueCountry);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleSaveNewRow = async () => {
    try {
      if (!newRowData.PG || !newRowData.MODEL || !newRowData.DESCRIPTION) {
        alert("please fill all the details");
        return;
      }
      await axios.post("http://localhost:3010/AssetMaster", newRowData);

      SetNewRowData({
        PG: "",
        MODEL: "",
        DESCRIPTION: "",
        Country_Code: "",
      });
      fetchData();
    } catch (error) {
      console.error("Error while adding new asset:", error);
    }
  };

  const handleEditClick = (row) => {
    setEditingRow(row);
  };
  const handleDelete = async (row) => {
    try {
      await axios.delete(`http://localhost:3010/deleteAsset/${row._id}`);
      const UpdateData = data.filter((item) => item._id !== row._id);

      setData(UpdateData);
      console.log("Row deleted successfully");
    } catch (error) {
      console.error("Error deleting asset:", error);
    }
  };

  const handleCellChange = (e, row, field) => {
    const updatedEditedData = { ...editingData };
    if (!updatedEditedData[row._id]) {
      updatedEditedData[row._id] = {};
    }
    if (e.target.value.trim() !== "") {
      updatedEditedData[row._id][field] = e.target.value;
    } else {
      updatedEditedData[row._id][field] = " ";
    }
    setEditingData(updatedEditedData);
  };

  const handleCellBlur = (rowId) => {
    if (editingData[rowId]) {
      const updatedData = [...data];
      const editingRow = updatedData.find((item) => item._id === rowId);

      if (editingRow) {
        if (editingData[rowId].PG) {
          editingRow.PG = editingData[rowId].PG;
        }

        if (editingData[rowId].MODEL) {
          editingRow.MODEL = editingData[rowId].MODEL;
        }
        if (editingData[rowId].DESCRIPTION) {
          editingRow.DESCRIPTION = editingData[rowId].DESCRIPTION;
        }
        if (editingData[rowId].Country_Code) {
          editingRow.Country_Code = editingData[rowId].Country_Code;
        }
      }
    }

    setEditingRow(null);
  };

  const handleSaveEdit = async (row) => {
    try {
      const response = await axios.put(
        `http://localhost:3010/updateAssetMaster/${row._id}`,
        {
          PG: editingData[row._id]?.PG || row.PG,
          MODEL: editingData[row._id]?.MODEL || row.MODEL,
          DESCRIPTION: editingData[row._id].DESCRIPTION || row.DESCRIPTION,
          Country_Code: editingData[row._id].Country_Code || row.Country_Code,
        }
      );
      if (response.status === 200) {
        fetchData();
        setEditingRow(null);
        console.log("saved data");
      } else {
        console.error("update failed with status:", response.status);
      }

      // setData(updatedData)
    } catch (error) {
      console.error("Error Updating Asset:", error);
    }
  };

  const handleRowSelected = (rows) => {
    setSelectedRows(rows.selectedRows);
  };

  return (
    <div className="dataTable2">
      <div className="input2-textBox">
        <form>
          <input
            type="text"
            name="PG"
            placeholder="PG"
            value={newRowData.PG}
            onChange={(e) =>
              SetNewRowData({ ...newRowData, PG: e.target.value })
            }
            className="text-box"
          />

          <input
            type="text"
            name="MODEL"
            placeholder="MODEL"
            value={newRowData.MODEL}
            onChange={(e) =>
              SetNewRowData({ ...newRowData, MODEL: e.target.value })
            }
            className="text-box"
          />

          <input
            type="text"
            name="DESCRIPTION"
            placeholder="DESCRIPTION"
            value={newRowData.DESCRIPTION}
            onChange={(e) =>
              SetNewRowData({ ...newRowData, DESCRIPTION: e.target.value })
            }
            className="text-box"
          />
          <select
            value={newRowData.Country_Code}
            onChange={(e) =>
              SetNewRowData({ ...newRowData, Country_Code: e.target.value })
            }
          >
            <option value="">Select CountryCode</option>
            {uniqueCountryCodes.map((code) => (
              <option key={code} value={code}>
                {code}
              </option>
            ))}
          </select>
          <button
            className="form-submit-btn"
            type="button"
            onClick={handleSaveNewRow}
          >
            Submit
          </button>
        </form>
      </div>

      <DataTable
        columns={columns}
        // data={data}
        data={getPaginatedData(data)}
        customStyles={customStyles}
        selectableRows
        selectableRowsHighlight
        fixedHeader
        fixedHeaderScrollHeight="450px"
        highlightOnHover
        onSelectedRowsChange={handleRowSelected}
      />
      <ExportAssetsToExcel data={data} selectedRows={selectedRows} />
      <ExportAssetsToJson data={data} selectedRows={selectedRows} />

      {/* pagination and css for table */}
      <div className="Pagination">
        <img
          src="images/previous.png"
          className="previous-btn"
          alt="previous logo"
          style={{ width: "20px", height: "20px" }}
          onClick={() => {
            if (currentPage > 1) {
              paginate(currentPage - 1);
            }
          }}
          disabled={currentPage === 1}
        ></img>
        <span className="page-info">page {currentPage}</span>

        <img
          src="images/next.png"
          className="Next-btn"
          alt="next logo"
          style={{ width: "20px", height: "20px" }}
          onClick={() => paginate(currentPage + 1)}
        ></img>
      </div>
    </div>
  );
}

const customStyles = {
  headRow: {
    style: {
      backgroundColor: "green",
      color: "white",
    },
  },
  headCells: {
    style: {
      fontSize: "16px",
      fontWeight: "600",
      textTransform: "uppercase",
    },
  },
  cells: {
    style: {
      fontSize: "15px",
    },
  },
};

export default RctTable;

// fetch('/api/auth/token')
// .then(response =>response.json())
// .then(data =>{const access_token=data.access_token;
// fetch('https://developer.api.autodesk.com/modelderivative/v2/designdata/dXJuOmFkc2sud2lwcHJvZDpmcy5maWxlOnZmLnNqNVUyTE9vVFZtU1BhMVhWZGhNNmc_dmVyc2lvbj0x/metadata/c11a3f33-443f-44f7-964b-32bf74c21d11',
//  {
//   method: 'GET',
//   headers: {
//     'Authorization': 'Bearer ' + access_token
//   }

// })
// .then(res => res.json())
// .then(data1=>{
//     console.log(data1);
//     const data = data1.data;
//     console.log(data);
//     const objects = data.objects;
//     console.log(objects);

// let tableData_P3001_CablewayBoq="";
// const assetmap = new Map();
// assetmap.set("CableWay",data.objects[0].objects[0].objects);
// console.log(data.objects[0].objects[0].objects[0].name);
// const text= data.objects[0].objects[0].objects[0].name;
// const compslice = text.slice(-5);
// console.log(compslice);

// assetmap.forEach((value,key)=>{
//   const name= value.name;
//   const objectid = value.objectid;

//   value.map((values)=>{
//   tableData_P3001_CablewayBoq+=` <tr>
//   <td>${values.name.slice(-5)}</td>
//   <td>${values.name}</td>
//   <td>${key}</td>
//   <td>${1}</td>
//   </tr>  `;
// });

// has context menu
// Compose
