import {
  Button,
  FormField,
  MultilineInput,
  Rows,
  Text,
  Link
} from "@canva/app-ui-kit";
import type { ExportResponse } from "@canva/design";
import { requestExport } from "@canva/design";
import { useState } from "react";
import styles from "styles/components.css";
import { fetchSuggestions } from "./Services/api";

export const App = () => {
  const [state, setState] = useState<"exporting" | "idle">("idle");
  const [exportResponse, setExportResponse] = useState<
    ExportResponse | undefined
  >();

  const exportDocument = async () => {
    if (state === "exporting") return;
    try {
      setState("exporting");

      let response = await requestExport({
        acceptedFileTypes: [
          "PNG",
          "JPG",
        ],
      });

      // send the URL to your backend using fetch
      let suggestRes = await fetchSuggestions(response);
      setExportResponse(suggestRes);
      // setExportResponse(response); //change to suggestRes
    } catch (error) {
      // add actual error handling
      console.log(error);
    } finally {
      setState("idle");
    }
  };

  return (
    <div className={styles.scrollContainer}>
      <Rows spacing="2u">
        <Text>
          Export your design to check if it meets the WCAG (Web Content Accessibility Guidelines)
          international standards.
        </Text>
        <Text size="medium">
          <Link 
            href="https://www.w3.org/WAI/standards-guidelines/wcag/" 
            id="id" 
            requestOpenExternalUrl={()=>{}} 
            title="WCAG Website"
          >
            What is WCAG?
          </Link>  
        </Text>
        <Button variant="primary" onClick={exportDocument} loading={state === "exporting"} stretch>
          Export Design
        </Button>
        {exportResponse && (
          <FormField
            label="Export response"
            value={JSON.stringify(exportResponse, null, 2)}
            control={(props) => (
              <MultilineInput {...props} maxRows={7} autoGrow readOnly />
            )}
          />
        )}
      </Rows>
    </div>
  );
};



// import React, { useState } from 'react';
// import { requestExport } from '@canva/design';
// import Upload from './Components/upload';
// import Loading from './Components/loading';
// import Suggestions from './Components/suggestions';

// function App() {
//   const [currentView, setCurrentView] = useState('upload'); // Starts with 'upload'

//   const handleExportClick = async () => {
//     const result = await requestExport({
//             acceptedFileTypes: ["JPG", "PNG"],
//           });
//     setCurrentView('loading'); // Switch to loading view

//     setTimeout(() => {
//       setCurrentView('suggestions'); // Switch to suggestions view after data is loaded
//     }, 2000);
//   };

//   return (
//     <div>
//       {currentView === 'upload' && <Upload onExport={handleExportClick} />}
//       {currentView === 'loading' && <Loading />}
//       {currentView === 'suggestions' && <Suggestions />}
//     </div>
//   );
// }

// export default App;




// // import React from "react";
// // import { BrowserRouter, Routes, Route } from "react-router-dom";
// // import Upload from "./Components/upload";
// // import { Loading } from "./Components/loading";
// // import { Suggestions } from "./Components/suggestions";

// // function App() {
// //   return (
// //     <>
// //       <BrowserRouter>
// //           <Routes>
// //               <Route
// //                   path="/"
// //                   element={<Upload />}
// //               />
// //               <Route
// //                   path="/loading"
// //                   element={<Loading />}
// //               />
// //               <Route
// //                   path="/suggestions"
// //                   element={<Suggestions />}
// //               />
// //           </Routes>
// //       </BrowserRouter>
// //     </>
// //   );
// // }

// // export default App;




// // import React from "react";
// // import { Button, Rows, Text, Link } from "@canva/app-ui-kit";
// // import {requestExport } from "@canva/design";
// // import styles from "styles/components.css";


// // // We can get rid of this one, it should just route to one of the other components
// // export function App () {
// //   async function handleClick() {
// //     const result = await requestExport({
// //       acceptedFileTypes: ["JPG", "PNG"],
// //     });
// //     console.log(result);
// //   };

// //   return (
// //     <div className={styles.scrollContainer}>
// //       <Rows spacing="2u">
// //         <Text>
// //           Export your design to check if it meets the WCAG (Web Content Accessibility Guidelines)
// //           international standards.
// //         </Text>
// //         <Text size="medium">
// //           <Link 
// //             href="https://www.w3.org/WAI/standards-guidelines/wcag/" 
// //             id="id" 
// //             requestOpenExternalUrl={()=>{}} 
// //             title="WCAG Website"
// //           >
// //             What is WCAG?
// //           </Link>  
// //         </Text>
// //         <Button variant="primary" onClick={handleClick} stretch>
// //           Export Design
// //         </Button>
// //       </Rows>
// //     </div>
// //   );
// // };



// // // import React, { useState } from 'react';
// // // import { requestExport } from "@canva/design";
// // // import {Upload} from './Components/upload';
// // // import {Suggestions} from './Components/suggestions';
// // // import {Loading} from './Components/loading';

// // // function App() {
// // //   const [isLoading, setIsLoading] = useState(false);
// // //   const [suggestions, setSuggestions] = useState([]);

// // //   // Function to handle the upload to Canva
// // //   const handleUpload = async () => {
// // //     setIsLoading(true); // Start loading
// // //     const exportedDesign = await canva.export(); // Simulate exporting from Canva
// // //     fetchSuggestions(exportedDesign);
// // //   };

// // //   // Function to fetch suggestions based on the uploaded design
// // //   const fetchSuggestions = async (design) => {
// // //     try {
// // //       const response = await fetch('https://your-backend-api.com/suggestions', {
// // //         method: 'POST',
// // //         headers: {
// // //           'Content-Type': 'application/json',
// // //         },
// // //         body: JSON.stringify({ design }),
// // //       });
// // //       const data = await response.json();
// // //       setSuggestions(data); // Set the fetched suggestions
// // //     } catch (error) {
// // //       console.error('Error fetching suggestions:', error);
// // //     } finally {
// // //       setIsLoading(false); // End loading
// // //     }
// // //   };

// // //   return (
// // //     <div className="App">
// // //       {isLoading ? (
// // //         <Loading />
// // //       ) : suggestions.length > 0 ? (
// // //         <Suggestions data={suggestions} />
// // //       ) : (
// // //         <Upload onUpload={handleUpload} />
// // //       )}
// // //     </div>
// // //   );
// // // }

// // // export default App;


// // // import React from "react";
// // // import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
// // // import { Upload } from "./Components/upload";
// // // import { Loading } from "./Components/loading";
// // // import { Suggestions } from "./Components/suggestions";

// // // export function App() {
// // //   return (
// // //     <Router>
// // //       <div className="App">
// // //       <Routes>
// // //         <Route path="/upload" element={<Upload />} />
// // //         <Route path="/loading" element={<Loading />} />
// // //         <Route path="/suggestions" element={<Suggestions />} />
// // //       </Routes>
// // //       </div>
// // //     </Router>
// // //   );
// // // }