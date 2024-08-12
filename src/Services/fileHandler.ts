async function urlToFile(url, filename, mimeType) {
    let blob = await fetch(url).then(r => r.blob()); //get blob from file url
    return new File([blob], filename, { type: mimeType });
}
export const extractFileInfo = async(response)=>{
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

    return (await urlToFile(canvaImgUrl, canvaTitle, mimeString));
}