const domain = "https://micklarsen.com/";
/* const domain = "http://localhost:"; */

const port = "8080/";
const app = "3SEM_Security/";


/* LOCAL HOST DEV */
/* export const URL = "http://localhost:8080/CA3_Boilerplate";
export const URLJokes = "http://localhost:8080/CA3_Boilerplate/api/jokes";
export const URLScrapeSequential = "http://localhost:8080/CA3_Boilerplate/api/scrape/sequential";
export const URLScrapeParallel = "http://localhost:8080/CA3_Boilerplate/api/scrape/parallel"; */

/* LIVE ENVIRONMENT */
export const URL = domain + app;
export const URLJokes = domain + app + "api/jokes";
export const URLScrapeSequential = domain + app + "api/scrape/sequential";
export const URLScrapeParallel = domain + app + "api/scrape/parallel";