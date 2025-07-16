import { Button } from "@/components/ui/button";
import Image from "next/image";

const GoogleButton = () => {
  const handleGoogleAuth = () => {
    window.location.href = "http://localhost:8080/api/v1/auth/google";
  };

  return (
    <Button
      className="shadow-lg hover:bg-gray-100 h-[1.5rem] w-full border rounded text-[0.700rem]"
      onClick={handleGoogleAuth}
      variant="outline"
    >
      <Image src="./google-icon.svg" width={15} height={15} alt="google-icon" />
      Continue with Google
    </Button>
  );
};

export default GoogleButton;
