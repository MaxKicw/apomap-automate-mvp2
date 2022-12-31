import type { FunctionComponent } from "react";

type WrapperProps = {
  children: React.ReactNode;
};

const Wrapper: FunctionComponent<WrapperProps> = ({ children }) => {
  return <div className="w-[100vw flex h-[100vh]">{children}</div>;
};

export default Wrapper;
