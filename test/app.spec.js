import request from "supertest";

import app from "../app";

import { url } from "./common/utils";

// const mysql = {};
// mysql.createPool = jest.fn().mockImplementation((connectionObject) => {
//   return {
//     getConnection: (fn) => {
//       return true;
//     },
//     promise: () => {
//       return true;
//     }
//   };
// });

describe('In App', () => { 
  const URL = url + "/non-existing/path";
  const METHODS = [
    "get",
    "post",
    "put",
    "patch",
    "delete",
    "options"
  ];
  let resList = [];

  beforeAll(async () => {

    for (const method of METHODS) {
      resList.push(await request(app)[method](URL));
    }
  });

  test('should first', () => { 
    console.log("response - ", resList.map(res => res.status));
  })
});