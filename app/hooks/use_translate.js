import preLoginTranslations from "../helpers/pre_login_translations";

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

  data = data || { userInterfaceText: [] };
  data.userInterfaceText = data.userInterfaceText || [];

  if (typeof jest !== "undefined") {
    data = { userInterfaceText: fakeTranslationText };
  }

  if (useTranslate.locale) {
    data.userInterfaceText = [
      ...preLoginTranslations[useTranslate.locale], ...data.userInterfaceText,
    ];
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

  // Try to use translations in app/helpers/global_errors if the app hasn't
  // crashed before this point! Otherwise, it falls back to pre-login / English.
  global.translate = translate;

  return translate;
};

useTranslate.setLocale = (locale) => {
  useTranslate.locale = "fr"; // TODO: fallbacks
};

export default useTranslate;
