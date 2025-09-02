import { PaystackButton } from "react-paystack";

interface PremiumButtonProps {
  email: string;
  amount: number;
  onSuccess?: () => void;
}

const PremiumButton = ({ email, amount, onSuccess }: PremiumButtonProps) => {
  const config = {
    reference: new Date().getTime().toString(),
    email,
    amount: amount * 100, // in kobo
    publicKey: import.meta.env.VITE_PAYSTACK_PUBLIC_KEY || "", // Vite-friendly env
  };

  const handleSuccess = () => {
    alert("Payment successful! Premium unlocked.");
    if (onSuccess) onSuccess();
  };

  const handleClose = () => {
    alert("Payment canceled");
  };

  return (
    <PaystackButton
      text="Upgrade to Premium"
      {...config}
      onSuccess={handleSuccess}
      onClose={handleClose}
      className="w-full py-3 bg-primary text-white rounded-lg font-semibold hover:bg-primary/90 transition"
    />
  );
};

export default PremiumButton;
