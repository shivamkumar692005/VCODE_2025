import { Dialog, DialogContent, DialogTitle, DialogDescription, DialogClose } from "@/components/ui/dialog";

const InfoModal = ({ isOpen, onClose, title, description, img }) => {
  if (!isOpen) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md p-6 rounded-xl bg-gray-900 text-white">
        <DialogTitle className="text-lg font-bold">{title}</DialogTitle>
        <DialogDescription className="text-gray-400">{description}</DialogDescription>
        {img && (
          <img src={img} alt={title} className="mt-4 w-full rounded-md shadow-md" />
        )}
        <DialogClose asChild>
          <button className="mt-4 w-full bg-red-500 py-2 rounded-md">Close</button>
        </DialogClose>
      </DialogContent>
    </Dialog>
  );
};

export default InfoModal;
