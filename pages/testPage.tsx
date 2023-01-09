import { Box, Container, SimpleGrid } from "@mantine/core";

type Props = {};

export default function testPage({}: Props) {
  return (
    <Box className="flex justify-between items-center gap-4 w-screen bg-primary-500 bg-opacity-20 p-4">
      <Box className="flex flex-col justify-start items-start gap-4 w-full h-full">
        <Box className="bg-orange-300 w-full h-1/4 border-none rounded-lg ">
          {" "}
          Task Bar{" "}
        </Box>
        <Box className="bg-purple-300 w-full h-3/4 border-none rounded-lg">
          {" "}
          Task Table{" "}
        </Box>
      </Box>
      <Box className="flex flex-col justify-start items-start w-full h-full gap-4">
        <Box className="bg-blue-300 h-3/5 w-full border-none rounded-lg">
          {" "}
          Map{" "}
        </Box>
        <Box className="bg-green-300 h-2/5 w-full border-none rounded-lg">
          {" "}
          Tour{" "}
        </Box>
      </Box>
    </Box>
  );
}

/* flex flex-col items-center justify-center  */
