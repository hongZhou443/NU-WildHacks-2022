import PyPDF2
# pip install PyPDF2     --> Is needed for the import above


def search_for_keyword(s_arr, keyword):
    res = {keyword: []}
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


def total_string():
    pdfFileObj = open('INPUTPDF.pdf', 'rb')

    pdfReader = PyPDF2.PdfFileReader(pdfFileObj)

    i = 0
    str1 = ""
    while i < pdfReader.numPages:
        pageObj = pdfReader.getPage(i)
        str1 = str1 + pageObj.extractText() + " "
        i = i+1

    pdfFileObj.close()
    return str1
