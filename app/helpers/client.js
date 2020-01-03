import basicAuth from "../../config/basic-auth.json";

const host = "https://UPDATE_ME.ngrok.io";

class Client {
  constructor() {
    // TODO credentials handshake
  }

  myData() {
    return this.getJSON("/my_data?user_name=Test&role_name=Test");
  }

  myUpdates(updates) {
    return this.postJSON("/my_updates?user_name=Test&role_name=Test", { updates });
  }

  async getJSON(path) {
    const headers = { Authorization: `Basic ${basicAuth.base64}` };
    const response = await fetch(`${host}${path}`, { headers });
    const data = await response.json();

    return camelCaseKeys(data, { deep: true });
  }

  async postJSON(path, data) {
    data = snakeCaseKeys(data, { deep: true });
    data = JSON.stringify(data);

    const response = await fetch(`${host}${path}`, {
      method: "POST",
      headers: {
        "Authorization": `Basic ${basicAuth.base64}`,
        "Content-Type": "application/json",
      },
      body: data,
    });

    const status = response.status;

    if (status !== 201) {
      throw new Error(`POST failed with ${response.status}: ${path}`);
    }
  }
}

export default Client;
