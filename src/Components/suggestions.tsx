
import {Rows, Text} from "@canva/app-ui-kit";
import styles from "styles/components.css";

const Suggestions = () => {
    return(
        <text> not implemented...</text>
    )
};
export default Suggestions;


// import React, { useEffect, useState } from 'react';
// import { Rows, Text } from '@canva/app-ui-kit';
// import { fetchSuggestions } from '../Services/api'; // Make sure the path is correct
// import styles from 'styles/components.css';
// import { Loading } from './loading'; // Make sure the import path is correct


// // Define the props type for the component
// type SuggestionsProps = {
//     design: any; // Pass the design data as a prop
// };

// export function Suggestions({ design }: SuggestionsProps) {
//     const [suggestions, setSuggestions] = useState([]);
//     const [error, setError] = useState<string | null>(null);

//     useEffect(() => {
//         if (design) {
//             fetchSuggestions(design)
//                 .then(setSuggestions)
//                 .catch(error => setError(error instanceof Error ? error.message : "An unknown error occurred"));
//         }
//     }, [design]);

//     // Display a message if no data is available or an error occurred
//     if (!design) {
//         return <Text>No design provided. Please export your design first.</Text>;
//     }
//     if (error) {
//         return <Text>Error: {error}</Text>;
//     }
//     if (suggestions.length === 0) {
//         return <Loading />; // Show loading message while fetching
//     }

//     // Render the suggestions
//     return (
//         <div className={styles.scrollContainer}>
//             <Text size="large">Accessibility Suggestions</Text>
//             <Rows spacing="2u">
//                 {suggestions.map((suggestion: any, index: number) => (
//                     <Text key={index}>
//                         {suggestion.message} {/* Assuming `message` is part of your suggestion object */}
//                     </Text>
//                 ))}
//             </Rows>
//         </div>
//     );
// }
