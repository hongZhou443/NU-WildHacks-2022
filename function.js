function search_for_keyword(s_arr, keyword){
    var res = {keyword: []};
    for (var i = 0; i < s_arr.length; i++){
        if(s_arr[i].toLowerCase().includes(keyword.toLowerCase)){
            var s = s_arr[i];
            if(i > 0){
                s = s_arr[i-1] + s;
            }

            if (i < s_arr.length - 1){
                s = s + s_arr[i+1];
            }

            res[keyword].push(s);
        }
    }

    return res;
}

function parse_string(tot_string, keywords){
    var s_arr = tot_string.split('.');
    var f = {};

    for(var keyword in keywords){
        var key_search = parse_string(s_arr, keyword);
        f.push(key_search);
    }

    var res = "";
  
    for(var key in f){
        res += key + ': \n\n';

        var keysearch = f.get(key);
        for(var section in keysearch){
            res += section + '\n';
        }

        res += '\n\n\n';
    }

    return res;
}
