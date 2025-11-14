import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow
} from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { mockUsers } from "@/lib/mockData";
import { Plus, Search, Edit, Eye, Trash2, UserCheck, UserX } from "lucide-react";
import { toast } from "sonner";

const Users = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [modalType, setModalType] = useState<"add" | "edit" | "view">("add");
  const [selectedUser, setSelectedUser] = useState<any>(null);

  const openModal = (type: "add" | "edit" | "view", user: any = null) => {
    setSelectedUser(user);
    setModalType(type);
    setModalOpen(true);
  };

  const filteredUsers = mockUsers.filter((u) => {
    const t = searchTerm.toLowerCase();
    return (
      u.name.toLowerCase().includes(t) ||
      u.email.toLowerCase().includes(t)
    );
  });

  const handleSaveUser = () => {
    toast.success(
      modalType === "add" ? "User added successfully" : "User updated"
    );
    setModalOpen(false);
  };

  const handleToggleStatus = (id: string) => toast.success("User status changed");
  const handleDelete = (id: string) => toast.success("User deleted");

  return (
    <div className="space-y-6">

      {/* HEADER */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">User Management</h1>
          <p className="text-muted-foreground">Manage admin, editor, and moderators</p>
        </div>

        <Button onClick={() => openModal("add")}>
          <Plus className="h-4 w-4 mr-2" /> Add User
        </Button>
      </div>

      {/* USER LIST */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>All Users</CardTitle>

            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search users..."
                className="pl-8 w-[250px]"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
        </CardHeader>

        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Last Login</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {filteredUsers.map((user) => (
                <TableRow key={user.id}>
                  <TableCell>{user.name}</TableCell>
                  <TableCell className="text-muted-foreground">
                    {user.email}
                  </TableCell>
                  <TableCell>
                    <Badge>{user.role}</Badge>
                  </TableCell>
                  <TableCell className="text-muted-foreground">
                    {user.lastLogin || "Never"}
                  </TableCell>

                  <TableCell>
                    <Badge variant={user.status === "active" ? "default" : "secondary"}>
                      {user.status}
                    </Badge>
                  </TableCell>

                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">

                      {/* VIEW */}
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => openModal("view", user)}
                      >
                        <Eye className="h-4 w-4" />
                      </Button>

                      {/* EDIT */}
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => openModal("edit", user)}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>

                      {/* STATUS */}
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => handleToggleStatus(user.id)}
                      >
                        {user.status === "active" ? (
                          <UserX className="h-4 w-4" />
                        ) : (
                          <UserCheck className="h-4 w-4" />
                        )}
                      </Button>

                      {/* DELETE */}
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleDelete(user.id)}
                      >
                        <Trash2 className="h-4 w-4 text-destructive" />
                      </Button>

                    </div>
                  </TableCell>

                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* MODAL */}
      <UserModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        type={modalType}
        user={selectedUser}
        onSave={handleSaveUser}
      />

    </div>
  );
};

export default Users;




const UserModal = ({ open, onClose, type, user, onSave }) => {
  const isView = type === "view";
  const isEdit = type === "edit";

  // 👇 MUST HAVE — or form will not work
  const [form, setForm] = useState({
    name: "",
    email: "",
    role: "editor",
  });

  // 👇 FIX — update form when user changes or modal opens
  useEffect(() => {
    if (user) {
      setForm({
        name: user.name || "",
        email: user.email || "",
        role: user.role || "editor",
      });
    } else {
      setForm({
        name: "",
        email: "",
        role: "editor",
      });
    }
  }, [user, open]);

  const update = (k, v) => setForm({ ...form, [k]: v });

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>
            {type === "add" && "Add User"}
            {type === "edit" && "Edit User"}
            {type === "view" && "User Details"}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4">

          {/* NAME */}
          <div>
            <label className="block text-sm font-medium">Name</label>
            <Input
              disabled={isView}
              value={form.name}
              onChange={(e) => update("name", e.target.value)}
            />
          </div>

          {/* EMAIL */}
          <div>
            <label className="block text-sm font-medium">Email</label>
            <Input
              disabled={isView}
              value={form.email}
              onChange={(e) => update("email", e.target.value)}
            />
          </div>

          {/* ROLE */}
          <div>
            <label className="block text-sm font-medium">Role</label>
            <select
              disabled={isView}
              value={form.role}
              onChange={(e) => update("role", e.target.value)}
              className="w-full border rounded-md px-2 py-2"
            >
              <option value="admin">Admin</option>
              <option value="editor">Editor</option>
              <option value="moderator">Moderator</option>
            </select>
          </div>

          {/* BUTTONS */}
          {!isView && (
            <Button className="w-full" onClick={onSave}>
              Save
            </Button>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

