const Alert = (props) => {
  const getAlertClass = () => {
    switch (props.status) {
      case 0:
        return "danger";
      case 1:
        return "success";
      case 2:
        return "warning";
      default:
        return "";
    }
  };
  return (
    <div
      className={`
        alert
        alert-${getAlertClass()}
        fs-7
        p-2
    `}
      role="alert"
    >
      {props.message}
    </div>
  );
};

export default Alert;
