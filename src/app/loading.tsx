import Loading from "@/components/Loading";

const AppLoading = () => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm">
      <Loading />
    </div>
  );
};

export default AppLoading;