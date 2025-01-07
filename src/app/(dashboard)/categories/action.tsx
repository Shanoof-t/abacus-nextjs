import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Edit, MoreHorizontal, Trash } from "lucide-react";

import { useDeleteAccount } from "@/hooks/use-account";
import { useEditAccountStore } from "@/store/account-store";
import useConfirm from "@/hooks/use-confirm";

const Action = ({ id }: { id: string }) => {
  const { onOpen, setID } = useEditAccountStore();
  const { mutate } = useDeleteAccount();
  const { ConfirmDialog, confirm } = useConfirm({
    title: "Are you sure?",
    description: "You are about to delete this account.",
  });

  return (
    <DropdownMenu>
      <ConfirmDialog />
      <DropdownMenuTrigger>
        <MoreHorizontal />
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem
          onClick={() => {
            onOpen();
            setID(id);
          }}
        >
          <Edit />
          Edit
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          onClick={async () => {
            const ok = await confirm();
            if (ok) {
              mutate(id);
            }
          }}
        >
          <Trash />
          Delete
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default Action;
