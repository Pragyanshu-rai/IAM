export default {
  status: (code) => {
    this.statusCode = code;
    return this;
  },

  get status () {
    return this.statusCode;
  },

  set status (code) {
    this.statusCode = code;
  },

  json: (obj) => {
    this.body = obj;
    return this;
  },

  get body () {
    return this.body;
  },

  set body (obj) {
    this.body = obj;
  },

  
}