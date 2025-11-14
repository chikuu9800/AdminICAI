import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { mockForms } from "@/lib/mockData";
import { Plus, Search, Edit, Trash2, Download, BarChart, X } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";

const Forms = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editForm, setEditForm] = useState<any>(null);

  const [newForm, setNewForm] = useState({
    title: "",
    description: "",
    status: "active",
  });

  const filteredForms = mockForms.filter(form =>
    form.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleToggleStatus = (id: string) => {
    toast.success("Form status updated");
  };

  const handleExport = (id: string) => {
    toast.success("Exporting form responses...");
  };

  const handleDelete = (id: string) => {
    toast.success("Form deleted successfully");
  };

  const handleAddForm = () => {
    toast.success("Form created successfully!");
    setShowAddModal(false);

    setNewForm({
      title: "",
      description: "",
      status: "active",
    });
  };

  const handleEdit = (form: any) => {
    setEditForm(form);
    setShowEditModal(true);
  };

  const handleSaveEdit = () => {
    toast.success("Form updated successfully!");
    setShowEditModal(false);
    setEditForm(null);
  };

  return (
    <div className="space-y-6">
      {/* HEADER */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Forms & Surveys</h1>
          <p className="text-muted-foreground">Create forms and collect responses</p>
        </div>
        <Button onClick={() => setShowAddModal(true)}>
          <Plus className="mr-2 h-4 w-4" />
          Create Form
        </Button>
      </div>

      {/* TABLE */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>All Forms</CardTitle>
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search forms..."
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
                <TableHead>Title</TableHead>
                <TableHead>Description</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Responses</TableHead>
                <TableHead>Created</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {filteredForms.map((form) => (
                <TableRow key={form.id}>
                  <TableCell className="font-medium">{form.title}</TableCell>
                  <TableCell className="max-w-xs truncate text-muted-foreground">
                    {form.description}
                  </TableCell>
                  <TableCell>
                    <Badge variant={form.status === "active" ? "default" : "secondary"}>
                      {form.status}
                    </Badge>
                  </TableCell>

                  <TableCell>
                    <span className="flex items-center gap-1">
                      <BarChart className="h-3 w-3" />
                      {form.responses}
                    </span>
                  </TableCell>

                  <TableCell className="text-muted-foreground">
                    {form.createdAt}
                  </TableCell>

                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">

                      <Button variant="ghost" size="icon" onClick={() => handleEdit(form)}>
                        <Edit className="h-4 w-4" />
                      </Button>

                      <Button variant="outline" size="sm" onClick={() => handleExport(form.id)}>
                        <Download className="mr-2 h-4 w-4" />
                        Export
                      </Button>

                      <Button
                        size="sm"
                        variant={form.status === "active" ? "outline" : "default"}
                        onClick={() => handleToggleStatus(form.id)}
                      >
                        {form.status === "active" ? "Deactivate" : "Activate"}
                      </Button>

                      <Button variant="ghost" size="icon" onClick={() => handleDelete(form.id)}>
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

      {/* ---------------- ADD FORM MODAL ---------------- */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 px-4">
          <div className="bg-white p-6 rounded-xl w-full max-w-lg relative shadow-lg">
            <button className="absolute top-3 right-3" onClick={() => setShowAddModal(false)}>
              <X className="h-5 w-5 text-gray-600" />
            </button>

            <h2 className="text-xl font-semibold mb-4">Create New Form</h2>

            <Input
              placeholder="Form Title"
              className="mb-3"
              value={newForm.title}
              onChange={(e) => setNewForm({ ...newForm, title: e.target.value })}
            />

            <Textarea
              placeholder="Description"
              className="mb-3"
              value={newForm.description}
              onChange={(e) => setNewForm({ ...newForm, description: e.target.value })}
            />

            <Button className="w-full" onClick={handleAddForm}>
              Create Form
            </Button>
          </div>
        </div>
      )}

      {/* ---------------- EDIT FORM MODAL ---------------- */}
      {showEditModal && editForm && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 px-4">
          <div className="bg-white p-6 rounded-xl w-full max-w-lg relative shadow-lg">

            <button className="absolute top-3 right-3" onClick={() => setShowEditModal(false)}>
              <X className="h-5 w-5 text-gray-600" />
            </button>

            <h2 className="text-xl font-semibold mb-4">Edit Form</h2>

            <Input
              placeholder="Form Title"
              className="mb-3"
              value={editForm.title}
              onChange={(e) => setEditForm({ ...editForm, title: e.target.value })}
            />

            <Textarea
              placeholder="Description"
              className="mb-3"
              value={editForm.description}
              onChange={(e) => setEditForm({ ...editForm, description: e.target.value })}
            />

            <Button className="w-full" onClick={handleSaveEdit}>
              Save Changes
            </Button>

          </div>
        </div>
      )}

    </div>
  );
};

export default Forms;
