export default function customTranslate(translations: Record<string, any>) {
  return function(template: string, replacements: Record<string, any>) {
    replacements = replacements || {}
    // Translate
    template = translations[template] || template

    // Replace
    return template.replace(/{([^}]+)}/g, (_, key) => {
      let str = replacements[key]
      if (translations[replacements[key]] !== null && translations[replacements[key]] !== undefined)
        str = translations[replacements[key]]

      return str || `{${key}}`
    })
  }
}
