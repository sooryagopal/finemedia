const PDFDocument = require("pdfkit");
const fs = require("fs");
const path = require("path");

const generatePDF = (booking) => {
  return new Promise((resolve, reject) => {

    // 📁 Directory and File path
    const dirPath = path.join(__dirname, "../../uploads");
    if (!fs.existsSync(dirPath)) {
      fs.mkdirSync(dirPath, { recursive: true });
      console.log("📁 Auto-created missing 'uploads' directory for PDF generation!");
    }

    const filePath = path.join(dirPath, `quotation-${booking._id || Date.now()}.pdf`);

    // 📄 Create PDF
    const doc = new PDFDocument({ margin: 50 });
    const stream = fs.createWriteStream(filePath);
    doc.pipe(stream);

    // ================= HEADER =================
    try {
      doc.image(
        path.join(__dirname, "../../assets/logo.png"),
        400,
        30,
        { width: 120 }
      );
    } catch (err) {
      console.log("Logo not found");
    }

    doc
      .fontSize(22)
      .text("FINE MEDIA", 50, 40)
      .fontSize(12)
      .text("Event Management & LED Solutions", 50, 70);

    doc.moveDown(2);

    // ================= CUSTOMER DETAILS =================
    doc.fontSize(12).text("To,", { underline: true });
    doc.text(booking.name || booking.customerName || "Customer");
    doc.text(booking.email || "-");
    doc.text(booking.phone || "-");

    doc.moveDown();

    // ================= SUBJECT =================
    doc
      .fontSize(14)
      .text("Quotation for Event Services", { underline: true });

    doc.moveDown();

    // ================= BODY =================
    doc.fontSize(12).text(
      `Dear ${booking.name || booking.customerName || "Customer"},`
    );

    doc.moveDown();

    doc.text(
      "Greetings from Fine Media.\n\nWe are pleased to provide you with the quotation for your upcoming event. Below are the details:"
    );

    doc.moveDown();

    // ================= EVENT DETAILS =================
    doc.text(`Event Type: ${booking.eventType || "-"}`);
    doc.text(`Event Date: ${booking.eventDate || "-"}`);
    doc.text(`Location: ${booking.place || booking.eventLocation || "-"}`);
    doc.text(`LED Type: ${booking.ledSize || "Standard"}`);
    doc.text(`Quantity: ${booking.quantity || 1}`);

    doc.moveDown();

    // ================= PRICE =================
    doc
      .fontSize(14)
      .text(`Total Amount: ₹${booking.totalCost || booking.totalAmount || 5000}`, {
        underline: true,
      });

    doc.moveDown(2);

    // ================= FOOTER MESSAGE =================
    doc
      .fontSize(12)
      .text(
        "We assure you quality service and timely execution. Thank you for choosing Fine Media."
      );

    doc.moveDown(3);

    // ================= SIGNATURE =================
    doc.text("Warm regards,");
    doc.moveDown();

    doc.text("For FINE MEDIA");

    try {
      doc.image(
        path.join(__dirname, "../../assets/sign.png"),
        50,
        doc.y,
        { width: 100 }
      );
    } catch (err) {
      console.log("Signature not found");
    }

    doc.moveDown(3);

    doc.text("Authorized Signatory");

    // ================= SEAL =================
    try {
      doc.image(
        path.join(__dirname, "../../assets/seal.png"),
        400,
        doc.y - 50,
        { width: 100 }
      );
    } catch (err) {
      console.log("Seal not found");
    }

    // ================= BOTTOM ADDRESS =================
    doc.moveDown(5);

    doc
      .fontSize(10)
      .text(
        "NO.7, VAIRAM STREET, NALLI HOSPITAL ROAD, ERODE - 638004",
        { align: "center" }
      );

    doc.text(
      "Email: finemedia@gmail.com | Phone: 98427-34466",
      { align: "center" }
    );

    // ================= END =================
    doc.end();

    stream.on("finish", () => resolve(filePath));
    stream.on("error", reject);
  });
};

module.exports = generatePDF;