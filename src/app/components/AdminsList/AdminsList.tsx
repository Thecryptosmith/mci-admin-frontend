"use client";

import { useEffect, useLayoutEffect, useState } from "react";
import * as React from "react";

import Paper from "@mui/material/Paper/Paper";
import Switch from "@mui/material/Switch/Switch";
import Table from "@mui/material/Table/Table";
import TableBody from "@mui/material/TableBody/TableBody";
import TableCell from "@mui/material/TableCell/TableCell";
import TableContainer from "@mui/material/TableContainer/TableContainer";
import TableHead from "@mui/material/TableHead/TableHead";
import TableRow from "@mui/material/TableRow/TableRow";
import CustomAlert from "@src/app/components/CustomAlert/CustomAlert";
import { useErrorMessage } from "@src/common/hooks/useErrorMessage";
import { selectCurrentUser, useSelector } from "@src/lib/redux";
import {
  useActivateAdminMutation,
  useGetAdminsListQuery,
  useInactivateAdminMutation,
} from "@src/lib/redux/services/adminApi";
import { AdminsListRes } from "@src/types/adminsListRes";

export default function AdminsList() {
  const currentUser = useSelector(selectCurrentUser);

  const [admins, setAdmins] = useState<AdminsListRes[] | null>(null);
  const [open, setOpen] = useState<boolean>(false);

  const { data, error } = useGetAdminsListQuery();
  const [activateAdmin] = useActivateAdminMutation();
  const [inactivateAdmin] = useInactivateAdminMutation();

  const { errorMessage } = useErrorMessage(error);

  useEffect(() => {
    if (!!error) {
      setOpen(true);
    }
  }, [error]);

  useLayoutEffect(() => {
    if (data) {
      setAdmins(data);
    }
  }, [data]);

  const label = { inputProps: { "aria-label": "Switch demo" } };

  const handleStatusChange = async (admin: AdminsListRes) => {
    if (admin.status === "active") {
      await inactivateAdmin({ email: admin.email });

      return;
    }

    if (admin.status === "inactive") {
      await activateAdmin({ email: admin.email });

      return;
    }
  };

  return (
    <>
      {admins && (
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="admins table">
            <TableHead>
              <TableRow>
                <TableCell>Email</TableCell>
                <TableCell align="right">MFA enabled</TableCell>
                <TableCell align="right">Status</TableCell>
                <TableCell align="right">Active</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {admins.map((admin) => (
                <TableRow
                  key={admin.email}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {admin.email}
                  </TableCell>
                  <TableCell align="right">{`${admin.mfaEnabled}`}</TableCell>
                  <TableCell align="right">{admin.status}</TableCell>
                  <TableCell align="right">
                    <Switch
                      {...label}
                      checked={admin.status === "active"}
                      onChange={() => handleStatusChange(admin)}
                      disabled={
                        admin.status === "disabled" ||
                        currentUser.email === admin.email
                      }
                    />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}

      {open && (
        <CustomAlert severity="error" isOpen={open} message={errorMessage} />
      )}
    </>
  );
}
