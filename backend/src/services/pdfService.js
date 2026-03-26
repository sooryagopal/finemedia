const PDFDocument = require('pdfkit');
const fs = require('fs');
const path = require('path');

const generateInvoicePDF = async (bookingData, type = 'Invoice') => {
  return new Promise((resolve, reject) => {
    try {
      const doc = new PDFDocument({ margin: 50 });
      
      const fileName = `${type}_${bookingData._id || Date.now()}.pdf`;
      const invoicesDir = path.join(__dirname, '../../uploads/invoices');
      
      // Ensure directory exists
      if (!fs.existsSync(invoicesDir)) {
        fs.mkdirSync(invoicesDir, { recursive: true });
      }

      const filePath = path.join(invoicesDir, fileName);
      const writeStream = fs.createWriteStream(filePath);
      
      doc.pipe(writeStream);

      // Header
      doc.fontSize(20).text(`Fine Media ${type}`, { align: 'center' });
      doc.moveDown();

      // Customer Info
      doc.fontSize(12).text(`Customer Name: ${bookingData.customerName || 'N/A'}`);
      doc.text(`Email: ${bookingData.email || 'N/A'}`);
      doc.text(`Date: ${new Date().toLocaleDateString()}`);
      doc.moveDown();

      // Event Details
      doc.text(`Event Type: ${bookingData.eventType || 'N/A'}`);
      doc.text(`Location: ${bookingData.eventLocation || 'N/A'}`);
      doc.text(`Service: ${bookingData.serviceType || 'N/A'}`);
      
      doc.moveDown();
      doc.text(`Total Amount: $${bookingData.totalAmount || 0}`, { underline: true });

      doc.end();

      writeStream.on('finish', () => {
        resolve(filePath);
      });

      writeStream.on('error', (err) => {
        reject(err);
      });

    } catch (err) {
      reject(err);
    }
  });
};

module.exports = {
  generateInvoicePDF
};
