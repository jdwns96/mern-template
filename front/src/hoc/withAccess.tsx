import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "src/store";

const withAccess = (WrappedComponent: any) => {
  const Component = (/* props */) => {
    const { id } = useAppSelector((store) => store.auth);
    const navigate = useNavigate();
    const [init, setInit] = useState(false);

    useEffect(() => {
      if (!id) {
        navigate("/signin");
      }
      setInit(true);
    }, [id]);

    if (!init) return <div></div>; // loading

    return <WrappedComponent />;
  };
  return Component;
};
export default withAccess;
