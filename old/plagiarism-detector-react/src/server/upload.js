const IncomingForm = require("formidable").IncomingForm;

module.exports = function upload(req, res) {
  var form = new IncomingForm();

  form.on("file", (field, file) => {
    console.log("field: " + field)
    console.log ("file: " + file)
    file.path = __dirname + '/uploads/' + file.name;
    // Do something with the fileå
    // e.g. save it to the database
    // you can access it using file.path
  });
  form.on("end", () => {
    res.json();
  });
  form.parse(req);

  }
