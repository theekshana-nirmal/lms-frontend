import Footer from "@/components/layout/Footer";
import Navbar from "@/components/layout/Navbar";

const Dashboard = () => {
  return (
    <div className="min-h-screen flex flex-col mt-20">
      <Navbar />
      <div>User Dashboard</div>
      <Footer />
    </div>
  );
};

export default Dashboard;
