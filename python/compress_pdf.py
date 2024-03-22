import pikepdf

def compress_pdf(input_path, output_path):
    # Open the source PDF and then save it as an optimized PDF
    # This can reduce file size substantially for some PDFs
    pdf = pikepdf.open(input_path)
    pdf.save(output_path, optimize_size=True)

# Replace 'source.pdf' with your source file and 'compressed_output.pdf' with your desired output file name
