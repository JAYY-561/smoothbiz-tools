
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/components/ui/use-toast";

const RequireAuth = ({ onAction }: { onAction: () => void }) => {
  const { session } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleAction = () => {
    if (!session) {
      toast({
        title: "Authentication Required",
        description: "Please sign in to use this tool",
      });
      navigate("/auth");
      return;
    }
    onAction();
  };

  return handleAction;
};

export default RequireAuth;
