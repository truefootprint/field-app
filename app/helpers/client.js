import basicAuth from "../../config/basic-auth.json";
import environments from "../../config/environments.json";

const host = environments.production;

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

  // Ideally, we'd issue a HEAD to /my_photos/filename and check for a 3xx but
  // react-native always follows the redirect, even with { redirect: "manual" }
  getPhotoExists(image) {
    const id = image.name.replace(".", "-");
    return this.getJSON(`/my_photos/${id}/exists?user_name=Test&role_name=Test`);
  }

  postMyPhotos(image) {
    return this.postFile("/my_photos?user_name=Test&role_name=Test", { image });
  }

  postTokens(phoneNumber) {
    return this.postJSON("/tokens", { phoneNumber });
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

    return await this.post(path, "application/json", data);
  }

  async postFile(path, data) {
    data = snakeCaseKeys(data, { deep: true });
    data = this.toFormData(data);

    return await this.post(path, "multipart/form-data", data);
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
    if (status !== 201 && status !== 401) {
      throw new Error(`POST failed with ${response.status}: ${path}`);
    }

    try {
      const data = await response.json();
      return camelCaseKeys(data, { deep: true });
    } catch {
      return {};
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
