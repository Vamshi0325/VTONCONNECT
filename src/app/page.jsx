"use client";

import { TonConnectButton, useTonAddress } from "@tonconnect/ui-react";
import {
  Card,
  CardContent,
  Container,
  Typography,
  Box,
  Paper,
  Divider,
  useTheme,
} from "@mui/material";
import { useEffect, useState } from "react";
import Loader from "../components/Loader";
import BalanceUI from "@/components/BalanceUI";

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const userFriendlyAddress = useTonAddress();
  const rawAddress = useTonAddress(false);
  const theme = useTheme();

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <Container
      maxWidth="md"
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        width: "100%",
        height: "100vh",
        margin: "auto",
      }}
    >
      <Paper
        elevation={0}
        sx={{
          padding: 2,
          borderRadius: 4,
          width: "100%",
          background: "repeat",
          backdropFilter: "blur(10px)",
          boxShadow: "0 8px 32px rgb(0 0 0 / 34%)",
          maxWidth: "400px",
        }}
      >
        <Typography
          variant="h5"
          component="h1"
          gutterBottom
          sx={{
            fontWeight: 700,
            textAlign: "center",
            mb: 2,
          }}
        >
          TON Connect Demo
        </Typography>

        <Box sx={{ display: "flex", justifyContent: "center", mb: 4 }}>
          <TonConnectButton />
        </Box>

        {userFriendlyAddress && (
          <>
            <Box
              sx={{
                textAlign: "center",
                mb: 2,
                fontWeight: 700,
                fontSize: "1.2rem",
                letterSpacing: "0.02em",
                lineHeight: "1.5",
                color: "#333",
              }}
            >
              <BalanceUI />
            </Box>
            <Card
              sx={{
                borderRadius: 3,
                background: "linear-gradient(145deg, #f5f7fa 0%, #e4e7eb 100%)",
                boxShadow: "0 10px 20px rgba(0, 0, 0, 0.05)",
                overflow: "hidden",
                border: "1px solid rgba(0, 0, 0, 0.05)",
                transition: "transform 0.3s ease",
                "&:hover": {
                  transform: "translateY(-5px)",
                  boxShadow: "0 15px 30px rgba(0, 0, 0, 0.1)",
                },
              }}
            >
              <CardContent sx={{ padding: 3 }}>
                <Typography
                  variant="h6"
                  gutterBottom
                  sx={{
                    fontWeight: 600,
                    color: theme.palette.primary.main,
                  }}
                >
                  User-friendly address:
                </Typography>
                <Typography
                  variant="body1"
                  gutterBottom
                  sx={{
                    fontFamily: "monospace",
                    background: "rgba(0, 0, 0, 0.03)",
                    padding: 1.5,
                    borderRadius: 2,
                    wordBreak: "break-all",
                  }}
                >
                  {userFriendlyAddress}
                </Typography>

                <Divider sx={{ my: 2.5 }} />

                <Typography
                  variant="h6"
                  gutterBottom
                  sx={{
                    fontWeight: 600,
                    color: theme.palette.primary.main,
                  }}
                >
                  Raw address:
                </Typography>
                <Typography
                  variant="body1"
                  gutterBottom
                  sx={{
                    fontFamily: "monospace",
                    background: "rgba(0, 0, 0, 0.03)",
                    padding: 1.5,
                    borderRadius: 2,
                    wordBreak: "break-all",
                  }}
                >
                  {rawAddress}
                </Typography>
              </CardContent>
            </Card>
          </>
        )}
      </Paper>
    </Container>
  );
}
