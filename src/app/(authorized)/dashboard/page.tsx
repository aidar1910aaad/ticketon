import Sidebar from "@/components/dashboard/Sidebar";
import DashboardBanner from "@/components/dashboard/DashboardBanner";
import MyTickets from "@/components/dashboard/MyTickets";
import FavoriteEvents from "@/components/dashboard/FavoriteEvents";
import UserSettings from "@/components/dashboard/UserSettings";
import PopularEvents from "@/components/dashboard/PopularEvents";


export default function DashboardPage() {
  return (
    <div className="flex">
      

      {/* Основной контент */}
      <main className="flex-1 p-6 space-y-6">
        <DashboardBanner />
        <PopularEvents/>
        <MyTickets />
        <FavoriteEvents />
        <UserSettings />
      </main>
    </div>
  );
}
