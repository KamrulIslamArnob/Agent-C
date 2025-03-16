const { console } = require('inspector');
const processAndStoreText = require("../services/text_chunking.service");
const { extractTextFromPDF } = require("../services/pdf-parser.service");




exports.uploadQuestion = async (req, res) => {
    try {
        const filePath = req.file.path; // Path to the uploaded PDF

        // Extract text from the PDF
        const docs = await extractTextFromPDF(filePath);

        //console.log(docs);

        // Process and store the text chunks
        await processAndStoreText(docs);

        res.status(200).send({
            message: "PDF processed and stored successfully",
        });
    } catch (error) {
        console.error("Error processing PDF:", error);
        res.status(500).send({
            message: "Error processing PDF: " + error.message,
        });
    }
};



// exports.uploadQuestionPDF = async (req, res) => {
//     try {
//         if (!req.file) {
//             return res.status(400).json({ message: "No PDF file uploaded" });
//         }

//         // Extract text from PDF
//         const pdfText = await parserService.extractTextFromPDF(req.file.path);

//         // Process text (split, embed, store)
//         await processAndStoreText(pdfText);

//         return res.status(200).json({ message: "PDF processed & Embeddings stored successfully" });
//     } catch (error) {
//         console.error("Error processing exam PDF:", error);
//         return res.status(500).json({ message: "Internal server error", error: error.message });
//     }
// };









