import { Button } from "@/components/ui/button";
import { useBudgetDrawerStore } from "@/store/budget-store";

const Action = ({ id }: { id: string }) => {
  const { onOpen, setId } = useBudgetDrawerStore();
  return (
    <Button
      variant="outline"
      onClick={() => {
        setId(id);
        onOpen();
      }}
    >
      Show Details
    </Button>
  );
};
export default Action;
