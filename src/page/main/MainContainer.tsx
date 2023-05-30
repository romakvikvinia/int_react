import React, { useCallback, useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { fetchUsers } from "../../api/users.api";
import { useNavigate } from "react-router-dom";

interface IUser {
  id: string;
  name: string;
  email: string;
  address: {
    street: string;
    suit: string;
    city: string;
    zipcode: string;
    suite: string;
  };
}

const MainContainer = () => {
  const navigate = useNavigate();
  const [state, setState] = useState({
    isLoading: true,
    data: [],
    filtered: [],
    error: "",
    search: "",
  });

  const loadData = useCallback(async () => {
    try {
      const data: any = await fetchUsers();
      setState((prevState) => ({
        ...prevState,
        isLoading: false,
        data,
      }));
    } catch (error) {
      setState((prevState) => ({
        ...prevState,
        isLoading: false,
        error: "Error",
      }));
    }
  }, []);

  useEffect(() => {
    loadData();
  }, [loadData]);

  const columns = [
    {
      name: "Full Name",
      selector: (row: IUser) => row.name,
      sortable: true,
    },
    {
      name: "Email",
      selector: (row: IUser) => row.email,
      sortable: true,
    },
    {
      name: "Address",
      selector: (row: IUser) =>
        `${row.address.street}, ${row.address.suite},${row.address.city},${row.address.zipcode}`,
      sortable: true,
    },
  ];

  const FilerComponent = (
    <>
      <input
        onChange={(e) => {
          const { value } = e.target;
          setState((prevState) => ({
            ...prevState,
            search: value,
            filtered: value
              ? prevState.data.filter(
                  (i: any) =>
                    i.name && i.name.toLowerCase().includes(value.toLowerCase())
                )
              : [],
          }));
        }}
      />
    </>
  );

  if (state.error) return <h1>{state.error}</h1>;

  return (
    <>
      <DataTable
        subHeader
        subHeaderComponent={FilerComponent}
        persistTableHead
        title="Users Table"
        columns={columns}
        data={state.search && state.filtered ? state.filtered : state.data}
        pagination
        paginationRowsPerPageOptions={[4]}
        paginationPerPage={4}
        onRowClicked={(row) => {
          navigate(`/users/${row.id}`);
        }}
      />
    </>
  );
};
export default MainContainer;
