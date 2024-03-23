import { Group, Title, Center, Loader } from "@mantine/core";
import { useQuery } from "@tanstack/react-query";

import CabinsTable from "../components/cabins/CabinsTable";
import CabinForm from "../components/cabins/CabinForm";
import { getAllCabins } from "../services/apiCabins";

function Cabins() {
  const { status, data: cabins } = useQuery({
    queryKey: ["cabins"],
    queryFn: getAllCabins,
  });

  if (status === "pending")
    return (
      <Center mih={"50vh"}>
        <Loader size={50} color="violet" />
      </Center>
    );

  if (status === "error") return <div>There was an error.</div>;

  return (
    <>
      <Group justify="space-between" mb={10} w={"100%"}>
        <Title size={"h2"} order={3}>
          All Cabins
        </Title>
        <p>Filter / Sort</p>
      </Group>
      <CabinForm />
      <CabinsTable cabins={cabins} />
    </>
  );
}

export default Cabins;
