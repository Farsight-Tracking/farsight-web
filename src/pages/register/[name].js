import { useRouter } from "next/router";
import Head from "next/head";
import { Box, Container, Grid, Typography } from "@mui/material";
import { DashboardLayout } from "../../components/dashboard-layout";
import { addresses } from "../../__mocks__/addresses";
import { WatchCard } from "../../components/watch/watch-card";
import { chains } from "../../__mocks__/chains";
import { RegisterCard } from "../../components/register/register-card";
import { useEffect, useState } from "react";
import { useQuery } from "react-query";

const fetchOccupation = async name => {
  return false;
};


const Page = () => {
  const router = useRouter();
  const { name } = router.query;

  const { data, status } = useQuery(["occupation", name], () => fetchOccupation(name));

  return (
    <>
      <Head>
        <title>Register | Material Kit</title>
      </Head>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8,
        }}
      >
        <Container maxWidth="lg">
          <Typography sx={{ mb: 3 }} variant="h4">
            Register
          </Typography>
          {status === "loading" && <p>Loading....</p>}
          {status === "error" && <p>There was an error....</p>}

          {status === "success" && data && <WatchCard contents={chains} />}
          {status === "success" && !data && <RegisterCard product={addresses[0]} year={1} />}
        </Container>
      </Box>
    </>
  );
};

Page.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Page;
