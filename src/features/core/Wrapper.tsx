import { FunctionComponent, useEffect } from "react";
import { useAuth } from "../../hooks/useAuth";
import { useStore } from "../../hooks/useStore";

type WrapperProps = {
  children: React.ReactNode;
};

const Wrapper: FunctionComponent<WrapperProps> = ({ children }) => {
  const store = useStore();
  const { setAuthListener, refreshToken } = useAuth({ store });

  useEffect(() => {
    setAuthListener();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const interval = refreshToken();
    return () => clearInterval(interval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <div className="w-[100vw] h-[100vh]">{children}</div>;
};

export default Wrapper;
