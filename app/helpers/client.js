import basicAuth from "../../config/basic-auth.json";

const host = "https://UPDATE_ME.ngrok.io";

class Client {
  constructor() {
    // TODO credentials handshake
  }

  getMyData() {
    return this.getJSON("/my_data?user_name=Test&role_name=Test");
  }

  postMyUpdates(updates) {
    return this.postJSON("/my_updates?user_name=Test&role_name=Test", { updates });
  }

  postMyPhotos(image) {
    return this.postFile("/my_photos?user_name=Test&role_name=Test", { image });
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

    await this.post(path, "application/json", data);
  }

  async postFile(path, data) {
    data = snakeCaseKeys(data, { deep: true });
    data = this.toFormData(data);

    await this.post(path, "multipart/form-data", data);
  }

  async post(path, contentType, body) {
    const response = await fetch(`${host}${path}`, {
      method: "POST",
      headers: {
        "Authorization": `Basic ${basicAuth.base64}`,
        "Content-Type": contentType,
      },
      body,
    });

    const status = response.status;

    if (status !== 201) {
      throw new Error(`POST failed with ${response.status}: ${path}`);
    }
  }

  toFormData(data) {
    const formData = new FormData();

    Object.entries(data).forEach(([key, value]) => {
      formData.append(key, value);
    });

    return formData;
  }
}

export default Client;
