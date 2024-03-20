import { Group, Title } from "@mantine/core";
import CabinsTable from "../components/cabins/CabinsTable";

function Cabins() {
  return (
    <>
      <Group justify="space-between" mb={20}>
        <Title size={"h2"} order={3}>
          All Cabins
        </Title>
        <p>Filter / Sort</p>
      </Group>
      <CabinsTable />
    </>
  );
}

export default Cabins;
