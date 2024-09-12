import React from "react";

import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogAction,
} from "../ui/alert-dialog";

interface ConfirmationDialog {
  children: React.ReactNode;
  content: {
    title: string;
    description: string;
  };
  footerBtns: {
    cancel: string;
    action: string;
    actionFn: () => void;
  };
}

export const ConfirmationDialog: React.FC<ConfirmationDialog> = ({
  children,
  content: { title = "Are you absolutely sure?", description = "Proceed?" },
  footerBtns: { cancel = "Cancel", action = "Ok", actionFn },
}) => {
  return (
    <AlertDialog>
      {/* This is the button where it will cause the dialog to open */}
      <AlertDialogTrigger asChild>{children}</AlertDialogTrigger>

      {/* Content of the dialog */}
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{title}</AlertDialogTitle>
          <AlertDialogDescription>{description}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>{cancel}</AlertDialogCancel>
          <AlertDialogAction
            onClick={(e) => {
              e.stopPropagation(); // Prevent trigger click events
              actionFn(); // Perform the action
            }}
          >
            {action}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
