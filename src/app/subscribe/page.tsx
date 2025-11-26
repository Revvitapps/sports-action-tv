import type { Metadata } from "next";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Reveal from "@/components/Reveal";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Subscribe | SportsActionTV",
  description:
    "Redeem single-use codes, review entitlements, and manage your viewing devices.",
};

const subscribeTiers = [
  {
    name: "Monthly Pit Crew",
    price: "$24.99 / month",
    description: "Full access for this month’s action—perfect for active race weeks.",
    includes: ["Live + replay access", "Device hopping without re-login", "Text/email race alerts"],
    href: "/subscribe?pass=monthly",
  },
  {
    name: "Yearly Pit Crew",
    price: "$199 / year",
    description: "Every card, bonus content, and member-only drops all season long.",
    includes: ["All live + replay access", "Helmet cam + drone angles", "Merch + ticket presale perks"],
    href: "/subscribe?pass=annual",
  },
];

const accessSteps = [
  {
    title: "Buy your pass",
    detail:
      "Use the Stripe checkout link from the homepage or event modal. Your profile is created automatically.",
  },
  {
    title: "Grab the code",
    detail:
      "We text and email your single-use code. It is tied to the event, device, and viewing window.",
  },
  {
    title: "Redeem & watch",
    detail:
      "Drop the code below. Once verified, head to the Watch Live page where your player is ready.",
  },
];

export default function SubscribePage() {
  return (
    <section className="space-y-12">
      <Reveal className="space-y-4 text-center text-white">
        <p className="text-xs uppercase tracking-[0.45em] text-white/70">
          Subscribe
        </p>
        <h1 className="text-4xl font-semibold">
          Redeem your SportsActionTV pass.
        </h1>
        <p className="text-white/85">
          This page will wire into Supabase + Stripe soon. For now it
          demonstrates the layout for code redemption, entitlements, and help
          content.
        </p>
      </Reveal>
      <Reveal>
        <Card className="border-white/20 bg-black/75 text-white shadow-[0_20px_60px_rgba(0,0,0,0.5)]">
          <CardHeader>
            <CardTitle className="text-2xl font-semibold text-white">Redeem access</CardTitle>
            <CardDescription className="text-white/80">
              Enter the one-time access code delivered via email or SMS.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-3 md:grid-cols-[2fr,1fr]">
              <input
                className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-lg tracking-[0.4em] text-center uppercase"
                placeholder="XXXX-XXXX"
                value="LKM4-92HD"
                readOnly
              />
              <Button className="rounded-2xl" size="lg">
                Redeem
              </Button>
            </div>
            <p className="text-xs text-white/70">
              Powered by Stripe webhooks + Supabase Row Level Security. Replace
              this with a live form when wiring the actual subscribe flow.
            </p>
          </CardContent>
        </Card>
      </Reveal>
      <Reveal className="space-y-6 rounded-[2.5rem] border border-white/20 bg-black/70 p-8 text-white shadow-[0_20px_60px_rgba(0,0,0,0.45)]">
        <div className="text-xs uppercase tracking-[0.4em] text-white/70">
          Need a pass?
        </div>
        <h2 className="text-2xl font-semibold">
          Pick a pit crew plan
        </h2>
        <div className="grid gap-6 md:grid-cols-2">
          {subscribeTiers.map((tier) => (
            <div key={tier.name} className="rounded-2xl border border-white/25 bg-white/10 p-5">
              <div className="flex items-center justify-between text-left">
                <div>
                  <h3 className="text-xl font-semibold">{tier.name}</h3>
                  <p className="text-sm text-white/80">{tier.description}</p>
                </div>
                <div className="text-lg font-semibold text-primary">{tier.price}</div>
              </div>
              <ul className="mt-4 space-y-2 text-sm text-white/85">
                {tier.includes.map((item) => (
                  <li key={item} className="rounded-xl border border-white/25 bg-black/50 px-3 py-2">
                    {item}
                  </li>
                ))}
              </ul>
              <Button asChild className="mt-4 w-full" variant="outline">
                <Link href={tier.href}>Checkout (Stripe)</Link>
              </Button>
            </div>
          ))}
        </div>
      </Reveal>
      <Reveal className="grid gap-6 md:grid-cols-3">
        {accessSteps.map((step, idx) => (
          <Card key={step.title} className="border-white/20 bg-black/65 text-white shadow-[0_20px_60px_rgba(0,0,0,0.4)]">
            <CardHeader className="space-y-3">
              <div className="text-xs uppercase tracking-[0.4em] text-muted-foreground">
                Step {idx + 1}
              </div>
              <CardTitle className="text-xl text-white">{step.title}</CardTitle>
              <CardDescription className="text-white/80">
                {step.detail}
              </CardDescription>
            </CardHeader>
          </Card>
        ))}
      </Reveal>
    </section>
  );
}
