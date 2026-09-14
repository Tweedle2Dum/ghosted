/**
 * Converts a plain object into a FormData object.
 * Ignores undefined or null values.
 * If a value is an array, it appends each item (handling files correctly).
 */
export function objectToFormData(obj: Record<string, any>): FormData {
  const formData = new FormData();

  for (const [key, value] of Object.entries(obj)) {
    if (value === undefined || value === null) {
      continue;
    }

    if (Array.isArray(value)) {
      for (const item of value) {
        if (item instanceof Blob || item instanceof File) {
          formData.append(key, item);
        } else {
          formData.append(key, String(item));
        }
      }
    } else if (value instanceof Blob || value instanceof File) {
      formData.append(key, value);
    } else {
      formData.append(key, String(value));
    }
  }

  return formData;
}

/**
 * Extracts a FormData object back into a plain object.
 * Supports basic type coercion (numbers, booleans) if needed,
 * but returns strings and Files by default.
 */
export function formDataToObject<T = Record<string, any>>(
  formData: FormData,
): T {
  const obj: Record<string, any> = {};

  for (const [key, value] of formData.entries()) {
    // If the key already exists, we might be dealing with an array of items
    if (Object.hasOwn(obj, key)) {
      if (!Array.isArray(obj[key])) {
        obj[key] = [obj[key]];
      }
      obj[key].push(value);
    } else {
      // Empty string values are often just omitted or converted to undefined/null
      // but let's keep it strictly exactly what formData gives us, empty string is empty string.
      obj[key] = value;
    }
  }

  return obj as T;
}
