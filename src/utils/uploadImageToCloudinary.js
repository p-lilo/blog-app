const uploadImageToCloudinary = async (file) => {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", "unsigned_prese"); 

  const res = await fetch("https://api.cloudinary.com/v1_1/ddldlkbhp/image/upload", {
    method: "POST",
    body: formData,
  });

  if (!res.ok) {
    throw new Error("فشل رفع الصورة إلى Cloudinary");
  }

  const data = await res.json();
  return data.secure_url;
};

export default uploadImageToCloudinary;
