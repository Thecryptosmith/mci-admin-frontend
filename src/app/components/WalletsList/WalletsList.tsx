"use client";

import { ChangeEvent, useEffect, useState } from "react";
import { CopyToClipboard } from "react-copy-to-clipboard";
import Image from "next/image";
import Link from "next/link";

import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import OpenInNew from "@mui/icons-material/OpenInNew";
import Box from "@mui/material/Box/Box";
import Divider from "@mui/material/Divider/Divider";
import List from "@mui/material/List/List";
import ListItem from "@mui/material/ListItem/ListItem";
import Pagination from "@mui/material/Pagination/Pagination";
import Paper from "@mui/material/Paper/Paper";
import Typography from "@mui/material/Typography/Typography";
import WalletActions from "@src/app/components/WalletActions/WalletActions";
import WalletStatusFilter from "@src/app/components/WalletStatusFilter/WalletStatusFilter";
import { useGetUserWalletsQuery } from "@src/lib/redux/services/adminApi";
import { GetUserWalletsQueryParams } from "@src/types/getUserWalletsQueryParams";

export default function WalletsList() {
  const [limit] = useState<number>(10);
  const [offset, setOffset] = useState<number>(0);
  const [page, setPage] = useState<number>(1);
  const [isWalletAddressCopied, setIsWalletAddressCopied] = useState<
    number | null
  >(null);
  const [isWalletKeyCopied, setIsWalletKeyCopied] = useState<number | null>(
    null,
  );
  const [payload, setPayload] = useState<GetUserWalletsQueryParams>({
    limit,
    offset,
  });

  const { data } = useGetUserWalletsQuery(payload);

  useEffect(() => {
    if (isWalletAddressCopied) {
      setTimeout(() => {
        setIsWalletAddressCopied(null);
      }, 500);
    }
  }, [isWalletAddressCopied]);

  useEffect(() => {
    if (isWalletKeyCopied) {
      setTimeout(() => {
        setIsWalletKeyCopied(null);
      }, 500);
    }
  }, [isWalletKeyCopied]);

  useEffect(() => {
    setPayload((prevState) => ({
      ...prevState,
      offset,
    }));
  }, [offset]);

  const handlePageChange = (event: ChangeEvent<unknown>, newPage: number) => {
    setPage(newPage);
    setOffset((newPage - 1) * limit);
  };

  return (
    <>
      {data ? (
        <Box>
          <WalletStatusFilter setPayload={setPayload} />

          <List sx={{ maxHeight: "74vh", overflow: "auto" }}>
            {data.userWallets.map((wallet) => (
              <ListItem key={wallet.id}>
                <Paper sx={{ width: "100%", p: 1 }} elevation={3}>
                  <Box sx={{ display: "flex", gap: 1 }}>
                    <Typography variant="h6">
                      <b>Wallet address: </b>
                      {wallet.walletAddress}
                    </Typography>

                    <CopyToClipboard
                      text={wallet.walletAddress}
                      onCopy={() => setIsWalletAddressCopied(wallet.id)}
                    >
                      <ContentCopyIcon sx={{ cursor: "pointer" }} />
                    </CopyToClipboard>

                    {isWalletAddressCopied === wallet.id ? (
                      <span style={{ color: "green" }}>Copied</span>
                    ) : null}
                  </Box>

                  <Box sx={{ display: "flex", gap: 1 }}>
                    <Typography variant="h6">
                      <b>Wallet key: </b>
                      {wallet.walletKey}
                    </Typography>

                    <CopyToClipboard
                      text={wallet.walletKey}
                      onCopy={() => setIsWalletKeyCopied(wallet.id)}
                    >
                      <ContentCopyIcon sx={{ cursor: "pointer" }} />
                    </CopyToClipboard>

                    {isWalletKeyCopied === wallet.id ? (
                      <span style={{ color: "green" }}>Copied</span>
                    ) : null}
                  </Box>

                  <Divider sx={{ mb: 2 }} />

                  <Box
                    sx={{ display: "flex", justifyContent: "space-between" }}
                  >
                    <Box sx={{ display: "flex", gap: 2 }}>
                      <Box>
                        <Typography variant="body1">
                          <b>Wallet Label: </b>
                          {wallet.walletLabel}
                        </Typography>

                        <Typography variant="body1">
                          <b>Wallet Memo: </b>
                          {wallet.walletMemo}
                        </Typography>

                        <Box
                          sx={{
                            display: "flex",
                            gap: 1,
                            alignItems: "center",
                          }}
                        >
                          <Typography variant="body1">
                            <b>User: </b>
                            {wallet.user.email}
                          </Typography>

                          <Link
                            href={`/users/${wallet.user.id}`}
                            target="_blank"
                            style={{
                              display: "flex",
                              alignItems: "center",
                              color: "#1976d2",
                            }}
                          >
                            <OpenInNew />
                          </Link>
                        </Box>

                        <Typography variant="body1">
                          <b>Status: </b>
                          {wallet.status}
                        </Typography>
                      </Box>

                      <Box>
                        <Typography variant="body1">
                          <b>Platform Name: </b>
                          {wallet.platformName}
                        </Typography>

                        <Typography variant="body1">
                          <b>Platform Type: </b>
                          {wallet.platformType}
                        </Typography>

                        <Typography variant="body1">
                          <b>Destination Platform: </b>
                          {wallet.destinationPlatform}
                        </Typography>
                      </Box>

                      <Box>
                        <Box
                          sx={{ display: "flex", alignItems: "center", gap: 1 }}
                        >
                          <Typography variant="body1">
                            <b>Token: </b>
                            {`${wallet.tokenInfo.name} (${wallet.tokenInfo.symbol})`}
                          </Typography>
                          <Image
                            src={wallet.tokenInfo.logo}
                            width={32}
                            height={32}
                            alt="token logo"
                          />
                        </Box>

                        <Box
                          sx={{ display: "flex", alignItems: "center", gap: 1 }}
                        >
                          <Typography variant="body1">
                            <b>Network: </b>
                            {`${wallet.network.name} (${wallet.network.symbol})`}
                          </Typography>
                          <Image
                            src={wallet.network.logo}
                            width={32}
                            height={32}
                            alt="token logo"
                          />
                        </Box>
                      </Box>
                    </Box>

                    <WalletActions id={wallet.id} status={wallet.status} />
                  </Box>
                </Paper>
              </ListItem>
            ))}
          </List>

          <Box sx={{ display: "flex", justifyContent: "center" }}>
            <Pagination
              sx={{ p: 2 }}
              count={Math.ceil(data.count / limit)}
              color="primary"
              page={page}
              onChange={handlePageChange}
            />
          </Box>
        </Box>
      ) : (
        <div>No data</div>
      )}
    </>
  );
}
