import { Center, Image } from "@mantine/core";

function Logo() {
  return (
    <Center inline my={30}>
      <Image w={150} alt="logo" src={"/img/logo-light.png"} />
    </Center>
  );
}

export default Logo;
