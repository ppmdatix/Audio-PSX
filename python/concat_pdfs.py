import PyPDF2

def concat_pdfs(path_a, path_b, output_path):
    # Open the two PDF files
    with open(path_a, 'rb') as file_a, open(path_b, 'rb') as file_b:
        reader_a = PyPDF2.PdfReader(file_a)
        reader_b = PyPDF2.PdfReader(file_b)

        # Get the number of pages in each file
        len_a = len(reader_a.pages)
        len_b = len(reader_b.pages)

        # Create a new PDF writer for the output file
        writer = PyPDF2.PdfWriter()

        # Interleave the pages, repeating single pages if necessary
        for i in range(len_a):
            writer.add_page(reader_a.pages[i])
        for i in range(len_b):
            writer.add_page(reader_b.pages[i])

        # Write out the new PDF
        with open(output_path, 'wb') as output_file:
            writer.write(output_file)