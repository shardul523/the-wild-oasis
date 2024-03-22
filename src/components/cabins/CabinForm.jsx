import {
  NumberInput,
  TextInput,
  Modal,
  Flex,
  Textarea,
  Group,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { useDisclosure } from "@mantine/hooks";
import PrimaryButton from "../common/PrimaryButton";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createNewCabin } from "../../services/apiCabins";
import toast from "react-hot-toast";

const formConfig = {
  initialValues: {
    cabinName: "",
    maxCapacity: 0,
    regularPrice: 0,
    discount: 0,
    description: "",
  },
  validate: {
    cabinName: (value) =>
      value.length > 0 ? null : "Cabin name cannot be empty",
    maxCapacity: (value) =>
      value > 0 ? null : "Cabin must have at least 1 capacity",
    regularPrice: (value) => (value > 0 ? null : "Price cannot be 0"),
    description: (value) =>
      value.length > 0 ? null : "Description cannot be empty",
    discount: (value, values) =>
      value < values.regularPrice
        ? null
        : "Discount cannot be greater than regular price",
  },
};

function CabinForm() {
  const [opened, { open, close }] = useDisclosure(false);
  const form = useForm(formConfig);

  const queryClient = useQueryClient();

  const { mutate, isPending: isCreating } = useMutation({
    mutationFn: createNewCabin,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cabins"] });
      form.reset();
      close();
      toast.success("Cabin created successfully");
    },
    onError: (err) => {
      console.error(err.message);
      toast.error("Cabin could not be created");
    },
  });

  return (
    <>
      <Modal
        opened={opened}
        onClose={close}
        title={"Create New Cabin"}
        centered
      >
        <Flex
          onSubmit={form.onSubmit((value) => mutate(value))}
          component="form"
          direction={"column"}
          gap={20}
          onReset={form.reset}
        >
          <TextInput
            label={"Cabin Name"}
            {...form.getInputProps("cabinName")}
          />
          <NumberInput
            label={"Max Capacity"}
            allowNegative={false}
            {...form.getInputProps("maxCapacity")}
          />
          <NumberInput
            label={"Regular Price"}
            allowNegative={false}
            prefix="$"
            {...form.getInputProps("regularPrice")}
          />
          <NumberInput
            label={"Discount"}
            allowNegative={false}
            prefix="$"
            {...form.getInputProps("discount")}
          />
          <Textarea
            label={"Description"}
            minRows={2}
            {...form.getInputProps("description")}
          />
          <Group justify="flex-end">
            <PrimaryButton type="submit" disabled={isCreating}>
              Add
            </PrimaryButton>
            <PrimaryButton type="reset" variant={"outline"} onClick={close}>
              Cancel
            </PrimaryButton>
          </Group>
        </Flex>
      </Modal>
      <PrimaryButton onClick={open}>Add Cabin</PrimaryButton>
    </>
  );
}

export default CabinForm;
