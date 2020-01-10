function testCSV(jsonInput) {
  console.log("Print flatlist");
  console.log(jsonInput);

  const csv = jsonToCSV(jsonInput);

  console.log("Print csv");
  console.log(csv);

  const json2 = csvSoJson(csv);

  console.log("Print json");
  console.log(json2);

  const csv2 = jsonToCSV(json2);

  console.log("Print csv");
  console.log(csv2);
}

export function csvSoJson(csv) {
  var lines = csv.split("\n");

  var result = [];

  var headers = lines[0].split(";");

  for (var i = 1; i < lines.length; i++) {
    var obj = {};
    var currentline = lines[i].split(";");

    if (headers.length === currentline.length) {
      for (var j = 0; j < headers.length; j++) {
        const str = currentline[j].replace(/^"(.*)"$/, "$1");

        obj[headers[j]] = str;
      }

      result.push(obj);
    } else {
      console.log("csvSoJson / line skipped ");
    }
  }

  return result; //JavaScript object
  // return JSON.stringify(result); //JSON
}

export function jsonToCSV(json3) {
  const items = json3;
  const replacer = (key, value) => (value === null ? "" : value); // specify how you want to handle null values here
  const header = Object.keys(items[0]);
  let csv = items.map(row =>
    header.map(fieldName => JSON.stringify(row[fieldName], replacer)).join(";")
  );
  csv.unshift(header.join(";"));
  return csv.join("\r\n");
}
