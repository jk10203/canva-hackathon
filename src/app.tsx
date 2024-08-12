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
import { fetchSuggestions, urlToFile } from "./Services/api";

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

      //extracting url and title
      const canvaImgUrl = response['exportBlobs'][0]['url'];
      const canvaTitle = response['title'];
      //extracting the file extension from the URL
      const extensionMatch = canvaImgUrl.match(/\.(png|jpg|jpeg)$/i);
      const extension = extensionMatch ? extensionMatch[1] : 'png'; // default to PNG if not found
      let mimeString: string = 'image/png'; //default is png
      switch (extension){
        case 'png':{
          mimeString = 'image/png';
        }
        case 'jpg':{
          mimeString = 'image/jpg';
        }
      }
      //making sure url, title, and mime are correct
      console.log("Url, Title, MT: ")
      console.log(canvaImgUrl);
      console.log(canvaTitle);
      console.log(mimeString);
      //getting file format
      let imageFile = await urlToFile(canvaImgUrl, canvaTitle, mimeString);
      //send file to backend
      let suggestRes = await fetchSuggestions(imageFile);
      console.log("suggestRes: ");
      console.log(suggestRes);

      setExportResponse(suggestRes); 

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
