import { useState } from "react";
import { Loader2, Pencil } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogDescription,
} from "@/components/ui/dialog";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

interface EditProfileModalProps {
  profile: any;
  onSaved: (updated: any) => void;
}

const EditProfileModal = ({ profile, onSaved }: EditProfileModalProps) => {
  const [open, setOpen] = useState(false);
  const [saving, setSaving] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSaving(true);
    const form = e.currentTarget;
    const updates = {
      business_name: (form.elements.namedItem("business_name") as HTMLInputElement).value.trim() || null,
      full_name: (form.elements.namedItem("full_name") as HTMLInputElement).value.trim(),
      phone: (form.elements.namedItem("phone") as HTMLInputElement).value.trim() || null,
      instagram: (form.elements.namedItem("instagram") as HTMLInputElement).value.trim() || null,
      twitter: (form.elements.namedItem("twitter") as HTMLInputElement).value.trim() || null,
      website: (form.elements.namedItem("website") as HTMLInputElement).value.trim() || null,
    };

    const { data, error } = await supabase
      .from("profiles")
      .update(updates)
      .eq("id", profile.id)
      .select()
      .single();

    if (error) {
      const msg = error.message.includes("unique_business_name")
        ? "That business name is already taken!"
        : error.message;
      toast({ title: "Update failed", description: msg, variant: "destructive" });
    } else {
      toast({ title: "Profile updated!" });
      onSaved(data);
      setOpen(false);
    }
    setSaving(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" className="gap-1.5">
          <Pencil className="w-3.5 h-3.5" /> Edit Profile
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Edit Seller Profile</DialogTitle>
          <DialogDescription>Update your business details and social links.</DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="full_name">Full Name</Label>
            <Input id="full_name" name="full_name" defaultValue={profile?.full_name || ""} required className="mt-1" />
          </div>
          <div>
            <Label htmlFor="business_name">Business Name</Label>
            <Input id="business_name" name="business_name" defaultValue={profile?.business_name || ""} className="mt-1" />
          </div>
          <div>
            <Label htmlFor="phone">Phone</Label>
            <Input id="phone" name="phone" type="tel" defaultValue={profile?.phone || ""} className="mt-1" />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <Label htmlFor="instagram">Instagram</Label>
              <Input id="instagram" name="instagram" placeholder="username" defaultValue={profile?.instagram || ""} className="mt-1" />
            </div>
            <div>
              <Label htmlFor="twitter">Twitter/X</Label>
              <Input id="twitter" name="twitter" placeholder="username" defaultValue={profile?.twitter || ""} className="mt-1" />
            </div>
          </div>
          <div>
            <Label htmlFor="website">Website</Label>
            <Input id="website" name="website" type="url" placeholder="https://..." defaultValue={profile?.website || ""} className="mt-1" />
          </div>
          <Button type="submit" className="w-full gradient-primary text-primary-foreground border-0" disabled={saving}>
            {saving ? <><Loader2 className="w-4 h-4 mr-2 animate-spin" /> Saving...</> : "Save Changes"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default EditProfileModal;
