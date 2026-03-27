import { useState, useRef } from "react";
import { Volume2, Loader2, Square } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";
import { useToast } from "@/hooks/use-toast";

interface ListenButtonProps {
  text: string;
  voice?: string;
  size?: "sm" | "default" | "icon";
  variant?: "ghost" | "outline" | "default";
  className?: string;
}

const TTS_URL = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/text-to-speech`;

// Browser TTS language mapping
const browserLangMap: Record<string, string> = {
  english: "en-NG",
  pidgin: "en-NG",
  yoruba: "yo-NG",
  hausa: "ha-NG",
};

const ListenButton = ({ text, voice, size = "sm", variant = "ghost", className = "" }: ListenButtonProps) => {
  const [loading, setLoading] = useState(false);
  const [playing, setPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);
  const { language } = useLanguage();
  const { toast } = useToast();

  const speakWithBrowserTTS = (textToSpeak: string) => {
    if (!("speechSynthesis" in window)) {
      toast({ title: "Not Supported", description: "Your browser doesn't support text-to-speech", variant: "destructive" });
      return;
    }

    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(textToSpeak);
    utterance.lang = browserLangMap[language] || "en-NG";
    utterance.rate = 0.9;
    utterance.onend = () => setPlaying(false);
    utterance.onerror = () => setPlaying(false);
    utteranceRef.current = utterance;
    window.speechSynthesis.speak(utterance);
    setPlaying(true);
  };

  const handleListen = async () => {
    // If currently playing, stop
    if (playing) {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
      }
      window.speechSynthesis.cancel();
      setPlaying(false);
      return;
    }

    if (!text.trim()) return;

    setLoading(true);
    try {
      const response = await fetch(TTS_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`,
        },
        body: JSON.stringify({
          text: text.slice(0, 2000),
          language,
          voice: voice || "Idera",
        }),
      });

      if (!response.ok) {
        // Fallback to browser TTS
        console.log("YarnGPT unavailable, using browser TTS");
        speakWithBrowserTTS(text);
        setLoading(false);
        return;
      }

      const contentType = response.headers.get("content-type") || "";
      if (!contentType.includes("audio")) {
        // Not audio response, fallback
        console.log("Non-audio response, using browser TTS");
        speakWithBrowserTTS(text);
        setLoading(false);
        return;
      }

      const blob = await response.blob();
      const url = URL.createObjectURL(blob);

      if (audioRef.current) {
        audioRef.current.pause();
        URL.revokeObjectURL(audioRef.current.src);
      }

      const audio = new Audio(url);
      audioRef.current = audio;

      audio.onended = () => {
        setPlaying(false);
        URL.revokeObjectURL(url);
      };
      audio.onerror = () => {
        setPlaying(false);
        // Fallback on playback error
        speakWithBrowserTTS(text);
      };

      await audio.play();
      setPlaying(true);
    } catch (e) {
      console.error("TTS error:", e);
      // Fallback to browser TTS on any error
      speakWithBrowserTTS(text);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Button
      variant={variant}
      size={size}
      onClick={handleListen}
      disabled={loading}
      className={`gap-1.5 ${className}`}
      title={playing ? "Stop" : `Listen in ${language}`}
    >
      {loading ? (
        <Loader2 className="w-4 h-4 animate-spin" />
      ) : playing ? (
        <Square className="w-3.5 h-3.5" />
      ) : (
        <Volume2 className="w-4 h-4" />
      )}
      {size !== "icon" && (
        <span className="text-xs">{loading ? "Loading..." : playing ? "Stop" : "Listen"}</span>
      )}
    </Button>
  );
};

export default ListenButton;
