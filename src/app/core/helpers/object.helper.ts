import _ from "lodash"

export class ObjectHelper {
  public static keysToSnakeCase(obj: any): any {
    if (_.isArray(obj)) {
      return this.keysToSnakeCase(obj)
    }
    if (_.isObject(obj)) {
      return _.mapValues(
        _.mapKeys(obj, (v, k) => _.snakeCase(k)), 
        (v) =>  this.keysToSnakeCase(v))
    }
    return obj
  }
  public static keysToCamelCase(obj: any): any {
    if (_.isArray(obj)) {
      return this.keysToCamelCase(obj)
    }
    if (_.isObject(obj)) {
      return _.mapValues(
        _.mapKeys(obj, (v, k) => _.camelCase(k)), 
        (v) =>  this.keysToCamelCase(v))
    }
    return obj
  }
}