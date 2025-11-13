import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus, GripVertical, Edit, Trash2 } from "lucide-react";
import { toast } from "sonner";

const MenuManager = () => {
  const menuItems = [
    { id: '1', title: 'Home', type: 'static', order: 1 },
    { id: '2', title: 'About', type: 'static', order: 2 },
    { id: '3', title: 'Announcements', type: 'dynamic', order: 3 },
    { id: '4', title: 'Events', type: 'dynamic', order: 4 },
    { id: '5', title: 'Publications', type: 'dynamic', order: 5 },
    { id: '6', title: 'Members', type: 'static', order: 6 },
    { id: '7', title: 'Contact', type: 'static', order: 7 },
  ];

  const handleDelete = (id: string) => {
    toast.success("Menu item deleted");
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Menu Manager</h1>
          <p className="text-muted-foreground">Organize website navigation menu</p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Add Menu Item
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Main Menu</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {menuItems.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center gap-3 rounded-lg border border-border bg-card p-3 hover:bg-accent/50 transition-colors"
                >
                  <GripVertical className="h-5 w-5 text-muted-foreground cursor-move" />
                  <div className="flex-1">
                    <p className="font-medium text-foreground">{item.title}</p>
                    <p className="text-xs text-muted-foreground capitalize">{item.type}</p>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="ghost" size="icon">
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="icon"
                      onClick={() => handleDelete(item.id)}
                    >
                      <Trash2 className="h-4 w-4 text-destructive" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Menu Instructions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-sm text-muted-foreground">
            <div>
              <h4 className="font-medium text-foreground mb-1">Static Menu Items</h4>
              <p>Fixed pages like Home, About, Contact</p>
            </div>
            <div>
              <h4 className="font-medium text-foreground mb-1">Dynamic Menu Items</h4>
              <p>Automatically populated from categories like Events, Announcements</p>
            </div>
            <div>
              <h4 className="font-medium text-foreground mb-1">Reordering</h4>
              <p>Drag items using the grip handle to reorder menu</p>
            </div>
            <div>
              <h4 className="font-medium text-foreground mb-1">External Links</h4>
              <p>Add external resources or pages by providing URL</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default MenuManager;
