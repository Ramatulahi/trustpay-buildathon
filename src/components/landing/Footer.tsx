import { Shield } from "lucide-react";

const Footer = () => (
  <footer className="border-t border-border py-12 bg-card/50">
    <div className="container mx-auto px-4">
      <div className="grid sm:grid-cols-4 gap-8">
        <div>
          <div className="flex items-center gap-2 mb-3">
            <div className="w-7 h-7 rounded-lg gradient-primary flex items-center justify-center">
              <Shield className="w-4 h-4 text-primary-foreground" />
            </div>
            <span className="font-bold text-foreground">TrustPay</span>
          </div>
          <p className="text-sm text-muted-foreground">Trust infrastructure for digital commerce in Africa.</p>
        </div>
        <div>
          <h4 className="font-semibold text-foreground mb-3 text-sm">Product</h4>
          <div className="space-y-2 text-sm text-muted-foreground">
            <a href="#features" className="block hover:text-foreground transition-colors">Features</a>
            <a href="#how-it-works" className="block hover:text-foreground transition-colors">How It Works</a>
          </div>
        </div>
        <div>
          <h4 className="font-semibold text-foreground mb-3 text-sm">Company</h4>
          <div className="space-y-2 text-sm text-muted-foreground">
            <a href="#about" className="block hover:text-foreground transition-colors">About</a>
            <p className="cursor-pointer hover:text-foreground transition-colors">Contact</p>
          </div>
        </div>
        <div>
          <h4 className="font-semibold text-foreground mb-3 text-sm">Social</h4>
          <div className="space-y-2 text-sm text-muted-foreground">
            <p className="cursor-pointer hover:text-foreground transition-colors">Twitter</p>
            <p className="cursor-pointer hover:text-foreground transition-colors">LinkedIn</p>
            <p className="cursor-pointer hover:text-foreground transition-colors">Instagram</p>
          </div>
        </div>
      </div>
      <div className="border-t border-border mt-10 pt-6 text-center text-xs text-muted-foreground">
        © {new Date().getFullYear()} TrustPay. All rights reserved.
      </div>
    </div>
  </footer>
);

export default Footer;
