import { useEffect } from "react";
const Index = () => {
  useEffect(() => {
    // clear all cookies
    document.cookie.split(";").forEach(function (c) {
      document.cookie = c
        .replace(/^ +/, "")
        .replace(/=.*/, "=;expires=" + new Date().toUTCString() + ";path=/");
    });
    // redirect to login page
    window.location.href = "/";
  }, []);

  return (
    <div>
      <p>Logging out...</p>
    </div>
  );
};

Index.layout = "NoLayout";
export default Index;
