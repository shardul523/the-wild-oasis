import {
  NumberInput,
  TextInput,
  Modal,
  Flex,
  Textarea,
  Group,
  FileInput,
  Box,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { useDisclosure } from "@mantine/hooks";
import toast from "react-hot-toast";

import PrimaryButton from "../common/PrimaryButton";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createNewCabin, updateCabin } from "../../services/apiCabins";
import styles from "./CabinForm.module.css";

const formConfig = (cabin) => ({
  initialValues: {
    cabinName: cabin.name || "",
    maxCapacity: cabin.maxCapacity || 0,
    regularPrice: cabin.regularPrice || 0,
    discount: cabin.discount || 0,
    description: cabin.description || "",
    cabinImage: null,
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
});

function CabinForm({ cabinToEdit = {} }) {
  const formType = !cabinToEdit._id ? "add" : "edit";
  const [opened, { open, close }] = useDisclosure(false);
  const form = useForm(formConfig(cabinToEdit));

  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: (data) => {
      if (formType === "edit") return updateCabin(cabinToEdit._id, data);
      return createNewCabin(data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cabins"] });
      form.reset();
      close();
      toast.success(
        `Cabin ${formType === "edit" ? "edited" : "added"} successfully`
      );
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
            classNames={{
              input: styles.input,
            }}
            {...form.getInputProps("cabinName")}
          />
          <NumberInput
            label={"Max Capacity"}
            allowNegative={false}
            classNames={{ input: styles.input }}
            {...form.getInputProps("maxCapacity")}
          />
          <NumberInput
            label={"Regular Price"}
            allowNegative={false}
            prefix="$"
            classNames={{ input: [styles.input] }}
            {...form.getInputProps("regularPrice")}
          />
          <NumberInput
            label={"Discount"}
            allowNegative={false}
            prefix="$"
            classNames={{ input: styles.input }}
            {...form.getInputProps("discount")}
          />
          <Textarea
            label={"Description"}
            minRows={2}
            classNames={{ input: styles.input }}
            {...form.getInputProps("description")}
          />
          <FileInput
            label={"Cabin Image"}
            placeholder={"Upload Cabin Image"}
            classNames={{ input: styles.input }}
            {...form.getInputProps("cabinImage")}
          />
          <Group justify="flex-end">
            <PrimaryButton type="submit" loading={isPending}>
              {formType === "edit" ? "Edit" : "Add"}
            </PrimaryButton>
            <PrimaryButton type="reset" variant={"outline"} onClick={close}>
              Cancel
            </PrimaryButton>
          </Group>
        </Flex>
      </Modal>
      <Box>
        <PrimaryButton onClick={open}>
          {formType === "edit" ? "Edit" : "Add New Cabin"}
        </PrimaryButton>
      </Box>
    </>
  );
}

export default CabinForm;
