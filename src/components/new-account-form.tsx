"use client";
import { Input } from "./ui/input";
import { Label } from "./ui/label";

function NewAccountForm() {
  return (
    <div className="my-6">
      <div>
        <Label>Name</Label>
        <Input
          type="text"
          name="account-name"
          placeholder="eg: Savings..."
          className="text-black/50 border rounded-[.50rem] border-black"
        />
      </div>
    </div>
  );
}

export default NewAccountForm;
