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
import { fetchSuggestions} from "./Services/api";
import { extractFileInfo } from "./Services/fileHandler";

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

      //getting file format from canva response
      let imageFile = await extractFileInfo(response);
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
