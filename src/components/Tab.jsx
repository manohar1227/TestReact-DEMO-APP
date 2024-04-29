import { useState } from "react";
import Table1 from "./Table1";
import Product from "./Product";
import RctTable from "./RctTable";

const Tab1 = () => {
  const [state, setState] = useState(1);

  const action = (index) => {
    setState(index);
    // console.log(index);
    // console.log("state : ", state);
  };

  /* The code you provided is rendering a set of tabs with corresponding content. */

  /* The `return` statement in the code is rendering a set of tabs. Each tab is represented by a
  `<div>` element with a class name of "tab". The `className` attribute is conditionally set based
  on the value of the `state` variable. If the `state` variable is equal to the index of the tab (1,
  2, 3, or 4), then the class name "active-tab" is added to the tab, indicating that it is currently
  active. Otherwise, the class name remains as "tab". */
  return (
    <div className="box">
      <div className="tabs">
        <div
          onClick={() => action(1)}
          className={`${state === 1 ? "tab active-tab" : "tab"}`}
        >
         BOQ
        </div>
        <div
          className={`${state === 2 ? "tab active-tab" : "tab"}`}
          onClick={() => action(2)}
        >
         Schedule
        </div>
        <div
          className={`${state === 3 ? "tab active-tab" : "tab"}`}
          onClick={() => action(3)}
        >
          <div
          className={`${state === 6 ? "tab active-tab" : "tab"}`}
          onClick={() => action(6)}
        >
         Schedule
        </div>
        sub1
        </div>
        <div
          className={`${state === 4 ? "tab active-tab" : "tab"}`}
          onClick={() => action(4)}
        >
          Issues
        </div>
        <div
          className={`${state === 5 ? "tab active-tab" : "tab"}`}
          onClick={() => action(5)}
        >
         
          Assets
        </div>
      </div>

      {/* The code you provided is rendering a set of content sections that correspond to the tabs.  */}
      <div className="contents">
        <div
          className={`${state === 1 ? "content active-content" : "content"}`}
        >
       
          <Product/>
          {/* <button className="add-btn">Add</button> */}
          {/* <button className="save-btn">Save to mango Db</button>
         <button className="excel-btn">Export to excel</button>
         <button className="Json-btn">Export to Json</button> */}
          
        </div>

        <div
          className={`${state === 2 ? "content active-content" : "content"}`}
        >
             <RctTable />
          
        </div>

        <div
          className={`${state === 3 ? "content active-content" : "content"}`}
        >
          <h2>content 3</h2>
          
        </div>

        <div
          className={`${state === 4 ? "content active-content" : "content"}`}
        >
           <div className="dropdown">
           <p><RctTable /></p>
          </div>
          <h2>content 4</h2>
        </div>
        <div
          className={`${state === 6 ? "content active-content" : "content"}`}
        >
          <h2>content 3</h2>
          
        </div>
      </div>
    </div>
  );
};
export default Tab1;

























// import axios from "axios";

// import { useState , useEffect} from "react";

// import "./Tab.css";

// import DataTable from "react-data-table-component";

 

// function Tab(){

//     const [toggle,setToggle]=useState(1)

//     const [search,setSearch] = useState("");

//     const [countries,setCountries] = useState([]);

//     const [filteredCountries,setFilteredCountries]=useState([]);

 

//     function updateToggle(id){

//        setToggle(id)

//     }

 

//     const getCountries = async () => {

//         try{

//             const response = await axios.get("https://restcountries.com/v2/all");

//             setCountries(response.data);

//             setFilteredCountries(response.data);

 

//         }catch (error){

//             console.log(error);

//         }

//     };

//     const columns = [

//      {

//         name:"Country Name",

//         selector: row => row.name,

//         sortable: true,

//      },

//      {

//         name:"Country Code",

//         selector: row => row.callingCodes,

//      },

//      {

//         name:"Country Capital",

//         selector: row => row.capital,

       

//      },

//      {

//         name:"Country flag",

//         selector: (row) => <img width={50} height={50} src={row.flag}/>,

//      },

//     //  {

//     //     name:"Action",

//     //     cell: (row) => (

//     //         <button className="btn btn-primary" onClick={()=> {

//     //             onEdit(row);

//     //         }}>Edit</button>

           

//     //     )

//     //  },

//      {

//         name:"Action",

//         cell:(row) => (<button className="btn btn-delete" onClick={()=> handleDelete(row)}>Delete</button>),

//      }

     

//     ];

 

//     const handleDelete= (row)=>{

//        const UpdateData = filteredCountries.filter((item)=>item.callingCodes!==row.callingCodes);

//        console.log(row.callingCodes)

//        setFilteredCountries(UpdateData);

//     }

 

//     useEffect(() => {

//         getCountries();

//     },[]);

 

//     useEffect(() => {

//        const result = countries.filter(country => {

//            return country.name.toLowerCase().match(search.toLowerCase());

//        });

 

//        setFilteredCountries(result);

//     }, [search]);

 

//     return(

//         <div className='d-flex align-items-center justify-content-center'>

//             <div className='col-6 tab p-5'>

//                 <ul className='d-flex'>

//                     <li className='flex-fill' onClick={()=>updateToggle(1)}>Graph</li>

//                     <li className='flex-fill' onClick={()=>updateToggle(2)}>Table</li>

//                     <li className='flex-fill' onClick={()=>updateToggle(3)}>Chart</li>

//                 </ul>

//                 <div className={toggle===1?"show-content":"content"}>

//                     <h1></h1>

//                     <p></p>

//                 </div>

//                 <div className={toggle===2?"show-content":"content"}>

                   

//                     <DataTable

//                     columns={columns}

//                     data={filteredCountries}

//                     pagination

//                     fixedHeader

//                     fixedHeaderScrollHeight="400px"

//                     selectableRows

//                     selectableRowsHighlight

//                     highlightOnHover

//                     actions={<button className="btn btn-sm btn-info">Export To Excel</button>}

//                     subHeader

//                     subHeaderComponent={

//                         <input

//                          type="text"

//                          placeholder="search here"

//                          className="w-25 form-control"

//                          value={search}

//                          onChange={(e) => setSearch(e.target.value )}

//                         />

//                     }

//                     />

//                 </div>

//                 <div className={toggle===3?"show-content":"content"}>

//                     <h1></h1>

//                     <p></p>

//                 </div>

//             </div>

//         </div>

//     )

// }

// export default Tab;