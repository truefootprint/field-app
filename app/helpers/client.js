import basicAuth from "../../config/basic-auth.json";

class Client {
  constructor() {
    // TODO credentials handshake
  }

  myData() {
    return this.getJSON("/my_data?user_name=Test&role_name=Test");
  }

  async getJSON(path) {
    const host = "https://reporter-backend.truefootprint.com";
    const headers = { Authorization: `Basic ${basicAuth.base64}` };
    const response = await fetch(`${host}${path}`, { headers });
    const data = await response.json();

    return camelCaseKeys(data, { deep: true });
  }
}

export default Client;
