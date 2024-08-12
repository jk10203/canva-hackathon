import {
  Button,
  Rows,
  Text,
  Link,
  Alert, LightBulbIcon, ReloadIcon,
  Columns, Column, Box, Title,
  Accordion, AccordionItem
} from "@canva/app-ui-kit";
import type { ExportResponse } from "@canva/design";
import { requestExport } from "@canva/design";
import { useState } from "react";
import styles from "styles/components.css";
import { fetchSuggestions} from "./Services/api";
import { extractFileInfo } from "./Services/fileHandler";
import { parseSuggestion} from "./Services/suggestionHandler";

export const App = () => {
  const [state, setState] = useState<"exporting" | "idle" | "exported">("idle");
  const [exportResponse, setExportResponse] = useState<
    ExportResponse | undefined
  >();
  const [suggestions, setSuggestions] = useState<string[]>([]);

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
      if (response.status === "COMPLETED") {
        //getting file format from canva response
        let imageFile = await extractFileInfo(response);
        //send file to backend
        let suggestRes = await fetchSuggestions(imageFile);
        console.log("suggestRes: ");
        console.log(suggestRes);
        //splitting up / formatting suggestions
        setSuggestions(suggestRes);
        setState("exported");
        setExportResponse(suggestRes); 
      } else {
        setState("idle");
        console.log("The user exited the export flow.");
        console.log(response); // => { status: "ABORTED" }
      }

    } catch (error) {
      // add actual error handling
      console.log(error);
    } 
  };

  return (
    <div className={styles.scrollContainer}>
      <Rows spacing="2u">
        {state == "idle" && (
          <>
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
          </>
        )}
        {state == "exporting" && (
          <>
            {/* <Title size="medium">
              Fetching WCAG suggestions for your canva board ...
            </Title> */}
            <Alert
              title="Fetching WCAG suggestions ..."
              tone="neutral"
            >
            </Alert>
          </>
        )}
        {exportResponse && state == "exported" && (
          <div>
            <Columns
              align="start"
              alignY="start"
              spacing="1u"
            >
                <Column width="1/5">
                  <Box
                    background="contrast"
                    borderRadius="large"
                    height="full"
                    padding="2u"
                  >
                    <LightBulbIcon></LightBulbIcon>
                  </Box>
                </Column>
                <Column width="4/5">
                  <Box
                    background="neutralLow"
                    borderRadius="large"
                    height="full"
                    padding="2u"
                  >
                    <Title size="small">
                    Your WCAG suggestions:
                    </Title>
                  </Box>
                </Column>
              </Columns>

              <br></br>
              <Box background="surface">
                <Text
                  size="xsmall"
                >
                  To make your design more accessible, consider these suggestions! 
                </Text>
              </Box>
              <br></br>

              <Accordion defaultExpanded>
                {suggestions.slice(1).map((suggestion, index) => {
                  const { title, text } = parseSuggestion(suggestion);
                  return (
                    <AccordionItem key={index} title={`${title}`}>
                      <Text>{text}</Text>
                    </AccordionItem>
                  );
                })}
              </Accordion>
              <br></br>
              <br></br>
              <Columns
                align="start"
                alignY="start"
                spacing="1u"
              >
                <Column width="1/5">
                  <Box
                    background="contrast"
                    borderRadius="large"
                    height="full"
                    padding="2u"
                  >
                    <ReloadIcon></ReloadIcon>
                  </Box>
                </Column>
                <Column width="4/5">
                  <Box
                    background="neutralLow"
                    borderRadius="large"
                    height="full"
                    padding="2u"
                  >
                    <Title size="small">
                    Check your design again!
                    </Title>
                  </Box>
                </Column>
              </Columns>
          </div>
        )}

        <Button variant="primary" onClick={exportDocument} loading={state === "exporting"} stretch>
          Export Design
        </Button>
      </Rows>
    </div>
  );
};
