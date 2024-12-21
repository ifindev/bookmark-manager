import { Button } from '@/components/base/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/base/dialog';

interface DeleteBookmarkModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

export default function DeleteBookmarkModal({
  isOpen,
  onClose,
  onConfirm,
}: DeleteBookmarkModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            Are you sure you want to delete this bookmark?
          </DialogTitle>
          <DialogDescription>
            This action cannot be undone. This will permanently delete your
            bookmark.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>     
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button variant="destructive" onClick={onConfirm}>
            Delete
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
