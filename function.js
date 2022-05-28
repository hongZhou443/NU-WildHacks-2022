function search_for_keyword(s_arr, keyword){
    var res = {keyword: []};
    for (let i = 0; i < s_arr.length; i++){
        if(s_arr[i].toLowerCase().includes(keyword.toLowerCase)){
            s = s_arr[i];
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
    let s_arr = tot_string.split('.');
    let f = {};

    for(var keyword in keywords){
        key_search = parse_string(s_arr, keyword);
        f.push(key_search);
    }

    let res = "";
    for(var key in f){
        res += key + ': \n\n';

        keysearch = f.get(key);
        for(var section in keysearch){
            res += section + '\n';
        }

        res += '\n\n\n';
    }

    return res;
}
