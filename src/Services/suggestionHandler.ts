export const parseSuggestion = (suggestion: string) => {
    const [title, ...rest] = suggestion.split(":"); //split the suggestion at the first colon
     
    const cleanedTitle = title.replace(/\*\*/g, '').trim(); //remove all **

    return {
        title: cleanedTitle,
        text: rest.join(":").trim(), //join the rest of the string back together
    };
  };