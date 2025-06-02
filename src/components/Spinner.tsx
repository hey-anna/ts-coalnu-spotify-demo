// const Spinner = () => {
//   return (
//     <div className="flex items-center space-x-2 p-4">
//       <div className="w-3 h-3 rounded-full bg-blue-500 animate-bounce-glow"></div>
//       <span className="text-black font-medium">로딩 중입니다...</span>
//     </div>
//   );
// };

// export default Spinner;
import BounceLoader from "react-spinners/BounceLoader";

export default function SidebarLoading() {
  return (
    <div className="flex flex-col justify-center items-center h-screen">
      <BounceLoader size={80} color="#3ecdf4" />
      <p className="mt-4 text-lg font-semibold text-sky-600">
        로딩 중입니다...
      </p>
    </div>
  );
}
