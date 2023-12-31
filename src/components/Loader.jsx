// eslint-disable-next-line react/prop-types
const Loader = ({ screen, bgTransparent }) => {
  return (
    <div
      className=" bg-transparent w-full flex items-center justify-center py-4"
      style={{
        height: screen ? "100vh" : "100%",
        backgroundColor: bgTransparent ? "transparent" : "#131315",
      }}
    >
      <div
        className="inline-block h-10 w-10 rounded-full animate-spin bg-transparent
  border-[4px] border-mainColor border-t-transparent "
      ></div>
    </div>
  );
};

export default Loader;
