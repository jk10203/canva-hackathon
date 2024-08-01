import React from "react";
import { Text, LoadingIndicator } from "@canva/app-ui-kit";
import styles from "styles/components.css";

const Loading = () => {
    return(
        <div className={styles.scrollContainer}>
            <Text size="large">
                Fetching accessibility suggestions...
            </Text>
            <LoadingIndicator size="large" />
        </div>
    )       
};
export default Loading;