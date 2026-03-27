import { Link, useNavigate, useParams } from "react-router-dom";
import { Shield, ArrowLeft, Upload } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const Dispute = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  return (
    <div className="min-h-screen bg-background">
      <header className="bg-card border-b border-border">
        <div className="container mx-auto px-4 h-16 flex items-center gap-4">
          <button onClick={() => navigate(-1)} className="text-muted-foreground hover:text-foreground">
            <ArrowLeft className="w-5 h-5" />
          </button>
          <Link to="/" className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg gradient-primary flex items-center justify-center">
              <Shield className="w-4 h-4 text-primary-foreground" />
            </div>
            <span className="font-bold text-foreground">TrustPay</span>
          </Link>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 max-w-lg">
        <h1 className="text-2xl font-bold text-foreground mb-1">Report an Issue</h1>
        <p className="text-sm text-muted-foreground mb-8">Transaction #{id}</p>

        <form onSubmit={(e) => { e.preventDefault(); navigate("/dashboard"); }} className="space-y-5">
          <div>
            <Label>Reason</Label>
            <Select required>
              <SelectTrigger className="mt-1">
                <SelectValue placeholder="Select a reason" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="not-received">Item not received</SelectItem>
                <SelectItem value="wrong-item">Wrong item received</SelectItem>
                <SelectItem value="damaged">Item damaged</SelectItem>
                <SelectItem value="other">Other</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="details">Details</Label>
            <Textarea id="details" placeholder="Describe your issue..." required className="mt-1 min-h-[120px]" />
          </div>

          <div>
            <Label>Upload Evidence</Label>
            <div className="mt-1 border-2 border-dashed border-border rounded-xl p-8 text-center cursor-pointer hover:border-primary/30 transition-colors">
              <Upload className="w-8 h-8 text-muted-foreground mx-auto mb-2" />
              <p className="text-sm text-muted-foreground">Click to upload files</p>
              <p className="text-xs text-muted-foreground mt-1">PNG, JPG, PDF up to 10MB</p>
            </div>
          </div>

          <Button type="submit" className="w-full bg-destructive text-destructive-foreground hover:bg-destructive/90">
            Submit Dispute
          </Button>
        </form>
      </main>
    </div>
  );
};

export default Dispute;
