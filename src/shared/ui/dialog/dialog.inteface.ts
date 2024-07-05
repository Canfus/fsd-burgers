export interface DialogProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'title'> {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title?: React.ReactNode;
}
