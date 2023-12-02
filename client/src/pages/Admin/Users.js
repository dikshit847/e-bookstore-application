import React, { useState, useEffect } from "react";
import Layout from "../../components/Layout/Layout";
import AdminMenu from "../../components/Layout/AdminMenu";
import axios from "axios";
import { useAuth } from "../../context/auth.js";
const Users = () => {
  const [users, setUsers] = useState([]);
  const [auth, setAuth] = useAuth();
  const getUsers = async () => {
    try {
        const { data } = await axios.get("/api/v1/auth/all-users");
      setUsers(data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    if (auth?.token) getUsers();
  }, [auth?.token]);
  return (
    <Layout title={"Dashboard-All Users"}>
      <div className="container-fluid p-3">
        <div className="row">
          <div className="col-md-3">
            <AdminMenu />
          </div>
          <div className="col-md-9">
            <div className="container">
              {users?.map((p, i) => (
                <div className="row mb-2 p-3 card flex-row" key={p._id}>
                  <div className="col-md-8">
                    <p>Name:{p.name}</p>
                    <p>Email:{p.email}</p>
                    <p>Phone:{p.phone}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Users;