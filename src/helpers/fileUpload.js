export const fileUpload = async (file) => {
  const cloudUrl =
    "https://api.cloudinary.com/v1_1/duivkjfay/upload";
  const fornData = new FormData();

  fornData.append("upload_preset", "ReactJournal");
  fornData.append("file", file);

  try {
    const resp = await fetch(cloudUrl, {
      method: "POST",
      body: fornData,
      
    });

    if (resp.ok) {
      const cloudResp = await resp.json();
      return cloudResp.secure_url;
    }
    else{
        throw await resp.json();

    }
  } catch (error) {
   throw error;
  }
};
