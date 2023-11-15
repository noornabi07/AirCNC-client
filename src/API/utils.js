// upload image in to the Imgbb

export const uploadImage = async image =>{
    const formData = new FormData();
    formData.append('image', image);

    const url = `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_Imgbb_Key}`;
    const response = await fetch(url, {
        method: 'POST',
        body: formData
    })

    const data = await response.json();
    return data;
}