import { Group, Title } from "@mantine/core";
import CabinsTable from "../components/cabins/CabinsTable";
import CabinForm from "../components/cabins/CabinForm";

function Cabins() {
  return (
    <>
      <Group justify="space-between" mb={10} w={"100%"}>
        <Title size={"h2"} order={3}>
          All Cabins
        </Title>
        <p>Filter / Sort</p>
      </Group>
      <CabinForm />
      <CabinsTable />
    </>
  );
}

export default Cabins;
