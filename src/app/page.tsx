import { HeroSection } from "@/components/sections/HeroSection";
import { SubscribeFlowSection } from "@/components/sections/SubscribeFlowSection";
import { EventShowcaseSection } from "@/components/sections/EventShowcaseSection";
import { BroadcastPartnersSection } from "@/components/sections/BroadcastPartnersSection";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <EventShowcaseSection />
      <SubscribeFlowSection />
      <BroadcastPartnersSection />
    </>
  );
}
