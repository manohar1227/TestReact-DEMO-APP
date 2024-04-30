import { useState } from "react";
import DataTable from "react-data-table-component";
import axios from "axios";
import { useEffect } from "react";
import usePagination from "./usePagination";
// import { ExportToExcel } from "./ExportToExcel";
import { ExportToJson } from "./ExportToJson";

function Product() {
  const [records, setRecords] = useState([]);
  const [filterRecords, setFilterRecords] = useState([]);
  const {
    currentPage,
    itemsPerPage,
    paginate,
    changeItemsPerPage,
    getPaginatedData,
  } = usePagination();
  const [uniqueCities, setUniqueCities] = useState([]);
  const [newUser, setNewUser] = useState({
    name: "",
    email: "",
    city: "",
    phone: "",
  });
  const [editingRow, setEditingRow] = useState(null);
  const [editedData, setEditedData] = useState({});
  // const [selectedCities, setSelectedCities] = useState("");
  const [selectedRows, setSelectedRows] = useState([]);

  const column = [
    {
      name: "ID",
      selector: (row) => row.id,
      sortable: true,
      width: "80px",
    },
    {
      name: "Name",
      /* The above code is defining a JavaScript function called "selector" that takes a parameter
      called "row". Inside the function, it is accessing the "name" property of the "row" object and
      returning it. */
      selector: (row) => row.name,
      sortable: true,
      width: "200px",
      wrap: true,
      cell: (row) =>
        editingRow && editingRow.id === row.id ? (
          <input
            type="text"
            value={editedData[row.id]?.name || row.name}
            onChange={(e) => handleCellChange(e, row, "name")}
            onBlur={() => handleCellBlur(row.id)}
          />
        ) : (
          row.name
        ),
    },
    {
      name: "Email",
      selector: (row) => row.email,
      width: "250px",
      cell: (row) =>
        editingRow && editingRow.id === row.id ? (
          <input
            type="email"
            value={editedData[row.id]?.email || row.email}
            onChange={(e) => handleCellChange(e, row, "email")}
            onBlur={() => handleCellBlur(row.id)}
          />
        ) : (
          row.email
        ),
    },
    {
      name: "city",
      width: "150px",
      selector: (row) => row.address.city,
      cell: (row) => (
        <select>
          <option value="">select city</option>
          {uniqueCities.map((city) => (
            <option key={city} value={city}>
              {city}
            </option>
          ))}
        </select>
      ),
    },

    {
      name: "Phone",
      selector: (row) => row.phone,
      width: "250px",
      wrap: true,
      cell: (row) =>
        editingRow && editingRow.id === row.id ? (
          <input
            type="phone"
            value={editedData[row.id]?.phone || row.phone}
            onChange={(e) => handleCellChange(e, row, "phone")}
            onBlur={() => handleCellBlur(row.id)}
          />
        ) : (
          row.phone
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
    {
      name: "Edit",

      cell: (row) =>
        editingRow && editingRow.id === row.id ? (
          <div>
            <img
              src="images/diskette.png"
              alt="save logo"
              style={{ width: "20px", height: "20px" }}
              onClick={() => saveChanges(row)}
            ></img>
          </div>
        ) : (
          <img
            src="images/edit.png"
            alt="edit logo"
            style={{ width: "20px", height: "20px" }}
            onClick={() => startEditing(row)}
          ></img>
        ),
    },
  ];

  /* The `useEffect` hook is used to perform side effects in a functional component. In this case, it is
used to fetch data from the API endpoint "https://jsonplaceholder.typicode.com/users" and update the
state variables `records`, `filterRecords`, and `uniqueCities` with the fetched data. */

  useEffect(() => {
    const fetData = async () => {
      axios
        .get("https://jsonplaceholder.typicode.com/users")
        .then((res) => {
          setRecords(res.data);
          setFilterRecords(res.data);

          const cities = [
            ...new Set(res.data.map((item) => item.address.city)),
          ];
          setUniqueCities(cities);
        })
        .catch((err) => console.log(err));
    };
    fetData();
  }, []);

  /**
   * The handleDelete function filters out the record with the specified id from the records array and
   * updates the state with the filtered data.
   * @param row - The `row` parameter represents the specific row or item that needs to be deleted from
   * the `records` array.
   */
  const handleDelete = (row) => {
    const UpdateData = records.filter((item) => item.id !== row.id);

    setRecords(UpdateData);
  };

  /**
   * The handleFilter function filters records based on a given input value and updates the records
   * accordingly.
   * @param event - The event parameter is an object that represents the event that triggered the
   * filter. It contains information about the event, such as the target element and the value of the
   * input field that triggered the event.
   */
  const handleFilter = (event) => {
    const newData = filterRecords.filter((row) =>
      row.name.toLowerCase().includes(event.target.value.toLowerCase())
    );
    setRecords(newData);
  };

  /**
   * The handleInputChange function updates the state of a newUser object with the new value of an
   * input field.
   * @param e - The parameter `e` is an event object that is passed to the `handleInputChange`
   * function. It represents the event that occurred, such as a change in an input field.
   */
  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setNewUser({ ...newUser, [name]: value });
  };

  /**
   * The function "startEditing" sets the editing row to the specified row.
   * @param row - The "row" parameter is the row that needs to be edited.
   */
  const startEditing = (row) => {
    setEditingRow(row);
  };

  const handleCellChange = (e, row, field) => {
    const updatedEditedData = { ...editedData };

    if (!updatedEditedData[row.id]) {
      updatedEditedData[row.id] = {};
    }

    if (e.target.value.trim() !== "") {
      updatedEditedData[row.id][field] = e.target.value;
    } else {
      updatedEditedData[row.id][field] = " ";
    }

    setEditedData(updatedEditedData);
  };

  /**
   * The function `handleCellBlur` updates the `name`, `email`, and `phone` properties of a row in the
   * `records` array based on the values in the `editedData` object, and then sets the `editingRow`
   * state to `null`.
   * @param rowId - The `rowId` parameter is the identifier of the row that is being edited. It is used
   * to find the corresponding row in the `records` array and update its values based on the changes
   * made in the `editedData` object.
   */

  const handleCellBlur = (rowId) => {
    if (editedData[rowId]) {
      const row = records.find((item) => item.id === rowId);

      if (row) {
        if (editedData[rowId].name) {
          row.name = editedData[rowId].name;
        }

        if (editedData[rowId].email) {
          row.email = editedData[rowId].email;
        }
        if (editedData[rowId].phone) {
          row.phone = editedData[rowId].phone;
        }
        if (editedData[rowId].city) {
        }
      }
    }

    setEditingRow(null);
  };

  const saveChanges = async (row) => {
    try {
      await axios.put(`https://jsonplaceholder.typicode.com/users/${row.id}`, {
        name: editedData[row.id]?.name || row.name,
        email: editedData[row.id]?.email || row.email,
        phone: editedData[row.id]?.phone || row.phone,
        address: {
          city: editedData[row.id]?.city || row.address.city,
        },
      });

      setEditingRow(null);
      setEditedData({});
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };

  /**
   * The function `addNewUser` sends a POST request to a JSON API to add a new user, and updates the
   * state with the response data.
   */
  const addNewUser = async () => {
    try {
      if (!newUser.name || !newUser.email || !newUser.phone) {
        alert("please fill all the details");
        return;
      }

      const response = await axios.post(
        "https://jsonplaceholder.typicode.com/users",
        newUser
      );

      const newUserResponse = response.data;

      setRecords([...records, newUserResponse]);

      setUniqueCities([...uniqueCities, newUser.city]);

      setNewUser({
        name: "",
        email: "",
        city: "",
        phone: "",
      });
    } catch (error) {
      console.error("Error adding new user", error);
    }
  };
  /**
   * The function "handleRowSelected" updates the state variable "selectedRows" with the selected rows
   * from a table.
   * @param rows - The "rows" parameter is an object that contains information about the selected rows.
   * It typically includes properties such as "selectedRows" which is an array of the selected row data.
   */

  const handleRowSelected = (rows) => {
    setSelectedRows(rows.selectedRows);
  };

  return (
    /* The code snippet is rendering a search input field. It is a simple HTML input element with a
    type of "text" and a placeholder of "search". The input field has an `onChange` event handler
    that calls the `handleFilter` function when the input value changes. The `handleFilter` function
    is responsible for filtering the records based on the input value. The input field is styled
    using inline CSS with padding of "6px 10px". The parent div has a flex display and the content
    is justified to the right. */
    <div className="data-table">
      <div className="input-textBox">
        <form>
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={newUser.name}
            onChange={handleInputChange}
            className="text-box"
          />

          <input
            type="text"
            name="email"
            placeholder="email"
            value={newUser.email}
            onChange={handleInputChange}
            className="text-box"
          />

          <select
            name="city"
            value={newUser.city}
            onChange={handleInputChange}
            className="text-box"
          >
            <option value="">select city</option>
            {uniqueCities.map((city) => (
              <option key={city} value={city}>
                {city}
              </option>
            ))}
          </select>

          {/* <input
            type="text"
            name="city"
            placeholder="city"
            value={newUser.city}
            onChange={handleInputChange}
            className="text-box"
          /> */}

          <input
            type="text"
            name="phone"
            placeholder="phone"
            value={newUser.phone}
            onChange={handleInputChange}
            className="text-box"
          />
          <button
            className="form-submit-btn"
            type="button"
            onClick={addNewUser}
          >
            Submit
          </button>
        </form>
      </div>
      <div style={{ display: "flex", justifyContent: "right" }}>
        <input
          type="text"
          placeholder="search"
          onChange={handleFilter}
          style={{ padding: "6px 10px" }}
        />
      </div>

      {/* The `<DataTable>` component is rendering a table with the specified columns and data.*/}

      <DataTable
        columns={column}
        data={records}
        // data={getPaginatedData(records)}
        customStyles={customStyles}
        selectableRows
        selectableRowsHighlight
        fixedHeader
        fixedHeaderScrollHeight="450px"
        highlightOnHover
        onSelectedRowsChange={handleRowSelected}
      ></DataTable>
      <div>
        {/* <ExportToExcel records={records} selectedRows={selectedRows} /> */}
        <ExportToJson records={records} />
      </div>
      {/* <button className="excel-btn" onClick={() => ExportToExcel(records)}>
        Export to excel
      </button> */}

      <button className="save-btn">Save to mangoDb</button>

      {/* <button className="Json-btn">Export to Json</button> */}

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
    },
  },
};

export default Product;

// import react, { useState } from "react";
// import DataTable from "react-data-table-component";
// import axios from "axios";
// import { useEffect } from "react";
// import usePagination from "./usePagination";

// function Product() {
//   const [records, setRecords] = useState([]);
//   const [filterRecords, setFilterRecords] = useState([]);
//   const {
//     currentPage,
//     itemsPerPage,
//     paginate,
//     changeItemsPerPage,
//     getPaginatedData,
//   } = usePagination();
//   const [uniqueCities, setUniqueCities] = useState([]);
//   const [newUser, setNewUser] = useState({
//     // id: "",
//     name: "",
//     email: "",
//     city: "",
//     phone: "",
//   });

//   const column = [
//     {
//       name: "ID",
//       selector: (row) => row.id,
//       sortable: true,
//       width: "80px",
//     },
//     {
//       name: "Name",
//       selector: (row) => row.name,
//       sortable: true,
//       width: "200px",
//       wrap: true,
//     },
//     {
//       name: "Email",
//       selector: (row) => row.email,
//       width: "250px",
//     },
//     {
//       name: "city",
//       width: "150px",
//       cell: (row) => (
//         <select>
//           <option value="">select city</option>
//           {uniqueCities.map((city) => (
//             <option key={city} value={city}>
//               {city}
//             </option>
//           ))}
//         </select>
//       ),
//     },
//     {
//       name: "Phone",
//       selector: (row) => row.phone,
//       width: "250px",
//       wrap: true,
//     },
//     {
//       name: "Edit",

//       cell: (row) => (
//         <img
//           src="images/edit.png"
//           alt="edit logo"
//           style={{ width: "20px", height: "20px" }}
//         ></img>
//       ),
//     },
//     {
//       name: "Delelte",
//       cell: (row) => (
//         <img
//           src="images/bin.png"
//           alt="delete logo"
//           style={{ width: "20px", height: "20px" }}
//           onClick={() => handleDelete(row)}
//         ></img>
//       ),
//     },
//   ];

//   /* The `useEffect` hook is used to perform side effects in a functional component. In this case, it is
// used to fetch data from the API endpoint "https://jsonplaceholder.typicode.com/users" and update the
// state variables `records`, `filterRecords`, and `uniqueCities` with the fetched data. */

//   useEffect(() => {
//     const fetData = async () => {
//       axios
//         .get("https://jsonplaceholder.typicode.com/users")
//         .then((res) => {
//           setRecords(res.data);
//           setFilterRecords(res.data);

//           const cities = [
//             ...new Set(res.data.map((item) => item.address.city)),
//           ];
//           setUniqueCities(cities);
//         })
//         .catch((err) => console.log(err));
//     };
//     fetData();
//   }, []);

//   /**
//    * The handleDelete function filters out the record with the specified id from the records array and
//    * updates the state with the filtered data.
//    * @param row - The `row` parameter represents the specific row or item that needs to be deleted from
//    * the `records` array.
//    */
//   const handleDelete = (row) => {
//     const UpdateData = records.filter((item) => item.id !== row.id);

//     setRecords(UpdateData);
//   };

//   /**
//    * The handleFilter function filters records based on a given input value and updates the records
//    * accordingly.
//    * @param event - The event parameter is an object that represents the event that triggered the
//    * filter. It contains information about the event, such as the target element and the value of the
//    * input field that triggered the event.
//    */
//   const handleFilter = (event) => {
//     const newData = filterRecords.filter((row) =>
//       row.name.toLowerCase().includes(event.target.value.toLowerCase())
//     );
//     setRecords(newData);
//   };

//   /**
//    * The handleInputChange function updates the state of a newUser object with the new value of an
//    * input field.
//    * @param e - The parameter `e` is an event object that is passed to the `handleInputChange`
//    * function. It represents the event that occurred, such as a change in an input field.
//    */
//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setNewUser({ ...newUser, [name]: value });
//   };

//   /**

//    * The function `addNewUser` sends a POST request to a JSON API to add a new user, and updates the
//    * state with the response data.
//    */
//   const addNewUser = async () => {
//     try {
//       if (!newUser.name || !newUser.email || !newUser.city || !newUser.phone) {
//         alert("please fill all the details");
//         return;
//       }

//       const response = await axios.post(
//         "https://jsonplaceholder.typicode.com/users",
//         newUser
//       );

//       const newUserResponse = response.data;

//       setRecords([...records, newUserResponse]);

//       setUniqueCities([...uniqueCities, newUser.city]);

//       setNewUser({
//         // id: "",
//         name: "",
//         email: "",
//         city: "",
//         phone: "",
//       });
//     } catch (error) {
//       console.error("Error adding new user", error);
//     }
//   };

//   return (
//     /* The code snippet is rendering a search input field. It is a simple HTML input element with a
//     type of "text" and a placeholder of "search". The input field has an `onChange` event handler
//     that calls the `handleFilter` function when the input value changes. The `handleFilter` function
//     is responsible for filtering the records based on the input value. The input field is styled
//     using inline CSS with padding of "6px 10px". The parent div has a flex display and the content
//     is justified to the right. */
//     <div className="data-table">
//       <div className="input-textBox">
//         <form>
//           {/* <input
//           type="text"
//           name="id"
//           placeholder="ID"
//           value={newUser.id}
//           onChange={handleInputChange}
//         /> */}
//           <input
//             type="text"
//             name="name"
//             placeholder="Name"
//             value={newUser.name}
//             onChange={handleInputChange}
//             className="text-box"
//           />

//           <input
//             type="text"
//             name="email"
//             placeholder="email"
//             value={newUser.email}
//             onChange={handleInputChange}
//             className="text-box"
//           />

//           <input
//             type="text"
//             name="city"
//             placeholder="city"
//             value={newUser.city}
//             onChange={handleInputChange}
//             className="text-box"
//           />

//           <input
//             type="text"
//             name="phone"
//             placeholder="phone"
//             value={newUser.phone}
//             onChange={handleInputChange}
//             className="text-box"
//           />
//           <button
//             className="form-submit-btn"
//             type="button"
//             onClick={addNewUser}
//           >
//             Submit
//           </button>
//         </form>
//       </div>
//       <div style={{ display: "flex", justifyContent: "right" }}>
//         <input
//           type="text"
//           placeholder="search"
//           onChange={handleFilter}
//           style={{ padding: "6px 10px" }}
//         />
//       </div>

//       {/* The `<DataTable>` component is rendering a table with the specified columns and data.*/}
//       <DataTable
//         columns={column}
//         // data={records}
//         data={getPaginatedData(records)}
//         customStyles={customStyles}
//         selectableRows
//         selectableRowsHighlight
//         fixedHeader
//         fixedHeaderScrollHeight="450px"
//         highlightOnHover
//       ></DataTable>

//       <button className="save-btn">Save to mangoDb</button>
//       <button className="excel-btn">Export to excel</button>
//       <button className="Json-btn">Export to Json</button>

//       <div className="Pagination">
//         <button
//           className="previous-btn"
//           onClick={() => {
//             if (currentPage > 1) {
//               paginate(currentPage - 1);
//             }
//           }}
//           disabled={currentPage === 1}
//         >
//           previous
//         </button>
//         <span className="page-info">page {currentPage}</span>
//         <button className="Next-btn" onClick={() => paginate(currentPage + 1)}>
//           Next
//         </button>

//         <select
//           className="page-select-btn"
//           onChange={(e) => {
//             const newItemsPerPage = parseInt(e.target.value);
//             changeItemsPerPage(newItemsPerPage);
//           }}
//           value={itemsPerPage}
//         >
//           <option value={5}>5 Rows</option>
//           <option value={10}>10 Rows</option>
//           <option value={30}>10 Rows</option>
//           <option value={40}>40 Rows</option>
//         </select>
//       </div>
//     </div>
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

// export default Product;

// vv2
