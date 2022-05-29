 // $(document).ready(function(){
 //        $('input[type="file"]').change(function(e){
 //            var fileName = e.target.files[0].name;
 //            // alert('The file "' + fileName +  '" has been selected.');
 //        });
 //    });


function search_for_keyword(s_arr, keyword){
    var res = [];

    var keyword = keyword.toLowerCase();
    for (var i = 0; i < s_arr.length; i++){
        var curr = s_arr[i].toLowerCase();
        if(curr.includes(keyword)){
            var s = s_arr[i] + ". ";

            if(i > 0){
                s = s_arr[i-1] + ". " + s;
            }

            if (i < s_arr.length - 1){
                s = s + s_arr[i+1] + ". ";
            }

            res.push(s);
            
        }
    }

    return res;
}

function parse_string(tot_string, keywords){
    keywords = keywords.split(',');

    var s_arr = tot_string.split('.').filter((s) => {
        return s.trim() != "";
    });
    var res = "";

    for(var i = 0; i < keywords.length; i ++){
        var keyword = keywords[i];
        var keysearch = search_for_keyword(s_arr, keyword);
        if(keysearch.length != 0){
            res = res + '<b>' + keyword + '</b>' + ': <br><br>';

            for(var j = 0; j < keysearch.length; j ++){
                res = res + keysearch[j] + '<br>';
            }

            res = res +'<br><br><br>';
        }
    }

    console.log(res);

    return res;
}


function myFunction() {
  //const keyword_arr = ["material breach", "material term", "Mercantile agent", "pro-rata", "pro-rated", "sole discretion", "Intervening event", "End User License Agreement", "EULA", "Non-exclusive", "royalty-free", "transferable", "sub-licensable", "worldwide license", "Privacy Policy", "Customer Data", "Automatic Renewal", "Exclusion of liability", "consumer rights", "lease", "tenure", "lump sum", "fees", "non-refundable"];
  var keyword_arr = document.getElementById("keywords-text").value
  var getUserText = document.getElementById("user-text").value;
  var result = parse_string(getUserText, keyword_arr);
  document.getElementById("demo").innerHTML = result;
}

var datass = '';
var DataArr = [];
PDFJS.workerSrc = '';

function ExtractText() {
    var input = document.getElementById("formFile");
    var fReader = new FileReader();
    fReader.readAsDataURL(input.files[0]);
    fReader.onloadend = function (event) {
        return convertDataURIToBinary(event.target.result);
    }
}


function convertDataURIToBinary(dataURI) {
    var BASE64_MARKER = ";base64,";


    var base64Index = dataURI.indexOf(BASE64_MARKER) + BASE64_MARKER.length;
    var base64 = dataURI.substring(base64Index);
    var raw = window.atob(base64);
    var rawLength = raw.length;
    var array = new Uint8Array(new ArrayBuffer(rawLength));

    for (var i = 0; i < rawLength; i++) {
        array[i] = raw.charCodeAt(i);
    }
    return pdfAsArray(array)
}

function getPageText(pageNum, PDFDocumentInstance) {
            // Return a Promise that is solved once the text of the page is retrieven
            return new Promise(function (resolve, reject) {
                PDFDocumentInstance.getPage(pageNum).then(function (pdfPage) {
                    // The main trick to obtain the text of the PDF page, use the getTextContent method
                    pdfPage.getTextContent().then(function (textContent) {
                        var textItems = textContent.items;
                        var finalString = "";

                        // Concatenate the string of the item to the final string
                        for (var i = 0; i < textItems.length; i++) {
                            var item = textItems[i];

                            finalString += item.str + " ";
                        }

                        // Solve promise with the text retrieven from the page
                        resolve(finalString);
                    });
                });
            });
        }

function pdfAsArray(pdfAsArray) {

            PDFJS.getDocument(pdfAsArray).then(function (pdf) {

                var pdfDocument = pdf;
                // Create an array that will contain our promises
                var pagesPromises = [];

                for (var i = 0; i < pdf.pdfInfo.numPages; i++) {
                    // Required to prevent that i is always the total of pages
                    (function (pageNumber) {
                        // Store the promise of getPageText that returns the text of a page
                        pagesPromises.push(getPageText(pageNumber, pdfDocument));
                    })(i + 1);
                }

                // Execute all the promises
                Promise.all(pagesPromises).then(function (pagesText) {

                    // Display text of all the pages in the console
                    // e.g ["Text content page 1", "Text content page 2", "Text content page 3" ... ]
                    var outputStr = "";
                    for (var pageNum = 0; pageNum < pagesText.length; pageNum++) {
                        console.log(pagesText[pageNum]);
                        outputStr = outputStr + "<br/><br/>Page " + (pageNum + 1) + " contents <br/> <br/>";

                        var div_output = document.getElementById('demo');
                        outputStr = outputStr + pagesText[pageNum];

                    }

                    return outputStr;

                });

            }, function (reason) {
                // PDF loading error
                console.error(reason);
            });
        }

function myFunction2() {
  //const keyword_arr = ["material breach", "material term", "Mercantile agent", "pro-rata", "pro-rated", "sole discretion", "Intervening event", "End User License Agreement", "EULA", "Non-exclusive", "royalty-free", "transferable", "sub-licensable", "worldwide license", "Privacy Policy", "Customer Data", "Automatic Renewal", "Exclusion of liability", "consumer rights", "lease", "tenure", "lump sum", "fees", "non-refundable"];
  var keyword_arr = document.getElementById("keywords-text").value
  var getUserText = ExtractText();
  var result_from_file = parse_string(getUserText, keyword_arr);
  document.getElementById("demo").innerHTML = result_from_file;
}