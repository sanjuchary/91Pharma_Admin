import Link from "next/link";

const BreadCrumb = (props) => {
  return (
    <div>
      {props.items.map((item, index) => (
        <span key={index}>
          {" "}
          <Link href={item.url}>
            <span className="cursor__pointer mx-2">{item.text}</span>
          </Link>
          {index === props.items.length - 1 ? " " : " / "}
        </span>
      ))}
    </div>
  );
};
export default BreadCrumb;
