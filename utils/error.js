module.exports.uploadError = (error) => {
  let errors = { format: "", maxSize: "" };
  if (error.message.includes("Invalid File")) {
    errors.format = "Format incompatible";
  }
  if (error.message.includes("max Size")) {
    errors.maxSize = "Le fichier dépasse 500ko";
  }

  return errors;
};
