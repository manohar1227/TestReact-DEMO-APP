import React from "react";
import { saveAs } from "file-saver";

const ExportToJson = ({ records, selectedRows }) => {
  const exportData = () => {
    const selectedData = selectedRows.length > 0 ? selectedRows : records;
    const tbldata = selectedData.map((record) => ({
      id: record.id,
      name: record.name,
      email: record.email,
      phone: record.phone,
      city: record.city,
    }));

    const userdata = JSON.stringify(tbldata, null, 2);
    const blob = new Blob([userdata], { type: "application/json" });

    saveAs(blob, "Userdata.json");
  };

  return (
    <button className="Json-btn" onClick={exportData}>
      ExportToJson
    </button>
  );
};

const ExportAssetsToJson = ({ data, selectedRows }) => {
  const exportAssetData = () => {
    const selectedData = selectedRows.length > 0 ? selectedRows : data;
    const AssetTblData = selectedData.map((AssetData) => ({
      PG: AssetData.PG,
      MODEL: AssetData.MODEL,
      DESCRIPTION: AssetData.DESCRIPTION,
      Country_Code: AssetData.Country_Code,
    }));

    const Assetsdata = JSON.stringify(AssetTblData, null, 2);
    const blob = new Blob([Assetsdata], { type: "application/json" });

    // const selectedData = selectedRows.length > 0 ? selectedRows : data;
    saveAs(blob, "AssetData.json");
  };

  return (
    <button className="Json-btn" onClick={exportAssetData}>
      ExportToJson
    </button>
  );
};

export { ExportToJson, ExportAssetsToJson };

// const ExportAssetsToJson = ({ data }) => {
//   const AssetTblData = data.map((AssetData) => ({
//     PG: AssetData.PG,
//     MODEL: AssetData.MODEL,
//     DESCRIPTION: AssetData.DESCRIPTION,
//     Country_Code: AssetData.Country_Code,
//   }));

//   const Assetsdata = JSON.stringify(AssetTblData, null, 2);
//   const blob = new Blob([Assetsdata], { type: "application/json" });

//   const exportAssetData = () => {
//     // const selectedData = selectedRows.length > 0 ? selectedRows : data;
//     saveAs(blob, "AssetData.json");
//   };

//   return (
//     <button className="Json-btn" onClick={exportAssetData}>
//       ExportToJson
//     </button>
//   );
// };
