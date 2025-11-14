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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { mockContent } from "@/lib/mockData";
import { Plus, Search, Eye, Edit, Trash2, X } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";

const Content = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [showModal, setShowModal] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [editData, setEditData] = useState<any>(null);
  const [newContent, setNewContent] = useState({
    title: "",
    category: "",
    status: "draft",
    createdBy: "Admin User",
    body: "",
    thumbnail: null as File | null,
  });

  const handleSaveEdit = () => {
    toast.success("Content updated successfully!");

    setEditModal(false);
    setEditData(null);
  };

  const filteredContent = mockContent.filter((content) => {
    const matchesSearch =
      content.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      content.category.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus =
      statusFilter === "all" || content.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleCreateContent = () => {
    if (!newContent.title.trim() || !newContent.category.trim()) {
      toast.error("Title & Category are required");
      return;
    }
    toast.success("Content created successfully!");

    setShowModal(false);
    setNewContent({
      title: "",
      category: "",
      status: "draft",
      createdBy: "Admin User",
      body: "",
      thumbnail: null,
    });
  };

  return (
    <div className="space-y-6">
      {/* HEADER */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">
            Content Management
          </h1>
          <p className="text-muted-foreground">
            Create and manage all website content
          </p>
        </div>

        <Button onClick={() => setShowModal(true)}>
          <Plus className="mr-2 h-4 w-4" />
          Add Content
        </Button>
      </div>

      {/* CONTENT TABLE */}
      <Card>
        <CardHeader>
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <CardTitle>All Content</CardTitle>
            <div className="flex flex-col gap-2 sm:flex-row">
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search content..."
                  className="pl-8 w-full sm:w-[250px]"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>

              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-full sm:w-[150px]">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="published">Published</SelectItem>
                  <SelectItem value="draft">Draft</SelectItem>
                  <SelectItem value="unpublished">Unpublished</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardHeader>

        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Title</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Created By</TableHead>
                <TableHead>Views</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {filteredContent.map((content) => (
                <TableRow key={content.id}>
                  <TableCell>{content.title}</TableCell>

                  <TableCell>
                    <Badge variant="secondary">{content.category}</Badge>
                  </TableCell>

                  <TableCell>
                    <Badge
                      variant={
                        content.status === "published"
                          ? "default"
                          : content.status === "draft"
                            ? "secondary"
                            : "outline"
                      }
                    >
                      {content.status}
                    </Badge>
                  </TableCell>

                  <TableCell>{content.createdBy}</TableCell>

                  <TableCell>
                    <span className="flex items-center gap-1">
                      <Eye className="h-3 w-3" />
                      {content.views}
                    </span>
                  </TableCell>

                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => {
                          setEditData(content);
                          setEditModal(true);
                        }}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>


                      <Button size="icon" variant="ghost">
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

      {/* ============================
          ADD CONTENT MODAL
      ============================= */}
      {showModal && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 px-4">
          <div className="bg-white rounded-xl w-full max-w-lg p-6 shadow-xl relative">

            {/* Close Icon */}
            <button
              className="absolute top-3 right-3 text-gray-500 hover:text-black"
              onClick={() => setShowModal(false)}
            >
              <X className="h-5 w-5" />
            </button>

            <h2 className="text-xl font-semibold mb-4">Create New Content</h2>

            {/* Title */}
            <Input
              placeholder="Enter title"
              className="mb-3"
              value={newContent.title}
              onChange={(e) =>
                setNewContent({ ...newContent, title: e.target.value })
              }
            />

            {/* Category */}
            <Input
              placeholder="Category"
              className="mb-3"
              value={newContent.category}
              onChange={(e) =>
                setNewContent({ ...newContent, category: e.target.value })
              }
            />

            {/* Status */}
            <Select
              value={newContent.status}
              onValueChange={(value) =>
                setNewContent({ ...newContent, status: value })
              }
            >
              <SelectTrigger className="w-full mb-3">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="draft">Draft</SelectItem>
                <SelectItem value="published">Published</SelectItem>
                <SelectItem value="unpublished">Unpublished</SelectItem>
              </SelectContent>
            </Select>

            {/* Content Body */}
            <Textarea
              placeholder="Write content details..."
              className="mb-3"
              value={newContent.body}
              onChange={(e) =>
                setNewContent({ ...newContent, body: e.target.value })
              }
            />

            {/* Thumbnail */}
            <Input
              type="file"
              className="mb-3"
              onChange={(e) =>
                setNewContent({
                  ...newContent,
                  thumbnail: e.target.files?.[0] || null,
                })
              }
            />

            {/* Buttons */}
            <div className="flex justify-end gap-2">
              <Button
                variant="outline"
                onClick={() => setShowModal(false)}
              >
                Cancel
              </Button>
              <Button onClick={handleCreateContent}>Create</Button>
            </div>

          </div>
        </div>
      )}
      {/* ============================
        EDIT CONTENT MODAL
============================= */}
      {editModal && editData && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 px-4">
          <div className="bg-white rounded-xl w-full max-w-lg p-6 shadow-xl relative">

            {/* Close Icon */}
            <button
              className="absolute top-3 right-3 text-gray-500 hover:text-black"
              onClick={() => setEditModal(false)}
            >
              <X className="h-5 w-5" />
            </button>

            <h2 className="text-xl font-semibold mb-4">Edit Content</h2>

            {/* Title */}
            <Input
              placeholder="Enter title"
              className="mb-3"
              value={editData.title}
              onChange={(e) => setEditData({ ...editData, title: e.target.value })}
            />

            {/* Category */}
            <Input
              placeholder="Category"
              className="mb-3"
              value={editData.category}
              onChange={(e) => setEditData({ ...editData, category: e.target.value })}
            />

            {/* Status */}
            <Select
              value={editData.status}
              onValueChange={(value) =>
                setEditData({ ...editData, status: value })
              }
            >
              <SelectTrigger className="w-full mb-3">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="draft">Draft</SelectItem>
                <SelectItem value="published">Published</SelectItem>
                <SelectItem value="unpublished">Unpublished</SelectItem>
              </SelectContent>
            </Select>

            {/* Content Body */}
            <Textarea
              placeholder="Write content details..."
              className="mb-3"
              value={editData.body}
              onChange={(e) =>
                setEditData({ ...editData, body: e.target.value })
              }
            />

            {/* Thumbnail */}
            <Input
              type="file"
              className="mb-3"
              onChange={(e) =>
                setEditData({
                  ...editData,
                  thumbnail: e.target.files?.[0] || null,
                })
              }
            />

            {/* Buttons */}
            <div className="flex justify-end gap-2">
              <Button
                variant="outline"
                onClick={() => setEditModal(false)}
              >
                Cancel
              </Button>

              <Button onClick={handleSaveEdit}>Save Changes</Button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};

export default Content;
