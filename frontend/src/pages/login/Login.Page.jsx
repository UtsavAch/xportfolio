import { useState } from "react";
import {
  UilUser,
  UilKeySkeleton,
  UilArrowRight,
} from "@iconscout/react-unicons";
import Input from "../../components/input/Input.Component";
import Button from "../../components/button/Button.Component";
import ErrorMessage from "../../components/error/Error.Component";
import loginService from "../../management/services/loginService";

// Import Styled Components
import { PageWrapper, Title, Subtitle, LoginForm } from "./Login.Style";

function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    const result = await loginService.login(username, password);

    if (!result.success) {
      setError(result.message);
      return;
    }

    setError("");
    window.location.href = "/main";
  };

  return (
    <PageWrapper>
      <Title>System Access</Title>
      <Subtitle>Authenticate to manage your portfolio content.</Subtitle>

      <LoginForm onSubmit={handleLogin}>
        {error && <ErrorMessage message={error} />}

        <Input
          id="username"
          label="Administrator Email"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="user@domain.com"
          icon={<UilUser size="20" color="var(--color-icon-light)" />}
          required
        />

        <Input
          id="password"
          type="password"
          label="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="••••••••••••"
          icon={<UilKeySkeleton size="20" color="var(--color-icon-light)" />}
          required
        />

        <Button type="secondary" isSubmit icon={<UilArrowRight size="20" />}>
          Login
        </Button>
      </LoginForm>
    </PageWrapper>
  );
}

export default LoginPage;
