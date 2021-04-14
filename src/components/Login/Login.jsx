import React from "react";

const LogIn = ({ authService }) => {
  const onLogIn = async (event) => {};

  return (
    <section>
      <h1>Log In</h1>
      <button name="Google" onClick={onLogIn}>
        구글 로그인
      </button>
      <button name="Github" onClick={onLogIn}>
        깃허브 로그인
      </button>
    </section>
  );
};

export default LogIn;
