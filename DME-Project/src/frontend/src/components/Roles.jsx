import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Card } from "primereact/card";
import { Button } from "primereact/button";
import {
  fetchRoles,
  addRole,
  editRole,
  removeRole,
  selectRoles,
  selectRolesLoading,
  selectSelectedRole,
  selectIsEditing,
  setSelectedRole,
  setEditing,
  clearSelectedRole,
} from "../store/slices/rolesSlice";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import "primeflex/primeflex.css";
import { ConfirmDialog, confirmDialog } from "primereact/confirmdialog";

function Roles() {
  const [showDialog, setShowDialog] = useState(false);
  const [roleName, setRoleName] = useState("");
  const [roleDescription, setRoleDescription] = useState("");
  const dispatch = useDispatch();
  const roles = useSelector(selectRoles);
  const loading = useSelector(selectRolesLoading);
  const selectedRole = useSelector(selectSelectedRole);
  const isEditing = useSelector(selectIsEditing);
  const [confirmVisible, setConfirmVisible] = useState(false);

  const confirm = (rowdata) => {
    confirmDialog({
      message: "Are you sure you want to proceed?",
      header: "Confirmation",
      icon: "pi pi-exclamation-triangle",
      accept: () => handleDelete(rowdata),
      reject: () => setConfirmVisible(false),
    });
  };
  useEffect(() => {
    dispatch(fetchRoles());
  }, [dispatch]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isEditing && selectedRole) {
        await dispatch(
          editRole({
            id: selectedRole.roleID,
            roleData: { roleName, roleDescription, rolesIsActive: true },
          }),
        ).unwrap();
      } else {
        await dispatch(
          addRole({ roleName, roleDescription, rolesIsActive: true }),
        ).unwrap();
      }
      setRoleName("");
      setRoleDescription("");
      setShowDialog(false);
      dispatch(clearSelectedRole());
    } catch (err) {
      console.error("Failed to save role");
    }
  };

  const handleEdit = (role) => {
    dispatch(setSelectedRole(role));
    setRoleName(role.roleName);
    setRoleDescription(role.roleDescription);
    dispatch(setEditing(true));
    setShowDialog(true);
  };

  const handleDelete = async (role) => {
     await dispatch(removeRole(role.roleID)).unwrap();
  };

  const handleAddNew = () => {
    dispatch(clearSelectedRole());
    setRoleName("");
    setRoleDescription("");
    dispatch(setEditing(false));
    setShowDialog(true);
  };

  const handleDialogHide = () => {
    setShowDialog(false);
    dispatch(clearSelectedRole());
    setRoleName("");
    setRoleDescription("");
  };

  return (
    <>
      <Card title="Roles">
        <div className="flex justify-content-between align-items-center mb-4">
          <div>
            <h2>Manage System Roles</h2>
          </div>
          <Button label="Add Role" icon="pi pi-plus" onClick={handleAddNew} />
        </div>

        <DataTable value={roles} responsiveLayout="scroll" className="w-full">
          <Column field="roleName" header="Role Name" />
          <Column field="roleDescription" header="Description" />
          <Column field="rolesIsActive" header="Active" />
          <Column
            header="Actions"
            body={(rowData) => (
              <div className="flex gap-2">
                <Button
                  icon="pi pi-pencil"
                  className="p-button-text p-button-info"
                  onClick={() => handleEdit(rowData)}
                  tooltip="Edit Role"
                />
                <Button
                  icon="pi pi-trash"
                  className="p-button-text p-button-danger"
                  onClick={() => confirm(rowData)}
                  tooltip="Delete Role"
                />
              </div>
            )}
          />
        </DataTable>
      </Card>
      <Dialog
        header={isEditing ? "Edit Role" : "Add New Role"}
        visible={showDialog}
        onHide={handleDialogHide}
        className="w-full md:w-6 lg:w-4"
      >
        <form onSubmit={handleSubmit} className="p-fluid">
          <div className="field">
            <label htmlFor="roleName">Role Name</label>
            <InputText
              id="roleName"
              value={roleName}
              onChange={(e) => setRoleName(e.target.value)}
              required
            />
          </div>

          <div className="field">
            <label htmlFor="roleDescription">Description</label>
            <InputText
              id="roleDescription"
              value={roleDescription}
              onChange={(e) => setRoleDescription(e.target.value)}
              required
            />
          </div>

          <Button
            type="submit"
            label={isEditing ? "Update Role" : "Add Role"}
            loading={loading}
            className="w-full"
          />
        </form>
      </Dialog>
      <ConfirmDialog /> 
    </>
  );
}

export default Roles;
