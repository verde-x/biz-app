import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useCard } from "@/hooks/useCard";
import type { Card } from "@/types/card";
import { Trash2 } from "lucide-react";

interface DeleteCardDialogProps {
  card: Card;
  onSuccess?: () => void;
}

export const DeleteCardDialog = ({
  card,
  onSuccess,
}: DeleteCardDialogProps) => {
  const [open, setOpen] = useState(false);
  const { deleteCard } = useCard();

  const handleSubmit = async () => {
    const result = await deleteCard(card.id);

    if (!result.success) {
      alert(`Error: ${result.error?.message}`);
      return;
    }

    onSuccess?.();
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost" size="icon">
          <Trash2 className="size-3.5" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Delete Card</DialogTitle>
          <DialogDescription>
            Are you sure you want to delete this business card?
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">Cancel</Button>
          </DialogClose>
          <Button onClick={handleSubmit}>Delete</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
