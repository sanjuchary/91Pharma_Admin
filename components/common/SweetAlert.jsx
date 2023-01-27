import SweetAlert from "react-bootstrap-sweetalert";

const Index = (props) => {
  return (
    <SweetAlert
      show={props.show}
      title={props.title}
      // text={props.text}
      type={props.type}
      showCancelButton={props?.showCancelButton || false}
      confirmButtonColor={props.confirmButtonColor || "green"}
      confirmButtonText={props.confirmButtonText || "Close"}
      cancelButtonText={props.cancelButtonText || "Cancel"}
      onConfirm={() => {
        props.onConfirm();
      }}
      onCancel={() => {
        props.onCancel();
      }}
    >
      {props.text}
    </SweetAlert>
  );
};

export default Index;
