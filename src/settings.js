// const domain = "https://micklarsen.com/";
const domain = "http://localhost:";

const port = "8080/";
const app = "4SEM_Security";


/* LOCAL HOST DEV */
export const URL = domain + port + app;
export const URLJokes = domain + port + app + "/api/jokes";
export const URLScrapeSequential = domain + port + app + "/api/scrape/sequential";
export const URLScrapeParallel = domain + port + app + "/api/scrape/parallel"; 
export const allComments = domain + port + app + "/api/comments/all"; 
export const deleteAComment = domain + port + app + "/api/comments/delete/";
export const editAComment = domain + port + app + "";
export const postAComment = domain + port + app + "/api/comments";

/* LIVE ENVIRONMENT */
// export const URL = domain + app;
// export const allComments = domain + app + "/api/comments/all"; 
// export const deleteComment = domain + app + "/api/comments/delete/";
// export const editAComment = domain + app + "";
// export const postAComment = domain + app + "/api/comments";