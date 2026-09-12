import { FileText, ListTodo, Timer } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/shared/ui/card";

export function MarketingFeatures() {
  return (
    <section
      id="features"
      className="py-24 border-t border-b border-border/40 bg-secondary/30"
    >
      <div className="container mx-auto max-w-6xl px-4 sm:px-6">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">
            Manage your pipeline your way
          </h2>
          <p className="mt-3 text-base text-muted-foreground">
            Whether you prefer data-dense tables or visual boards, Ghosted
            adapts to your workflow.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          <Card className="bg-background">
            <CardHeader>
              <ListTodo className="size-6 text-foreground mb-2" />
              <CardTitle className="text-lg">Table & Kanban Views</CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground space-y-2">
              <p>
                Switch seamlessly between a highly sortable, data-dense table
                and a visual drag-and-drop Kanban board for managing your
                pipeline.
              </p>
            </CardContent>
          </Card>

          <Card className="bg-background">
            <CardHeader>
              <FileText className="size-6 text-foreground mb-2" />
              <CardTitle className="text-lg">Resume Performance</CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground space-y-2">
              <p>
                Upload multiple resume versions and link them to applications.
                Track exactly which version yields the highest interview
                conversion rate.
              </p>
            </CardContent>
          </Card>

          <Card className="bg-background">
            <CardHeader>
              <Timer className="size-6 text-foreground mb-2" />
              <CardTitle className="text-lg">Ghosting Alerts</CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground space-y-2">
              <p>
                Stop waiting forever. Applications that haven't received a
                status update in 21+ days are automatically flagged as ghosted
                candidates.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
