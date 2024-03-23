import Cards from "../injuryPage/Cards";

function InjuryPlan({ injuryInfo }) {
  return (
    <div
      style={{ maxWidth: "800px", margin: "0 auto" }}
      className="grid grid-rows-1 lg:grid-cols-2 gap-6"
    >
      <h1 className="col-span-full text-center text-2xl font-extrabold	">
        Injury Prevention Plans
      </h1>
      {injuryInfo.map((current, index) => (
        <Cards key={index} title={current.title} workouts={current.workouts} />
      ))}
    </div>
  );
}

export default InjuryPlan;
