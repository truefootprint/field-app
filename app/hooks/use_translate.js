// Provides a function for getting translated text from the user_interface_text
// section of /my_data. Both these work:
//
// t.project_contract
// t("project_contract")
//
// Use the latter when you need to provide arguments:
//
// t("n_of_m", { n: 3, m: 5 });
//
// Keys can be nested with dot (.) characters:
//
// t.issue.record

const useTranslate = () => {
  let { data } = useContext(AppContext);

  if (typeof jest !== "undefined") {
    data = { userInterfaceText: fakeTranslationText };
  }

  const translate = (key, args={}) => {
    let value = getNested(key);

    if (typeof value === "undefined") {
      throw new Error(`missing translation: ${key}`);
    }

    for (const [k, v] of Object.entries(args)) {
      value = value.replace(`%{${k}}`, v);
    }

    return value;
  };

  const getNested = (key) => (
    key.split(".").reduce((obj, k) => obj[k], translate)
  );

  const setNested = (key, value) => {
    const parts = key.split(".");
    const last = parts.pop();

    const obj = parts.reduce((obj, k) => obj[k] = obj[k] || {}, translate);
    obj[last] = value;
  }

  for (const { key, value } of data.userInterfaceText) {
    setNested(key, value);
  }

  return translate;
};

export default useTranslate;
