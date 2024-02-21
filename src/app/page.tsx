"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

import { Header } from "@/components";
import { SERVER_URL } from "@/config";
import {
  Alert,
  AlertTitle,
  Box,
  Button,
  CssBaseline,
  Paper,
  Stack,
  TextField,
  ThemeProvider,
  Typography,
} from "@mui/material";
import { useRouter } from "next/navigation";
import { DefaultTheme } from "@/theme";

export default function Login() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [shouldSubmit, setShouldSubmit] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [hasLoginError, setHasLoginError] = useState(false);

  useEffect(() => {
    const submit = async () => {
      setIsSubmitting(true);
      setShouldSubmit(false);
      setHasLoginError(false);

      const result = await fetch(`${SERVER_URL}/users/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const resultJson = await result.json();

      console.log({ resultJson });

      if ("statusCode" in resultJson && resultJson.statusCode === 401) {
        setHasLoginError(true);
      } else if ("access_token" in resultJson) {
        alert("Login success!");
      }

      setIsSubmitting(false);
    };

    if (shouldSubmit) {
      submit();
    }
  }, [email, password, router, shouldSubmit]);

  const emailIsValid = email !== "";
  const passwordIsValid = password !== "";

  return (
    <CssBaseline>
      <ThemeProvider theme={DefaultTheme}>
        <Header />
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: 'background.default',
          }}
        >
          <Paper
            sx={{
              width: "50%",
              marginTop: 5,
              padding: 5,
            }}
          >
            <Stack gap={2}>
              <Typography variant="h4">Login</Typography>
              <Typography variant="body1">
                Please, enter your user information to continue.
              </Typography>
              {hasLoginError && (
                <Alert severity="error">
                  <AlertTitle>Login failed</AlertTitle>
                  The provided user name and password combination did not
                  correspond to a registered user.
                </Alert>
              )}
              <TextField
                type="email"
                label="Email"
                value={email}
                error={!emailIsValid}
                helperText={!emailIsValid && "Email is required"}
                onChange={(event) => setEmail(event.target.value)}
              />
              <TextField
                type="password"
                label="Password"
                value={password}
                error={!passwordIsValid}
                helperText={!passwordIsValid && "Password is required"}
                onChange={(event) => setPassword(event.target.value)}
              />
              <Button
                variant="contained"
                disabled={isSubmitting}
                onClick={() => setShouldSubmit(true)}
              >
                Login
              </Button>
            </Stack>
          </Paper>
        </Box>
      </ThemeProvider>
    </CssBaseline>
  );
}
