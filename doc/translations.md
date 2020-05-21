[< back to README](https://github.com/truefootprint/field-app#readme)

## Translations

The app's content is translated into the language set for the mobile device.
When API requests are made to the backend, this language is sent in the
`Accept-Language` header and the backend responds based on this. Most of the
complexity for translations is handled by the backend and is explained in [this
documentation](https://github.com/truefootprint/field-backend/blob/master/doc/translations.md).

Most of the code that handles translations in is the `useTranslate` hook. By
using this hook, component can embed content that is translated into the user's
language. It provides an interface that's based `I18n.t` from Rails:

```javascript
const MyComponent = () => {
  const t = useTranslate();

  return <Text>{t.some_key}</Text>;
};
```

The `useTranslate` hook depends on the `AppContext` which holds the payload
received from the backend. Translations can also embed interpolated values such
as numbers and their keys can be nested for convenience to group similar
translations together:

```javascript
return <Text>{t.foo.bar({ baz: 123 })}</Text>;
```

### Pre-login translations

Some of the app's components are shown before the user has logged in and the
app has pulled data from the backend. These are referred to as
"pre-login translations". For example, the login screen itself shows
"Please enter your mobile number" and we want this to be translated to match
the user's device language.

To achieve this, we pull a small subset of translations from the backend at
build time. These translations are baked into the app so that they may be used
for this purpose. These translations are pulled from the
[/translations](https://field-backend.truefootprint.com/translations) endpoint
which is public for convenience (no API token necessary).

Once data _has_ been pulled from the backend, these translations are replaced so
that newer versions may be used throughout the app. Translations, just like
everything else, are dynamic and can be changed through FieldAdmin application.

### Personalisation

Translations can be personalised based on ProjectRole. For example, we might
show different introductory text for a 'monitor' versus a 'farmer'. When the
user selects a project the app calls the `setProject` function on the
`useTranslate` hook. This ensures translations are personalised to that project.
At time of writing, a user can only have one role per project so this works well.

When data is pulled from the backend, it contains all of the personalised
translations. The app scans down this list to pull out one that is specific to
the current project, otherwise it falls back to the final item in the list which
doesn't specify a project.

[< back to README](https://github.com/truefootprint/field-app#readme)
