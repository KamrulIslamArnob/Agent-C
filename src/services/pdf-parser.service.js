// const fs = require("fs");
// const pdf = require("pdf-parse");

// // Extract text from PDF
// async function extractTextFromPDF(pdfPath) {
//     const dataBuffer = fs.readFileSync(pdfPath);
//     const data = await pdf(dataBuffer);
//     return data.text;
// }


// module.exports = { extractTextFromPDF };

const { PDFLoader } = require("@langchain/community/document_loaders/fs/pdf");


async function extractTextFromPDF(pdfPath) {
    try {
        const loader = new PDFLoader(pdfPath);
        const docs = await loader.load();

        // Log the documents for debugging
        console.log("Extracted documents:", docs);

        // Ensure each document has pageContent
        const validDocs = docs.filter(doc => doc.pageContent && typeof doc.pageContent === "string");
        return validDocs;
    } catch (error) {
        console.error("Error extracting text from PDF:", error);
        throw error;
    }
}

module.exports = { extractTextFromPDF };
