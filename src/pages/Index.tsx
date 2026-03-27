import Navbar from "@/components/landing/Navbar";
import HeroSection from "@/components/landing/HeroSection";
import TrustIndicators from "@/components/landing/TrustIndicators";
import HowItWorks from "@/components/landing/HowItWorks";
import FeaturesSection from "@/components/landing/FeaturesSection";
import WhyTrustPay from "@/components/landing/WhyTrustPay";
import UserTypes from "@/components/landing/UserTypes";
import LanguageSupport from "@/components/landing/LanguageSupport";
import EducationSection from "@/components/landing/EducationSection";
import AboutSection from "@/components/landing/AboutSection";
import FAQSection from "@/components/landing/FAQSection";
import CTASection from "@/components/landing/CTASection";
import Footer from "@/components/landing/Footer";

const Index = () => (
  <div className="min-h-screen bg-background">
    <Navbar />
    <HeroSection />
    <TrustIndicators />
    <HowItWorks />
    <FeaturesSection />
    <WhyTrustPay />
    <UserTypes />
    <LanguageSupport />
    <EducationSection />
    <AboutSection />
    <FAQSection />
    <CTASection />
    <Footer />
  </div>
);

export default Index;
