import React, { useState } from "react";
import { Button } from "../../../components/Elements/Button";

export const Login = () => {
  const [loading, setLoading] = useState(false);
  const handleSubmit = () => {
    console.log("clicked");
    setLoading(true);
  };
  return (
    <div>
      <Button
        name="Login"
        disabled={loading}
        loading={loading}
        onClick={handleSubmit}
      />
    </div>
  );
};
