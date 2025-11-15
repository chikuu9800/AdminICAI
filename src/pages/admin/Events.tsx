import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { mockEvents } from "@/lib/mockData";
import {
  Plus,
  Search,
  Calendar,
  MapPin,
  User,
  Edit,
  Trash2,
  X,
  Link
} from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";

const Events = () => {
  const [searchTerm, setSearchTerm] = useState("");

  /** Modal State */
  const [addModal, setAddModal] = useState(false);
  const [editModal, setEditModal] = useState(false);

  /** Event Data */
  const [newEvent, setNewEvent] = useState<any>({
    title: "",
    description: "",
    location: "",
    speaker: "",
    startDate: "",
    endDate: "",
    status: "upcoming",
    registrationLink: "",
    banner: null,
  });

  const [editEvent, setEditEvent] = useState<any>(null);
  const [showRegModal, setShowRegModal] = useState(false);
  const [selectedRegistrations, setSelectedRegistrations] = useState<any[]>([]);


  const filteredEvents = mockEvents.filter(event =>
    event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    event.location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleViewRegistration = (event: Event) => {
    setSelectedRegistrations(event.registrations || []);
    setShowRegModal(true);
  };


  /** Add Event */
  const handleAddEvent = () => {
    toast.success("Event added successfully!");
    setAddModal(false);

    setNewEvent({
      title: "",
      description: "",
      location: "",
      speaker: "",
      startDate: "",
      endDate: "",
      status: "upcoming",
      registrationLink: "",
      banner: null,
    });
  };

  /** Edit Event */
  const handleEdit = (event: any) => {
    setEditEvent(event);
    setEditModal(true);
  };

  const handleSaveEdit = () => {
    toast.success("Event updated successfully!");
    setEditModal(false);
    setEditEvent(null);
  };

  /** Delete Event */
  const handleDelete = (id: string) => {
    toast.success("Event deleted successfully");
  };

  return (
    <div className="space-y-6">
      {/* HEADER */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Event Management</h1>
          <p className="text-muted-foreground">Create and manage conferences, seminars & webinars</p>
        </div>
        <Button onClick={() => setAddModal(true)}>
          <Plus className="mr-2 h-4 w-4" />
          Add Event
        </Button>
      </div>

      {/* SEARCH BAR */}
      <div className="flex items-center gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search events..."
            className="pl-8"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {/* EVENT CARDS */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {filteredEvents.map((event) => (
          <Card key={event.id}>
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="space-y-1">
                  <CardTitle className="text-lg">{event.title}</CardTitle>
                  <Badge
                    variant={
                      event.status === "upcoming"
                        ? "default"
                        : event.status === "ongoing"
                          ? "secondary"
                          : "outline"
                    }
                  >
                    {event.status}
                  </Badge>
                </div>
              </div>
            </CardHeader>

            <CardContent className="space-y-3">
              <p className="text-sm text-muted-foreground line-clamp-2">
                {event.description}
              </p>

              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Calendar className="h-4 w-4" />
                  <span>{event.startDate}</span>
                  {event.endDate !== event.startDate && (
                    <span>to {event.endDate}</span>
                  )}
                </div>

                <div className="flex items-center gap-2 text-muted-foreground">
                  <MapPin className="h-4 w-4" />
                  <span>{event.location}</span>
                </div>

                <div className="flex items-center gap-2 text-muted-foreground">
                  <User className="h-4 w-4" />
                  <span>{event.speaker}</span>
                </div>
              </div>

              {event.registrationLink && (
                <Button
                  variant="outline"
                  className="w-full"
                  size="sm"
                  onClick={() => handleViewRegistration(event)}
                >
                  View Registration
                </Button>

              )}

              <div className="flex gap-2 pt-2">
                <Button
                  variant="outline"
                  size="sm"
                  className="flex-1"
                  onClick={() => handleEdit(event)}
                >
                  <Edit className="mr-2 h-4 w-4" />
                  Edit
                </Button>

                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleDelete(event.id)}
                >
                  <Trash2 className="h-4 w-4 text-destructive" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* -------------------- ADD EVENT MODAL -------------------- */}
      {addModal && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center px-4 z-50">
          <div className="bg-white rounded-xl w-full max-w-lg shadow-xl relative max-h-[85vh] overflow-y-auto">

            {/* Header */}
            <div className="sticky top-0 bg-white p-6 border-b rounded-t-xl z-10">
              <h2 className="text-xl font-semibold">Add New Event</h2>
              <button className="absolute top-4 right-4" onClick={() => setAddModal(false)}>
                <X className="h-5 w-5 text-gray-600" />
              </button>
            </div>

            {/* Body */}
            <div className="p-6 space-y-3">

              <label className="text-sm font-medium text-gray-700">Title</label>
              <Input
                value={newEvent.title}
                onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })}
              />

              <label className="text-sm font-medium text-gray-700">Description</label>
              <Textarea
                value={newEvent.description}
                onChange={(e) => setNewEvent({ ...newEvent, description: e.target.value })}
              />

              <label className="text-sm font-medium text-gray-700">Location</label>
              <Input
                value={newEvent.location}
                onChange={(e) => setNewEvent({ ...newEvent, location: e.target.value })}
              />

              <label className="text-sm font-medium text-gray-700">Speaker</label>
              <Input
                value={newEvent.speaker}
                onChange={(e) => setNewEvent({ ...newEvent, speaker: e.target.value })}
              />

              <div className="flex gap-3">
                <div className="flex-1">
                  <label className="text-sm font-medium text-gray-700">Start Date</label>
                  <Input
                    type="date"
                    value={newEvent.startDate}
                    onChange={(e) => setNewEvent({ ...newEvent, startDate: e.target.value })}
                  />
                </div>

                <div className="flex-1">
                  <label className="text-sm font-medium text-gray-700">End Date</label>
                  <Input
                    type="date"
                    value={newEvent.endDate}
                    onChange={(e) => setNewEvent({ ...newEvent, endDate: e.target.value })}
                  />
                </div>
              </div>

              <div className="flex gap-3">
                <div className="flex-1">
                  <label className="text-sm font-medium text-gray-700">Start Time</label>
                  <Input
                    type="time"
                    value={newEvent.startTime}
                    onChange={(e) => setNewEvent({ ...newEvent, startTime: e.target.value })}
                  />
                </div>

                <div className="flex-1">
                  <label className="text-sm font-medium text-gray-700">End Time</label>
                  <Input
                    type="time"
                    value={newEvent.endTime}
                    onChange={(e) => setNewEvent({ ...newEvent, endTime: e.target.value })}
                  />
                </div>
              </div>

              <label className="text-sm font-medium text-gray-700">Registration Link</label>
              <Input
                value={newEvent.registrationLink}
                onChange={(e) => setNewEvent({ ...newEvent, registrationLink: e.target.value })}
              />

              <label className="text-sm font-medium text-gray-700">Live Stream Link</label>
              <Input
                value={newEvent.liveStreamLink}
                onChange={(e) => setNewEvent({ ...newEvent, liveStreamLink: e.target.value })}
              />

              <label className="text-sm font-medium text-gray-700">Banner Image</label>
              <Input
                type="file"
                onChange={(e) => setNewEvent({ ...newEvent, banner: e.target.files?.[0] })}
              />

              <label className="text-sm font-medium text-gray-700">Status</label>
              <Select
                value={newEvent.status}
                onValueChange={(value) => setNewEvent({ ...newEvent, status: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="upcoming">Upcoming</SelectItem>
                  <SelectItem value="ongoing">Ongoing</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                </SelectContent>
              </Select>

            </div>

            {/* Footer */}
            <div className="sticky bottom-0 bg-white p-4 border-t rounded-b-xl">
              <Button className="w-full mt-1" onClick={handleAddEvent}>
                Add Event
              </Button>
            </div>

          </div>
        </div>
      )}





      {/* -------------------- EDIT EVENT MODAL -------------------- */}
      {editModal && editEvent && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center px-4 z-50">
          <div className="bg-white rounded-xl w-full max-w-lg shadow-xl relative max-h-[85vh] overflow-y-auto">

            {/* Header */}
            <div className="sticky top-0 bg-white p-6 border-b rounded-t-xl z-10">
              <h2 className="text-xl font-semibold">Edit Event</h2>
              <button className="absolute top-4 right-4" onClick={() => setEditModal(false)}>
                <X className="h-5 w-5 text-gray-600" />
              </button>
            </div>

            {/* Body */}
            <div className="p-6 space-y-3">

              <label className="text-sm font-medium text-gray-700">Title</label>
              <Input
                value={editEvent.title}
                onChange={(e) => setEditEvent({ ...editEvent, title: e.target.value })}
              />

              <label className="text-sm font-medium text-gray-700">Description</label>
              <Textarea
                value={editEvent.description}
                onChange={(e) => setEditEvent({ ...editEvent, description: e.target.value })}
              />

              <label className="text-sm font-medium text-gray-700">Location</label>
              <Input
                value={editEvent.location}
                onChange={(e) => setEditEvent({ ...editEvent, location: e.target.value })}
              />

              <label className="text-sm font-medium text-gray-700">Speaker</label>
              <Input
                value={editEvent.speaker}
                onChange={(e) => setEditEvent({ ...editEvent, speaker: e.target.value })}
              />

              <div className="flex gap-3">
                <div className="flex-1">
                  <label className="text-sm font-medium text-gray-700">Start Date</label>
                  <Input
                    type="date"
                    value={editEvent.startDate}
                    onChange={(e) => setEditEvent({ ...editEvent, startDate: e.target.value })}
                  />
                </div>

                <div className="flex-1">
                  <label className="text-sm font-medium text-gray-700">End Date</label>
                  <Input
                    type="date"
                    value={editEvent.endDate}
                    onChange={(e) => setEditEvent({ ...editEvent, endDate: e.target.value })}
                  />
                </div>
              </div>

              <div className="flex gap-3">
                <div className="flex-1">
                  <label className="text-sm font-medium text-gray-700">Start Time</label>
                  <Input
                    type="time"
                    value={editEvent.startTime}
                    onChange={(e) => setEditEvent({ ...editEvent, startTime: e.target.value })}
                  />
                </div>

                <div className="flex-1">
                  <label className="text-sm font-medium text-gray-700">End Time</label>
                  <Input
                    type="time"
                    value={editEvent.endTime}
                    onChange={(e) => setEditEvent({ ...editEvent, endTime: e.target.value })}
                  />
                </div>
              </div>

              <label className="text-sm font-medium text-gray-700">Registration Link</label>
              <Input
                value={editEvent.registrationLink}
                onChange={(e) => setEditEvent({ ...editEvent, registrationLink: e.target.value })}
              />

              <label className="text-sm font-medium text-gray-700">Live Stream Link</label>
              <Input
                value={editEvent.liveStreamLink}
                onChange={(e) => setEditEvent({ ...editEvent, liveStreamLink: e.target.value })}
              />

              <label className="text-sm font-medium text-gray-700">Banner Image</label>
              <Input
                type="file"
                onChange={(e) => setEditEvent({ ...editEvent, banner: e.target.files?.[0] })}
              />

              <label className="text-sm font-medium text-gray-700">Status</label>
              <Select
                value={editEvent.status}
                onValueChange={(value) => setEditEvent({ ...editEvent, status: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="upcoming">Upcoming</SelectItem>
                  <SelectItem value="ongoing">Ongoing</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                </SelectContent>
              </Select>

            </div>

            {/* Footer */}
            <div className="sticky bottom-0 bg-white p-4 border-t rounded-b-xl">
              <Button className="w-full mt-1" onClick={handleSaveEdit}>
                Save Changes
              </Button>
            </div>

          </div>
        </div>
      )}



      {/* -------------------- VIEW REGISTRATION MODAL -------------------- */}
      {showRegModal && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center px-4 z-50">
          <div className="bg-white p-6 rounded-xl shadow-xl max-w-lg w-full relative">

            <button
              className="absolute top-3 right-3 bg-gray-200 hover:bg-gray-300 p-2 rounded-full"
              onClick={() => setShowRegModal(false)}
            >
              <X className="h-4 w-4 text-gray-700" />
            </button>

            <h2 className="text-xl font-semibold text-[#0E4C92] mb-4 mt-3">
              Registered Users ({selectedRegistrations.length})
            </h2>

            {selectedRegistrations.length === 0 ? (
              <p className="text-center text-gray-500 py-6">
                No registrations yet.
              </p>
            ) : (
              <div className="max-h-72 overflow-y-auto space-y-3 pr-2">
                {selectedRegistrations.map((user, index) => (
                  <div
                    key={index}
                    className="p-3 border rounded-xl bg-gray-50 shadow-sm"
                  >
                    <p><strong>Name:</strong> {user.name}</p>
                    <p><strong>Email:</strong> {user.email}</p>
                    <p><strong>Phone:</strong> {user.phone}</p>
                  </div>
                ))}
              </div>
            )}

            <Button
              className="w-full mt-4 bg-[#0E4C92] text-white rounded-xl"
              onClick={() => {
                const csvData = selectedRegistrations
                  .map((u) => `${u.name},${u.email},${u.phone}`)
                  .join("\n");

                const blob = new Blob([csvData], { type: "text/csv" });
                const url = URL.createObjectURL(blob);
                const a = document.createElement("a");
                a.href = url;
                a.download = "registrations.csv";
                a.click();
              }}
            >
              Download CSV
            </Button>

          </div>
        </div>
      )}

    </div>
  );
};

export default Events;
