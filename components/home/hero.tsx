import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";

export default function Hero() {
  return (
    <div className="container mt-32">
      <Link href="#contact">
        <Badge
          variant="secondary"
          className="mb-8 gap-1.5 rounded-full px-4 py-2"
        >
          <div className="relative">
            <div className="w-1.5 h-1.5 bg-green-500 rounded-full"></div>
            <div className="absolute inset-0 w-1.5 h-1.5 bg-green-500 rounded-full animate-ping opacity-75"></div>
          </div>
          إستشارة مجانية
        </Badge>
      </Link>
      <div className="font-light mb-6">
        <p className="text-5xl sm:text-7xl">عبدالله نور</p>
        <p className="text-muted-foreground text-4xl sm:text-6xl">
          مهندس برمجيات
        </p>
      </div>
      <p className="max-w-xl text-lg font-light opacity-85 mb-8">
        أبني تجارب رقمية استثنائية باستخدام أحدث التقنيات. متخصص في بناء أنظمة
        برمجية للأفراد والشركات الناشئة.
      </p>
      <div className="flex items-center gap-2">
        <Button size="lg" className="cursor-pointer">
          <span>لنتحدث</span>
          <ArrowUpRight className="size-4" />
        </Button>
        <Button
          variant="link"
          className="opacity-80 hover:opacity-100 hover:no-underline cursor-pointer"
        >
          <span>مشاهدة الأعمال</span>
          <ArrowUpRight className="size-4" />
        </Button>
      </div>
    </div>
  );
}
