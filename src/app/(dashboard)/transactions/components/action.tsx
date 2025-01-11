import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Edit, MoreHorizontal, Trash } from "lucide-react";


import useConfirm from "@/hooks/use-confirm";
import { useDeleteTransaction } from "@/hooks/use-transaction";
import { useEditTransactionStore } from "@/store/transaction-store";

const Action = ({ id }: { id: string }) => {
  const { onOpen, setID } = useEditTransactionStore();
  const { mutate } = useDeleteTransaction();
  const { ConfirmDialog, confirm } = useConfirm({
    title: "Are you sure?",
    description: "You are about to delete this transaction.",
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
