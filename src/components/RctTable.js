import React, { useState, useEffect } from "react";
import DataTable from "react-data-table-component";
import axios from "axios";
import usePagination from "./usePagination";
// import { ExportAssetsToExcel } from "./ExportToExcel";
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
  // const[filterValue,setFilterValue]=useState(" ")
  // const[filteredData,setFilteredData]=useState([]);
  const columns = [
    {
      name: "pg",
      selector: (row) => row.PG,
      sortable: true,
      width: "80px",
      // cell: (row) =>
      // editingRow && editingRow._id === row._id ? (
      //   <input
      //     type="text"
      //     value={editingData[row._id]?.PG || row.PG}
      //     onChange={(e) => handleCellChange(e, row, "PG")}
      //     onBlur={() => handleCellBlur(row._id)}
      //     style={{width:"50px"}}
      //   />
      // ) : (
      //   row.PG
      // ),
    },
    {
      name: "Model",
      selector: (row) => row.MODEL,
      width: "200px",
      // cell: (row) =>
      // editingRow && editingRow._id === row._id ? (
      //   <input
      //     type="text"
      //     value={editingData[row._id]?.MODEL || row.MODEL}
      //     onChange={(e) => handleCellChange(e, row, "MODEL")}
      //     onBlur={() => handleCellBlur(row._id)}
      //   />
      // ) : (
      //   row.MODEL
      // ),
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
            {/* <button onClick={() => setEditingRow(null)}>cancel</button> */}
            <img
              src="images/close.png"
              alt="cancle logo"
              style={{ width: "20px", height: "20px" }}
              onClick={() => setEditingRow(null)}
            ></img>
          </div>
        ) : (
          // <button onClick={() => handleEditClick(row)}>edit</button>
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

  // const handleFilter = (value) => {
  //   setFilterValue(value);
  //   // const lowerCasefilter = filterValue.toLowerCase();
  //   const newData = data.filter((row) =>{
  //   //  const lowerCaseCountry   = row.Country_Code.toLowerCase();
  //   //  return lowerCaseCountry.includes(lowerCasefilter);
  //       row.Country_Code.toLowerCase().includes(value.toLowerCase());
  //  } );
  //   setFilteredData(newData);
  // };

  useEffect(() => {
    // const fetchData = async () => {
    //   try {
    //     const response = await axios.get("http://localhost:3010/AssetMaster");

    //     setData(response.data.data);
    //     console.log(response.data.data[0]._id);

    //     const uniqueCountry=[...new Set(response.data.data.map((item)=>
    //       item['Country_Code']))];
    //       setUniqueCountryCodes(uniqueCountry)

    //   } catch (error) {
    //     console.error("Error fetching data:", error);
    //   }
    // };
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
  // if(!data || data.length ===0){
  //   return<div>Loding data.... </div>;
  // }
  const handleSaveNewRow = async () => {
    try {
      if (!newRowData.PG || !newRowData.MODEL || !newRowData.DESCRIPTION) {
        alert("please fill all the details");
        return;
      }
      await axios.post("http://localhost:3010/AssetMaster", newRowData);
      // setData([...data,newRowData])
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

  /**
   * The `handleCellBlur` function updates specific fields of a row in the `data` array based on the
   * values in the `editingData` object for that row and then clears the editing state for that row.
   * @param rowId - The `rowId` parameter in the `handleCellBlur` function represents the unique
   * identifier of the row that is being edited in a table or grid. It is used to identify the specific
   * row in the dataset that is currently being edited.
   */
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
        // await axios.post('http://localhost:3010/AssetMaster');
        // setData(response.data.data);
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
            /* The above code snippet is a part of a React component written in JavaScript. It is
           setting the value of an input field to the value of `newRowData.DESCRIPTION` and updating
           the `newRowData` state when the input field value changes. The `onChange` event handler
           is triggered when the input field value changes, and it updates the `DESCRIPTION`
           property of `newRowData` with the new value entered by the user. */
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
      {/* <div style={{ display: "flex", justifyContent: "right" }}>
        <input
          type="text"
          placeholder="search"
          value={filterValue}
          onChange={(e)=>handleFilter(e.target.value)}
          style={{ padding: "6px 10px" }}
        />
      </div> */}

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
      {/* <ExportAssetsToExcel data={data} selectedRows={selectedRows} /> */}
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

        <select
          className="page-select-btn"
          onChange={(e) => {
            const newItemsPerPage = parseInt(e.target.value);
            changeItemsPerPage(newItemsPerPage);
          }}
          value={itemsPerPage}
        >
          <option value={5}>5 Rows</option>
          <option value={10}>10 Rows</option>
          <option value={30}>30 Rows</option>
          <option value={40}>40 Rows</option>
        </select>
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
      backgroundColor: "green",
    },
  },
};

export default RctTable;

// import React, { useState, useEffect } from "react";
// import DataTable from "react-data-table-component";
// import axios from "axios";
// import usePagination from "./usePagination";
// import { ExportAssetsToExcel } from "./ExportToExcel";
// import { ExportAssetsToJson } from "./ExportToJson";
// function RctTable() {
//   const [data, setData] = useState([]);
//   const [uniqueCountryCodes, setUniqueCountryCodes] = useState([]);
//   const {
//     currentPage,
//     itemsPerPage,
//     paginate,
//     changeItemsPerPage,
//     getPaginatedData,
//   } = usePagination();
// const[newRowData,SetNewRowData]=useState({
//   PG:'',
//   MODEL:'',
//   DESCRIPTION:'',
//   Country_Code:'',
// })
// const[editingRow,setEditingRow]=useState(null);
// const[editingData,setEditingData]=useState({});
// const columns = [

//   {
//     name: "pg",
//     selector: (row) => row.PG,
//     sortable: true,
//     width: "80px",
//     cell: (row) =>
//     editingRow && editingRow._id === row._id ? (
//       <input
//         type="text"
//         value={editingRow.PG}
//         onChange={(e) => handleCellChange(e, "PG")}
//         onBlur={() => handleCellBlur(row._id)}
//       />
//     ) : (
//       row.PG
//     ),
//   },
//   {
//     name: "Model",
//     selector: (row) => row.MODEL,
//     width: "200px",
//     cell: (row) =>
//     editingRow && editingRow._id === row._id ? (
//       <input
//         type="text"
//         value={editingRow.MODEL}
//         onChange={(e) => handleCellChange(e, "MODEL")}
//         onBlur={() => handleCellBlur(row._id)}
//       />
//     ) : (
//       row.MODEL
//     ),
//   },
//   {
//     name: "Description",
//     selector: (row) => row.DESCRIPTION,
//     width: "400px",
//     // wrap:true,
//     cell: (row) =>
//     editingRow && editingRow._id === row._id ? (
//       <input
//         type="text"
//         value={editingRow.DESCRIPTION}
//         onChange={(e) => handleCellChange(e,"DESCRIPTION")}
//         onBlur={() => handleCellBlur(row._id)}
//       />
//     ) : (
//       row.DESCRIPTION
//     ),
//   },
//   {
//     name: "Country_Code",
//     selector: (row) => row.Country_Code,
//     width: "200px",
//     cell: (row) =>
//     editingRow && editingRow._id === row._id ? (
//       <input
//         type="text"
//         value={editingRow.Country_Code}
//         onChange={(e) => handleCellChange(e,"Country_Code")}
//         onBlur={() => handleCellBlur(row._id)}
//       />
//     ) : (
//       row.Country_Code
//     ),
//   },
//   {
//     name: "Edit",

//     cell: (row) =>
//       editingRow && editingRow._id === row._id ? (
//         <div>
//           <button onClick={() => handleSaveEdit(row)}
//           >Save</button>
//         </div>
//       ) : (
//         <button

//           onClick={() => handleEditClick(row)}
//         >edit</button>
//       ),
//   }
// ];

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await axios.get("http://localhost:3010/AssetMaster");

//         setData(response.data.data);
//         console.log(response.data.data[0]._id);

//         const uniqueCountry=[...new Set(response.data.data.map((item)=>
//           item['Country_Code']))];
//           setUniqueCountryCodes(uniqueCountry)

//       } catch (error) {
//         console.error("Error fetching data:", error);
//       }
//     };
//     fetchData();
//   }, []);

//     const handleSaveNewRow= async()=>{
//       try{
//         if (!newRowData.PG || !newRowData.MODEL || !newRowData.DESCRIPTION) {
//           alert("please fill all the details");
//           return;
//         }
//         await axios.post('http://localhost:3010/AssetMaster',newRowData);
//         setData([...data,newRowData])
//         SetNewRowData({
//           PG:'',
//           MODEL:'',
//           DESCRIPTION:'',
//           Country_Code:'',

//         });
//         // fetchData();
//       }catch(error){
//         console.error('Error while adding new asset:' ,error);
//       }
//     };

//     const handleEditClick=(row)=>{
//       setEditingRow(row);

//     }

// const handleCellChange = (e, row, field) => {
//   const updatedEditedData = { ...editingData };

//   if (!updatedEditedData[row._id]) {
//     updatedEditedData[row._id] = {};
//   }

//   if (e.target.value.trim() !== "") {
//     updatedEditedData[row._id][field] = e.target.value;
//   } else {
//     updatedEditedData[row._id][field] = " ";
//   }

//   setEditingData(updatedEditedData);
// };

// const handleCellBlur = (rowId) => {
//   if (editingData[rowId]) {
//     const  updatedData = [...data];
//     const editingRow = updatedData.find((item) => item._id === rowId);

//     if (editingRow) {
//       if (editingData[rowId].PG) {
//         editingRow.PG = editingData[rowId].PG;
//       }

//       if (editingData[rowId].MODEL) {
//         editingRow.MODEL = editingData[rowId].MODEL;
//       }
//       if (editingData[rowId].DESCRIPTION) {
//         editingRow.DESCRIPTION = editingData[rowId].DESCRIPTION;
//       }
//       if (editingData[rowId].Country_Code) {
//         editingRow.Country_Code = editingData[rowId].Country_Code;
//       }
//     }
//   }

//   setEditingRow(null);
// };

// const handleSaveEdit = async(row)=>{
//   try{
//      await axios.put(`http://localhost:3010/updateAssetMaster/${row._id}`,{
//       PG:editingData[row._id]?.PG || row.PG,
//       MODEL:editingData[row._id]?.MODEL || row.MODEL,
//       DESCRIPTION:editingData[row._id].DESCRIPTION || row.DESCRIPTION,
//       Country_Code:editingData[row._id].Country_Code || row.Country_Code,

//     });
//     // console.log(response.data);
//     // setData((prevData)=>prevData.map((item)=>item._id ===row._id ? {...item, ...response.data}:item))
//     // setEditingRow(null);

//     const response = await axios.get("http://localhost:3010/AssetMaster");
//     setData(response.data.data);
//     setEditingData({});

//     // setData(updatedData)
//   }catch(error){
//     console.error('Error Updating Asset:',error);
//   }
// };

//   return (
//     <div className="dataTable2">
//       <div  className="input2-textBox">
//         <form>
//           <input
//             type="text"
//             name="PG"
//             placeholder="PG"
//             value={newRowData.PG}
//             onChange={(e)=>SetNewRowData({...newRowData, PG:e.target.value})}
//             className="text-box"
//           />

//           <input
//             type="text"
//             name="MODEL"
//             placeholder="MODEL"
//              value={newRowData.MODEL}
//              onChange={(e)=>SetNewRowData({...newRowData, MODEL:e.target.value})}
//             className="text-box"
//           />

//           <input
//             type="text"
//             name="DESCRIPTION"
//             placeholder="DESCRIPTION"
//              value={newRowData.DESCRIPTION}
//             onChange={(e)=>SetNewRowData({...newRowData, DESCRIPTION:e.target.value})}
//             className="text-box"
//           />
//           <select
//           value={newRowData.Country_Code}
//             onChange={(e)=>SetNewRowData({...newRowData, Country_Code:e.target.value})}>
//             <option value=''>Select CountryCode</option>{
//               uniqueCountryCodes.map((code)=>(
//                 <option key={code} value={code}>{code}</option>
//               ))
//             }

//             </select>
//           <button
//             className="form-submit-btn"
//             type="button"
//             onClick={handleSaveNewRow}
//           >
//             Submit
//           </button>
//         </form>
//       </div>

//         <DataTable
//           columns={columns}
//           // data={data}
//           data={getPaginatedData(data)}
//           customStyles={customStyles}
//           selectableRows
//           selectableRowsHighlight
//           fixedHeader
//           fixedHeaderScrollHeight="450px"
//           highlightOnHover
//         />
//       <ExportAssetsToExcel data={data}/>
//       <ExportAssetsToJson data={data}/>

// {/* pagination and css for table */}
//         <div className="Pagination" >
//          <img
//           src="images/previous.png"
//           className="previous-btn"
//           alt="previous logo"
//           style={{ width: "20px", height: "20px" }}
//           onClick={() => {
//             if (currentPage > 1) {
//               paginate(currentPage - 1);
//             }
//           }}
//           disabled={currentPage === 1}
//          ></img>
//           <span className="page-info" >page {currentPage}</span>

//           <img
//           src="images/next.png"
//           className="Next-btn"
//           alt="next logo"
//           style={{ width: "20px", height: "20px" }}
//           onClick={() => paginate(currentPage + 1)}
//         ></img>

//           <select
//             className="page-select-btn"
//             onChange={(e) => {
//               const newItemsPerPage = parseInt(e.target.value);
//               changeItemsPerPage(newItemsPerPage);
//             }}
//             value={itemsPerPage}
//           >
//             <option value={5}>5 Rows</option>
//             <option value={10}>10 Rows</option>
//             <option value={30}>30 Rows</option>
//             <option value={40}>40 Rows</option>
//           </select>
//         </div>
//       </div>

//   );
// }

// const customStyles = {
//   headRow: {
//     style: {
//       backgroundColor: "green",
//       color: "white",
//     },
//   },
//   headCells: {
//     style: {
//       fontSize: "16px",
//       fontWeight: "600",
//       textTransform: "uppercase",
//     },
//   },
//   cells: {
//     style: {
//       fontSize: "15px",
//     },
//   },
// };

// export default RctTable;

// v1copy

// import React, { useState, useEffect } from "react";
// import DataTable from "react-data-table-component";
// import axios from "axios";
// import usePagination from "./usePagination";
// import { ExportAssetsToExcel } from "./ExportToExcel";
// import { ExportAssetsToJson } from "./ExportToJson";
// function RctTable() {
// const columns = [

//   {
//     name: "pg",
//     selector: (row) => row.PG,
//     sortable: true,
//     width: "80px",
//     cell: (row) =>
//     editingRow && editingRow._id === row._id ? (
//       <input
//         type="text"
//         value={editingData[row._id]?.PG || row.PG}
//         onChange={(e) => handleCellChange(e, row, "PG")}
//         onBlur={() => handleCellBlur(row._id)}
//       />
//     ) : (
//       row.PG
//     ),
//   },
//   {
//     name: "Model",
//     selector: (row) => row.MODEL,
//     width: "200px",
//     cell: (row) =>
//     editingRow && editingRow._id === row._id ? (
//       <input
//         type="text"
//         value={editingData[row._id]?.MODEL || row.MODEL}
//         onChange={(e) => handleCellChange(e, row, "MODEL")}
//         onBlur={() => handleCellBlur(row._id)}
//       />
//     ) : (
//       row.MODEL
//     ),
//   },
//   {
//     name: "Description",
//     selector: (row) => row.DESCRIPTION,
//     width: "400px",
//     // wrap:true,
//     cell: (row) =>
//     editingRow && editingRow._id === row._id ? (
//       <input
//         type="text"
//         value={editingData[row._id]?.DESCRIPTION || row.DESCRIPTION}
//         onChange={(e) => handleCellChange(e, row, "DESCRIPTION")}
//         onBlur={() => handleCellBlur(row._id)}
//       />
//     ) : (
//       row.DESCRIPTION
//     ),
//   },
//   {
//     name: "Country_Code",
//     selector: (row) => row.Country_Code,
//     width: "200px",
//     cell: (row) =>
//     editingRow && editingRow._id === row._id ? (
//       <input
//         type="text"
//         value={editingData[row._id]?.Country_Code || row.Country_Code}
//         onChange={(e) => handleCellChange(e, row, "Country_Code")}
//         onBlur={() => handleCellBlur(row._id)}
//       />
//     ) : (
//       row.Country_Code
//     ),
//   },
//   {
//     name: "Edit",

//     cell: (row) =>
//       editingRow && editingRow._id === row._id ? (
//         <div>
//           <img
//             src="images/diskette.png"
//             alt="save logo"
//             style={{ width: "20px", height: "20px" }}
//             onClick={() => handleSaveEdit(row)}
//           ></img>
//         </div>
//       ) : (
//         <img
//           src="images/edit.png"
//           alt="edit logo"
//           style={{ width: "20px", height: "20px" }}
//           onClick={() => handleEditClick(row)}
//         ></img>
//       ),
//   }
// ];

//   const [data, setData] = useState([]);
//   const [uniqueCountryCodes, setUniqueCountryCodes] = useState([]);
//   const {
//     currentPage,
//     itemsPerPage,
//     paginate,
//     changeItemsPerPage,
//     getPaginatedData,
//   } = usePagination();
// const[newRowData,SetNewRowData]=useState({
//   PG:'',
//   MODEL:'',
//   DESCRIPTION:'',
//   Country_Code:'',
// })
// const[editingRow,setEditingRow]=useState(null);
// const[editingData,setEditingData]=useState({});

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await axios.get("http://localhost:3010/AssetMaster");

//         setData(response.data.data);
//         console.log(response.data.data[0]._id);

//         const uniqueCountry=[...new Set(response.data.data.map((item)=>
//           item['Country_Code']))];
//           setUniqueCountryCodes(uniqueCountry)

//       } catch (error) {
//         console.error("Error fetching data:", error);
//       }
//     };
//     fetchData();
//   }, []);
//     const handleSaveNewRow= async()=>{
//       try{
//         if (!newRowData.PG || !newRowData.MODEL || !newRowData.DESCRIPTION) {
//           alert("please fill all the details");
//           return;
//         }
//         await axios.post('http://localhost:3010/AssetMaster',newRowData);
//         setData([...data,newRowData])
//         SetNewRowData({
//           PG:'',
//           MODEL:'',
//           DESCRIPTION:'',
//           Country_Code:'',

//         });
//         // fetchData();
//       }catch(error){
//         console.error('Error while adding new asset:' ,error);
//       }
//     };

//     const handleEditClick=(row)=>{
//       setEditingRow(row);
//     }

// const handleCellChange = (e, row, field) => {
//   const updatedEditedData = { ...editingData };

//   if (!updatedEditedData[row._id]) {
//     updatedEditedData[row._id] = {};
//   }

//   if (e.target.value.trim() !== "") {
//     updatedEditedData[row._id][field] = e.target.value;
//   } else {
//     updatedEditedData[row._id][field] = " ";
//   }

//   setEditingData(updatedEditedData);
// };

// const handleCellBlur = (rowId) => {
//   if (editingData[rowId]) {
//     const  updatedData = [...data];
//     const editingRow = updatedData.find((item) => item._id === rowId);

//     if (editingRow) {
//       if (editingData[rowId].PG) {
//         editingRow.PG = editingData[rowId].PG;
//       }

//       if (editingData[rowId].MODEL) {
//         editingRow.MODEL = editingData[rowId].MODEL;
//       }
//       if (editingData[rowId].DESCRIPTION) {
//         editingRow.DESCRIPTION = editingData[rowId].DESCRIPTION;
//       }
//       if (editingData[rowId].Country_Code) {
//         editingRow.Country_Code = editingData[rowId].Country_Code;
//       }
//     }
//   }

//   setEditingRow(null);
// };

// const handleSaveEdit = async(row)=>{
//   try{
//     await axios.put(`http://localhost:3010/updateAssetMaster/${row._id}`,{
//       PG:editingData[row._id]?.PG || row.PG,
//       MODEL:editingData[row._id]?.MODEL || row.MODEL,
//       DESCRIPTION:editingData[row._id].DESCRIPTION || row.DESCRIPTION,
//       Country_Code:editingData[row._id].Country_Code || row.Country_Code,

//     })
//     setEditingRow(null);
//     setEditingData({});

//     // setData(updatedData)
//   }catch(error){
//     console.error('Error Updating Asset:',error);
//   }
// };

//   return (
//     <div className="dataTable2">
//       <div  className="input2-textBox">
//         <form>
//           <input
//             type="text"
//             name="PG"
//             placeholder="PG"
//             value={newRowData.PG}
//             onChange={(e)=>SetNewRowData({...newRowData, PG:e.target.value})}
//             className="text-box"
//           />

//           <input
//             type="text"
//             name="MODEL"
//             placeholder="MODEL"
//              value={newRowData.MODEL}
//              onChange={(e)=>SetNewRowData({...newRowData, MODEL:e.target.value})}
//             className="text-box"
//           />

//           <input
//             type="text"
//             name="DESCRIPTION"
//             placeholder="DESCRIPTION"
//              value={newRowData.DESCRIPTION}
//             onChange={(e)=>SetNewRowData({...newRowData, DESCRIPTION:e.target.value})}
//             className="text-box"
//           />
//           <select
//           value={newRowData.Country_Code}
//             onChange={(e)=>SetNewRowData({...newRowData, Country_Code:e.target.value})}>
//             <option value=''>Select CountryCode</option>{
//               uniqueCountryCodes.map((code)=>(
//                 <option key={code} value={code}>{code}</option>
//               ))
//             }

//             </select>
//           <button
//             className="form-submit-btn"
//             type="button"
//             onClick={handleSaveNewRow}
//           >
//             Submit
//           </button>
//         </form>
//       </div>

//         <DataTable
//           columns={columns}
//           // data={data}
//           data={getPaginatedData(data)}
//           customStyles={customStyles}
//           selectableRows
//           selectableRowsHighlight
//           fixedHeader
//           fixedHeaderScrollHeight="450px"
//           highlightOnHover
//         />
//       <ExportAssetsToExcel data={data}/>
//       <ExportAssetsToJson data={data}/>

// {/* pagination and css for table */}
//         <div className="Pagination" >
//          <img
//           src="images/previous.png"
//           className="previous-btn"
//           alt="previous logo"
//           style={{ width: "20px", height: "20px" }}
//           onClick={() => {
//             if (currentPage > 1) {
//               paginate(currentPage - 1);
//             }
//           }}
//           disabled={currentPage === 1}
//          ></img>
//           <span className="page-info" >page {currentPage}</span>

//           <img
//           src="images/next.png"
//           className="Next-btn"
//           alt="next logo"
//           style={{ width: "20px", height: "20px" }}
//           onClick={() => paginate(currentPage + 1)}
//         ></img>

//           <select
//             className="page-select-btn"
//             onChange={(e) => {
//               const newItemsPerPage = parseInt(e.target.value);
//               changeItemsPerPage(newItemsPerPage);
//             }}
//             value={itemsPerPage}
//           >
//             <option value={5}>5 Rows</option>
//             <option value={10}>10 Rows</option>
//             <option value={30}>30 Rows</option>
//             <option value={40}>40 Rows</option>
//           </select>
//         </div>
//       </div>

//   );
// }

// const customStyles = {
//   headRow: {
//     style: {
//       backgroundColor: "green",
//       color: "white",
//     },
//   },
//   headCells: {
//     style: {
//       fontSize: "16px",
//       fontWeight: "600",
//       textTransform: "uppercase",
//     },
//   },
//   cells: {
//     style: {
//       fontSize: "15px",
//     },
//   },
// };

// export default RctTable;

// import React, { useEffect, useState } from 'react';
// import DataTable from 'react-data-table-component';
// const BOQ = () => {
// const [tableData, setTableData] = useState([]);
// useEffect(() => {
// const fetchData = async () => {
// try {
// const tokenResponse = await fetch('/api/auth/token');
// const { access_token } = await tokenResponse.json();
// const response = await fetch('https://developer.api.autodesk.com/modelderivative/v2/designdata/dXJuOmFkc2sud2lwcHJvZDpmcy5maWxlOnZmLnlPdnd6bkowU295TWpJMGR3T19ZRVE_dmVyc2lvbj0x/metadata/a39c8dc6-f642-2a2e-cd68-913593534787', {
// method: 'GET',
// headers: {
// 'Authorization': `Bearer ${access_token}`,
// },
// });
// const data = await response.json();
// console.log(data);
// const objects = data.objects[0].objects[0].objects;
// console.log(objects);

// setTableData(newData);
// } catch (error) {
// console.error('Error fetching data:', error);
// }
// };
// fetchData();
// }, []);
// const columns = [
// { name: 'Component', selector: 'Component', sortable: true },
// { name: 'Full Component Name', selector: 'FullComponentName', sortable: true },
// { name: 'Key', selector: 'Key', sortable: true },
// { name: 'Value', selector: 'Value', sortable: true },
// ];
// return (
// <DataTable
// title="BoQ Table"
// columns={columns}
// data={data}
// pagination
// />
// );
// };
// export default BOQ;

// const fetchData = async () => {
//   try {
//     const response = await axios.get("http://localhost:3010/getboq");
//     console.log(response.data);
//   } catch (error) {
//     console.error("Error fetching data:", error);
//   }
// };
