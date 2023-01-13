type Props = {};

export default function testPage({}: Props) {
  return (
    <div className="flex justify-between items-center gap-4 w-screen h-screen bg-primary-500 bg-opacity-20 p-4">
      <div className="flex flex-col justify-start items-start gap-4 w-full h-full">
        <div className="bg-orange-300 w-full h-1/4 border-none rounded-lg ">
          {" "}
          Task Bar{" "}
        </div>
        <div className="bg-purple-300 w-full h-3/4 border-none rounded-lg">
          {" "}
          Task Table{" "}
        </div>
      </div>
      <div className="flex flex-col justify-start items-start w-full h-full gap-4">
        <div className="bg-blue-300 h-3/5 w-full border-none rounded-lg">
          {" "}
          Map{" "}
        </div>
        <div className="bg-green-300 h-2/5 w-full border-none rounded-lg">
          {" "}
          Tour{" "}
        </div>
      </div>
    </div>
  );
}

/* flex flex-col items-center justify-center  */
