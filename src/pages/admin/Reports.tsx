import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
import { mockLogs } from "@/lib/mockData";
import { Download, Filter } from "lucide-react";
import { toast } from "sonner";

const Reports = () => {
  const [logFilter, setLogFilter] = useState("all");
  const [pageSize, setPageSize] = useState("25");

  const filteredLogs = logFilter === "all" 
    ? mockLogs 
    : mockLogs.filter(log => log.action.toLowerCase().includes(logFilter.toLowerCase()));

  const displayedLogs = filteredLogs.slice(0, parseInt(pageSize));

  const handleExport = (format: string) => {
    toast.success(`Exporting logs as ${format.toUpperCase()}...`);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Reports & Logs</h1>
          <p className="text-muted-foreground">View system activity and audit logs</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={() => handleExport('csv')}>
            <Download className="mr-2 h-4 w-4" />
            Export CSV
          </Button>
          <Button variant="outline" onClick={() => handleExport('excel')}>
            <Download className="mr-2 h-4 w-4" />
            Export Excel
          </Button>
          <Button variant="outline" onClick={() => handleExport('pdf')}>
            <Download className="mr-2 h-4 w-4" />
            Export PDF
          </Button>
        </div>
      </div>

      <Card>
        <CardHeader>
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <CardTitle>Activity Logs</CardTitle>
            <div className="flex flex-col gap-2 sm:flex-row">
              <Select value={logFilter} onValueChange={setLogFilter}>
                <SelectTrigger className="w-full sm:w-[180px]">
                  <SelectValue placeholder="Filter by action" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Actions</SelectItem>
                  <SelectItem value="login">Login</SelectItem>
                  <SelectItem value="content">Content</SelectItem>
                  <SelectItem value="user">User</SelectItem>
                  <SelectItem value="event">Event</SelectItem>
                </SelectContent>
              </Select>
              
              <Select value={pageSize} onValueChange={setPageSize}>
                <SelectTrigger className="w-full sm:w-[150px]">
                  <SelectValue placeholder="Items per page" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="10">10 per page</SelectItem>
                  <SelectItem value="25">25 per page</SelectItem>
                  <SelectItem value="50">50 per page</SelectItem>
                  <SelectItem value="100">100 per page</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Action</TableHead>
                <TableHead>User</TableHead>
                <TableHead>Details</TableHead>
                <TableHead>Timestamp</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {displayedLogs.map((log) => (
                <TableRow key={log.id}>
                  <TableCell className="font-medium">{log.action}</TableCell>
                  <TableCell className="text-muted-foreground">{log.user}</TableCell>
                  <TableCell className="max-w-md truncate text-muted-foreground">
                    {log.details}
                  </TableCell>
                  <TableCell className="text-muted-foreground">{log.timestamp}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          
          <div className="mt-4 flex items-center justify-between text-sm text-muted-foreground">
            <p>Showing {displayedLogs.length} of {filteredLogs.length} logs</p>
            <Button variant="outline" size="sm">Load More</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Reports;
