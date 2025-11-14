import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Reveal from "@/components/Reveal";
import { ArrowRight } from "lucide-react";

const flow = [
  {
    title: "Pick your race",
    description: "Scroll the weekly slate, tap into the card that speaks to you, and preview heats, purses, and schedules.",
    metric: "Fresh cards daily",
  },
  {
    title: "Secure your pit pass",
    description: "Checkout with Apple Pay, Google Pay, or card—no phone call, no forms, just a quick tap.",
    metric: "< 30s purchase",
  },
  {
    title: "Instant unlock",
    description: "We text + email your access code and auto-open the stream lobby so you can line up snacks before intros.",
    metric: "Code in seconds",
  },
  {
    title: "Stream + relive",
    description: "Watch live with live stats, catch full replays for 48 hours, and save highlight reels for the crew chat.",
    metric: "48h replay window",
  },
];

export function SubscribeFlowSection() {
  return (
    <section id="subscribe" className="section-shell space-y-6">
      <Reveal className="space-y-3">
        <p className="text-xs uppercase tracking-[0.4em] text-muted-foreground">How it works</p>
        <div className="flex flex-wrap items-end gap-4">
          <h2 className="text-3xl font-semibold text-white">From tap to trackside in one flow.</h2>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">No tech support required <ArrowRight className="size-4" /></div>
        </div>
        <p className="text-muted-foreground">
          Grab a pass, get a code, smash the play button—SportsActionTV keeps it as fan-friendly as DirtVision, RacinDirt,
          and FloSports so you stay focused on burnouts and slide jobs.
        </p>
      </Reveal>
      <div className="grid gap-6 md:grid-cols-2">
        {flow.map((step, index) => (
          <Reveal key={step.title}>
            <Card className="h-full border-white/10 bg-black/50">
              <CardHeader className="space-y-2">
                <div className="text-xs uppercase tracking-[0.4em] text-muted-foreground">Step {index + 1}</div>
                <CardTitle className="text-white">{step.title}</CardTitle>
                <CardDescription className="text-sm text-muted-foreground">{step.metric}</CardDescription>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground">{step.description}</CardContent>
            </Card>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
