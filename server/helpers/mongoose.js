module.exports = {
  normalizeErrors: function(errors) {
    let normalizeErrors = [];
    // itarate an Object
    for (let property in errors) {
      if (errors.hasOwnProperty(property)) {
        normalizeErrors.push({
          title: property,
          detail: errors[property].message
        });
      }
    }

    return normalizeErrors;
  }
}

// our Object to iterate is:

/* {
  "errors": {
      "email": {
          "message": "Path `email` is invalid (dddlfffsls@gmail).",
          "name": "ValidatorError",
          "properties": {
              "message": "Path `email` is invalid (dddlfffsls@gmail).",
              "type": "regexp",
              "regexp": {},
              "path": "email",
              "value": "dddlfffsls@gmail"
          },
          "kind": "regexp",
          "path": "email",
          "value": "dddlfffsls@gmail"
      }
  },
  "_message": "User validation failed",
  "message": "User validation failed: email: Path `email` is invalid (dddlfffsls@gmail).",
  "name": "ValidationError"
} */
