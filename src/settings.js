/* const domain = "https://micklarsen.com/"; */
const domain = "http://localhost:";

const port = "8080/";
const app = "4SEM_Security";


/* LOCAL HOST DEV */
export const URL = domain + port + app;
export const URLJokes = domain + port + app + "/api/jokes";
export const URLScrapeSequential = domain + port + app + "/api/scrape/sequential";
export const URLScrapeParallel = domain + port + app + "/api/scrape/parallel"; 

/* LIVE ENVIRONMENT */
/* export const URL = domain + app;
export const URLJokes = domain + app + "api/jokes";
export const URLScrapeSequential = domain + app + "api/scrape/sequential";
export const URLScrapeParallel = domain + app + "api/scrape/parallel"; */