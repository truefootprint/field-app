import PDFReader from "rn-pdf-reader-js"

const PDF = ({ uri }) => (
  <PDFReader source={{ uri }} withScroll={true} />
);

export default PDF;
