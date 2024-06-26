// import React from "react";
// import ReactExport from "react-export-excel";
// import { saveAs } from "file-saver";

// const ExcelFile = ReactExport.ExcelFile;
// const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;
// const ExcelColumn = ReactExport.ExcelFile.ExcelColumn;

// const ExportToExcel = ({ records, selectedRows }) => {
//   const selectedData = selectedRows.length > 0 ? selectedRows : records;
//   return (
//     <div>
//       <ExcelFile
//         filename="userData"
//         element={<button className="excel-btn">ExportToExcel</button>}
//       >
//         <ExcelSheet data={selectedData} name="usersData">
//           <ExcelColumn label="ID" value="id" />
//           <ExcelColumn label="Name" value="name" />
//           <ExcelColumn label="email" value="email" />
//           <ExcelColumn label="city" value="city" />
//           <ExcelColumn label="Phone" value="phone" />
//         </ExcelSheet>
//       </ExcelFile>
//     </div>
//   );
// };

// const ExportAssetsToExcel = ({ data, selectedRows }) => {
//   const selectedData = selectedRows.length > 0 ? selectedRows : data;
//   return (
//     <div>
//       <ExcelFile
//         filename="Asset"
//         element={<button className="excel-btn">ExportToExcel</button>}
//       >
//         <ExcelSheet data={selectedData} name="AssetsData">
//           <ExcelColumn label="PG" value="PG" />
//           <ExcelColumn label="MODEL" value="MODEL" />
//           <ExcelColumn label="DESCRIPTION" value="DESCRIPTION" />
//           <ExcelColumn label="Country_Code" value="Country_Code" />
//         </ExcelSheet>
//       </ExcelFile>
//     </div>
//   );
// };
// export { ExportToExcel, ExportAssetsToExcel };
