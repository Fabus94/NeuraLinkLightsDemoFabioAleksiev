module.exports = function (callback, inputFilePath, outputFilePath) {

    //callback : This is node style callback, since the NodeServices invokes the javascript Asynchronously  
    //inputFilePath : The html file path  
    //outputFilePath : The file path where the pdf is to be generated  


    var fs = require('fs'); // get the FileSystem module, provided by the node envrionment  
    var pdf = require('html-pdf'); // get the html-pdf module which we have added in the dependency and downloaded.  
    var html = fs.readFileSync(inputFilePath, 'utf8'); //read the contents of the html file, from the path  
    var options = { format: 'Letter' }; //options provided to html-pdf module. More can be explored in the module documentation  

    //create the pdf file  
    pdf.create(html, options).toFile(outputFilePath, function (err, res) {
        if (err) return callback(null, "Failed to generate PDF");
        callback(null, "Generated PDF Successfully");
    });

}  