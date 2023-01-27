const Public = ({ children }) => {
  return (
    <div className="layout__public">
      <div className="layout__public__wrapper d-flex justify-content-center align-items-center">
        <div
          className="
            layout__public__wrapper__content 
            col-lg-4 col-md-6 col-11 bg-white 
            rounded rounded-3 shadow-sm
        "
        >
          {children}
        </div>
      </div>
    </div>
  );
};
export default Public;
