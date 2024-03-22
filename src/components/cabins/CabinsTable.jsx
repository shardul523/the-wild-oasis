import {
  Button,
  Center,
  Loader,
  Table,
  NumberFormatter,
  Image,
} from "@mantine/core";
import { toast } from "react-hot-toast";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getAllCabins, deleteCabin } from "../../services/apiCabins";

function CabinsTable() {
  const { status, data: cabins } = useQuery({
    queryKey: ["cabins"],
    queryFn: getAllCabins,
  });

  const queryClient = useQueryClient();

  const { isLoading, mutate } = useMutation({
    mutationFn: deleteCabin,
    onSuccess: () => {
      toast.success("Cabin deleted successfully");
      queryClient.invalidateQueries(["cabins"]);
    },
    onError: () => toast.error("Cabin could not be deleted"),
  });

  if (status === "pending")
    return (
      <Center mih={"50vh"}>
        <Loader size={50} color="violet" />
      </Center>
    );

  if (status === "error") return <div>There was an error.</div>;

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
                <Image src={cabin.image} alt="cabin-cover" w={75} />
              </Table.Td>
              <Table.Td>{cabin.name}</Table.Td>
              <Table.Td>Fits a max of {cabin.maxCapacity} people</Table.Td>
              <Table.Td>
                <NumberFormatter
                  thousandSeparator
                  prefix="$"
                  value={cabin.regularPrice}
                  decimalScale={2}
                />
              </Table.Td>
              <Table.Td>
                {cabin.discount ? (
                  <NumberFormatter
                    value={cabin.discount}
                    decimalScale={2}
                    thousandSeparator
                    prefix="$"
                  />
                ) : (
                  "-"
                )}
              </Table.Td>
              <Table.Td>
                <Button
                  color="violet"
                  disabled={isLoading}
                  onClick={() => mutate(cabin._id)}
                >
                  Delete
                </Button>
              </Table.Td>
            </Table.Tr>
          ))}
        </Table.Tbody>
      </Table>
    </Table.ScrollContainer>
  );
}

export default CabinsTable;
