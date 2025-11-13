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
import { mockDiscussions } from "@/lib/mockData";
import { Search, MessageSquare, CheckCircle, AlertCircle } from "lucide-react";
import { toast } from "sonner";

const Discussions = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredDiscussions = mockDiscussions.filter(discussion =>
    discussion.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    discussion.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const pendingCount = mockDiscussions.filter(d => d.status === 'pending').length;
  const answeredCount = mockDiscussions.filter(d => d.status === 'answered').length;

  const handleApprove = (id: string) => {
    toast.success("Response approved and published");
  };

  const handleAssign = (id: string) => {
    toast.info("Assign to panelist functionality");
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Discussion Forum</h1>
        <p className="text-muted-foreground">Manage queries and expert responses</p>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Pending Queries
            </CardTitle>
            <MessageSquare className="h-4 w-4 text-warning" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">{pendingCount}</div>
            <p className="text-xs text-muted-foreground">
              {mockDiscussions.filter(d => d.pendingDays > 3).length} over 3 days
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Answered
            </CardTitle>
            <CheckCircle className="h-4 w-4 text-success" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">{answeredCount}</div>
            <p className="text-xs text-muted-foreground">
              Awaiting approval
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Resolved
            </CardTitle>
            <CheckCircle className="h-4 w-4 text-info" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">
              {mockDiscussions.filter(d => d.status === 'resolved').length}
            </div>
            <p className="text-xs text-muted-foreground">
              Total resolved
            </p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>All Queries</CardTitle>
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search discussions..."
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
                <TableHead>Query</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Asked By</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Pending</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredDiscussions.map((discussion) => (
                <TableRow key={discussion.id}>
                  <TableCell className="font-medium max-w-md">
                    <div className="flex items-start gap-2">
                      {discussion.pendingDays > 3 && (
                        <AlertCircle className="h-4 w-4 text-warning mt-0.5 flex-shrink-0" />
                      )}
                      {discussion.title}
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="secondary">{discussion.category}</Badge>
                  </TableCell>
                  <TableCell className="text-muted-foreground">{discussion.askedBy}</TableCell>
                  <TableCell>
                    <Badge 
                      variant={
                        discussion.status === 'resolved' ? 'default' : 
                        discussion.status === 'answered' ? 'secondary' : 
                        'outline'
                      }
                    >
                      {discussion.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-muted-foreground">
                    {discussion.pendingDays > 0 ? `${discussion.pendingDays} days` : '-'}
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      {discussion.status === 'pending' && (
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => handleAssign(discussion.id)}
                        >
                          Assign
                        </Button>
                      )}
                      {discussion.status === 'answered' && (
                        <Button 
                          size="sm"
                          onClick={() => handleApprove(discussion.id)}
                        >
                          Approve
                        </Button>
                      )}
                      <Button variant="outline" size="sm">
                        View
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default Discussions;
