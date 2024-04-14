import { uploadImageToImgBB } from "../api/modules/upload/upload_image";

export async function uploadImage(file?: any) {
    const imgAPIKey = '6c2ecca30838fcbf1e057cfd19a1b88d';
    const img = file;
    let formData = new FormData();
    formData.set('key', imgAPIKey);
    formData.append('image', img);
    const response = await uploadImageToImgBB(formData);
    console.log('img: ', response);
    // const uri: any = await uploadImageRequest({filename: res.data.url});
    return response.data.data.display_url;
}
