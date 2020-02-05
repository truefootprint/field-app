class Fingerprint {
  static filename(md5, url) {
    return `${md5}.${File.extension(url)}`;
  }

  static path(md5, url) {
    return File.path(this.filename(md5, url));
  }
}

export default Fingerprint;
