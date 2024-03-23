import { Table, NumberFormatter, Image, Group } from "@mantine/core";
import { toast } from "react-hot-toast";

import PrimaryButton from "../common/PrimaryButton";
import CabinForm from "./CabinForm";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteCabin } from "../../services/apiCabins";

function CabinsTable({ cabins }) {
  const queryClient = useQueryClient();

  const { isLoading, mutate } = useMutation({
    mutationFn: deleteCabin,
    onSuccess: () => {
      toast.success("Cabin deleted successfully");
      queryClient.invalidateQueries(["cabins"]);
    },
    onError: () => toast.error("Cabin could not be deleted"),
  });

  return (
    <Table.ScrollContainer w={"100%"}>
      <Table withTableBorder horizontalSpacing={"lg"}>
        <Table.Thead style={{ textTransform: "uppercase" }} bg={"gray.3"}>
          <Table.Tr>
            <Table.Th></Table.Th>
            <Table.Th>Cabin</Table.Th>
            <Table.Th>Capacity</Table.Th>
            <Table.Th>Price</Table.Th>
            <Table.Th>Discount</Table.Th>
            <Table.Th></Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody bg={"white"} style={{ paddingLeft: 5 }}>
          {cabins.map((cabin) => (
            <Table.Tr key={cabin._id}>
              <Table.Td>
                <Image src={cabin.image} alt="cabin-cover" w={50} h={50} />
              </Table.Td>
              <Table.Td>{cabin.name}</Table.Td>
              <Table.Td>Fits a max of {cabin.maxCapacity} people</Table.Td>
              <Table.Td>
                <NumberFormatter
                  thousandSeparator
                  prefix="$"
                  value={cabin.regularPrice}
                  decimalScale={2}
                  style={{ color: "green", fontWeight: "bold" }}
                />
              </Table.Td>
              <Table.Td>
                {cabin.discount ? (
                  <NumberFormatter
                    value={cabin.discount}
                    decimalScale={2}
                    thousandSeparator
                    prefix="$"
                    style={{ color: "red", fontWeight: "bold" }}
                  />
                ) : (
                  "-"
                )}
              </Table.Td>
              <Table.Td>
                <Group>
                  <PrimaryButton
                    disabled={isLoading}
                    onClick={() => mutate(cabin._id)}
                  >
                    Delete
                  </PrimaryButton>
                  <CabinForm formType={"edit"} cabinToEdit={cabin} />
                </Group>
              </Table.Td>
            </Table.Tr>
          ))}
        </Table.Tbody>
      </Table>
    </Table.ScrollContainer>
  );
}

export default CabinsTable;
