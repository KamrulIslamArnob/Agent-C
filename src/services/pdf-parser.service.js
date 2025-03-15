const fs = require("fs");
const pdf = require("pdf-parse");

// Extract text from PDF
async function extractTextFromPDF(pdfPath) {
    const dataBuffer = fs.readFileSync(pdfPath);
    const data = await pdf(dataBuffer);
    return data.text;
}


module.exports = { extractTextFromPDF };
