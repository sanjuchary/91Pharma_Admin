const Header = (props) => {
  return (
    <div className="layout__public__header rounded-top p-3">
      <h4 className="mb-0">{props.heading}</h4>
      <p className="mb-0">{props.description}</p>
    </div>
  );
};

export default Header;
