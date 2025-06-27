import Footer from "./_components/shared/Footer/Footer";
import Navbar from "./_components/shared/Navbar/Navbar";

const CommonLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <Navbar />
      {children}
      <Footer />
    </div>
  );
};
export default CommonLayout;
