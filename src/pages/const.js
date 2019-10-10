import { Stitch } from "mongodb-stitch-browser-sdk";

// Test:
// const APP_ID='eventdash-rezoi';
// export const ADMIN='fb5hwMH3ZysLx4TXF862zBY8xZppleZORD0IVgH0rk8u2VFdjZVzpT8jlSYchzfg';
// export const stitchClient = Stitch.initializeDefaultAppClient(APP_ID);
// export const DataBase='EventDash';
// export const StitchAuthInfo='__stitch.client.eventdash-rezoi.auth_info';

// Deploy:
const APP_ID = "eventappstitch-yrxdm";
export const ADMIN = "";
export const stitchClient = Stitch.initializeDefaultAppClient(APP_ID);
export const DataBase = "EventDashDB";
export const StitchAuthInfo = "__stitch.client.eventappstitch-yrxdm.auth_info";
