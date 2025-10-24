import { useNavigate } from "@tanstack/react-router";

export function useNotFoundPage(): {
  handleClick: () => void;
} {
  const navigate = useNavigate();

  function handleClick(): void {
    navigate({ to: "/login" });
  }

  return {
    handleClick,
  };
}
