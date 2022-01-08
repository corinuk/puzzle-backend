import React from "react";
import { authService, googleAuthProvider, loginWithRedirect } from "fb";

function Auth() {
  const clickSocialLogin = async (event) => {
    const {
      target: { name },
    } = event;

    let provider;
    if (name === "google") {
      provider = new googleAuthProvider();
    }

    await loginWithRedirect(authService, provider);
  };

  return (
    <div>
      <button name="google" onClick={clickSocialLogin}>
        구글로 로그인
      </button>
    </div>
  );
}

export default Auth;
