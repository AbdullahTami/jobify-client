import { FaBug, FaCalendarCheck, FaSuitcaseRolling } from "react-icons/fa";
import Wrapper from "../assets/wrappers/StatsContainer";
import StatItem from "./StatItem";

function StatsContainer({ defaultStats }) {
  const stats = [
    {
      title: "pending applications",
      count: defaultStats?.pending ?? 0,
      icon: <FaSuitcaseRolling />,
      color: "#f59e0b",
      bsg: "#fef3c7",
    },
    {
      title: "interview scheduled",
      count: defaultStats?.interview ?? 0,
      icon: <FaCalendarCheck />,
      color: "#647acb",
      bsg: "#e0e8f9",
    },
    {
      title: "jobs declined",
      count: defaultStats?.declined ?? 0,
      icon: <FaBug />,
      color: "#d66a6a",
      bsg: "#ffeeee",
    },
  ];
  return (
    <Wrapper>
      {stats.map((item) => {
        return <StatItem key={item.title} {...item} />;
      })}
    </Wrapper>
  );
}

export default StatsContainer;
