function testCSV(jsonInput) {
  console.log("Print flatlist");
  console.log(jsonInput);

  const csv = jsonToCSV(jsonInput);

  console.log("Print csv");
  console.log(csv);

  const json2 = csvToJson(csv);

  console.log("Print json");
  console.log(json2);

  const csv2 = jsonToCSV(json2);

  console.log("Print csv");
  console.log(csv2);
}

export function csvToJson(csv) {
  var lines = csv.split("\n");

  var result = [];
  var headers = [];

  let defaultSeperator = ";"

  var tempHeader = lines[0].split( defaultSeperator );

  if(  tempHeader.length == 1 )
  {
      // try TAB's when ; was not successful
      defaultSeperator = "\t"
      tempHeader = lines[0].split( defaultSeperator );
  }  

  for (var i = 0; i < tempHeader.length; i++) {
      headers.push( tempHeader[i].trim() )
  }

  let createId = true
  if( headers.indexOf("id") >= 0 ){
    createId = false // id column found
  }

  let ifOffset = 100

  for (var i = 1; i < lines.length; i++) {
    var obj = {};
    var currentline = lines[i].trim(); // irnore empty lines with only TAB's
    var currentline = currentline.split( defaultSeperator );

    if (headers.length == currentline.length) {

      if( createId ){ 
        obj['id'] = "ID-"+ ifOffset + i
      } 

      for (var j = 0; j < headers.length; j++) {
        const str = currentline[j];
        str = str.trim(); // remove whitespace
        str = str.replace(/^"(.*)"$/, "$1"); // remove ""

        obj[headers[j]] = str.trim();
      }



      result.push(obj);
    } else {
      console.log("csvToJson / line skipped ");
    }
  }

  console.log( result );

  return result; //JavaScript object
  // return JSON.stringify(result); //JSON
}

export function jsonToCSV( json3, addHeader = true ) {
  const items = json3;
  const replacer = (key, value) => (value === null ? "" : value); // specify how you want to handle null values here
  const header = Object.keys(items[0]);
  let csv = items.map(row =>
    header.map(fieldName => JSON.stringify(row[fieldName], replacer)).join(";")
  );

  if( addHeader ){ // adding header
    csv.unshift(header.join(";"));
  }
  return csv.join("\r\n");
}
