let xlsx = require("xlsx");
// // writing our test file
// Explanation: Here we have an array of JSON objects called 
// student_data. We use two main functions in this program i.e 
// json_to_sheet() which accepts an array of objects and converts them
// into a worksheet and another function is the book_append_sheet() to 
// append the worksheet into the workbook.

// Finally, all the changes are written to the test.xlsx file using 
// writeFile() function which takes a workbook and a excel file as input parameter.

let pushToCSV = (data, filePath, name) => {
    let newBook = xlsx.utils.book_new();
    let newSheet = xlsx.utils.json_to_sheet(data);

    xlsx.utils.book_append_sheet(newBook, newSheet, name);

    xlsx.writeFile(newBook, filePath);
}

module.exports.pushToCSV = pushToCSV;

