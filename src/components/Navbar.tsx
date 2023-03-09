import { signIn, signOut, useSession } from "next-auth/react";
import Image from "next/image";
import profilePic from "../assets/images/profile.jpg";
import Link from "next/link";

const Navbar: React.FC = () => {
  const { data: sessionData } = useSession();
  return (
    <div className="navbar flex justify-between shadow-sm">
      <Link href="" className="btn-ghost btn flex-shrink text-xl normal-case">
        {sessionData?.user?.name
          ? `${sessionData.user.name}'s Kitchen Genie`
          : "Kitchen Genie"}
      </Link>
      <div className="flex-none">
        {/*
        <div className="dropdown-end dropdown">
          <label tabIndex={0} className="btn-ghost btn-circle btn">
            <div className="indicator">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                />
              </svg>
              <span className="badge badge-sm indicator-item">8</span>
            </div>
          </label>
          <div
            tabIndex={0}
            className="card dropdown-content card-compact mt-3 w-52 bg-base-100 shadow"
          >
            <div className="card-body">
              <span className="text-lg font-bold">8 Items</span>
              <span className="text-info">Subtotal: $999</span>
              <div className="card-actions">
                <button className="btn-primary btn-block btn">View cart</button>
              </div>
            </div>
          </div>
        </div>
          */}
        <div className="dropdown-end dropdown">
          <label tabIndex={0} className="btn-ghost btn-circle avatar btn">
            <div className="w-10 rounded-full">
              {sessionData?.user?.image ? (
                <Image
                  src={sessionData.user.image}
                  fill
                  alt="profile picture"
                />
              ) : (
                <Image src={profilePic} alt="default profile picture" />
              )}
            </div>
          </label>
          <ul
            tabIndex={0}
            className="dropdown-content menu rounded-box menu-compact mt-3 w-52 bg-base-100 p-2 shadow"
          >
            {!sessionData && (
              <li>
                <Link
                  onClick={
                    sessionData ? () => void signOut() : () => void signIn()
                  }
                  href=""
                  className="justify-between"
                >
                  Sign in
                </Link>
              </li>
            )}
            <li>
              <Link href="/settings">Settings</Link>
            </li>
            {sessionData && (
              <li>
                <Link
                  onClick={
                    sessionData ? () => void signOut() : () => void signIn()
                  }
                  href=""
                >
                  Logout
                </Link>
              </li>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
