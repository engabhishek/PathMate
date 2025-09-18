import { Aperture, MoveRight } from "lucide-react";

const Button = (props) => {
  return (
    <button
      className={`bg-${props.bg} rounded-full px-4 py-2 text-xl text-${props.textcol} font-bold hover:scale-105 flex gap-2 items-center group transition-transform duration-300`}
    >
      <Aperture className="transition-transform duration-500 group-hover:rotate-180" />
      <a href={props.url}>
        {props.text}
      </a>
      <MoveRight />
    </button>
  );
};

export default Button;
