import _ from "lodash";

export default function handleFieldChange(e, state) {
  let attrs = e.target.name.split(".");
  let key = attrs.pop();
  let value = e.target.value;

  let objectKey = "";
  let topObject, object = {};

  if (attrs.length > 0) {
    objectKey = attrs.shift();
    topObject = object = _.cloneDeep(state[objectKey]);
    attrs.forEach((attr) => object = object[attr]);
    object[key] = value;
    return {[objectKey]: topObject};
  } else {
    return {[key]: value};
  }
}
