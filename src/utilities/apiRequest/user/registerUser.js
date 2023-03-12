import apiCaller from "../apiCaller";

const registerUser = async (details) =>{
    const response = await apiCaller.post("/users/register/", details);
    return response.data;
}
export default registerUser