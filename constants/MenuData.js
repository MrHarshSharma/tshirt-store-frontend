// import { useSession} from 'next-auth/react'
// const {data:session} = useSession();
// console.log(session)

const MenuData = [
    { id: 1, name: "Home", url: "/" },
    { id: 2, name: "About", url: "/about" },
    { id: 3, name: "Categories", subMenu: true },
    { id: 4, name: "Contact", url: "/contact" },
    { id: 5, name: "Dashboard", url: "/dashboard" },
];

export default MenuData;
