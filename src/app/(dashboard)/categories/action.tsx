import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Edit, MoreHorizontal, Trash } from "lucide-react";

import useConfirm from "@/hooks/use-confirm";
import { useDeleteCategory } from "@/hooks/use-categorie";
import { useEditCategoryStore } from "@/store/category-store";

const Action = ({ id }: { id: string }) => {
  const { mutate } = useDeleteCategory();
  const { onOpen, setID } = useEditCategoryStore();

  // const { data } = useGetCategory();

  const { ConfirmDialog, confirm } = useConfirm({
    title: "Are you sure?",
    description: "You are about to delete this category.",
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
