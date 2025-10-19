import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";

const CookieConsent = () => {
  const [showConsent, setShowConsent] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem("cookieConsent");
    if (!consent) {
      setShowConsent(true);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem("cookieConsent", "accepted");
    setShowConsent(false);
  };

  const handleDecline = () => {
    localStorage.setItem("cookieConsent", "declined");
    setShowConsent(false);
  };

  if (!showConsent) return null;

  return (
    <div className="fixed bottom-4 left-4 right-4 md:left-auto md:right-4 md:max-w-md z-50 animate-fade-in">
      <div className="bg-card border border-border rounded-2xl shadow-lg p-4 md:p-6 backdrop-blur-xl">
        <div className="flex items-start gap-3">
          <div className="flex-1">
            <h3 className="font-semibold text-sm md:text-base mb-2 text-foreground">🍪 Cookie Policy</h3>
            <p className="text-xs md:text-sm text-muted-foreground mb-4">
              We use cookies to enhance your experience and remember your preferences. 
              By continuing, you agree to our use of cookies.
            </p>
            <div className="flex flex-col sm:flex-row gap-2">
              <Button 
                onClick={handleAccept} 
                size="sm"
                className="w-full sm:w-auto text-xs md:text-sm"
              >
                Accept All
              </Button>
              <Button 
                onClick={handleDecline} 
                variant="outline" 
                size="sm"
                className="w-full sm:w-auto text-xs md:text-sm"
              >
                Decline
              </Button>
            </div>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={handleDecline}
            className="shrink-0 h-6 w-6"
          >
            <X className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CookieConsent;