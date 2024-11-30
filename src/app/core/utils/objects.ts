import { isEmptyStringValue } from "./strings";

export function isObject(obj: any): boolean {
  if (
    (typeof obj === "object" || typeof obj === "function") &&
    obj !== null &&
    !Array.isArray(obj)
  ) {
    return true;
  }
  return false;
}

export function isDefined(value: any): boolean {
  return typeof value !== "undefined" && value !== null;
}

export function propertyDeepFind(obj: Object, path: string): any {
  const paths = path.split(".");
  let current: any = obj;

  for (let i = 0; i < paths.length; ++i) {
    const path = paths[i];
    if (current[path] === undefined || current[path] === null) {
      return undefined;
    } else {
      current = current[path];
    }
  }
  return current;
}

export function propertySetDeepFind(obj: Object, path: string, value: any) {
  const parts = path.split(".");
  let o: any = obj;
  if (parts.length > 1) {
    for (let i = 0; i < parts.length - 1; i++) {
      const path = parts[i];
      if (!o[path]) {
        o[path] = {};
      }
      o = o[path];
    }
  }
  o[parts[parts.length - 1]] = value;
}

export function getSameValueByPropertyPath(
  array: Object[],
  propertyName: string,
  compareАsStrings: boolean = true
) {
  if (Array.isArray(array) && array.length > 0) {
    let initialValue = propertyDeepFind(array[0], propertyName);
    if (compareАsStrings) {
      initialValue = initialValue === undefined ? "" : String(initialValue);
    }
    for (let i = 1; i < array.length; ++i) {
      let propertyDeepValue = propertyDeepFind(array[i], propertyName);
      if (compareАsStrings) {
        propertyDeepValue = String(propertyDeepValue);
      }
      if (initialValue !== propertyDeepValue) {
        return compareАsStrings ? "" : undefined;
      }
    }
    return initialValue;
  }
  return compareАsStrings ? "" : undefined;
}

export function isEmptyObject(
  obj: any,
  exceptProperties: string[] = []
): boolean {
  if (Object.keys(obj).length > 0 && obj.constructor === Object) {
    const keys = Object.keys(obj);
    for (let i = 0; i < keys.length; i++) {
      const keyName = keys[i];
      if (
        exceptProperties &&
        exceptProperties.find(
          (key) =>
            keyName === key && obj[keyName] != null && obj[keyName].length >= 0
        ) != null
      ) {
        // return false;
      } else if (obj[keyName] != null || obj[keyName]?.length > 0) {
        return false;
      }
    }
    return true;
  }
  return Object.keys(obj).length === 0 && obj.constructor === Object;
}

export function deleteEmptyProperties<T = any>(obj: any): T {
  if (Object.keys(obj).length > 0 && obj.constructor === Object) {
    const keys: any = Object.keys(obj);
    for (let i = 0; i < keys.length; i++) {
      const key: any = keys[i];
      if (
        obj[key] == undefined ||
        obj[key] == null ||
        isEmptyStringValue(obj[key])
      ) {
        delete obj[key];
      }
    }
  }
  return obj;
}

export function removeNull(obj: any) {
  Object.keys(obj).forEach(function (key) {
    if (obj[key] && typeof obj[key] === "object") removeNull(obj[key]);
    else if (obj[key] == null) delete obj[key];
  });
}
export function deepCopy(obj: any) {
  var copy: any;

  // Handle the 3 simple types, and null or undefined
  if (null == obj || "object" != typeof obj) return obj;

  // Handle Date
  if (obj instanceof Date) {
    copy = new Date();
    copy.setTime(obj.getTime());
    return copy;
  }

  // Handle Array
  if (obj instanceof Array) {
    copy = [];
    for (var i = 0, len = obj.length; i < len; i++) {
      copy[i] = deepCopy(obj[i]);
    }
    return copy;
  }

  // Handle Object
  if (obj instanceof Object) {
    copy = {};
    for (var attr in obj) {
      if (obj.hasOwnProperty(attr)) copy[attr] = deepCopy(obj[attr]);
    }
    return copy;
  }

  throw new Error("Unable to copy obj! Its type isn't supported.");
}

export function deepMerge(target: any, source: any): any {
  let output = Object.assign({}, target);
  if (isObject(target) && isObject(source)) {
    Object.keys(source).forEach((key: any) => {
      if (isObject(source[key])) {
        if (!(key in target)) {
          Object.assign(output, { [key]: source[key] });
        } else {
          output[key] = deepMerge(target[key], source[key]);
        }
      } else {
        Object.assign(output, { [key]: source[key] });
      }
    });
  }
  return output;
}

export function equals(o1: any, o2: any): boolean {
  if (o1 === o2) return true;
  if (o1 === null || o2 === null) return false;
  if (o1 !== o1 && o2 !== o2) return true; // NaN === NaN
  let t1 = typeof o1,
    t2 = typeof o2,
    length: number,
    key: any,
    keySet: any;
  if (t1 == t2 && t1 == "object") {
    if (Array.isArray(o1)) {
      if (!Array.isArray(o2)) return false;
      if ((length = o1.length) == o2.length) {
        for (key = 0; key < length; key++) {
          if (!equals(o1[key], o2[key])) return false;
        }
        return true;
      }
    } else {
      if (Array.isArray(o2)) {
        return false;
      }
      keySet = Object.create(null);
      for (key in o1) {
        if (!equals(o1[key], o2[key])) {
          return false;
        }
        keySet[key] = true;
      }
      for (key in o2) {
        if (!(key in keySet) && typeof o2[key] !== "undefined") {
          return false;
        }
      }
      return true;
    }
  }
  return false;
}
