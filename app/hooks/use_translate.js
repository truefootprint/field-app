// Provides a function for getting translated text from the user_interface_text
// section of /my_data. Both these work:
//
// t.project_contract
// t("project_contract")
//
// Use the latter when you need to provide arguments:
//
// t("n_of_m", { n: 3, m: 5 });

const useTranslate = () => {
  let { data } = useContext(AppContext);

  if (typeof jest !== "undefined") {
    data = { userInterfaceText: fakeTranslationText };
  }

  const translate = (key, args={}) => {
    let value = translate[key];

    if (typeof value === "undefined") {
      throw new Error(`missing translation: ${key}`);
    }

    for (const [k, v] of Object.entries(args)) {
      value = value.replace(`%{${k}}`, v);
    }

    return value;
  };

  for (const { key, value } of data.userInterfaceText) {
    translate[key] = value;
  }

  return translate;
};

export default useTranslate;
