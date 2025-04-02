
import SubNavbar from "@/components/shared/SubNavbar";
import "./globals.css";
import Navbar from "@/components/shared/Navbar";
import Sidebar from "@/components/shared/Sidebar";




export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`antialiased font-outfit`}
      >


<Navbar/>


<div className="flex justify-between">
<Sidebar/>
<div className="flex-1 relative">
<SubNavbar/>
<div className=" overflow-y-auto ">
{children}
</div>
</div>

</div>


    
      </body>
    </html>
  );
}
