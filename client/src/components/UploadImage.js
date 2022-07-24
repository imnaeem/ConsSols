import axios from "axios";
export async function uploadImage(file) {
  return new Promise((resolve, reject) => {
    if (!/^image\//.test(file.type)) {
      reject(`File ${file.name} is not an image`);
    }

    const data = new FormData();
    data.append("file", file);
    data.append("upload_preset", "dins1v04");

    axios
      .post(`https://api.cloudinary.com/v1_1/dxe6wambc/image/upload`, data)
      .then((res) => {
        resolve(res.data.secure_url);
      })
      .catch((err) => {
        console.log(err);
        reject("Image Upload Failed, Try Again!");
      });
  });
}
