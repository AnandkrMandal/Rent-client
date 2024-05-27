import { Link } from 'react-router-dom';
import {useSelector} from 'react-redux'

function HeroSection() {
  const authStatus = useSelector((state) => state.auth.status)
  return (
    <section className="relative overflow-hidden text-white px-3 min-h-[40rem] flex items-center justify-center bg-gradient-to-tr from-pink-300 to-blue-300">
      <div className="w-full max-w-7xl text-center py-14">
        <h1 className="text-white text-6xl lg:text-7xl font-extrabold mb-4">
          Rent or sell house at best price.
        </h1>
        <p className="leading-loose mb-10 max-w-2xl mx-auto">
        full stack service provider for all real estate needs,
         with 15+ services including home loans, pay rent, legal assistance,
        property valuation, and expert advice. As the largest 
        platform for buyers and sellers of property to connect
        </p>
        {!authStatus && (
        <div className="flex items-center justify-center flex-wrap gap-4">
         <Link
            to="/login"
            className="px-4 py-2  bg-blue-800 text-white rounded hover:bg-blue-400">
            Login
          </Link>
          <Link to="/signup"
           className="px-4 py-2  bg-blue-800 text-white rounded hover:bg-blue-400">
            Sign up
          </Link>
        </div>
        ) 
      } 
      </div>
    </section>
  );
}

export default HeroSection;
