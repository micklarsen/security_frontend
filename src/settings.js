const domain = "https://micklarsen.com/"; 
/* const domain = "http://localhost:"; */


const port = "8080/";
const app = "4SEM_Security";


/* LOCAL HOST DEV */
/* export const URL = domain + port + app;
export const allComments = domain + port + app + "/api/comments/all"; 
export const deleteAComment = domain + port + app + "/api/comments/delete/";
export const editAComment = domain + port + app + "";
export const postAComment = domain + port + app + "/api/comments"; 
export const addFriend = domain + port  + app + "/api/info"; */


/* LIVE ENVIRONMENT */
export const URL = domain + app;
export const allComments = domain + app + "/api/comments/all"; 
export const deleteAComment = domain + app + "/api/comments/delete/";
export const editAComment = domain + app + "";
export const postAComment = domain + app + "/api/comments";
export const addFriend = domain + app + "/api/info"; 