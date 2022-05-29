 $(document).ready(function(){
        $('input[type="file"]').change(function(e){
            var fileName = e.target.files[0].name;
            // alert('The file "' + fileName +  '" has been selected.');
        });
    });

 //call the python function 
 keyword_arr = [liability, pay, corruption];    
 parse_string(total_string(fileName),keyword_arr);

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
    // console.log(input.files[0]);
    fReader.onloadend = function (event) {
        convertDataURIToBinary(event.target.result);
    }
}

var BASE64_MARKER = ';base64,';

function convertDataURIToBinary(dataURI) {

    var base64Index = dataURI.indexOf(BASE64_MARKER) + BASE64_MARKER.length;
    var base64 = dataURI.substring(base64Index);
    var raw = window.atob(base64);
    var rawLength = raw.length;
    var array = new Uint8Array(new ArrayBuffer(rawLength));

    for (var i = 0; i < rawLength; i++) {
        array[i] = raw.charCodeAt(i);
    }
    pdfAsArray(array)

}