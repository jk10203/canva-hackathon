import React from "react";
import { useNavigate } from "react-router-dom";
import { Button, Rows, Text, Link } from "@canva/app-ui-kit";
import {requestExport } from "@canva/design";
import styles from "styles/components.css";


interface UploadProps {
  onExport: () => Promise<void>;
}

const Upload: React.FC<UploadProps> = ({ onExport }) => {

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
        <Button variant="primary" onClick={onExport} stretch>
          Export Design
        </Button>
      </Rows>
    </div>
  );
};
export default Upload;
// export function Upload() {
//   const navigate = useNavigate();

//   async function handleClick() {
//     //route/change screen to ./loading.tsx
//     navigate("/loading");

//     const result = await requestExport({
//       acceptedFileTypes: ["JPG", "PNG"],
//     });
//     console.log(result);
//     //after data received, route to ./suggestions.tsx
//     navigate("/suggestions")
//   };

//   return (
//     <div className={styles.scrollContainer}>
//       <Rows spacing="2u">
//         <Text>
//           Export your design to check if it meets the WCAG (Web Content Accessibility Guidelines)
//           international standards.
//         </Text>
//         <Text size="medium">
//           <Link 
//             href="https://www.w3.org/WAI/standards-guidelines/wcag/" 
//             id="id" 
//             requestOpenExternalUrl={()=>{}} 
//             title="WCAG Website"
//           >
//             What is WCAG?
//           </Link>  
//         </Text>
//         <Button variant="primary" onClick={handleClick} stretch>
//           Export Design
//         </Button>
//       </Rows>
//     </div>
//   );  
// };

// export function Upload () {
//   async function handleClick() {
//     //route/change screen to ./loading.tsx

//     const result = await requestExport({
//       acceptedFileTypes: ["JPG", "PNG"],
//     });
//     //after data received, route to ./suggestions.tsx

//     console.log(result);
//   };

//   return (
//     <div className={styles.scrollContainer}>
//       <Rows spacing="2u">
//         <Text>
//           Export your design to check if it meets the WCAG (Web Content Accessibility Guidelines)
//           international standards.
//         </Text>
//         <Text size="medium">
//           <Link 
//             href="https://www.w3.org/WAI/standards-guidelines/wcag/" 
//             id="id" 
//             requestOpenExternalUrl={()=>{}} 
//             title="WCAG Website"
//           >
//             What is WCAG?
//           </Link>  
//         </Text>
//         <Button variant="primary" onClick={handleClick} stretch>
//           Export Design
//         </Button>
//       </Rows>
//     </div>
//   );
// };



// import React, { useState } from 'react';
// import { requestExport } from "@canva/design";
// import {Upload} from './Components/upload';
// import {Suggestions} from './Components/suggestions';
// import {Loading} from './Components/loading';

// function App() {
//   const [isLoading, setIsLoading] = useState(false);
//   const [suggestions, setSuggestions] = useState([]);

//   // Function to handle the upload to Canva
//   const handleUpload = async () => {
//     setIsLoading(true); // Start loading
//     const exportedDesign = await canva.export(); // Simulate exporting from Canva
//     fetchSuggestions(exportedDesign);
//   };

//   // Function to fetch suggestions based on the uploaded design
//   const fetchSuggestions = async (design) => {
//     try {
//       const response = await fetch('https://your-backend-api.com/suggestions', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({ design }),
//       });
//       const data = await response.json();
//       setSuggestions(data); // Set the fetched suggestions
//     } catch (error) {
//       console.error('Error fetching suggestions:', error);
//     } finally {
//       setIsLoading(false); // End loading
//     }
//   };

//   return (
//     <div className="App">
//       {isLoading ? (
//         <Loading />
//       ) : suggestions.length > 0 ? (
//         <Suggestions data={suggestions} />
//       ) : (
//         <Upload onUpload={handleUpload} />
//       )}
//     </div>
//   );
// }

// export default App;


// import React from "react";
// import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
// import { Upload } from "./Components/upload";
// import { Loading } from "./Components/loading";
// import { Suggestions } from "./Components/suggestions";

// export function App() {
//   return (
//     <Router>
//       <div className="App">
//       <Routes>
//         <Route path="/upload" element={<Upload />} />
//         <Route path="/loading" element={<Loading />} />
//         <Route path="/suggestions" element={<Suggestions />} />
//       </Routes>
//       </div>
//     </Router>
//   );
// }

// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { Button, Rows, Text, Link } from "@canva/app-ui-kit";
// import { requestExport } from "@canva/design";
// import styles from "styles/components.css";


// export function Upload() {
//     const navigate = useNavigate();
//     const [error, setError] = useState<null|string>(null);

//     async function handleClick() {
//         navigate("/loading");
//         try {
//             const result = await requestExport({
//                 acceptedFileTypes: ["JPG", "PNG"],
//             });
//         console.log(result);
//         } catch (error) {
//             console.error("Export failed", error);
//             const errorMessage = error instanceof Error ? error.message : "An unknown error occurred";
//             setError(errorMessage); // Set the error message
//             navigate("/");
//         }
        
//         //after export is pressed
//     };

//     return (
//         <div className={styles.scrollContainer}>
//             <Rows spacing="2u">
//                 <Text>
//                     Export your design to check if it meets the WCAG (Web Content Accessibility Guidelines)
//                     international standards.
//                 </Text>
//                 <Text size="medium">
//                     <Link
//                         href="https://www.w3.org/WAI/standards-guidelines/wcag/"
//                         id="id"
//                         requestOpenExternalUrl={() => { }}
//                         title="WCAG Website"
//                     >
//                         What is WCAG?
//                     </Link>
//                 </Text>
//                 <Button variant="primary" onClick={handleClick} stretch>
//                     Export Design
//                 </Button>
//                 {error && <div className={styles.error}>Export failed: {error}</div>}            </Rows>
//         </div>
//     );
// };
