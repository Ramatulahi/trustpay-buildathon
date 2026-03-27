import { useState } from "react";
import { Star, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

interface ReviewFormProps {
  transactionId: string;
  sellerId: string;
  onReviewSubmitted: () => void;
}

const ReviewForm = ({ transactionId, sellerId, onReviewSubmitted }: ReviewFormProps) => {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [comment, setComment] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async () => {
    if (rating === 0) {
      toast({ title: "Please select a rating", variant: "destructive" });
      return;
    }
    setSubmitting(true);

    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;

    const { error } = await supabase.from("reviews").insert({
      transaction_id: transactionId,
      buyer_id: user.id,
      seller_id: sellerId,
      rating,
      comment: comment.trim() || null,
    });

    if (error) {
      const msg = error.message.includes("unique_review_per_transaction")
        ? "You've already reviewed this transaction"
        : error.message;
      toast({ title: "Error", description: msg, variant: "destructive" });
    } else {
      toast({ title: "Review submitted! ⭐" });
      onReviewSubmitted();
    }
    setSubmitting(false);
  };

  return (
    <div className="bg-card rounded-2xl border border-border p-6">
      <h3 className="text-sm font-semibold text-foreground mb-3">Rate this Seller</h3>
      <div className="flex gap-1 mb-3">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            type="button"
            onClick={() => setRating(star)}
            onMouseEnter={() => setHover(star)}
            onMouseLeave={() => setHover(0)}
            className="transition-transform hover:scale-110"
          >
            <Star
              className={`w-7 h-7 ${
                star <= (hover || rating)
                  ? "fill-yellow-400 text-yellow-400"
                  : "text-muted-foreground"
              }`}
            />
          </button>
        ))}
      </div>
      <Textarea
        placeholder="Leave a comment (optional)..."
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        className="mb-3"
        maxLength={500}
      />
      <Button
        onClick={handleSubmit}
        disabled={submitting || rating === 0}
        className="w-full gradient-primary text-primary-foreground border-0"
        size="sm"
      >
        {submitting ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : null}
        Submit Review
      </Button>
    </div>
  );
};

export default ReviewForm;
