import "./Statistics.css";

type statProp = {
  title: string;
  value: number;
};

export default function Statistics({title, value}: statProp) {
  return (
    <div className="statistic">
      <h1 className="text">{value}</h1>
      <h2>{title}</h2>
    </div>
  );
}