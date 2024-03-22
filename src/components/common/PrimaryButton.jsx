import { Button } from "@mantine/core";

function PrimaryButton({ children, ...props }) {
  return (
    <Button color="violet" {...props}>
      {children}
    </Button>
  );
}

export default PrimaryButton;
