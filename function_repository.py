def search_for_keyword(s_arr, keyword):
    res = {keyword : []}
    for i in range(len(s_arr)):
        s = s_arr[i]
        if keyword.lower() in s.lower():
            if i != 0:
                s = s_arr[i-1] + s

            if i < len(s_arr) - 1:
                s = s + s_arr[i + 1]

            res.get(keyword).append(s+'.')

    return res

def parse_string(file, keywords):

    s_arr = file.split('.')
    f = {}

    for keyword in keywords:
        keysearch = search_for_keyword(s_arr, keyword)
        f.update(keysearch)

    res = ""
    for key in f.keys():
        res += key + ': \n\n'

        keysearch = f.get(key)
        for section in keysearch:
            res += section + '\n'

        res += '\n\n\n'

    return res