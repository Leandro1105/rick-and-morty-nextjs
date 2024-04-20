import Footer from "./Footer";
import Navbar from "./navbar";

export default function Layout({ children }) {
    return (
        <main>
            <Navbar />
            {
                children
            }
            <Footer />
        </main>
    )
}