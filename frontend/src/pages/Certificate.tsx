import { useRef } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Link, useParams } from "react-router-dom";
import { Download, Share2, ArrowLeft, Award, Calendar, User } from "lucide-react";
import { motion } from "framer-motion";
import jsPDF from "jspdf";
import { toast } from "@/hooks/use-toast";

const certificateData = {
  studentName: "Alex Thompson",
  courseName: "Complete Web Development Bootcamp 2024",
  completionDate: new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" }),
  instructor: "Sarah Johnson",
  certificateId: "CERT-2024-WD-" + Math.random().toString(36).substr(2, 9).toUpperCase(),
};

const Certificate = () => {
  const { courseId } = useParams();
  const certificateRef = useRef<HTMLDivElement>(null);

  const downloadPDF = () => {
    const doc = new jsPDF({ orientation: "landscape", unit: "mm", format: "a4" });
    
    // Background
    doc.setFillColor(15, 23, 42);
    doc.rect(0, 0, 297, 210, "F");
    
    // Border
    doc.setDrawColor(20, 184, 166);
    doc.setLineWidth(2);
    doc.rect(10, 10, 277, 190);
    doc.rect(15, 15, 267, 180);
    
    // Title
    doc.setTextColor(20, 184, 166);
    doc.setFontSize(14);
    doc.text("CERTIFICATE OF COMPLETION", 148.5, 40, { align: "center" });
    
    // Main text
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(12);
    doc.text("This is to certify that", 148.5, 60, { align: "center" });
    
    // Student name
    doc.setFontSize(32);
    doc.setTextColor(20, 184, 166);
    doc.text(certificateData.studentName, 148.5, 80, { align: "center" });
    
    // Course completion text
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(12);
    doc.text("has successfully completed the course", 148.5, 100, { align: "center" });
    
    // Course name
    doc.setFontSize(20);
    doc.setTextColor(255, 255, 255);
    doc.text(certificateData.courseName, 148.5, 115, { align: "center" });
    
    // Date and instructor
    doc.setFontSize(10);
    doc.setTextColor(148, 163, 184);
    doc.text(`Completed on: ${certificateData.completionDate}`, 80, 150, { align: "center" });
    doc.text(`Instructor: ${certificateData.instructor}`, 220, 150, { align: "center" });
    
    // Certificate ID
    doc.setFontSize(8);
    doc.text(`Certificate ID: ${certificateData.certificateId}`, 148.5, 190, { align: "center" });
    
    doc.save(`certificate-${certificateData.certificateId}.pdf`);
    toast({ title: "Certificate downloaded!", description: "Your certificate has been saved as a PDF." });
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <Button variant="ghost" asChild className="mb-6">
              <Link to={`/courses/${courseId}`}><ArrowLeft className="h-4 w-4" />Back to Course</Link>
            </Button>

            <h1 className="font-heading text-3xl font-bold text-foreground mb-2">Your Certificate</h1>
            <p className="text-muted-foreground mb-8">Congratulations on completing the course!</p>

            {/* Certificate Preview */}
            <Card ref={certificateRef} className="relative overflow-hidden mb-6 aspect-[1.4/1] bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 border-2 border-primary/30">
              <div className="absolute inset-4 border-2 border-primary/20 rounded-lg" />
              <div className="absolute inset-0 flex flex-col items-center justify-center p-8 text-center">
                <Award className="h-12 w-12 text-primary mb-4" />
                <p className="text-primary text-sm uppercase tracking-widest mb-4">Certificate of Completion</p>
                <p className="text-white/70 text-sm mb-2">This is to certify that</p>
                <h2 className="text-3xl font-bold text-primary mb-4">{certificateData.studentName}</h2>
                <p className="text-white/70 text-sm mb-2">has successfully completed</p>
                <h3 className="text-xl font-semibold text-white mb-6">{certificateData.courseName}</h3>
                <div className="flex items-center gap-8 text-sm text-white/60">
                  <span className="flex items-center gap-2"><Calendar className="h-4 w-4" />{certificateData.completionDate}</span>
                  <span className="flex items-center gap-2"><User className="h-4 w-4" />{certificateData.instructor}</span>
                </div>
                <p className="absolute bottom-6 text-xs text-white/40">Certificate ID: {certificateData.certificateId}</p>
              </div>
            </Card>

            <div className="flex flex-wrap gap-3">
              <Button onClick={downloadPDF}><Download className="h-4 w-4" />Download PDF</Button>
              <Button variant="outline"><Share2 className="h-4 w-4" />Share</Button>
            </div>
          </motion.div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Certificate;
