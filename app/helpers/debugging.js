const alertj = (object) => {
  alert(JSON.stringify(object));
}

const logj = (object) => {
  console.log(JSON.stringify(object));
}

const Textj = ({ children }) => (
  <Text>{JSON.stringify(children)}</Text>
);

export { alertj, logj, Textj };
