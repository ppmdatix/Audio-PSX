import PyPDF2

def interweave_pdfs(path_a, path_b, output_path):
    # Open the two PDF files
    with open(path_a, 'rb') as file_a, open(path_b, 'rb') as file_b:
        reader_a = PyPDF2.PdfReader(file_a)
        reader_b = PyPDF2.PdfReader(file_b)

        # Get the number of pages in each file
        len_a = len(reader_a.pages)
        len_b = len(reader_b.pages)


        if len_a != len_b and (len_a != 1 or len_b !=1)  :
            raise ValueError("The two PDF files must have the same number of pages or only one.")


        # Determine the maximum length for iteration
        max_len = max(len_a, len_b)

        # Create a new PDF writer for the output file
        writer = PyPDF2.PdfWriter()

        # Interleave the pages, repeating single pages if necessary
        for i in range(max_len):
            if i < len_a:
                writer.add_page(reader_a.pages[i % len_a])  # Repeat if single page
            if i < len_b:
                writer.add_page(reader_b.pages[i % len_b])  # Repeat if single page

        # Write out the new PDF
        with open(output_path, 'wb') as output_file:
            writer.write(output_file)


#try:
#    interweave_pdfs(fileA, fileB, outputFile)
#except ValueError as e:
#    print(f"Error: {e}")