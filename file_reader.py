import PyPDF2

def total_string():
    pdfFileObj = open('INPUTPDF.pdf', 'rb') 
     
    pdfReader = PyPDF2.PdfFileReader(pdfFileObj) 
     
    i = 0
    str1 = ""
    while i <pdfReader.numPages:
        pageObj = pdfReader.getPage(i)  
        str1 = str1+ pageObj.extractText() + " "
        i = i+1
    
    pdfFileObj.close() 
    return str1

total_string()