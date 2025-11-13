import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { mockContent, mockEvents, mockForms, mockUsers, mockLogs } from "@/lib/mockData";
import { FileText, Calendar, ClipboardList, Users, TrendingUp, Eye } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const Dashboard = () => {
  const publishedContent = mockContent.filter(c => c.status === 'published').length;
  const upcomingEvents = mockEvents.filter(e => e.status === 'upcoming').length;
  const activeForms = mockForms.filter(f => f.status === 'active').length;
  const activeUsers = mockUsers.filter(u => u.status === 'active').length;

  const recentLogs = mockLogs.slice(0, 5);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
        <p className="text-muted-foreground">Welcome to DTC & CITAX CMS</p>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Published Content
            </CardTitle>
            <FileText className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">{publishedContent}</div>
            <p className="text-xs text-muted-foreground">
              +2 from last week
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Upcoming Events
            </CardTitle>
            <Calendar className="h-4 w-4 text-accent" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">{upcomingEvents}</div>
            <p className="text-xs text-muted-foreground">
              Next in 5 days
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Active Forms
            </CardTitle>
            <ClipboardList className="h-4 w-4 text-success" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">{activeForms}</div>
            <p className="text-xs text-muted-foreground">
              {mockForms.reduce((acc, f) => acc + f.responses, 0)} total responses
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Active Users
            </CardTitle>
            <Users className="h-4 w-4 text-info" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">{activeUsers}</div>
            <p className="text-xs text-muted-foreground">
              {mockUsers.length} total users
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity and Top Content */}
      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentLogs.map((log) => (
                <div key={log.id} className="flex items-start gap-3 border-b border-border pb-3 last:border-0 last:pb-0">
                  <div className="flex-1">
                    <p className="text-sm font-medium text-foreground">{log.action}</p>
                    <p className="text-xs text-muted-foreground">{log.details}</p>
                    <p className="mt-1 text-xs text-muted-foreground">{log.user} • {log.timestamp}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Top Viewed Content</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {mockContent
                .filter(c => c.status === 'published')
                .sort((a, b) => b.views - a.views)
                .slice(0, 5)
                .map((content) => (
                  <div key={content.id} className="flex items-center justify-between border-b border-border pb-3 last:border-0 last:pb-0">
                    <div className="flex-1">
                      <p className="text-sm font-medium text-foreground">{content.title}</p>
                      <div className="mt-1 flex items-center gap-2">
                        <Badge variant="secondary" className="text-xs">
                          {content.category}
                        </Badge>
                        <span className="flex items-center gap-1 text-xs text-muted-foreground">
                          <Eye className="h-3 w-3" />
                          {content.views}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
